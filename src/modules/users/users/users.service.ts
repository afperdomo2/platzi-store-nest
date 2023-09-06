import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Order } from '../orders/entities/order.entity';
import { ProductsService } from 'src/modules/products/products/products.service';

@Injectable()
export class UsersService {
  constructor(
    private productService: ProductsService,
    private configService: ConfigService,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DB_NAME');
    console.info(apiKey, dbName);
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  getOrdersByUser(id: number): Order {
    return {
      date: new Date(Date.now()),
      user: { id },
      products: this.productService.findAll(),
    };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
