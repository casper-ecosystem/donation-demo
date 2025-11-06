-- Create the database
CREATE DATABASE IF NOT EXISTS `donation`;

-- Create the user with a password
CREATE USER 'donation'@'%' IDENTIFIED BY 'passw0rd';

-- Grant all privileges on the grambot database to the grambot user
GRANT ALL PRIVILEGES ON donation.* TO 'donation'@'%';

-- Apply the changes
FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS `donation`.`donations` (
    id VARCHAR(36) PRIMARY KEY,
    sender_public_key VARCHAR(255),
    amount_cspr DECIMAL(10, 2),
    message TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    transaction_hash VARCHAR(255),
    INDEX idx_timestamp (timestamp DESC),
    INDEX idx_transaction_hash (transaction_hash)
);