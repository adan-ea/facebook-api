import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prefix = '/api/v1';

  app.setGlobalPrefix(prefix);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Facebook API')
    .setDescription('The Facebook API description')
    .setVersion('1.0')
    .addTag('routes')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000, 'localhost');
  console.log(`Server running on port ${await app.getUrl()}` + prefix);
}

bootstrap();
