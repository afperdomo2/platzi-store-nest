import { Injectable } from '@nestjs/common';
import { Product } from '../../entities/product.entity';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Nevera',
      description: 'Nevera 200w',
      price: 300,
      stock: 0,
      image: '',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find((product) => product.id === id);
  }

  create(payload: any) {
    this.counterId++;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: any) {
    const product = this.findOne(id);
    if (!product) {
      return null;
    }
    const index = this.products.findIndex((product) => product.id === id);
    this.products[index] = { ...product, ...payload };
    return this.products[index];
  }

  remove(id: number) {
    const index = this.products.findIndex((product) => product.id === id);
    delete this.products[index];
    return;
  }
}
