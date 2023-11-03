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
  Query,
  Res,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ParseIdPipe } from '../../../common/parse-id/parse-id.pipe';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductsDto } from './dto/filter-products.dto';
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
  @ApiOperation({ summary: 'Create a new product' })
  @ApiCreatedResponse({ description: 'Product created successfully' })
  create(@Body() createProduct: CreateProductDto) {
    return this.productsService.create(createProduct);
  }

  @Get()
  @ApiOperation({ summary: 'List all products' })
  findAll(@Query() params: FilterProductsDto) {
    return this.productsService.findAll(params);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a product' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id, {
      relations: ['brand', 'categories'],
    });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Update product data' })
  @ApiNoContentResponse({ description: 'Product updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProduct: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProduct);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a product' })
  @ApiNoContentResponse({ description: 'Product deleted successfully' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  @Patch(':id/category/:categoryId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Add a category to product' })
  @ApiNoContentResponse({ description: 'Category added successfully' })
  addCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsService.addCategoryToProduct(id, categoryId);
  }

  @Delete(':id/category/:categoryId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a category to product' })
  @ApiNoContentResponse({ description: 'Category deleted successfully' })
  removeCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsService.removeCategoryToProduct(id, categoryId);
  }
}
