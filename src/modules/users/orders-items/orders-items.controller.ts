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
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrdersItemsService } from './orders-items.service';

@ApiTags('orders items')
@Controller('orders-items')
export class OrdersItemsController {
  constructor(private readonly ordersItemsService: OrdersItemsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order item' })
  @ApiCreatedResponse({ description: 'Order item created successfully' })
  create(@Body() createOrdersItemDto: CreateOrderItemDto) {
    return this.ordersItemsService.create(createOrdersItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all order items' })
  findAll() {
    return this.ordersItemsService.findAll({ relations: ['product'] });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a order item' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersItemsService.findOne(id, {
      relations: ['order', 'product'],
    });
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrdersItemDto: UpdateOrderItemDto,
  ) {
    return this.ordersItemsService.update(id, updateOrdersItemDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a order item' })
  @ApiNoContentResponse({ description: 'Order item deleted successfully' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ordersItemsService.remove(id);
  }
}
