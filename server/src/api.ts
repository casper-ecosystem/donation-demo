import http from 'http';
import path from 'path';
import cors from 'cors';
import express, { Express, NextFunction, Request, Response } from 'express';
import { AppDataSource } from './data-source';
import { config } from './config';
import fs from 'fs';
import { DonationEntity } from "./entity/donation.entity";

const app: Express = express();
app.use(cors<Request>());
app.use(express.json({ limit: '1mb' }));

const server = http.createServer(app);

const MAX_DONATIONS_LIMIT = 1000;

function parseLimit(value: unknown): number | null {
  if (value === undefined) {
    return MAX_DONATIONS_LIMIT;
  }
  if (typeof value !== 'string' || !/^\d+$/.test(value)) {
    return null;
  }

  const limit = Number(value);
  if (limit < 1) {
    return null;
  }

  return Math.min(limit, MAX_DONATIONS_LIMIT);
}

async function main() {
  await AppDataSource.initialize();

  app.get('/proxy-wasm', async (_: Request, res: Response) => {
    fs.createReadStream(path.resolve(__dirname, `./resources/proxy_caller.wasm`)).pipe(res);
  });

  app.get('/health', async (_: Request, res: Response) => {
    try {
      await AppDataSource.query('SELECT 1');

      return res.status(200).json({ status: 'UP' });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error('Health check failed:', message);
      return res.status(500).json({ status: 'DOWN' });
    }
  });

  app.get('/donations', async (req, res) => {
    const limit = parseLimit(req.query.limit);
    if (limit === null) {
      return res.status(400).json({
        error: 'Invalid limit',
        details: `limit must be an integer between 1 and ${MAX_DONATIONS_LIMIT}`,
      });
    }

    try {
      const donationRepo = AppDataSource.getRepository(DonationEntity);
      const [items, total] = await donationRepo.findAndCount({
        order: { timestamp: 'DESC' },
        take: limit,
      });

      res.json({ total, items });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error('Database error:', message);
      res.status(500).json({ error: 'Database error', details: 'Failed to load donations' });
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    const status = (err as { status?: number })?.status;
    const message = err instanceof Error ? err.message : String(err);

    if (status && status >= 400 && status < 500) {
      console.warn('Client error:', message);
      return res.status(status).json({ error: 'Bad request' });
    }

    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
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
