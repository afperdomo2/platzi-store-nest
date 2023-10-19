import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'customers' })
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 255 })
  lastName: string;

  @Column('varchar', { length: 255 })
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, ({ customer }) => customer, { nullable: true })
  user: User;

  @OneToMany(() => Order, ({ customer }) => customer)
  orders: Order[];
}
