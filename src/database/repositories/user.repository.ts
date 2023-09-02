import { UserModel } from "../../models/user.model";
import { UserRepositoryInterface } from "./user-repository.interface";

export class UserRepository implements UserRepositoryInterface {
    private database: UserModel[];
    constructor() {
        this.database = [];
    }
    searchUsers(query: string, page = 1, limit = 50): any{
        query = query.toLowerCase();

        let skip = (page - 1) * limit;
        let counterSkip = 0;
        let elementsFiltered = 0;

        const response: UserModel[] = [];

        this.database.filter((user) => {
            const { name, country, city, favoriteSport  } = user.toJson();

            if (
                name.toLowerCase().includes(query) ||
                country.toLowerCase().includes(query) ||
                city.toLowerCase().includes(query) ||
                favoriteSport.toLowerCase().includes(query)
            ) {
                elementsFiltered++;

                if(counterSkip < skip) {
                    counterSkip++;
                    return;
                }

                if(response.length < limit) {
                    response.push(user);
                }
            }

            /*return (
                name.toLowerCase().includes(query) ||
                country.toLowerCase().includes(query) ||
                city.toLowerCase().includes(query) ||
                favoriteSport.toLowerCase().includes(query)
            );*/
        });

        return {
            elements: response,
            totalElements: elementsFiltered,
            page: page,
            limit: limit,
        };
    }
    addUser(user: UserModel) {
        this.database.push(user);
        return user;
    }
}