import express, {Express, Request, Response, Router} from "express";

export class Server {
    private readonly app: Express;
    private port: number = 3000;
    private server: any;

    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
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
        if (!port || port < 0 || port > 65535 || isNaN(port)) throw new Error('Invalid port');
        this.port = port;
    }

    public setRoutes(routes: Router): void {
        this.app.use('/api', routes);
    }
}
