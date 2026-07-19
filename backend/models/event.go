package models

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
)

// Max lengths match the DB columns (VARCHAR sizes in 001_init.sql) so
// validation rejects what the INSERT would refuse anyway.
type AnalyticsEvent struct {
	ID        int    `json:"id"`
	EventName string `json:"event_name" binding:"required,max=100"`
	Path      string `json:"path"       binding:"max=255"`
	Source    string `json:"source"     binding:"max=100"`
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
