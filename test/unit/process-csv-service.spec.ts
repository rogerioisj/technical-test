import { describe, expect, test } from '@jest/globals';
import { UserRepository } from "../../src/database/repositories/user.repository";
import { AddUsersService } from "../../src/useCases/add-users.service";
import { ProcessCsvFileService } from "../../src/useCases/process-csv-file.service";
import { GetUsersService } from "../../src/useCases/get-users.service";
import { copyFileSync, unlink } from "fs";

describe('Given an instance of ProcessCsvFileService', () => {
    let userRepository: UserRepository;
    let addUserService: AddUsersService;
    let getUsersService: GetUsersService;
    let sut: ProcessCsvFileService;

    beforeEach(() => {
        userRepository = new UserRepository();
        addUserService = new AddUsersService(userRepository);
        getUsersService = new GetUsersService(userRepository);
        sut = new ProcessCsvFileService(addUserService);
    });

    afterEach(() => {
        userRepository = null as any;
    });


    test('Should save a list of users based on a csv file', async () => {
        const filePathMock: string = 'test/mocks/users.csv';
        const filePath: string = 'temp/users.csv';
        copyFileSync(filePathMock, filePath)
        await sut.execute(filePath);
        const result = getUsersService.execute('');
        expect(result.elements.length).toBe(6);
    });
});