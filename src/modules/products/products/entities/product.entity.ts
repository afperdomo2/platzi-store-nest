import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('text')
  description: string;

  @Column('numeric')
  price: number;

  @Column('number', { default: 0 })
  stock: number;

  @Column('varchar')
  image: string;
}
