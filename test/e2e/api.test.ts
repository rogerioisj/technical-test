import { describe, expect } from '@jest/globals';
import supertest, { Test } from 'supertest';
import { ExpressServer } from '../../src/expressServer';
import { UserController } from "../../src/controllers/user.controller";
import { AddUsersService } from "../../src/useCases/add-users.service";
import { GetUsersService } from "../../src/useCases/get-users.service";
import { ProcessCsvFileService } from "../../src/useCases/process-csv-file.service";
import { UserRepository } from "../../src/database/repositories/user.repository";

describe('Given an API test e2e suit', () => {
    const serverInstance = new ExpressServer();
    let server: supertest.SuperTest<supertest.Test>;
    let port = 3001;

    let sut: UserController;

    beforeEach(async () => {
        const repository = new UserRepository();
        const addUserService = new AddUsersService(repository);
        const getUserService = new GetUsersService(repository);
        const processCsvFileService = new ProcessCsvFileService(addUserService);
        sut = new UserController(getUserService, addUserService, processCsvFileService);

        serverInstance.setRoutes(sut.getRoutes());
        serverInstance.setPort(port);
        serverInstance.start();
        server = supertest(serverInstance.getApp());
    });

    afterEach(() => {
        serverInstance.close();
    });

    test.skip('Should return a hello world message', async () => {
        const response = await server.get('/');

        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello World!');
    });

    test.skip('Should return a hello message', async () => {
        const response = await server.get('/2');

        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello!');
    });

    test.todo('Should save a list of users based on a csv file');

    test.todo('Should return a list of users based on query params');
});