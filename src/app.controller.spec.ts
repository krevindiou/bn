import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
    let app: TestingModule;

    beforeAll(async () => {
        app = await Test.createTestingModule({
            controllers: [AppController],
        }).compile();
    });

    describe('root', () => {
        it('should return undefined', () => {
            const appController = app.get<AppController>(AppController);
            expect(appController.root()).toBe(undefined);
        });
    });
});
