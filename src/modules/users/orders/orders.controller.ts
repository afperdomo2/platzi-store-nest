import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiCreatedResponse({ description: 'Category created successfully' })
  create(@Body() createOrder: CreateOrderDto) {
    return this.ordersService.create(createOrder);
  }

  @Get()
  @ApiOperation({ summary: 'List all orders' })
  findAll() {
    return this.ordersService.findAll({ relations: ['customer'] });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a order' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id, {
      relations: ['customer', 'items', 'items.product'],
    });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Update order data' })
  @ApiNoContentResponse({ description: 'Order updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrder: UpdateOrderDto,
  ) {
    return this.ordersService.update(id, updateOrder);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a order' })
  @ApiNoContentResponse({ description: 'Order deleted successfully' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.remove(id);
  }
}
