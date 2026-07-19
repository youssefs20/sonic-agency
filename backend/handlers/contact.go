package handlers

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"sonic/backend/config"
	"sonic/backend/email"
	"sonic/backend/models"
)

// SubmitContact returns a Gin handler that saves a contact form to the DB.
// We use this "closure" pattern so the handler has access to the DB pool
// without needing a global variable.
func SubmitContact(db *pgxpool.Pool, cfg config.Config) gin.HandlerFunc {
	return func(c *gin.Context) {
		var body models.ContactSubmission

		// ShouldBindJSON reads the JSON body AND validates required fields + email format
		if err := c.ShouldBindJSON(&body); err != nil {
			log.Printf("[contact] Invalid request: %v", err)
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request. Please check your input and try again."})
			return
		}

		// Honeypot: the frontend renders an extra "website" field that is
		// invisible to humans. Bots that auto-fill every field reveal
		// themselves here. Respond with the normal success shape so the bot
		// can't tell it was caught — but save nothing and send no email.
		if body.Website != "" {
			log.Printf("[contact] Honeypot triggered from %s — dropping submission", c.ClientIP())
			c.JSON(http.StatusOK, gin.H{
				"message": "Message received! We'll be in touch within 24 hours.",
				"id":      0,
			})
			return
		}

		id, err := body.Save(c.Request.Context(), db)
		if err != nil {
			log.Printf("[contact] DB insert failed: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not save your message. Please try again."})
			return
		}

		log.Printf("[contact] Saved submission id=%d from %s <%s>", id, body.Name, body.Email)

		// Send the notification in the background so the visitor isn't kept
		// waiting on SMTP (2-3s against Gmail). The submission is already
		// saved, so an email failure shouldn't fail the request — the send
		// has its own dial/IO timeouts and just logs on failure.
		go func(name, addr, phone, message string) {
			if err := email.SendContactNotification(cfg, name, addr, phone, message); err != nil {
				log.Printf("[contact] Failed to send notification email: %v", err)
			}
		}(body.Name, body.Email, body.Phone, body.Message)

		c.JSON(http.StatusOK, gin.H{
			"message": "Message received! We'll be in touch within 24 hours.",
			"id":      id,
		})
	}
}
