import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //config validate pipe
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(8080);
}
bootstrap();
