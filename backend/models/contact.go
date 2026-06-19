package models

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
)

type ContactSubmission struct {
	ID        int    `json:"id"`
	Name      string `json:"name"      binding:"required,max=200"`
	Email     string `json:"email"     binding:"required,email,max=200"`
	Phone     string `json:"phone"     binding:"max=50"`
	Message   string `json:"message"   binding:"required,max=2000"`
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
