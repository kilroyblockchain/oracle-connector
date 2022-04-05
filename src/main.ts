import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(helmet());

  const PORT = process.env.APP_PORT || 5004;
  await app.listen(PORT || 5004);
  console.info(
    'Oracle Blockchain Connector',
    `Server running on 🚀 http://localhost:${PORT}`,
  );
}
bootstrap();
