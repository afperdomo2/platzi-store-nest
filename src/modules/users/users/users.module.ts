import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomersService } from '../customers/customers.service';
import { Customer } from '../customers/entities/customer.entity';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Customer])],
  controllers: [UsersController],
  providers: [UsersService, CustomersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
