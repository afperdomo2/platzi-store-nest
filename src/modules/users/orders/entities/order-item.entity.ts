// import { Product } from 'src/modules/products/products/entities/product.entity';
// import {
//   Column,
//   CreateDateColumn,
//   Entity,
//   ManyToOne,
//   PrimaryGeneratedColumn,
//   UpdateDateColumn,
// } from 'typeorm';
// import { Order } from './order.entity';

// @Entity({ name: 'orders_items' })
// export class OrderItem {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToOne(() => Order, ({ items }) => items)
//   order: Order;

//   @ManyToOne(() => Product)
//   product: Product;

//   @Column('int')
//   quantity: number;

//   @CreateDateColumn()
//   createdAt: Date;

//   @UpdateDateColumn()
//   updatedAt: Date;
// }
