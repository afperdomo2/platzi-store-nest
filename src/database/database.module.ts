import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config/dist';
import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from 'src/config/configuration';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [configuration.KEY],

      useFactory: async (
        config: ConfigType<typeof configuration>,
      ): Promise<any> => {
        const { databaseType } = config;
        const { host, port, user, password, database } = config[databaseType];
        return {
          type: databaseType,
          host,
          port,
          username: user,
          password,
          database,
          autoLoadEntities: true,
          synchronize: false,
        };
      },
    }),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
