package config

import (
	"os"
	"strings"
)

type Config struct {
	Port           string
	DSN            string // PostgreSQL connection string
	AppEnv         string
	AllowedOrigins []string // frontend origins allowed to call this API
	TrustedProxies []string // reverse proxy IPs allowed to set X-Forwarded-For (nil = trust none)
}

func Load() Config {
	return Config{
		Port:           getEnv("PORT", "8080"),
		DSN:            getEnv("DATABASE_URL", "postgres://postgres:postgres@localhost:5432/sonic_db?sslmode=disable"),
		AppEnv:         getEnv("APP_ENV", "development"),
		AllowedOrigins: strings.Split(getEnv("ALLOWED_ORIGINS", "http://localhost:3000"), ","),
		TrustedProxies: splitIfSet(getEnv("TRUSTED_PROXIES", "")),
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
