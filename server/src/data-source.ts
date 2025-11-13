import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from './config';
import { DonationEntity } from "./entity/donation.entity";

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  url: config.dbURI,
  synchronize: false,
  logging: false,
  supportBigNumbers: true,
  logger: 'simple-console',
  entities: [DonationEntity],
};

export const AppDataSource = new DataSource(dataSourceOptions);
