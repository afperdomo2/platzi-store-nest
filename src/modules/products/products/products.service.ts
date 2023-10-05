import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BrandsService } from '../brands/brands.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private repository: Repository<Product>,
    private brandService: BrandsService,
  ) {}

  async create(createProduct: CreateProductDto) {
    const newProduct = this.repository.create(createProduct);
    if (createProduct.brandId) {
      const brand = await this.brandService.findOne(createProduct.brandId);
      newProduct.brand = brand;
    }
    return await this.repository.save(newProduct);
  }

  async findAll(options?: any) {
    return await this.repository.find({ ...options });
  }

  async findOne(id: number, options?: any) {
    const product = await this.repository.findOne({
      where: { id },
      ...options,
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProduct: UpdateProductDto) {
    const product = await this.findOne(id);
    if (updateProduct.brandId) {
      const brand = await this.brandService.findOne(updateProduct.brandId);
      product.brand = brand;
    }
    this.repository.merge(product, updateProduct);
    return await this.repository.save(product);
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.repository.delete(id);
  }
}
