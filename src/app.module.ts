import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrandsController } from './controllers/brands.controller';
import { CategoriesController } from './controllers/categories.controller';
import { CustomersController } from './controllers/customers.controller';
import { OrdersController } from './controllers/orders.controller';
import { ProductsController } from './controllers/products.controller';
import { UsersController } from './controllers/users.controller';
import { BrandsService } from './services/brands.service';
import { CategoriesService } from './services/categories.service';
import { CustomersService } from './services/customers.service';
import { OrdersService } from './services/orders.service';
import { ProductsService } from './services/products.service';
import { UsersService } from './services/users.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    ProductsController,
    BrandsController,
    CustomersController,
    OrdersController,
    UsersController,
    CategoriesController,
  ],
  providers: [
    AppService,
    ProductsService,
    CustomersService,
    UsersService,
    BrandsService,
    CategoriesService,
    OrdersService,
  ],
})
export class AppModule {}
