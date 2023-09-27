import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.repository.create(createUserDto);
    return await this.repository.save(newUser);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    const user = await this.repository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`user ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    this.repository.merge(user, updateUserDto);
    return await this.repository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return await this.repository.delete(user);
  }

  getOrdersByUser(id: number) {
    return {
      date: new Date(Date.now()),
      id,
      products: [],
    };
  }
}
