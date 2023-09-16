import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config/dist';
import { lastValueFrom } from 'rxjs';

import { enviroments } from './enviroments';
import configuration from './config/configuration';
import databaseConfig from './config/database.config';
import schemaConfig from './config/schema.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsGroupModule } from './modules/products/products.module';
import { UsersGroupModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';
import { ExampleModule } from './example.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [configuration, databaseConfig],
      isGlobal: true,
      validationSchema: schemaConfig,
    }),
    HttpModule,
    ProductsGroupModule,
    UsersGroupModule,
    DatabaseModule,
    ExampleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'REMOTE_TASKS',
      useFactory: async (http: HttpService) => {
        const request = http.get('https://jsonplaceholder.typicode.com/todos');
        const tasks = await lastValueFrom(request);
        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
