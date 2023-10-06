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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiCreatedResponse({ description: 'Category created successfully' })
  create(@Body() createCategory: CreateCategoryDto) {
    return this.categoriesService.create(createCategory);
  }

  @Get()
  @ApiOperation({ summary: 'List all categories' })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a category' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id, { relations: ['products'] });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Update category data' })
  @ApiNoContentResponse({ description: 'Category updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategory: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategory);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a category' })
  @ApiNoContentResponse({ description: 'Category deleted successfully' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}
