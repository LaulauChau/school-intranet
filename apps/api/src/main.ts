import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const { CLIENT_URL, SERVER_PORT } = process.env;
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: CLIENT_URL,
  });
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  await app.listen(Number(SERVER_PORT));
}

bootstrap();
