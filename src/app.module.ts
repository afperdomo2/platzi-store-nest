import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsParentModule } from './modules/products/products.module';
import { UsersParentModule } from './modules/users/users.module';

@Module({
  imports: [ProductsParentModule, UsersParentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
