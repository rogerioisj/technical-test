import { Request, Response, Router } from 'express';

export class AppController {
    private router = Router();

    constructor() {
        this.initRoutes();
    }

    public initRoutes(): void {
        this.router.get('/', this.helloWorld);
        this.router.get('/2', this.hello);
    }

    private async helloWorld(req: Request, res: Response): Promise<void> {
        res.send('Hello World!');
    }

    private async hello(req: Request, res: Response): Promise<void> {
        res.send('Hello!');
    }

    public getRoutes(): Router {
        return this.router;
    }
}
