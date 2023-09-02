import { UserModel } from "../../models/user.model";

export interface UserRepositoryInterface {
    searchUsers(query: string, page?: number, limit?: number): any;
    addUser(user: UserModel): void;
}
