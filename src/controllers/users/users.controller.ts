import { Controller, Get, Post, Body, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get(':id')
  getOne(@Param('id') id: string) {
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
}