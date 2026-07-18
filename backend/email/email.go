package email

import (
	"crypto/tls"
	"fmt"
	"net"
	"net/smtp"
	"time"

	"sonic/backend/config"
)

const (
	dialTimeout  = 10 * time.Second
	totalTimeout = 30 * time.Second // covers the whole SMTP conversation
)

// SendContactNotification emails a notification about a new contact form
// submission. net/smtp has no built-in timeouts, so we dial the connection
// ourselves with a deadline — a hung SMTP server can never stall a
// goroutine for more than totalTimeout.
func SendContactNotification(cfg config.Config, name, email, phone, message string) error {
	if cfg.SMTPUser == "" || cfg.SMTPPassword == "" {
		return fmt.Errorf("SMTP not configured: SMTP_USER and SMTP_PASSWORD must be set")
	}

	addr := net.JoinHostPort(cfg.SMTPHost, cfg.SMTPPort)
	conn, err := net.DialTimeout("tcp", addr, dialTimeout)
	if err != nil {
		return fmt.Errorf("smtp dial: %w", err)
	}
	defer conn.Close()
	if err := conn.SetDeadline(time.Now().Add(totalTimeout)); err != nil {
		return fmt.Errorf("smtp set deadline: %w", err)
	}

	client, err := smtp.NewClient(conn, cfg.SMTPHost)
	if err != nil {
		return fmt.Errorf("smtp handshake: %w", err)
	}
	defer client.Close()

	// Gmail advertises STARTTLS on 587; require it so credentials never
	// travel in plaintext.
	if ok, _ := client.Extension("STARTTLS"); !ok {
		return fmt.Errorf("smtp server %s does not support STARTTLS", cfg.SMTPHost)
	}
	if err := client.StartTLS(&tls.Config{ServerName: cfg.SMTPHost}); err != nil {
		return fmt.Errorf("smtp starttls: %w", err)
	}

	auth := smtp.PlainAuth("", cfg.SMTPUser, cfg.SMTPPassword, cfg.SMTPHost)
	if err := client.Auth(auth); err != nil {
		return fmt.Errorf("smtp auth: %w", err)
	}

	if err := client.Mail(cfg.SMTPUser); err != nil {
		return fmt.Errorf("smtp mail from: %w", err)
	}
	if err := client.Rcpt(cfg.ContactRecipient); err != nil {
		return fmt.Errorf("smtp rcpt to: %w", err)
	}
	w, err := client.Data()
	if err != nil {
		return fmt.Errorf("smtp data: %w", err)
	}
	if _, err := w.Write(BuildMessage(cfg, name, email, phone, message)); err != nil {
		return fmt.Errorf("smtp write: %w", err)
	}
	if err := w.Close(); err != nil {
		return fmt.Errorf("smtp close data: %w", err)
	}
	return client.Quit()
}

// BuildMessage renders the raw RFC 5322 message. Reply-To is the visitor's
// address, so hitting "Reply" in the inbox replies to them directly. The
// visitor's email has passed the `email` format validator, which rejects
// CR/LF, so it cannot inject additional headers.
func BuildMessage(cfg config.Config, name, email, phone, message string) []byte {
	body := fmt.Sprintf(
		"New contact form submission:\r\n\r\nName: %s\r\nEmail: %s\r\nPhone: %s\r\n\r\nMessage:\r\n%s\r\n",
		name, email, phone, message,
	)
	return []byte(fmt.Sprintf(
		"From: %s\r\nTo: %s\r\nReply-To: %s\r\nSubject: New Sonic contact form submission\r\n\r\n%s",
		cfg.SMTPUser, cfg.ContactRecipient, email, body,
	))
}
