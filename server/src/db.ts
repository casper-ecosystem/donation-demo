import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export const connectToDb = async () => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT),
    });

    await connection.query(`
    CREATE TABLE IF NOT EXISTS donations (
      id VARCHAR(36) PRIMARY KEY,
      sender_public_key VARCHAR(255),
      amount_cspr DECIMAL(10, 2),
      message TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      transaction_hash VARCHAR(255)
    )
  `);

    console.log('✅ Connected to MySQL and ensured table exists');
    return connection; // ✅ return the db instance
};
