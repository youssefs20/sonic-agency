package handlers

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
	"sonic/backend/config"
)

// postContact drives the real handler (validation, honeypot, DB insert).
// SMTP stays unconfigured, so the async email goroutine no-ops with a log
// line instead of hitting the network.
func postContact(t *testing.T, r *gin.Engine, payload string) *httptest.ResponseRecorder {
	t.Helper()
	req := httptest.NewRequest(http.MethodPost, "/contact", strings.NewReader(payload))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	return w
}

func contactRouter(t *testing.T) (*gin.Engine, func(string) int) {
	t.Helper()
	pool := testPool(t)
	r := gin.New()
	r.POST("/contact", SubmitContact(pool, config.Config{}))
	return r, func(table string) int { return countRows(t, pool, table) }
}

func TestSubmitContact_ValidSavesRow(t *testing.T) {
	r, count := contactRouter(t)

	w := postContact(t, r, `{"name":"Test User","email":"user@example.com","phone":"+201000000000","message":"I want to grow bookings."}`)

	if w.Code != http.StatusOK {
		t.Fatalf("status = %d, want 200; body: %s", w.Code, w.Body.String())
	}
	var resp struct {
		ID int `json:"id"`
	}
	if err := json.Unmarshal(w.Body.Bytes(), &resp); err != nil {
		t.Fatalf("bad JSON response: %v", err)
	}
	if resp.ID == 0 {
		t.Error("expected a non-zero submission id")
	}
	if got := count("contact_submissions"); got != 1 {
		t.Errorf("rows = %d, want 1", got)
	}
}

func TestSubmitContact_InvalidEmailRejected(t *testing.T) {
	r, count := contactRouter(t)

	w := postContact(t, r, `{"name":"x","email":"not-an-email","message":"hello"}`)

	if w.Code != http.StatusBadRequest {
		t.Fatalf("status = %d, want 400", w.Code)
	}
	if strings.Contains(w.Body.String(), "Field validation") {
		t.Error("response leaks internal validator details")
	}
	if got := count("contact_submissions"); got != 0 {
		t.Errorf("rows = %d, want 0", got)
	}
}

func TestSubmitContact_MissingMessageRejected(t *testing.T) {
	r, count := contactRouter(t)

	w := postContact(t, r, `{"name":"x","email":"a@b.com"}`)

	if w.Code != http.StatusBadRequest {
		t.Fatalf("status = %d, want 400", w.Code)
	}
	if got := count("contact_submissions"); got != 0 {
		t.Errorf("rows = %d, want 0", got)
	}
}

func TestSubmitContact_NameLongerThanColumnRejected(t *testing.T) {
	// Binding cap (120) must match the VARCHAR(120) column — a longer name
	// must 400 at validation, never 500 at insert.
	r, count := contactRouter(t)

	long := strings.Repeat("a", 121)
	w := postContact(t, r, `{"name":"`+long+`","email":"a@b.com","message":"hi"}`)

	if w.Code != http.StatusBadRequest {
		t.Fatalf("status = %d, want 400", w.Code)
	}
	if got := count("contact_submissions"); got != 0 {
		t.Errorf("rows = %d, want 0", got)
	}
}

func TestSubmitContact_HoneypotDroppedSilently(t *testing.T) {
	r, count := contactRouter(t)

	w := postContact(t, r, `{"name":"Bot","email":"bot@spam.com","message":"buy now","website":"http://spam.example"}`)

	// Bots must see the normal success shape...
	if w.Code != http.StatusOK {
		t.Fatalf("status = %d, want 200 (honeypot must not reveal itself)", w.Code)
	}
	var resp struct {
		ID int `json:"id"`
	}
	if err := json.Unmarshal(w.Body.Bytes(), &resp); err != nil {
		t.Fatalf("bad JSON response: %v", err)
	}
	if resp.ID != 0 {
		t.Errorf("id = %d, want 0 for honeypot", resp.ID)
	}
	// ...but nothing may be stored.
	if got := count("contact_submissions"); got != 0 {
		t.Errorf("rows = %d, want 0 — honeypot submission was saved!", got)
	}
}

func TestSubmitContact_SQLInjectionStoredAsLiteral(t *testing.T) {
	r, count := contactRouter(t)

	w := postContact(t, r, `{"name":"Robert\"; DROP TABLE contact_submissions;--","email":"a@b.com","message":"injection probe"}`)

	if w.Code != http.StatusOK {
		t.Fatalf("status = %d, want 200", w.Code)
	}
	// Table must still exist and hold exactly the literal row.
	if got := count("contact_submissions"); got != 1 {
		t.Errorf("rows = %d, want 1", got)
	}
}
