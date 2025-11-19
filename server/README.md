# Tip the Barista - Server

The server consists of two Node.js applications that work together to provide backend functionality:

1. **Event Listener** - Monitors and indexes smart contract events from the Casper blockchain into MySQL
2. **REST API** - Exposes indexed data through HTTP endpoints for the web client

## Architecture

```
Casper Blockchain → CSPR.cloud → Event Listener → MySQL Database ← REST API ← Web Client
```

The Event Listener subscribes to smart contract events via CSPR.cloud's real-time streaming API, processes them, and stores structured data in MySQL. The REST API then serves this data to the frontend application.

## Prerequisites

- **Node.js**: Version 20.12.0 or higher
- **npm**: Version 8.x or higher
- **MySQL**: Version 8.0 or higher
- **CSPR.cloud API Key**: Obtain from [CSPR.build Console](https://console.cspr.build)

### Database Setup

You can run MySQL locally or use Docker:

**Option A: Docker (Recommended for Development)**
```bash
docker compose -f ../infra/local/docker-compose.yaml up -d mysql
```

**Option B: Local MySQL Installation**
- Install MySQL 8.0+
- Create a database (e.g., `tip_barista`)
- Note your connection credentials

## Configuration

### 1. Create Environment File

Copy the example configuration:
```bash
cp .env.example .env
```

### 2. Configure Required Variables

Edit `.env` and update these essential settings:

**Smart Contract Configuration:**
```env
# Use the default testnet contract or your own deployed contract
DONATION_CONTRACT_PACKAGE_HASH=c447e9d334a710bc3e0a47cbea854c269e41637d7b9aa9d37a745596f651ed7a
```

**CSPR.cloud API Access:**
```env
# Get your access key from https://console.cspr.build
CSPR_CLOUD_ACCESS_KEY=your_access_key_here
```

**Database Connection:**
```env
# Default value for Docker setup
DB_URI="mysql://root:password@localhost:3306/donation"
```


## Installation

Install all dependencies:
```bash
npm install
```

This installs packages for both the Event Listener and REST API.


## Running the Applications

### Development Mode

**Start the Event Listener:**
```bash
npm run event-handler:dev
```

This starts the listener with auto-reload on code changes. You should see:
```
[INFO] Handler started running...
[INFO] Connected to streaming API: wss://streaming.testnet.cspr.cloud
```

**Start the REST API (in a separate terminal):**
```bash
npm run api:dev
```

Expected output:
```
[INFO] Server running on http://localhost:4000
```

## API Endpoints

Once running, the REST API provides these endpoints:

### Get All Tips
```http
GET /api/donations
```

Returns aggregated statistics.

### Health Check
```http
GET /api/health
```

Returns server status and database connectivity.

## Troubleshooting

### Database Connection Issues

**Problem**: `Error: connect ECONNREFUSED 127.0.0.1:3306`

**Solution**:
- Ensure MySQL is running: `docker compose ps` or `systemctl status mysql`
- Verify credentials in `.env` match your database setup
- Check firewall isn't blocking port 3306

### CSPR.cloud Connection Issues

**Problem**: `Error: Unauthorized - Invalid access key`

**Solution**:
- Verify `CSPR_CLOUD_ACCESS_KEY` in `.env`
- Check key is active in [CSPR.build Console](https://console.cspr.build)
- Ensure no extra whitespace in the key value

### Event Listener Not Receiving Events

**Problem**: No events being processed

**Solution**:
- Verify `DONATION_CONTRACT_PACKAGE_HASH` matches deployed contract
- Check contract has emitted events (view on [Testnet Explorer](https://testnet.cspr.live))
- Review logs for connection errors: `npm run event-handler:dev`

### Port Already in Use

**Problem**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solution**:
- Change `API_PORT` in `.env` to an available port
- Or stop the process using port 3000: `lsof -ti:3000 | xargs kill`

## Development Tips

### Watch Database Changes
```bash
# Connect to MySQL
docker exec -it tip-barista-mysql mysql -u root -p

# Use database
USE tip_barista;

# View tips
SELECT * FROM tips ORDER BY created_at DESC LIMIT 10;
```

### Test API Endpoints
```bash
# Using curl
curl http://localhost:4000/api/health

# Using httpie
http GET localhost:4000/api/health
```

## Resources

- [Casper Network](https://casper.network) - Official website
- [CSPR.build Console](https://console.cspr.build) - Developer tools access
- [CSPR.cloud Documentation](https://docs.cspr.cloud/) - API reference
- [Testnet Explorer](https://testnet.cspr.live) - View transactions and contracts
- [Odra Framework](https://github.com/odradev/odra) - Smart contract development

## Community & Support
Join [Casper Developers](https://t.me/CSPRDevelopers) Telegram channel to connect with other developers.
