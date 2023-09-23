import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

config();
const configService = new ConfigService();
const DB_TYPE = configService.get('DATABASE_TYPE').toUpperCase();

const type = configService.get('DATABASE_TYPE');

const host = configService.get(`${DB_TYPE}_HOST`);
const port = configService.get(`${DB_TYPE}_PORT`);
const database = configService.get(`${DB_TYPE}_DATABASE`);
const username = configService.get(`${DB_TYPE}_USER`);
const password = configService.get(`${DB_TYPE}_PASSWORD`);

export const AppDataSource = new DataSource({
  type,
  host,
  port,
  database,
  username,
  password,

  logging: true,
  synchronize: false,

  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
});
