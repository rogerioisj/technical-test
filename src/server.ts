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

    private initRoutes(): void {
        this.app.get('/', this.helloWorld);
        this.app.get('/2', this.hello);
    }

    private async helloWorld(req: Request, res: Response): Promise<void> {
        res.send('Hello World!');
    }

    private async hello(req: Request, res: Response): Promise<void> {
        res.send('Hello!');
    }

    public start(): void {
        this.server = this.app.listen(this.port, () => {
            console.log(`Listening on port ${this.port}`);
        });
    }

    public async close(): Promise<void> {
        await this.server.close()
    }

    public getApp(): Express {
        return this.app;
    }

    public setPort(port: number): void {
        this.port = port;
    }
}
