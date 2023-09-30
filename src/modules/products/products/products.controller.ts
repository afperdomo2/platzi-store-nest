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
  Res,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ParseIdPipe } from '../../../common/parse-id/parse-id.pipe';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('validate/:id')
  @ApiOperation({ summary: 'Valida si un producto está activo' })
  @ApiAcceptedResponse({ description: 'Validado correctamente' })
  validate(@Res() response: Response, @Param('id', ParseIdPipe) id: number) {
    // Realiza una respuesta manual con Express
    response.status(202).send({
      message: `Validado correctamente el Id ${id}`,
    });
  }

  @Post()
  @ApiCreatedResponse({ description: 'Creado correctamente' })
  create(@Body() createProduct: CreateProductDto) {
    return this.productsService.create(createProduct);
  }

  @Get()
  findAll() {
    return this.productsService.findAll({ relations: ['brand'] });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id, { relations: ['brand'] });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProduct: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProduct);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
