import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Brand } from '../../brands/entities/brand.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column('varchar', { length: 255 })
  name: string;

  @Column('text')
  description: string;

  @Column('numeric')
  price: number;

  @Column('int')
  stock: number;

  @Column('varchar', { length: 255 })
  image: string;

  @ManyToOne(() => Brand, ({ products }) => products, { nullable: false })
  brand: Brand;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Category, ({ products }) => products)
  @JoinTable({ name: 'products_categories' })
  categories: Category[];
}
