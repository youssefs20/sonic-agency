package models

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
)

type AnalyticsEvent struct {
	ID        int    `json:"id"`
	EventName string `json:"event_name" binding:"required,max=100"`
	Path      string `json:"path"       binding:"max=500"`
	Source    string `json:"source"     binding:"max=200"`
	CreatedAt string `json:"created_at"`
}

// Save inserts a tracking event into the database.
func (e *AnalyticsEvent) Save(ctx context.Context, db *pgxpool.Pool) error {
	_, err := db.Exec(ctx,
		`INSERT INTO analytics_events (event_name, path, source)
		 VALUES ($1, $2, $3)`,
		e.EventName, e.Path, e.Source,
	)
	return err
}
