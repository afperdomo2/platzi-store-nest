import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { lastValueFrom } from 'rxjs';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import schemaConfig from './config/schema.config';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import { ExampleModule } from './example.module';
import { ProductsGroupModule } from './modules/products/products.module';
import { UsersGroupModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [configuration],
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
