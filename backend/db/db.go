package db

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
)

// Connect creates a connection pool to PostgreSQL.
// A pool means Go keeps several DB connections open and reuses them,
// so we don't pay the cost of opening a new connection on every request.
func Connect(dsn string) (*pgxpool.Pool, error) {
	pool, err := pgxpool.New(context.Background(), dsn)
	if err != nil {
		return nil, fmt.Errorf("could not connect to database: %w", err)
	}

	// Ping once to confirm the connection actually works at startup
	if err := pool.Ping(context.Background()); err != nil {
		return nil, fmt.Errorf("database ping failed: %w", err)
	}

	return pool, nil
}
