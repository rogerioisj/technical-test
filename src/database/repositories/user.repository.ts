import { UserModel } from "../../models/user.model";

export class UserRepository {
    private database: UserModel[];
    constructor() {
        this.database = [];
    }
    searchUsers(query: string): UserModel[] {
        query = query.toLowerCase();

        return this.database.filter((user) => {
            const { name, country, city, favoriteSport  } = user.toJson();
            return (
                name.toLowerCase().includes(query) ||
                country.toLowerCase().includes(query) ||
                city.toLowerCase().includes(query) ||
                favoriteSport.toLowerCase().includes(query)
            );
        });
    }
    addUser(user: UserModel) {
        this.database.push(user);
        return user;
    }
}