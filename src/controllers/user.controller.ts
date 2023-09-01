import { Request, Response, Router } from 'express';
import { GetUsersServiceInterface } from "../useCases/interfaces/get-users-service.interface";
import { AddUserServiceInterface } from "../useCases/interfaces/add-user-service.interface";

export class UserController {
    private router = Router();
    private getUsersService: GetUsersServiceInterface;
    private addUserService: AddUserServiceInterface;

    constructor(getUsersService: GetUsersServiceInterface, addUserService: AddUserServiceInterface) {
        this.getUsersService = getUsersService;
        this.addUserService = addUserService;

        this.getUsers = this.getUsers.bind(this);
        this.addUser = this.addUser.bind(this);

        this.initRoutes();
    }

    public getRoutes(): Router {
        return this.router;
    }

    private getUsers(req: Request, res: Response){
        const { q } = req.query;
        let query: string;

        if (!q) {
            query = '';
        } else {
            query = q.toString();
        }

        try {
            const users = this.getUsersService.execute(query);
            res.status(200).send(users);
            return;
        } catch (e) {
            console.log(e)
            res.status(500).send('Internal error');
        }
    }

    private async addUser(req: Request, res: Response): Promise<void> {
        const { name, city, country, favorite_sport } = req.body;
        if (!name || !city || !country || !favorite_sport) {
            res.status(400).send('Invalid user data');
            return;
        }

        try {
            this.addUserService.execute(name, city, country, favorite_sport);
            res.status(201).send('User created');
        } catch (e) {
            console.log(e)
            res.status(500).send('Internal error');
        }
    }

    private initRoutes(): void {
        this.router.get('/users', this.getUsers);
        this.router.post('/user', this.addUser);
    }
}