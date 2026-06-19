package config

import (
	"os"
	"strings"
)

type Config struct {
	Port             string
	DSN              string // PostgreSQL connection string
	AppEnv           string
	AllowedOrigins   []string // frontend origins allowed to call this API
	TrustedProxies   []string // reverse proxy IPs allowed to set X-Forwarded-For (nil = trust none)
	SMTPHost         string
	SMTPPort         string
	SMTPUser         string // sending Gmail address
	SMTPPassword     string // Gmail App Password, never a real account password
	ContactRecipient string // where contact form notifications are sent
}

func Load() Config {
	return Config{
		Port:             getEnv("PORT", "8080"),
		DSN:              getEnv("DATABASE_URL", "postgres://postgres:postgres@localhost:5432/sonic_db?sslmode=disable"),
		AppEnv:           getEnv("APP_ENV", "development"),
		AllowedOrigins:   strings.Split(getEnv("ALLOWED_ORIGINS", "http://localhost:3000"), ","),
		TrustedProxies:   splitIfSet(getEnv("TRUSTED_PROXIES", "")),
		SMTPHost:         getEnv("SMTP_HOST", "smtp.gmail.com"),
		SMTPPort:         getEnv("SMTP_PORT", "587"),
		SMTPUser:         getEnv("SMTP_USER", ""),
		SMTPPassword:     getEnv("SMTP_PASSWORD", ""),
		ContactRecipient: getEnv("CONTACT_RECIPIENT_EMAIL", "yousef17453@gmail.com"),
	}
}

func splitIfSet(v string) []string {
	if v == "" {
		return nil
	}
	return strings.Split(v, ",")
}

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
