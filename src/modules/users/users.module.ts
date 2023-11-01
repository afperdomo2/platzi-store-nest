import { Module } from '@nestjs/common';

import { CustomersModule } from './customers/customers.module';
import { OrdersItemsModule } from './orders-items/orders-items.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CustomersModule, UsersModule, OrdersModule, OrdersItemsModule],
})
export class UsersGroupModule {}
