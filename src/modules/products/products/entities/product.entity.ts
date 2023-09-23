import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

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
}
