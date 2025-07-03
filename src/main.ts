import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { configOptions } from './config';

async function bootstrap() {

  console.log('QUEUE URL:', process.env.URL_SBS_GOLDEN_CITY);
  
  // Start HTTP server
  const app = await NestFactory.create(AppModule);
  await app.listen(parseInt(process.env.PORT) || 3510);

  // Start TCP microservice in parallel
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: configOptions(),
  });

  await app.startAllMicroservices();
}

bootstrap();
