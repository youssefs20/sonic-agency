package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"sonic/backend/config"
	"sonic/backend/db"
	"sonic/backend/routes"
)

func main() {
	// Load backend/.env into the process environment for local dev. In
	// production, real env vars are set by the host and this file won't
	// exist — godotenv.Load returning an error here is expected, not fatal.
	_ = godotenv.Load()

	cfg := config.Load()

	if cfg.AppEnv == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	// Connect to PostgreSQL
	pool, err := db.Connect(cfg.DSN)
	if err != nil {
		log.Fatalf("Database connection failed: %v", err)
	}
	defer pool.Close() // closes all connections when the server shuts down

	log.Println("Connected to database")

	r := gin.Default()
	// Without a trusted proxy list, Gin ignores X-Forwarded-For and uses the
	// direct connection's IP for ClientIP() (used by our rate limiter). Behind
	// nginx in deploy/nginx.conf, set TRUSTED_PROXIES to nginx's address so
	// rate limiting sees the real client IP instead of nginx's.
	if err := r.SetTrustedProxies(cfg.TrustedProxies); err != nil {
		log.Fatalf("Invalid trusted proxies config: %v", err)
	}
	routes.Register(r, pool, cfg)

	log.Printf("Sonic API running on http://localhost:%s", cfg.Port)
	if err := r.Run(":" + cfg.Port); err != nil {
		log.Fatal(err)
	}
}
