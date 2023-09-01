import express, { Express, Request, Response, Router } from "express";
import { Server } from "http";

export class ExpressServer {
    private readonly app: Express;
    private port: number = 3000;
    private server: Server = {} as Server;

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

    public close(): void {
        this.server.close()
    }

    public getApp(): Express {
        return this.app;
    }

    public setPort(port: number): void {
        if (!port || port < 0 || port > 65535 || isNaN(port)) throw new Error('Invalid port');
        this.port = port;
    }

    public setRoutes(routes: Router, prefix?: string): void {
        if (!routes) throw new Error('Invalid routes');
        if (prefix) {
            this.app.use(prefix, routes);
            return;
        }
        this.app.use(routes);
    }
}
