import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder().setTitle('Amaal Tracker').setDescription('Amaal Tracker API Suite').setVersion('1.0').build(); 
  const document = SwaggerModule.createDocument(app, config);
  app.setGlobalPrefix('api');
  SwaggerModule.setup('api', app, document);
  app.enableCors({
    origin: 'http://localhost:3000', 
    credentials: true
  })
  
  await app.listen(3001);
}
bootstrap();
