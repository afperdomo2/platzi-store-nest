import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('new')
  newEndpoint() {
    return 'Soy un nuevo endpoint';
  }

  @Get('/other/')
  otherEndpoint() {
    return 'Endpoint con slash: /other/';
  }

  // Obteniendo solo una param (id)
  @Get('users/:id')
  getUsers(@Param('id') id: string) {
    return `User #${id}`;
  }

  // Obteniendo todos los params
  @Get('products/:id')
  getProduct(@Param() params: any) {
    return `Product #${params.id}`;
  }

  @Get('categories/:id/products/:productId')
  getCategories(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ) {
    return `Category #${id} and Product #${productId}`;
  }
}
