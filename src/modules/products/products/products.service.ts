import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, Between } from 'typeorm';

import { BrandsService } from '../brands/brands.service';
import { CategoriesService } from '../categories/categories.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductsDto } from './dto/filter-products.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private repository: Repository<Product>,
    private brandService: BrandsService,
    private categoryService: CategoriesService,
  ) {}

  async create(createProduct: CreateProductDto) {
    const newProduct = this.repository.create(createProduct);
    if (createProduct.brandId) {
      const brand = await this.brandService.findOne(createProduct.brandId);
      newProduct.brand = brand;
    }
    if (createProduct.categoriesIds) {
      const categories = await this.categoryService.findByIds(
        createProduct.categoriesIds,
      );
      newProduct.categories = categories;
    }
    return await this.repository.save(newProduct);
  }

  async findAll(params: FilterProductsDto) {
    if (params) {
      const where: FindOptionsWhere<Product> = {};
      const { limit, offset, minPrice, maxPrice } = params;

      if (minPrice && maxPrice) {
        where.price = Between(minPrice, maxPrice);
      }
      return await this.repository.find({
        where,
        relations: ['brand'],
        take: limit,
        skip: offset,
      });
    }

    return await this.repository.find({ relations: ['brand'] });
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
    if (updateProduct.categoriesIds) {
      const categories = await this.categoryService.findByIds(
        updateProduct.categoriesIds,
      );
      product.categories = categories;
    }
    this.repository.merge(product, updateProduct);
    return await this.repository.save(product);
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.repository.delete(id);
  }

  async addCategoryToProduct(productId: number, categoryId: number) {
    const product = await this.findOne(productId, {
      relations: ['categories'],
    });
    const category = await this.categoryService.findOne(categoryId);
    product.categories.push(category);
    return this.repository.save(product);
  }

  async removeCategoryToProduct(productId: number, categoryId: number) {
    const product = await this.findOne(productId, {
      relations: ['categories'],
    });
    product.categories = product.categories.filter(
      ({ id }) => id !== categoryId,
    );
    return this.repository.save(product);
  }
}
