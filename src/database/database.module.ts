import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config/dist';
import { TypeOrmModule } from '@nestjs/typeorm';

import databaseConfig from 'src/config/database.config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [databaseConfig.KEY],

      useFactory: async (
        dbConfig: ConfigType<typeof databaseConfig>,
      ): Promise<any> => {
        const { databaseType } = dbConfig;
        const { host, port, user, password, database } = dbConfig[databaseType];
        return {
          type: databaseType,
          host,
          port,
          username: user,
          password,
          database,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
