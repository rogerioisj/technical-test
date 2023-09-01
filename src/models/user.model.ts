export class UserModel {
    private readonly name: string;
    private readonly city: string;
    private readonly country: string;
    private readonly favoriteSport: string;

    constructor(name: string, city: string, country: string, favoriteSport: string) {
        this.name = name;
        this.city = city;
        this.country = country;
        this.favoriteSport = favoriteSport;
    }

    public toJson() {
        return {
            name: this.name,
            city: this.city,
            country: this.country,
            favoriteSport: this.favoriteSport
        }
    }
}
