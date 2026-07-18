package handlers

import (
	"context"
	"os"
	"path/filepath"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

// Tests run against a real Postgres — the same engine production uses —
// in a dedicated sonic_test database that is created on first run.
// Set TEST_DATABASE_URL to override; tests skip if no server is reachable.
const defaultTestDSN = "postgres://postgres:postgres@localhost:5432/sonic_test?sslmode=disable"
const defaultAdminDSN = "postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable"

func TestMain(m *testing.M) {
	gin.SetMode(gin.TestMode)
	os.Exit(m.Run())
}

func testPool(t *testing.T) *pgxpool.Pool {
	t.Helper()
	ctx := context.Background()

	dsn := os.Getenv("TEST_DATABASE_URL")
	if dsn == "" {
		dsn = defaultTestDSN
	}

	pool, err := pgxpool.New(ctx, dsn)
	if err == nil {
		err = pool.Ping(ctx)
	}
	if err != nil {
		// The test database may simply not exist yet — create it once.
		if pool != nil {
			pool.Close()
		}
		admin, aerr := pgxpool.New(ctx, defaultAdminDSN)
		if aerr != nil || admin.Ping(ctx) != nil {
			t.Skipf("no reachable Postgres for tests (set TEST_DATABASE_URL): %v", err)
		}
		_, _ = admin.Exec(ctx, "CREATE DATABASE sonic_test")
		admin.Close()

		pool, err = pgxpool.New(ctx, dsn)
		if err == nil {
			err = pool.Ping(ctx)
		}
		if err != nil {
			t.Skipf("could not connect to sonic_test: %v", err)
		}
	}
	t.Cleanup(pool.Close)

	// Schema is idempotent (CREATE TABLE IF NOT EXISTS); start each test clean.
	migration, err := os.ReadFile(filepath.Join("..", "db", "migrations", "001_init.sql"))
	if err != nil {
		t.Fatalf("read migration: %v", err)
	}
	if _, err := pool.Exec(ctx, string(migration)); err != nil {
		t.Fatalf("apply migration: %v", err)
	}
	if _, err := pool.Exec(ctx, "TRUNCATE contact_submissions, analytics_events RESTART IDENTITY"); err != nil {
		t.Fatalf("truncate: %v", err)
	}
	return pool
}

func countRows(t *testing.T, pool *pgxpool.Pool, table string) int {
	t.Helper()
	var n int
	if err := pool.QueryRow(context.Background(), "SELECT count(*) FROM "+table).Scan(&n); err != nil {
		t.Fatalf("count %s: %v", table, err)
	}
	return n
}
