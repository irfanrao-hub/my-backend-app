import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3020;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors();

  // app.use(cookieParser());
app.enableCors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
});
  
  await app.listen(port);
  console.log(`🚀 NEST Backend Started on: http://localhost:${port}`);
}
bootstrap();
