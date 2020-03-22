import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/login (POST)', () => {
        return new Promise((done) => {
            return request(app.getHttpServer())
                .post('/login')
                .send({email: 'john@test.com', password: '123'})
                .set('Accept', 'application/json')
                .expect(201, done);
        })
    });

    afterAll(async () => {
        await app.close();
    });
});
