import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './swagger';
import { HttpExceptionFilter } from './shared/exceptions/filters/http-exception.filter';
import { BadRequestExceptionFilter } from './shared/exceptions/filters/bad.request.exception.filter';
import { ResourceNotFoundExceptionFilter } from './shared/exceptions/filters/resource.not.found.exception.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  app.enableCors();
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new BadRequestExceptionFilter(),
    new ResourceNotFoundExceptionFilter(),
  );
  const globalPrefix = 'api';
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new LoggingInterceptor(),
  );
  await app.listen(Number(process.env.PORT) || 3000);
}

bootstrap().then(() => true);
