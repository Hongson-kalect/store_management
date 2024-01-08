import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
// import { InterCeptor } from './modules/utils/intercepters/intercepter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Store management API')
    .setDescription('Store management API API description')
    .setVersion('1.0')
    .addTag('PAN')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/document', app, document);

  // app.useGlobalInterceptors(new InterCeptor());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3331);
}
bootstrap();
