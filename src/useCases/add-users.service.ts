import { UserModel } from "../models/user.model";
import { UserRepository } from "../database/repositories/user.repository";
import { AddUserServiceInterface } from "./interfaces/add-user-service.interface";

export class AddUsersService implements AddUserServiceInterface {
    private repository: any;
    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    execute(name: string, city: string, country: string, favoriteSport: string): UserModel {
        const user = new UserModel(name, city, country, favoriteSport);
        this.repository.addUser(user);
        return user;
    }
}
