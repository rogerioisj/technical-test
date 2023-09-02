import {UserRepositoryInterface} from "../database/repositories/user-repository.interface";
import { GetUsersServiceInterface } from "./interfaces/get-users-service.interface";

export class GetUsersService implements GetUsersServiceInterface {
    private repository: UserRepositoryInterface;

    constructor(repository: UserRepositoryInterface) {
        this.repository = repository;
    }

    public execute(query: string, page?: number, limit?: number) {
        return this.repository.searchUsers(query, page, limit);
    }
}
