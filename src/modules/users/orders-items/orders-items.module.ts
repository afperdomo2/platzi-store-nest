import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsModule } from 'src/modules/products/products/products.module';
import { OrdersModule } from '../orders/orders.module';
import { OrderItem } from './entities/order-item.entity';
import { OrdersItemsController } from './orders-items.controller';
import { OrdersItemsService } from './orders-items.service';

@Module({
  imports: [
    OrdersModule,
    ProductsModule,
    TypeOrmModule.forFeature([OrderItem]),
  ],
  controllers: [OrdersItemsController],
  providers: [OrdersItemsService],
  exports: [OrdersItemsService],
})
export class OrdersItemsModule {}
