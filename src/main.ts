import {NestFactory, Reflector} from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {ClassSerializerInterceptor, Logger} from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const serverConfig = config.get('server');
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({ origin: serverConfig.origin });
    logger.log(`Accepting requests from origin "${serverConfig.origin}"`);
  }

  const options = new DocumentBuilder()
      .setTitle('Malcolm movies')
      .setDescription('Movies endpoints')
      .setVersion('1.0')
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
