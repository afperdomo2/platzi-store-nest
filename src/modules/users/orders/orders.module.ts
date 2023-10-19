import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from 'src/modules/products/products/entities/product.entity';
import { Customer } from '../customers/entities/customer.entity';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Customer, OrderItem, Product])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
