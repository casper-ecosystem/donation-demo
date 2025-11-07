import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from './config';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  url: config.dbURI,
  synchronize: false,
  logging: false,
  supportBigNumbers: true,
  logger: 'simple-console',
};

export const AppDataSource = new DataSource(dataSourceOptions);
