package routes

import (
	"net/http"
	"sync"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"golang.org/x/time/rate"
	"sonic/backend/config"
	"sonic/backend/handlers"
)

// maxRequestBody caps incoming request bodies so a single oversized
// payload can't exhaust server memory before validation even runs.
const maxRequestBody = 1 << 20 // 1MB

func Register(r *gin.Engine, db *pgxpool.Pool, cfg config.Config) {
	r.Use(cors.New(cors.Config{
		AllowOrigins: cfg.AllowedOrigins,
		AllowMethods: []string{"GET", "POST"},
		AllowHeaders: []string{"Content-Type"},
	}))
	r.Use(maxBodySize(maxRequestBody))

	api := r.Group("/api")
	{
		api.GET("/health", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"status": "ok"})
		})

		api.POST("/contact", perIPRateLimit(5, 10), handlers.SubmitContact(db, cfg))
		api.POST("/analytics/event", perIPRateLimit(30, 10), handlers.TrackEvent(db))
	}
}

func maxBodySize(limit int64) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Request.Body = http.MaxBytesReader(c.Writer, c.Request.Body, limit)
		c.Next()
	}
}

// limiterEvictAfter is how long an IP must stay quiet before its bucket
// is dropped; limiterSweepEvery is how often the janitor checks. Without
// eviction the per-IP map grows forever under scanning traffic.
const (
	limiterEvictAfter = 10 * time.Minute
	limiterSweepEvery = 5 * time.Minute
)

type ipLimiter struct {
	l        *rate.Limiter
	lastSeen time.Time
}

// perIPRateLimit allows `limit` requests per `windowSeconds` for each
// client IP, using an in-memory token bucket per IP. This resets on
// server restart and isn't shared across multiple instances — fine for
// a single-process marketing site, not for a horizontally scaled API.
// A background janitor evicts buckets for IPs idle > limiterEvictAfter.
func perIPRateLimit(limit int, windowSeconds int) gin.HandlerFunc {
	var mu sync.Mutex
	limiters := make(map[string]*ipLimiter)

	go func() {
		for range time.Tick(limiterSweepEvery) {
			mu.Lock()
			for ip, e := range limiters {
				if time.Since(e.lastSeen) > limiterEvictAfter {
					delete(limiters, ip)
				}
			}
			mu.Unlock()
		}
	}()

	getLimiter := func(ip string) *rate.Limiter {
		mu.Lock()
		defer mu.Unlock()
		e, ok := limiters[ip]
		if !ok {
			e = &ipLimiter{l: rate.NewLimiter(rate.Limit(float64(limit)/float64(windowSeconds)), limit)}
			limiters[ip] = e
		}
		e.lastSeen = time.Now()
		return e.l
	}

	return func(c *gin.Context) {
		if !getLimiter(c.ClientIP()).Allow() {
			c.JSON(http.StatusTooManyRequests, gin.H{"error": "Too many requests. Please try again shortly."})
			c.Abort()
			return
		}
		c.Next()
	}
}
