import { UserModel } from "../../models/user.model";

export interface AddUserServiceInterface {
    execute(name: string, city: string, country: string, favoriteSport: string): UserModel;
}