import 'reflect-metadata';

import http from 'http';
import path from 'path';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import { AppDataSource } from './data-source';
import { config } from './config';
import fs from 'fs';


const app: Express = express();
app.use(cors<Request>());
app.use(express.json({ limit: '1mb' }));

const server = http.createServer(app);


async function main() {
  await AppDataSource.initialize();

  app.get('/proxy-wasm', async (_: Request, res: Response) => {
    fs.createReadStream(path.resolve(__dirname, `./resources/proxy_caller.wasm`)).pipe(res);
  });

  app.get('/health', async (_: Request, res: Response) => {
    try {
      await AppDataSource.query('SELECT 1');

      return res.status(200).json({ status: 'UP' });
    } catch (error) {
      return res.status(500).json({ status: 'DOWN', error: error.message });
    }
  });

  app.get('/donations', async (req, res) => {
    try {
      const { offset } = req.query;

      const [{ total }] = await AppDataSource.query('SELECT COUNT(*) AS total FROM donations');

      const query =
          offset === '-1'
              ? 'SELECT * FROM donations ORDER BY timestamp DESC'
              : 'SELECT * FROM donations ORDER BY timestamp DESC LIMIT 5';

      const result = await AppDataSource.query(query);
      const rows = Array.isArray(result) ? result : Object.values(result);

      res.json({
        total: Number(total),
        items: rows,
      });
    } catch (err: any) {
      console.error('❌ Database error:', err.message);
      res.status(500).json({ error: 'Database error', details: err.message });
    }
  });

  server.listen(config.httpPort, () => console.log(`Server running on http://localhost:${config.httpPort}`));
}

main();

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

async function shutdown() {
  try {
    await AppDataSource.destroy();

    process.exit(0);
  } catch (err) {
    console.log(`received error during graceful shutdown process: ${err.message}`);
    process.exit(1);
  }
}
