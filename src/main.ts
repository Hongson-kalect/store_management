import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { InterCeptor } from './modules/utils/intercepters/intercepter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalInterceptors(new InterCeptor());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3331);
}
bootstrap();
