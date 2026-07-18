package email

import (
	"strings"
	"testing"

	"sonic/backend/config"
)

func testCfg() config.Config {
	return config.Config{
		SMTPUser:         "sender@sonic.agency",
		ContactRecipient: "team@sonic.agency",
	}
}

func TestBuildMessage_HeadersAndBody(t *testing.T) {
	msg := string(BuildMessage(testCfg(), "Nour", "visitor@example.com", "+2010", "Grow my brand"))

	headerEnd := strings.Index(msg, "\r\n\r\n")
	if headerEnd < 0 {
		t.Fatal("message has no header/body separator")
	}
	headers := msg[:headerEnd]

	for _, want := range []string{
		"From: sender@sonic.agency",
		"To: team@sonic.agency",
		"Reply-To: visitor@example.com", // replying must go to the visitor
		"Subject: New Sonic contact form submission",
	} {
		if !strings.Contains(headers, want) {
			t.Errorf("headers missing %q\nheaders: %s", want, headers)
		}
	}

	body := msg[headerEnd+4:]
	for _, want := range []string{"Nour", "visitor@example.com", "+2010", "Grow my brand"} {
		if !strings.Contains(body, want) {
			t.Errorf("body missing %q", want)
		}
	}
}

func TestBuildMessage_VisitorContentCannotInjectHeaders(t *testing.T) {
	// Name/phone/message are only ever rendered in the BODY (after the
	// blank line), so CRLF in them must not create new headers. The email
	// address itself is CRLF-free by validation before this is called.
	msg := string(BuildMessage(testCfg(), "Evil\r\nBcc: victim@example.com", "visitor@example.com", "", "hi"))

	headers := msg[:strings.Index(msg, "\r\n\r\n")]
	if strings.Contains(headers, "Bcc:") {
		t.Errorf("injected Bcc ended up in headers: %s", headers)
	}
}

func TestSendContactNotification_UnconfiguredFailsFast(t *testing.T) {
	err := SendContactNotification(config.Config{}, "n", "e@x.com", "", "m")
	if err == nil {
		t.Fatal("expected error when SMTP is unconfigured")
	}
	if !strings.Contains(err.Error(), "SMTP not configured") {
		t.Errorf("err = %v, want 'SMTP not configured'", err)
	}
}
