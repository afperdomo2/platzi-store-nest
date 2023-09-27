import { Product } from 'src/modules/products/products/entities/product.entity';

export class Order {
  date: Date;
  products: Product[];
}
