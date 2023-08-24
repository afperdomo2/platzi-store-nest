import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

@Controller('customers')
export class CustomersController {
  @Get(':id')
  findOne(@Param('id') id: number) {
    return {
      message: `Obtener #${id}`,
    };
  }

  @Get()
  findAll() {
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
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: number) {
    return {
      message: 'acción de borrar',
      id,
    };
  }
}
