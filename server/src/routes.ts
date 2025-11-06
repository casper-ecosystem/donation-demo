import { Router, Request, Response } from 'express';
import mysql from 'mysql2/promise';
import { v4 as uuidv4 } from 'uuid';
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = Router();
let db: mysql.Connection;

export const setDb = (connection: mysql.Connection) => {
    db = connection;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.post('/donations', async (req, res) => {
    try {
        const { sender_public_key, amount_cspr, message } = req.body;
        if (!sender_public_key || !amount_cspr) {
            return res.status(400).json({ error: 'sender_public_key and amount_cspr are required' });
        }

        const id = uuidv4();

        await db.query(
            'INSERT INTO donations (id, sender_public_key, amount_cspr, message) VALUES (?, ?, ?, ?)',
            [id, sender_public_key, amount_cspr, message || null]
        );

        res.status(201).json({ success: true, id });
    } catch (err: any) {
        console.error('❌ Database error:', err.message);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

// GET /donations — fetch all
router.get('/donations', async (_req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM donations ORDER BY timestamp DESC');
        res.json(rows);
    } catch (err: any) {
        console.error('❌ Database error:', err.message);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

router.get('/proxy-wasm', async (_: Request, res: Response) => {
    fs.createReadStream(path.resolve(__dirname, `./resources/proxy_caller.wasm`)).pipe(res);
});
export default router;
