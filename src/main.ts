import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      /**
       * Si se establece en verdadero, el validador eliminará del objeto validado,
       * cualquier propiedad que no tenga ningún decorador.
       *
       * Consejo: si ningún otro decorador es adecuado para tu propiedad, utiliza este:
       * @Allow — decorator
       */
      whitelist: true,

      /**
       * Si se establece en verdadero, en lugar de eliminar las propiedades que no
       * están en la lista blanca, el validador lanzará un error.
       */
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
