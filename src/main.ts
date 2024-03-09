import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { graphqlUploadExpress } from 'graphql-upload-minimal';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.use(graphqlUploadExpress({ maxFiles: 10, maxFileSize: 10_000_000 }));

  app.enableCors();

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}

bootstrap();
