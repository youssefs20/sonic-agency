package config

import "os"

type Config struct {
	Port    string
	DSN     string // PostgreSQL connection string
	AppEnv  string
}

func Load() Config {
	return Config{
		Port:   getEnv("PORT", "8080"),
		DSN:    getEnv("DATABASE_URL", "postgres://postgres:postgres@localhost:5432/sonic_db?sslmode=disable"),
		AppEnv: getEnv("APP_ENV", "development"),
	}
}

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
