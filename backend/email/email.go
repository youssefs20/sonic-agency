package email

import (
	"fmt"
	"net/smtp"

	"sonic/backend/config"
)

// SendContactNotification emails a notification about a new contact form
// submission. Go's net/smtp automatically upgrades to STARTTLS when the
// server advertises it, which Gmail's SMTP server does on port 587.
func SendContactNotification(cfg config.Config, name, email, phone, message string) error {
	if cfg.SMTPUser == "" || cfg.SMTPPassword == "" {
		return fmt.Errorf("SMTP not configured: SMTP_USER and SMTP_PASSWORD must be set")
	}

	auth := smtp.PlainAuth("", cfg.SMTPUser, cfg.SMTPPassword, cfg.SMTPHost)

	body := fmt.Sprintf(
		"New contact form submission:\r\n\r\nName: %s\r\nEmail: %s\r\nPhone: %s\r\n\r\nMessage:\r\n%s\r\n",
		name, email, phone, message,
	)
	// Reply-To is the visitor's address, so hitting "Reply" in your inbox
	// replies to them directly. Gmail won't let From be spoofed to their
	// address, but Reply-To has no such restriction.
	msg := []byte(fmt.Sprintf(
		"From: %s\r\nTo: %s\r\nReply-To: %s\r\nSubject: New Sonic contact form submission\r\n\r\n%s",
		cfg.SMTPUser, cfg.ContactRecipient, email, body,
	))

	addr := fmt.Sprintf("%s:%s", cfg.SMTPHost, cfg.SMTPPort)
	return smtp.SendMail(addr, auth, cfg.SMTPUser, []string{cfg.ContactRecipient}, msg)
}
