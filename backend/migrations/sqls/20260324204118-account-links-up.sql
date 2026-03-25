/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS account_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_number VARCHAR(20),
    linked_account VARCHAR(20),
    reason VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);