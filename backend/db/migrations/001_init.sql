-- Run this once to set up the database schema.
-- Execute with: psql -U postgres -d sonic_db -f db/migrations/001_init.sql

CREATE TABLE IF NOT EXISTS contact_submissions (
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(120) NOT NULL,
    email      VARCHAR(255) NOT NULL,
    phone      VARCHAR(30),
    message    TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS analytics_events (
    id         SERIAL PRIMARY KEY,
    event_name VARCHAR(100) NOT NULL,
    path       VARCHAR(255),
    source     VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
