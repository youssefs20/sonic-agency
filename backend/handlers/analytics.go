package handlers

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"sonic/backend/models"
)

// TrackEvent returns a Gin handler that saves an analytics event to the DB.
func TrackEvent(db *pgxpool.Pool) gin.HandlerFunc {
	return func(c *gin.Context) {
		var body models.AnalyticsEvent

		if err := c.ShouldBindJSON(&body); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		if err := body.Save(c.Request.Context(), db); err != nil {
			log.Printf("[analytics] DB insert failed: %v", err)
			// Analytics failures should never break the user's experience — return 200
			c.JSON(http.StatusOK, gin.H{"ok": false})
			return
		}

		c.JSON(http.StatusOK, gin.H{"ok": true})
	}
}
