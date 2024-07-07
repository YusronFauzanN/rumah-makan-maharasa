import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const url = process.env.CORS_ORIGIN;
  const origin = url.includes(',') ? url.split(',') : url;
  app.enableCors({
    origin,
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    credentials: true,
  });
  const prefix = 'api';

  app.setGlobalPrefix(prefix);

  // Swagger
  const options = new DocumentBuilder()
    .setTitle('Lentera POS API')
    .setDescription('API for POS application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`Application running on http://localhost:${port}/${prefix}`);
}
bootstrap();
