import { describe, expect, test } from '@jest/globals';
import supertest from 'supertest';
import { ExpressServer } from '../../src/expressServer';
import { UserController } from "../../src/controllers/user.controller";
import { AddUsersService } from "../../src/useCases/add-users.service";
import { GetUsersService } from "../../src/useCases/get-users.service";
import { ProcessCsvFileService } from "../../src/useCases/process-csv-file.service";
import { UserRepository } from "../../src/database/repositories/user.repository";
import { AppController } from "../../src/controllers/app.controller";

describe('Given an API test e2e suit', () => {
    const serverInstance = new ExpressServer();
    let server: supertest.SuperTest<supertest.Test>;
    let port = 3001;

    let sut: UserController;
    let testRoutes: AppController;

    beforeEach(async () => {
        const repository = new UserRepository();
        const addUserService = new AddUsersService(repository);
        const getUserService = new GetUsersService(repository);
        const processCsvFileService = new ProcessCsvFileService(addUserService);
        sut = new UserController(getUserService, processCsvFileService);

        testRoutes = new AppController();

        serverInstance.setRoutes(sut.getRoutes(), '/api');
        serverInstance.setRoutes(testRoutes.getRoutes());
        serverInstance.setPort(port);
        serverInstance.start();
        server = supertest(serverInstance.getApp());
    });

    afterEach(async () => {
        serverInstance.close();
    });

    describe('When test endpoints without prefix', () => {
        test('Should return a hello world message', async () => {
            const response = await server.get('/');

            expect(response.status).toBe(200);
            expect(response.text).toBe('Hello World!');
        });

        test('Should return a hello message', async () => {
            const response = await server.get('/2');

            expect(response.status).toBe(200);
            expect(response.text).toBe('Hello!');
        });
    });

    describe('And in a user save flow', () => {
        test('Should save a list of users based on a csv file', async () => {
            const filePathMock: string = 'test/mocks/users.csv';

            const response = await server
                .post('/api/files')
                .attach('files', filePathMock)
                .set('Content-Type', 'multipart/form-data')
            ;

            expect(response.status).toBe(201);
            expect(response.text).toBe('Users created');
        });

        test('Should fail to create users if file is not a csv', async () => {
            const filePathMock: string = 'test/mocks/users.txt';

            const response = await server.post('/api/files').attach('files', filePathMock);

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('mimetype not allowed');
        })

        test('Should fail to create users if header is not multipart/form-data', async () => {
            const response = await server
                .post('/api/files')
                .set('Content-Type', 'anything')
            ;

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Content-Type must be multipart/form-data');
        });

        test('Should fail to create users if file is not sent', async () => {
            const response = await server.post('/api/files').attach('files', null as any).set('Content-Type', 'multipart/form-data;');

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('No file uploaded');
        });

        test.skip('Should fail to create users if field name is different of `files`', async () => {
            const filePathMock: string = 'test/mocks/users.csv';

            const response = await server
                .post('/api/files')
                .attach('ghfhhfhf', filePathMock)
                .set('Content-Type', 'multipart/form-data;')
            ;

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Invalid field name');
        });
    })

    describe('And in a user get flow', () => {
        beforeAll(async () => {
            const filePathMock: string = 'test/mocks/users.csv';

            await server
                .post('/api/files')
                .attach('files', filePathMock)
                .set('Content-Type', 'multipart/form-data')
            ;
        });

        test('Should return a list of users based on query params', async () => {
            const response = await server.get('/api/users?q=john');

            expect(response.status).toBe(200);
            //expect(response.body.elements).toBeInstanceOf(Array);
            expect(response.body.elements.length).toBeGreaterThan(0);
        });

        test('Should return a list of users if param is empty', async () => {
            const response = await server.get('/api/users?q=john');

            expect(response.status).toBe(200);
            //expect(response.body.elements).toBeInstanceOf(Array);
            expect(response.body.elements.length).toBeGreaterThan(0);
        });

        test('Should return an empty list of users if param not match any user', async () => {
            const response = await server.get('/api/users?q=jbfakjsbfksbfisafk');

            expect(response.status).toBe(200);
            //expect(response.body).toBeInstanceOf(Array);
            expect(response.body.elements.length).toBe(0);
        });
    });
});