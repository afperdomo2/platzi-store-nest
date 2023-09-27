import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private repository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const newCustomer = this.repository.create(createCustomerDto);
    return await this.repository.save(newCustomer);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    const customer = await this.repository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`customer ${id} not found`);
    }
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.findOne(id);
    this.repository.merge(customer, updateCustomerDto);
    return await this.repository.save(customer);
  }

  async remove(id: number) {
    const customer = await this.findOne(id);
    return await this.repository.delete(customer);
  }
}
