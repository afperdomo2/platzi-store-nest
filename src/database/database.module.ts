import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';

const API_KEY = '123456789';
const API_KEY_PROD = 'ABC123$1';

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'felipe',
  password: '123456',
  database: 'platzi_store_nestjs',
});
client.connect();

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useValue: client,
    },
  ],
  exports: ['API_KEY', 'PG'],
})
export class DatabaseModule {}
