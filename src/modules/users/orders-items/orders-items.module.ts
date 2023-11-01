import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BrandsService } from 'src/modules/products/brands/brands.service';
import { Brand } from 'src/modules/products/brands/entities/brand.entity';
import { CategoriesService } from 'src/modules/products/categories/categories.service';
import { Category } from 'src/modules/products/categories/entities/category.entity';
import { Product } from 'src/modules/products/products/entities/product.entity';
import { ProductsService } from 'src/modules/products/products/products.service';
import { CustomersService } from '../customers/customers.service';
import { Customer } from '../customers/entities/customer.entity';
import { Order } from '../orders/entities/order.entity';
import { OrdersService } from '../orders/orders.service';
import { OrderItem } from './entities/order-item.entity';
import { OrdersItemsController } from './orders-items.controller';
import { OrdersItemsService } from './orders-items.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderItem,
      Order,
      Product,
      Customer,
      Category,
      Brand,
    ]),
  ],
  controllers: [OrdersItemsController],
  providers: [
    OrdersItemsService,
    OrdersService,
    CustomersService,
    ProductsService,
    CategoriesService,
    BrandsService,
  ],
  exports: [OrdersItemsService, TypeOrmModule],
})
export class OrdersItemsModule {}
