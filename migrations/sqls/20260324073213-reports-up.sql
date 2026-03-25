/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_number VARCHAR(20),
    scam_type VARCHAR(50),
    amount NUMERIC,
    description TEXT,
    reported_at TIMESTAMP DEFAULT NOW()
);