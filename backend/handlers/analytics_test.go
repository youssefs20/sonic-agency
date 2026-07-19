package handlers

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
)

func postEvent(t *testing.T, r *gin.Engine, payload string) *httptest.ResponseRecorder {
	t.Helper()
	req := httptest.NewRequest(http.MethodPost, "/event", strings.NewReader(payload))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	return w
}

func eventRouter(t *testing.T) (*gin.Engine, func(string) int) {
	t.Helper()
	pool := testPool(t)
	r := gin.New()
	r.POST("/event", TrackEvent(pool))
	return r, func(table string) int { return countRows(t, pool, table) }
}

func TestTrackEvent_ValidSavesRow(t *testing.T) {
	r, count := eventRouter(t)

	w := postEvent(t, r, `{"event_name":"cta_click","path":"/","source":"hero_book_call"}`)

	if w.Code != http.StatusOK {
		t.Fatalf("status = %d, want 200; body: %s", w.Code, w.Body.String())
	}
	if !strings.Contains(w.Body.String(), `"ok":true`) {
		t.Errorf("body = %s, want ok:true", w.Body.String())
	}
	if got := count("analytics_events"); got != 1 {
		t.Errorf("rows = %d, want 1", got)
	}
}

func TestTrackEvent_MissingNameRejected(t *testing.T) {
	r, count := eventRouter(t)

	w := postEvent(t, r, `{"path":"/"}`)

	if w.Code != http.StatusBadRequest {
		t.Fatalf("status = %d, want 400", w.Code)
	}
	if got := count("analytics_events"); got != 0 {
		t.Errorf("rows = %d, want 0", got)
	}
}

func TestTrackEvent_PathLongerThanColumnRejected(t *testing.T) {
	// Binding cap (255) must match VARCHAR(255) — long paths 400, never 500.
	r, count := eventRouter(t)

	w := postEvent(t, r, `{"event_name":"page_view","path":"/`+strings.Repeat("a", 256)+`"}`)

	if w.Code != http.StatusBadRequest {
		t.Fatalf("status = %d, want 400", w.Code)
	}
	if got := count("analytics_events"); got != 0 {
		t.Errorf("rows = %d, want 0", got)
	}
}
