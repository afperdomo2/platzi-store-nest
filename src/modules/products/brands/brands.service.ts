import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private repository: Repository<Brand>) {}

  async create(createBrandDto: CreateBrandDto) {
    const newBrand = this.repository.create(createBrandDto);
    return await this.repository.save(newBrand);
  }

  async findAll(options?: any) {
    return await this.repository.find({ ...options });
  }

  async findOne(id: number, options?: any) {
    const brand = await this.repository.findOne({ where: { id }, ...options });
    if (!brand) {
      throw new NotFoundException(`brand #${id} not found`);
    }
    return brand;
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    const brand = await this.findOne(id);
    this.repository.merge(brand, updateBrandDto);
    return await this.repository.save(brand);
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.repository.delete(id);
  }
}
