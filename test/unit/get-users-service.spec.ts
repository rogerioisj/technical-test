import { describe, expect, test } from '@jest/globals';
import { GetUsersService } from '../../src/useCases/get-users.service';
import { UserRepository } from "../../src/database/repositories/user.repository";
import { AddUsersService } from "../../src/useCases/add-users.service";
import { UserModel } from "../../src/models/user.model";

describe('Given an instance of GetUsersService', () => {
    const userRepository = new UserRepository();
    const getUsersService = new GetUsersService(userRepository);
    const addUserService = new AddUsersService(userRepository);

    beforeAll(() => {
        addUserService.execute('John Doe', 'New York', 'USA', 'Basketball');
        addUserService.execute('Jane Smith', 'London', 'UK', 'Football');
        addUserService.execute('Mike Johnson', 'Paris', 'France', 'Tennis');
        addUserService.execute('Karen Lee', 'Tokyo', 'Japan', 'Swimming');
        addUserService.execute('Tom Brown', 'Sydney', 'Australia', 'Running');
        addUserService.execute('Emma Wilson', 'Berlin', 'Germany', 'Basketball');
        addUserService.execute('Jaskier Dandelion', 'New York', 'USA', 'Running');
        addUserService.execute('John Dandelion', 'Belo Horizonte', 'Brazil', 'Airsoft');
    });

    test('Should return a two results when `basketball` is passed as param', () => {
        const result = getUsersService.execute('basketball');

        expect(result.elements.length).toBe(2);
        expect(result.elements[0]).toBeInstanceOf(UserModel);
        expect(result.elements[1]).toBeInstanceOf(UserModel);
        expect(result.elements[0].toJson().favoriteSport).toBe('Basketball');
        expect(result.elements[0].toJson().name).toBe('John Doe');
        expect(result.elements[1].toJson().favoriteSport).toBe('Basketball');
        expect(result.elements[1].toJson().name).toBe('Emma Wilson');
    });

    test('Should return a one result when `football` is passed as param', () => {
        const result = getUsersService.execute('football');

        expect(result.elements.length).toBe(1);
        expect(result.elements[0]).toBeInstanceOf(UserModel);
        expect(result.elements[0].toJson().favoriteSport).toBe('Football');
        expect(result.elements[0].toJson().name).toBe('Jane Smith');
    });

    test('Should return two results when `New York` is passed as param', () => {
        const result = getUsersService.execute('running');

        expect(result.elements.length).toBe(2);
        expect(result.elements[0]).toBeInstanceOf(UserModel);
        expect(result.elements[1]).toBeInstanceOf(UserModel);
        expect(result.elements[0].toJson().favoriteSport).toBe('Running');
        expect(result.elements[0].toJson().name).toBe('Tom Brown');
        expect(result.elements[1].toJson().favoriteSport).toBe('Running');
        expect(result.elements[1].toJson().name).toBe('Jaskier Dandelion');
    });

    test('Should return two results when `USA` is passed as param', () => {
        const result = getUsersService.execute('USA');

        expect(result.elements.length).toBe(2);
        expect(result.elements[0]).toBeInstanceOf(UserModel);
        expect(result.elements[1]).toBeInstanceOf(UserModel);
        expect(result.elements[0].toJson().country).toBe('USA');
        expect(result.elements[0].toJson().name).toBe('John Doe');
        expect(result.elements[1].toJson().country).toBe('USA');
        expect(result.elements[1].toJson().name).toBe('Jaskier Dandelion');
    });

    test('Should return three results when `John` is passed as param', () => {
        const result = getUsersService.execute('John');

        expect(result.elements.length).toBe(3);
        expect(result.elements[0]).toBeInstanceOf(UserModel);
        expect(result.elements[1]).toBeInstanceOf(UserModel);
        expect(result.elements[2]).toBeInstanceOf(UserModel);
        expect(result.elements[0].toJson().name).toBe('John Doe');
        expect(result.elements[1].toJson().name).toBe('Mike Johnson');
        expect(result.elements[2].toJson().name).toBe('John Dandelion');
    });

    test('Should return none results when `Macarena` is passed as param', () => {
        const result = getUsersService.execute('Macarena');

        expect(result.elements.length).toBe(0);
    });

    test('Should return three results when `JoHn` is passed as param', () => {
        const result = getUsersService.execute('JoHn');

        expect(result.elements.length).toBe(3);
        expect(result.elements[0]).toBeInstanceOf(UserModel);
        expect(result.elements[1]).toBeInstanceOf(UserModel);
        expect(result.elements[2]).toBeInstanceOf(UserModel);
        expect(result.elements[0].toJson().name).toBe('John Doe');
        expect(result.elements[1].toJson().name).toBe('Mike Johnson');
        expect(result.elements[2].toJson().name).toBe('John Dandelion');
    });

    test('Should return three results when `JOHN` is passed as param', () => {
        const result = getUsersService.execute('JOHN');

        expect(result.elements.length).toBe(3);
        expect(result.elements[0]).toBeInstanceOf(UserModel);
        expect(result.elements[1]).toBeInstanceOf(UserModel);
        expect(result.elements[2]).toBeInstanceOf(UserModel);
        expect(result.elements[0].toJson().name).toBe('John Doe');
        expect(result.elements[1].toJson().name).toBe('Mike Johnson');
        expect(result.elements[2].toJson().name).toBe('John Dandelion');
    });

    test('Should return three results when `john` is passed as param', () => {
        const result = getUsersService.execute('john');

        expect(result.elements.length).toBe(3);
        expect(result.elements[0]).toBeInstanceOf(UserModel);
        expect(result.elements[1]).toBeInstanceOf(UserModel);
        expect(result.elements[2]).toBeInstanceOf(UserModel);
        expect(result.elements[0].toJson().name).toBe('John Doe');
        expect(result.elements[1].toJson().name).toBe('Mike Johnson');
        expect(result.elements[2].toJson().name).toBe('John Dandelion');
    });

    test('Should return eight results when a empty string is passed as param', () => {
        const result = getUsersService.execute('');

        expect(result.elements.length).toBe(8);
        expect(result.elements[0]).toBeInstanceOf(UserModel);
        expect(result.elements[1]).toBeInstanceOf(UserModel);
        expect(result.elements[2]).toBeInstanceOf(UserModel);
        expect(result.elements[3]).toBeInstanceOf(UserModel);
        expect(result.elements[4]).toBeInstanceOf(UserModel);
        expect(result.elements[5]).toBeInstanceOf(UserModel);
        expect(result.elements[6]).toBeInstanceOf(UserModel);
        expect(result.elements[7]).toBeInstanceOf(UserModel);
        expect(result.elements[0].toJson().name).toBe('John Doe');
        expect(result.elements[1].toJson().name).toBe('Jane Smith');
        expect(result.elements[2].toJson().name).toBe('Mike Johnson');
        expect(result.elements[3].toJson().name).toBe('Karen Lee');
        expect(result.elements[4].toJson().name).toBe('Tom Brown');
        expect(result.elements[5].toJson().name).toBe('Emma Wilson');
        expect(result.elements[6].toJson().name).toBe('Jaskier Dandelion');
        expect(result.elements[7].toJson().name).toBe('John Dandelion');
    });
});
