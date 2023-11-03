import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../../../products/products/entities/product.entity';
import { Order } from '../../orders/entities/order.entity';

@Entity({ name: 'orders_items' })
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, ({ items }) => items, { nullable: false })
  order: Order;

  @ManyToOne(() => Product, { nullable: false })
  product: Product;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}