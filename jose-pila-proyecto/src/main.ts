import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

async function bootstrap() {
  const app: any = await NestFactory.create(AppModule);
  app.use(express.static('publico'));
  app.use(cookieParser('Este es un texto'));
  app.use(
    session({
      name: 'server-session-id',
      secret: 'Es un texto',
      resave: true,
      saveUninitialized: true,
      cookie: { secure: false },
      store: new FileStore(),
    }),
  );
  app.set('view engine', 'ejs');

  await app.listen(3000);
}
bootstrap();
