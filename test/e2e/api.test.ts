import { describe, expect } from '@jest/globals';
import supertest, { Test } from 'supertest';
import { ExpressServer } from '../../src/expressServer';
import { AppController } from "../../src/controllers/app.controller";

describe('Given an API test e2e suit', () => {
    const serverInstance = new ExpressServer();
    let server: supertest.SuperTest<supertest.Test>;
    let port = 3001;
    const appController = new AppController();
    beforeEach(async () => {
        serverInstance.setRoutes(appController.getRoutes());
        serverInstance.setPort(port);
        serverInstance.start();
        server = supertest(serverInstance.getApp());
    });

    afterEach(() => {
        serverInstance.close();
    });
    test.todo('Should return a list of users based on query params');
    test.todo('Should save a list of users based on a csv file');
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