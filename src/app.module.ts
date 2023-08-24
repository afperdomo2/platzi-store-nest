import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products/products.controller';
import { BrandsController } from './controllers/brands/brands.controller';
import { CustomersController } from './controllers/customers/customers.controller';
import { OrdersController } from './controllers/orders/orders.controller';
import { UsersController } from './controllers/users/users.controller';
import { CategoriesController } from './controllers/categories/categories.controller';

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
  providers: [AppService],
})
export class AppModule {}
