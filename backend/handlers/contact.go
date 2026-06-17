package handlers

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"sonic/backend/models"
)

// SubmitContact returns a Gin handler that saves a contact form to the DB.
// We use this "closure" pattern so the handler has access to the DB pool
// without needing a global variable.
func SubmitContact(db *pgxpool.Pool) gin.HandlerFunc {
	return func(c *gin.Context) {
		var body models.ContactSubmission

		// ShouldBindJSON reads the JSON body AND validates required fields + email format
		if err := c.ShouldBindJSON(&body); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		id, err := body.Save(c.Request.Context(), db)
		if err != nil {
			log.Printf("[contact] DB insert failed: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not save your message. Please try again."})
			return
		}

		log.Printf("[contact] Saved submission id=%d from %s <%s>", id, body.Name, body.Email)

		c.JSON(http.StatusOK, gin.H{
			"message": "Message received! We'll be in touch within 24 hours.",
			"id":      id,
		})
	}
}
