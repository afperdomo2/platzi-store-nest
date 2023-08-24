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
