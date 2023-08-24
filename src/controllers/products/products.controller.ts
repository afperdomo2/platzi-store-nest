import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpStatus,
  HttpCode,
  Res,
} from '@nestjs/common';

import { Response } from 'express';

@Controller('products')
export class ProductsController {
  @Post('validate')
  validate(@Res() response: Response) {
    // Realiza una respuesta manual con Express
    response.status(202).send({
      message: 'Validado correctamente',
    });
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return {
      message: `Obtener #${id}`,
    };
  }

  @Get()
  getAll(
    @Query('limit') limit: number = 100, // Valor por defecto
    @Query('offset') offset = 0, // Con el valor por defecto se puede inferir el tipo (number)
    @Query('brand') brand: string,
  ) {
    return {
      message: `Products (Marca: ${brand}), limit=>${limit}, offset=>${offset}`,
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
