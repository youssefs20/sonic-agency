package models

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
)

// Max lengths match the DB columns (VARCHAR sizes in 001_init.sql) so
// validation rejects what the INSERT would refuse anyway.
type ContactSubmission struct {
	ID      int    `json:"id"`
	Name    string `json:"name"    binding:"required,max=120"`
	Email   string `json:"email"   binding:"required,email,max=255"`
	Phone   string `json:"phone"   binding:"max=30"`
	Message string `json:"message" binding:"required,max=2000"`
	// Website is a honeypot: hidden on the real form, never stored. Any
	// non-empty value means a bot filled it in.
	Website   string `json:"website" binding:"max=200"`
	CreatedAt string `json:"created_at"`
}

// Save inserts a new contact submission into the database and returns the new ID.
func (c *ContactSubmission) Save(ctx context.Context, db *pgxpool.Pool) (int, error) {
	var id int
	err := db.QueryRow(ctx,
		`INSERT INTO contact_submissions (name, email, phone, message)
		 VALUES ($1, $2, $3, $4)
		 RETURNING id`,
		c.Name, c.Email, c.Phone, c.Message,
	).Scan(&id)
	return id, err
}
