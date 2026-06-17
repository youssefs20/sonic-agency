package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"sonic/backend/config"
	"sonic/backend/db"
	"sonic/backend/routes"
)

func main() {
	cfg := config.Load()

	// Connect to PostgreSQL
	pool, err := db.Connect(cfg.DSN)
	if err != nil {
		log.Fatalf("Database connection failed: %v", err)
	}
	defer pool.Close() // closes all connections when the server shuts down

	log.Println("Connected to database")

	r := gin.Default()
	routes.Register(r, pool)

	log.Printf("Sonic API running on http://localhost:%s", cfg.Port)
	if err := r.Run(":" + cfg.Port); err != nil {
		log.Fatal(err)
	}
}
