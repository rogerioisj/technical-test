import express, { Express, Request, Response } from "express";

export class Server {
    private readonly app: Express;
    private port: number = 3000;
    private server: any;

    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.initRoutes();
    }

    private initRoutes() {
        this.app.get('/', this.helloWorld);
        this.app.get('/2', this.hello);
    }

    private async helloWorld(req: Request, res: Response) {
        res.send('Hello World!');
    }

    private async hello(req: Request, res: Response) {
        res.send('Hello!');
    }

    public start() {
        this.server = this.app.listen(this.port, () => {
            console.log(`Listening on port ${this.port}`);
        });
    }

    public async close() {
        await this.server.close()
    }

    public getApp(): Express {
        return this.app;
    }

    public setPort(port: number) {
        this.port = port;
    }
}
