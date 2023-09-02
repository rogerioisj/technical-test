import { UserModel } from "../../models/user.model";

export interface GetUsersServiceInterface {
    execute(query: string, page?: number, limit?: number): any;
}