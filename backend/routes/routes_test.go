package routes

import (
	"net/http"
	"net/http/httptest"
	"os"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
)

func TestMain(m *testing.M) {
	gin.SetMode(gin.TestMode)
	os.Exit(m.Run())
}

func TestPerIPRateLimit_BurstThenReject(t *testing.T) {
	r := gin.New()
	r.POST("/x", perIPRateLimit(5, 10), func(c *gin.Context) { c.Status(http.StatusOK) })

	codes := make([]int, 0, 8)
	for i := 0; i < 8; i++ {
		req := httptest.NewRequest(http.MethodPost, "/x", nil)
		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)
		codes = append(codes, w.Code)
	}

	for i := 0; i < 5; i++ {
		if codes[i] != http.StatusOK {
			t.Errorf("request %d: status = %d, want 200 (inside burst)", i+1, codes[i])
		}
	}
	// Requests fire back-to-back, far faster than the 0.5 tokens/sec refill,
	// so everything past the burst must be rejected.
	for i := 5; i < 8; i++ {
		if codes[i] != http.StatusTooManyRequests {
			t.Errorf("request %d: status = %d, want 429 (burst exhausted)", i+1, codes[i])
		}
	}
}

func TestMaxBodySize_RejectsOversizedBody(t *testing.T) {
	r := gin.New()
	r.Use(maxBodySize(64)) // tiny cap for the test
	r.POST("/x", func(c *gin.Context) {
		var v map[string]any
		if err := c.ShouldBindJSON(&v); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request."})
			return
		}
		c.Status(http.StatusOK)
	})

	small := httptest.NewRequest(http.MethodPost, "/x", strings.NewReader(`{"a":"b"}`))
	small.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()
	r.ServeHTTP(w, small)
	if w.Code != http.StatusOK {
		t.Fatalf("small body: status = %d, want 200", w.Code)
	}

	big := httptest.NewRequest(http.MethodPost, "/x", strings.NewReader(`{"a":"`+strings.Repeat("x", 200)+`"}`))
	big.Header.Set("Content-Type", "application/json")
	w = httptest.NewRecorder()
	r.ServeHTTP(w, big)
	if w.Code != http.StatusBadRequest {
		t.Fatalf("oversized body: status = %d, want 400", w.Code)
	}
}
