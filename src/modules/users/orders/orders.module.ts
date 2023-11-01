import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomersService } from '../customers/customers.service';
import { Customer } from '../customers/entities/customer.entity';
import { OrderItem } from '../orders-items/entities/order-item.entity';
import { Order } from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Customer, OrderItem])],
  controllers: [OrdersController],
  providers: [OrdersService, CustomersService],
  exports: [OrdersService, TypeOrmModule],
})
export class OrdersModule {}
