import * as process from 'process';
import dotenv from 'dotenv';

dotenv.config();

interface Config {
  httpPort: number;
  csprCloudApiUrl: string;
  csprCloudStreamingUrl: string;
  csprCloudAccessKey: string;
  donationContractPackageHash: string;
  dbURI: string;
  pingCheckIntervalInMilliseconds: number;
}

export const config: Config = {
  httpPort: process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT) : 4000,
  csprCloudApiUrl: process.env.CSPR_CLOUD_URL as string,
  csprCloudStreamingUrl: process.env.CSPR_CLOUD_STREAMING_URL as string,
  csprCloudAccessKey: process.env.CSPR_CLOUD_ACCESS_KEY as string,
  donationContractPackageHash: process.env.DONATION_CONTRACT_PACKAGE_HASH as string,
  dbURI: process.env.DB_URI as string,
  pingCheckIntervalInMilliseconds: 60000,
};
