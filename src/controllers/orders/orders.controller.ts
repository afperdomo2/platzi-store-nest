import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Get(':id')
  getOne(@Param('id') id: number) {
    return {
      message: `Obtener #${id}`,
    };
  }

  @Get()
  getAll() {
    return {
      message: `Listar todos`,
    };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'acción de crear',
      payload,
    };
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      message: 'acción de actualizar',
      id,
      payload,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return {
      message: 'acción de borrar',
      id,
    };
  }
}
