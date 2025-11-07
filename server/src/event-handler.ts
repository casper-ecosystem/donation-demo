import 'reflect-metadata';
import { config } from './config';
import WebSocket from 'ws';
import { DonationEventPayload, Event } from './events';
import { v4 as uuidv4 } from "uuid";
import { AppDataSource } from "./data-source";

async function main() {

  await AppDataSource.initialize();

  const ws = new WebSocket(
      `${config.csprCloudStreamingUrl}/contract-events?contract_package_hash=${config.donationContractPackageHash}`,
      {
        headers: {
          authorization: config.csprCloudAccessKey,
        },
      },
  );

  ws.on('open', () => {
    console.log(`Connected to streaming API: ${config.csprCloudStreamingUrl}`);
  })

  let lastPingTimestamp = new Date();

  setInterval(() => {
    const now = new Date();
    if (now.getTime() - lastPingTimestamp.getTime() > config.pingCheckIntervalInMilliseconds) {
      console.log(`No ping events from Streaming API for ${config.pingCheckIntervalInMilliseconds/1000} seconds, closing ws connection...`);
      ws.close();
      process.exit(1);
    }
  }, config.pingCheckIntervalInMilliseconds);

  ws.on('message', async (data: Buffer) => {
    const rawData = data.toString();

    if (rawData === 'Ping') {
      lastPingTimestamp = new Date();
      return;
    }

    try {
      console.log('New event: ', rawData);

      // const event = JSON.parse(rawData) as Event<DonationEventPayload>;
      const event = JSON.parse(rawData);

      console.log('Event -> ',event);

      const id = uuidv4();
      const rawTimestamp = event.timestamp;
      const timestamp = new Date(rawTimestamp).toISOString().slice(0, 19).replace('T', ' ');

      await AppDataSource.query(
          'INSERT INTO donations (id, sender_public_key, amount_cspr, message, transaction_hash, timestamp) VALUES (?, ?, ?, ?, ?, ?)',
          [id, event.data.data.sender, event.data.data.amount, event.data.data.praise, event.extra.deploy_hash, timestamp],
      );
    } catch (err) {
      console.log('Error parsing message:', err);
    }
  });

  ws.on('error', (err) => {
    console.log(`Received a WS error: ${err.message}`);
    ws.close();
    console.log('Disconnected from Streaming API');
    process.exit(1);
  })

  ws.on('close', () => {
    console.log('Disconnected from Streaming API');
    process.exit(1);
  });

  console.log('Handler started running...')
}

main();
