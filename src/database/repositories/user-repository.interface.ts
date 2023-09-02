import { UserModel } from "../../models/user.model";

export interface UserRepositoryInterface {
    searchUsers(query: string, page?: number, limit?: number): UserModel[];
    addUser(user: UserModel): void;
}
