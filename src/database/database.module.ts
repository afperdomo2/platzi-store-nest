import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config/dist';
import configuration from 'src/config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [configuration.KEY],
      useFactory: (config: ConfigType<typeof configuration>) => {
        const { host, port, user, password, name: database } = config.database;
        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database,
        };
      },
    }),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
