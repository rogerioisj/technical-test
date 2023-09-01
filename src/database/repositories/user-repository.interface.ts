import { UserModel } from "../../models/user.model";

export interface UserRepositoryInterface {
    searchUsers(query: string): UserModel[];
    addUser(user: UserModel): void;
}
