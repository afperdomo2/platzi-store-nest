import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CustomersService } from '../customers/customers.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repository: Repository<User>,
    private customersService: CustomersService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    await this.validateEmailAviable(email);

    const newUser = this.repository.create(createUserDto);
    if (createUserDto.customerId) {
      const customer = await this.customersService.findOne(
        createUserDto.customerId,
      );
      newUser.customer = customer;
    }
    return await this.repository.save(newUser);
  }

  async findAll(options?: any) {
    return await this.repository.find({ ...options });
  }

  async findOne(id: number, options?: any) {
    const user = await this.repository.findOne({ where: { id }, ...options });
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
    await this.findOne(id);
    return await this.repository.delete(id);
  }

  async validateEmailAviable(email: string): Promise<any> {
    const userEmail = await this.repository.findOneBy({ email });
    if (userEmail) {
      throw new NotFoundException(`Email ${email} is already in use`);
    }
  }

  getOrdersByUser(id: number) {
    return {
      date: new Date(Date.now()),
      id,
      products: [],
    };
  }
}
