"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(express.static('publico'));
    app.use(cookieParser('Este es un texto'));
    app.use(session({
        name: 'server-session-id',
        secret: 'Es un texto',
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false },
        store: new FileStore(),
    }));
    app.set('view engine', 'ejs');
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map