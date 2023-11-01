import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CustomersService } from '../customers/customers.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private repository: Repository<Order>,
    private customerService: CustomersService,
  ) {}

  async create(createOrder: CreateOrderDto) {
    const newOrder = new Order();
    if (createOrder.customerId) {
      const { customerId } = createOrder;
      newOrder.customer = await this.customerService.findOne(customerId);
    }
    return await this.repository.save(newOrder);
  }

  async findAll(options?: any) {
    return this.repository.find({ ...options });
  }

  async findOne(id: number, options?: any) {
    const category = await this.repository.findOne({
      where: { id },
      ...options,
    });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  async update(id: number, updateOrder: UpdateOrderDto) {
    const order = await this.findOne(id);
    if (updateOrder.customerId) {
      const { customerId } = updateOrder;
      order.customer = await this.customerService.findOne(customerId);
    }
    return this.repository.save(order);
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.repository.delete(id);
  }
}
