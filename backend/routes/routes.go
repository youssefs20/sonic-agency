package routes

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"sonic/backend/handlers"
)

func Register(r *gin.Engine, db *pgxpool.Pool) {
	r.Use(cors.Default())

	api := r.Group("/api")
	{
		api.GET("/health", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"status": "ok"})
		})

		api.POST("/contact", handlers.SubmitContact(db))
		api.POST("/analytics/event", handlers.TrackEvent(db))
	}
}
