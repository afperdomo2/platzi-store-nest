import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private repository: Repository<Category>,
  ) {}

  async create(createCategory: CreateCategoryDto) {
    const newCategory = this.repository.create(createCategory);
    return await this.repository.save(newCategory);
  }

  async findAll(options?: any) {
    return await this.repository.find({ ...options });
  }

  async findOne(id: number, options?: any) {
    const category = await this.repository.findOne({
      where: { id },
      ...options,
    });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  async findByIds(ids: number[]) {
    return await this.repository.findBy({ id: In([...ids]) });
  }

  async update(id: number, updateCategory: UpdateCategoryDto) {
    const category = await this.findOne(id);
    this.repository.merge(category, updateCategory);
    return await this.repository.save(category);
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.repository.delete(id);
  }
}
