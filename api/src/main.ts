import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import AppModule from './app.module';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule, { cors: true });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        }),
    );

    const options = new DocumentBuilder().setTitle('BN API').setVersion('0.0').build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('specs', app, document);

    await app.listen(8080);
}
bootstrap();
