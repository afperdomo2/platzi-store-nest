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
  Res,
  ParseIntPipe,
} from '@nestjs/common';

import { Response } from 'express';
import { ProductsService } from '../services/products.service';
import { ParseIdPipe } from '../common/parse-id/parse-id.pipe';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post('validate/:id')
  validate(@Res() response: Response, @Param('id', ParseIdPipe) id: number) {
    // Realiza una respuesta manual con Express
    response.status(202).send({
      message: `Validado correctamente el Id ${id}`,
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Post()
  create(@Body() payload: any) {
    return this.productService.create(payload);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: any) {
    return this.productService.update(id, payload);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}
