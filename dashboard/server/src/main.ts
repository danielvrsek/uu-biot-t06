import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from 'modules/app.module';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.enableCors();

    await app.listen(PORT);
    /*  const app = await NestFactory.create(AppModule);
    await app.listen(4000); */
}
bootstrap();
