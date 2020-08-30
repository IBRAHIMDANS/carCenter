import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  app.enableCors();
  const globalPrefix = 'api';
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));
  app.setGlobalPrefix(globalPrefix);
  await app.listen(Number(process.env.PORT) || 3000);
}

bootstrap().then(() => true);
