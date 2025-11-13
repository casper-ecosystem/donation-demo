import { config } from './config';
import WebSocket from 'ws';
import { v4 as uuidv4 } from "uuid";
import { AppDataSource } from "./data-source";
import { CSPRCloudAPIClient } from "./cspr-cloud/api-client";
import { formatDate } from "./utils";
import { DonationEventPayload, Event } from "./events";
import { DonationEntity } from "./entity/donation.entity";

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

      const csprCloudClient = new CSPRCloudAPIClient(config.csprCloudApiUrl, config.csprCloudAccessKey);
      const event = JSON.parse(rawData) as Event<DonationEventPayload>;

      console.log('Event -> ',event);

      const account = await csprCloudClient.getAccount(event.data.data.sender);
      const senderPublicKey = account.data.public_key;

      const donationRepo = AppDataSource.getRepository(DonationEntity);

      const donation = donationRepo.create({
        id: uuidv4(),
        sender_public_key: senderPublicKey,
        amount_cspr: String(event.data.data.amount),
        message: event.data.data.praise,
        transaction_hash: event.extra.deploy_hash,
        timestamp: formatDate( event.timestamp),
      });

      await donationRepo.save(donation);
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
