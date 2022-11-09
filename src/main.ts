import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as http from 'http';
import * as https from 'https';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  const privateKey = fs.readFileSync('../privkey.pem', 'utf8');
  const certificate = fs.readFileSync('../fullchain.pem', 'utf8');
  const httpsOptions = { key: privateKey, cert: certificate };

  const server = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );
  await app.init();

  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('TriPlanner API')
    .setDescription(
      'API for triplanner platform.<br>Roles:<br> - USER: default role. Able to search info for trip<br> - MODERATOR: able to update some info <br> - ADMIN: able to get all tickets, users, get all hotel rooms etc<br> Auth: <br>- role auth (jwt as bearer token)',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  http.createServer(server).listen(3000);
  https.createServer(httpsOptions, server).listen(443);
}
bootstrap();
