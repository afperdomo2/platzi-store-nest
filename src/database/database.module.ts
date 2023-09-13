import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';
import { ConfigType } from '@nestjs/config/dist';
import configuration from 'src/config/configuration';

const API_KEY = '123456789';
const API_KEY_PROD = 'ABC123$1';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useFactory: (config: ConfigType<typeof configuration>) => {
        const { host, port, user, password, name: database } = config.database;
        const client = new Client({
          host,
          port,
          user,
          password,
          database,
        });
        client.connect();
        return client;
      },
      inject: [configuration.KEY],
    },
  ],
  exports: ['API_KEY', 'PG'],
})
export class DatabaseModule {}
