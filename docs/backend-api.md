# Building the Server: REST API + CSPR.cloud Event Listener

This section explains how to build a **generic Node.js backend** for any Casper dApp that:

- Listens to **smart contract events** in real time using **CSPR.cloud Streaming API**
- Stores those events in a **relational database** (for example, MySQL) for fast querying
- Exposes a **REST API** that your frontend can use to fetch indexed data

Nothing in this tutorial is tied to a specific project or use case — you can adapt it to **any** contract that emits CES-compatible events.

---

## 1. High-Level Architecture

```text
Casper Network → CSPR.cloud Streaming → Event Listener → Database ← REST API ← Frontend
```

- **CSPR.cloud** indexes events emitted by your smart contract.
- The **Event Listener** connects to CSPR.cloud’s streaming endpoint via WebSocket and receives contract events as JSON.
- Each event is **parsed and transformed** into a database row (for example, `contract_events`).
- The **REST API** reads from the database and serves JSON responses to your client applications.

---

## 2. Prerequisites

You’ll need:

- Node.js v18+ (LTS)
- npm / pnpm / yarn
- MySQL 8+ (or another database supported by TypeORM)
- A deployed **Casper smart contract** that emits CES-compatible events
- A **CSPR.cloud** account and:
  - **API URL** (e.g. `https://api.testnet.cspr.cloud`)
  - **Streaming URL** (e.g. `wss://streaming.testnet.cspr.cloud`)
  - **Access key**
- The **contract package hash** of your smart contract

---

## 3. Project Setup

Create a new backend project:

```bash
mkdir my-casper-backend
cd my-casper-backend
npm init -y
```

Install dependencies:

```bash
npm install express cors dotenv ws typeorm mysql2 axios uuid
npm install --save-dev typescript ts-node-dev @types/node @types/express @types/ws
```

Initialize TypeScript:

```bash
npx tsc --init
```

Create the source structure:

```bash
mkdir -p src/entity src/cspr-cloud
```

---

## 4. Environment Configuration

Use a `.env` file to configure your backend:

```env
# Port for API server
HTTP_PORT=4000

# CSPR.cloud configurations
CSPR_CLOUD_URL="https://api.testnet.cspr.cloud"
CSPR_CLOUD_STREAMING_URL="wss://streaming.testnet.cspr.cloud"

# Your CSPR.cloud access key
CSPR_CLOUD_ACCESS_KEY="your-cspr-cloud-access-key"

# Contract package hash you want to listen to
CONTRACT_PACKAGE_HASH=aaaaaaaa...bbbbbbbb   # replace with your package hash

# Database connection string
DB_URI=mysql://user:password@localhost:3306/my_casper_db

TZ=UTC
```

Then create `src/config.ts`:

```ts
import * as process from 'process';
import dotenv from 'dotenv';

dotenv.config();

interface Config {
  httpPort: number;
  csprCloudApiUrl: string;
  csprCloudStreamingUrl: string;
  csprCloudAccessKey: string;
  contractPackageHash: string;
  dbURI: string;
  pingCheckIntervalInMilliseconds: number;
}

export const config: Config = {
  httpPort: process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT, 10) : 4000,
  csprCloudApiUrl: process.env.CSPR_CLOUD_URL as string,
  csprCloudStreamingUrl: process.env.CSPR_CLOUD_STREAMING_URL as string,
  csprCloudAccessKey: process.env.CSPR_CLOUD_ACCESS_KEY as string,
  contractPackageHash: process.env.CONTRACT_PACKAGE_HASH as string,
  dbURI: process.env.DB_URI as string,
  pingCheckIntervalInMilliseconds: 60_000
};
```

---

## 5. Database Setup and Entity

You can store raw events, processed events, or both.  
A simple **generic model** is to store:

- Event ID (internal)
- Event name
- Contract package hash
- Payload (as JSON)
- Deploy hash
- Timestamp

### 5.1 TypeORM Data Source

Create `src/data-source.ts`:

```ts
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from './config';
import { ContractEventEntity } from './entity/contract-event.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  url: config.dbURI,
  synchronize: false, // use migrations in production
  logging: false,
  supportBigNumbers: true,
  entities: [ContractEventEntity]
};

export const AppDataSource = new DataSource(dataSourceOptions);
```

### 5.2 Generic Contract Event Entity

Create `src/entity/contract-event.entity.ts`:

```ts
import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('contract_events')
export class ContractEventEntity {
  @PrimaryColumn({ type: 'varchar' })
  id: string; // internal unique ID (e.g. UUID)

  @Column({ type: 'varchar' })
  sender_public_key: string;

  @Column({ type: 'varchar' })
  amount_cspr: string;

  @Column({ type: 'varchar' })
  message: string;

  @Column({ type: 'varchar' })
  transaction_hash: any; // full event payload (flexible)

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}
```

### 5.3 Database Table Schema (MySQL)

Example table:

```sql
CREATE TABLE contract_events (
  id VARCHAR(64) PRIMARY KEY,
  sender_public_key VARCHAR(100) NOT NULL,
  amount_cspr VARCHAR(100) NOT NULL,
  message VARCHAR(100) NOT NULL,
  transaction_hash VARCHAR(100) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

You can extend this table with additional columns if your dApp needs structured fields (e.g. `actor`, `value`, `token_id`, etc.).

---

## 6. Event Types for CSPR.cloud Streaming

CSPR.cloud Streaming sends JSON messages representing contract events.  
Define TypeScript types to keep your code clear and type-safe.

Create `src/events.ts`:

```ts
// Flexible payload for any event
export interface GenericEventPayload {
  [key: string]: any;
}

// Generic wrapper describing the structure sent by CSPR.cloud
export interface ContractEvent<TPayload = GenericEventPayload> {
  action: string;
  data: {
    contract_package_hash: string;
    contract_hash: string;
    name: string;   // event name from contract (e.g., "my_event")
    data: TPayload; // decoded CES event payload
  };
  extra: {
    deploy_hash: string;
    event_id: number;
    transform_id: number;
  };
  timestamp: string;
}
```

If you know your event schema, you can define a more specific payload type and plug it in as `ContractEvent<MyPayload>`.

---

## 7. Event Listener with CSPR.cloud Streaming (Generic)

Your **Event Listener** is a long-running Node.js process that:

1. Connects to **CSPR.cloud Streaming API** using WebSocket
2. Subscribes to events for a specific `contract_package_hash`
3. Receives JSON messages for each new on-chain event
4. Maps them to `ContractEventEntity`
5. Stores them in the database

Conceptually:

```text
Smart Contract → emits event
       ↓
Casper Network → execution results
       ↓
CSPR.cloud → indexes the event
       ↓
Your Event Listener → subscribes / processes / stores
```

### 7.1 Implementing the Event Listener

Create `src/event-handler.ts`:

```ts
import WebSocket from 'ws';
import { v4 as uuidv4 } from 'uuid';
import { config } from './config';
import { AppDataSource } from './data-source';
import { ContractEvent, GenericEventPayload } from './events';
import { ContractEventEntity } from './entity/contract-event.entity';

async function main() {
  // 1. Initialize DB connection
  await AppDataSource.initialize();

  // 2. Open WebSocket connection to CSPR.cloud Streaming
  const ws = new WebSocket(
    `${config.csprCloudStreamingUrl}/contract-events?contract_package_hash=${config.contractPackageHash}`,
    {
      headers: {
        authorization: config.csprCloudAccessKey
      }
    }
  );

  ws.on('open', () => {
    console.log('Connected to CSPR.cloud Streaming API');
  });

  // 3. Handle incoming messages
  ws.on('message', async (data: Buffer) => {
    const rawData = data.toString();

    // CSPR.cloud sends "Ping" messages to keep the connection alive
    if (rawData === 'Ping') {
      // You can track last ping time if needed
      return;
    }

    try {
      const event = JSON.parse(rawData) as ContractEvent<GenericEventPayload>;

      console.log(
        `Received event "${event.data.name}" from package ${event.data.contract_package_hash} at ${event.timestamp}`
      );

      // Map the event to DB entity
      const entity = new ContractEventEntity();
      entity.id = uuidv4();
      entity.event_name = event.data.name;
      entity.contract_package_hash = event.data.contract_package_hash;
      entity.deploy_hash = event.extra.deploy_hash;
      entity.payload = event.data.data;

      await AppDataSource.getRepository(ContractEventEntity).save(entity);
    } catch (error) {
      console.error('Error processing event:', error);
    }
  });

  // 4. Handle errors and close
  ws.on('error', (err) => {
    console.error('Streaming API error:', err);
    // In production, implement reconnection instead of exit
    process.exit(1);
  });

  ws.on('close', () => {
    console.log('Disconnected from Streaming API');
    // In production, implement reconnection instead of exit
    process.exit(1);
  });

  console.log('Event listener started...');
}

main().catch((err) => {
  console.error('Fatal error in event listener:', err);
  process.exit(1);
});
```

### 7.2 Handling Ping & Connection Health (Optional)

CSPR.cloud periodically sends `"Ping"` messages. You can track them for connection health:

```ts
let lastPingTimestamp = new Date();

ws.on('message', (data: Buffer) => {
  const rawData = data.toString();

  if (rawData === 'Ping') {
    lastPingTimestamp = new Date();
    return;
  }

  // handle real events...
});
```

You can then have a timer that checks `Date.now() - lastPingTimestamp` and reconnects if it exceeds a threshold.

### 7.3 Reconnection Strategy (Recommended for Production)

Instead of simply exiting on `error` or `close`, implement reconnection with backoff:

```ts
let backoff = 1000;

function startListener() {
  const ws = new WebSocket(
    `${config.csprCloudStreamingUrl}/contract-events?contract_package_hash=${config.contractPackageHash}`,
    {
      headers: { authorization: config.csprCloudAccessKey }
    }
  );

  ws.on('open', () => {
    console.log('Connected to Streaming API');
    backoff = 1000; // reset backoff
  });

  ws.on('close', () => {
    console.log('Disconnected from Streaming API, retrying...');
    setTimeout(startListener, backoff);
    backoff = Math.min(backoff * 2, 60_000);
  });

  ws.on('error', (err) => {
    console.error('Streaming error:', err);
    ws.close();
  });

  ws.on('message', async (data: Buffer) => {
    // same message handling as before
  });
}

// Initialize DB then start
AppDataSource.initialize()
  .then(startListener)
  .catch((err) => {
    console.error('Failed to initialize DB:', err);
    process.exit(1);
  });
```

---

## 8. Optional: CSPR.cloud REST Client

You may also need to call **CSPR.cloud REST API** for additional data (accounts, transactions, etc).

Create `src/cspr-cloud/api-client.ts`:

```ts
import axios from 'axios';

interface ErrorResponse {
  code: string;
  message: string;
  description: string;
}

export interface Response<T> {
  data?: T;
  error?: ErrorResponse;
}

export class CSPRCloudAPIClient {
  private client;

  constructor(url: string, accessKey: string) {
    this.client = axios.create({
      baseURL: url,
      headers: { authorization: accessKey }
    });
  }

  async getAccount(accountIdentifier: string): Promise<Response<any>> {
    const accHash = accountIdentifier.replace('account-hash-', '');
    const response = await this.client.get<Response<any>>(`/accounts/${accHash}`);
    return response.data;
  }
}
```

You can plug this into your event listener or REST API to enrich or validate data.

---

## 9. Building the REST API

Now create a minimal **Express** API that exposes your indexed events.

Create `src/api.ts`:

```ts
import http from 'http';
import cors from 'cors';
import express, { Express } from 'express';
import { AppDataSource } from './data-source';
import { config } from './config';
import { ContractEventEntity } from './entity/contract-event.entity';

const app: Express = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

const server = http.createServer(app);

async function main() {
  await AppDataSource.initialize();

  // Health check
  app.get('/api/health', async (_req, res) => {
    try {
      await AppDataSource.query('SELECT 1');
      return res.status(200).json({ status: 'UP' });
    } catch (error: any) {
      return res.status(500).json({ status: 'DOWN', error: error.message });
    }
  });

  // List events (with optional limit and event name filter)
  app.get('/events', async (req, res) => {
    try {
      const limit = parseInt((req.query.limit as string) || '50', 10);
      const eventName = req.query.name as string | undefined;

      const repo = AppDataSource.getRepository(ContractEventEntity);

      const where = eventName ? { event_name: eventName } : {};

      const [items, total] = await repo.findAndCount({
        where,
        order: { timestamp: 'DESC' },
        take: limit
      });

      return res.json({ items, total });
    } catch (error: any) {
      console.error('Error fetching events:', error);
      return res.status(500).json({ error: error.message });
    }
  });

  server.listen(config.httpPort, () => {
    console.log(`API listening on port ${config.httpPort}`);
  });
}

main().catch((err) => {
  console.error('Fatal API error:', err);
  process.exit(1);
});
```

Now your frontend (or any client) can call:

- `GET /api/health` – to check server status
- `GET /events?limit=20` – to fetch the latest events
- `GET /events?name=my_event` – to filter by event name

---

## 10. Running the Services

You usually run **two processes**:

1. **Event Listener** – subscribes to CSPR.cloud streaming and writes to DB
2. **REST API** – serves data from DB over HTTP

Add scripts to `package.json`:

```json
{
  "scripts": {
    "api": "ts-node-dev src/api.ts",
    "events": "ts-node-dev src/event-handler.ts"
  }
}
```

Run them:

```bash
npm run events
npm run api
```

Expected logs:

```text
Connected to CSPR.cloud Streaming API
Event listener started...
Received event "my_event" from package <hash> at 2025-01-01T12:34:56Z
API listening on port 4000
```

---

## 11. Summary

You now have a **fully generic backend pattern** for Casper dApps:

- **CSPR.cloud Streaming → Event Listener → Database**
- **Database → REST API → Frontend**

This setup lets you:

- Index arbitrary on-chain events in real time
- Keep blockchain complexity out of your frontend
- Build higher-level features (sorting, pagination, analytics, dashboards)
- Reuse the same architecture across many different contracts and dApps

To adapt this to your project:

- Customize the **payload type** and **entity fields** to match your contract events.
- Extend the REST API with domain-specific endpoints (e.g. `/positions`, `/orders`, `/votes`).
- Add authentication/authorization if needed.

This is a solid starting point for any **event-driven Casper application backend**.
