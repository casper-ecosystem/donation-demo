import http from 'http';
import path from 'path';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import { AppDataSource } from './data-source';
import { config } from './config';
import fs from 'fs';
import { DonationEntity } from "./entity/donation.entity";

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
      const { limit } = req.query;
      const donationRepo = AppDataSource.getRepository(DonationEntity);
      const [items, total] = await donationRepo.findAndCount({
        order: { timestamp: 'DESC' },
        take: limit ? Number(limit) : undefined,
      });

      res.json({ total, items });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error('Database error:', message);
      res.status(500).json({ error: 'Database error', details: message });
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
