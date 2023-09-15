import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private repository: Repository<Product>,
  ) {}

  async create(createProduct: CreateProductDto) {
    const newProduct = this.repository.create(createProduct);
    return await this.repository.save(newProduct);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    const product = await this.repository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProduct: UpdateProductDto) {
    const product = await this.findOne(id);
    this.repository.merge(product, updateProduct);
    return await this.repository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    return await this.repository.delete(product);
  }
}
