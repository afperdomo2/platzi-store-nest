import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from './entities/order-item.entity';
import { OrdersService } from '../orders/orders.service';
import { ProductsService } from 'src/modules/products/products/products.service';

@Injectable()
export class OrdersItemsService {
  constructor(
    @InjectRepository(OrderItem) private repository: Repository<OrderItem>,
    private orderService: OrdersService,
    private productService: ProductsService,
  ) {}

  async create(createOrdersItem: CreateOrderItemDto) {
    const { orderId, productId, quantity } = createOrdersItem;
    const order = await this.orderService.findOne(orderId);
    const product = await this.productService.findOne(productId);
    const newItem = new OrderItem();
    newItem.order = order;
    newItem.product = product;
    newItem.quantity = quantity;
    return this.repository.save(newItem);
  }

  async findAll(options?: any) {
    return this.repository.find({ ...options });
  }

  async findOne(id: number, options?: any) {
    const item = await this.repository.findOne({ where: { id }, ...options });
    if (!item) {
      throw new NotFoundException(`Order item #${id} not found`);
    }
    return item;
  }

  async update(id: number, updateOrdersItem: UpdateOrderItemDto) {
    return `This action updates a #${id} ordersItem`;
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.repository.delete(id);
  }
}
