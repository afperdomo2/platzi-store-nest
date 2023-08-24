import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get(':id')
  getOne(@Param('id') id: string) {
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
}
