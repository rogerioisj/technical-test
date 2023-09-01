import express, { Express, Router } from "express";
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

    public getPort(): number {
        return this.port;
    }

    public setRoutes(routes: Router, prefix?: string): void {
        if (!routes) throw new Error('Invalid routes');
        if (prefix) {
            this.app.use(prefix, routes);
            return;
        }
        this.app.use(routes);
    }

    public getRoutes() {
        const routes: Route[] = []
        this.app._router.stack.map((r: any) => {
            if (r.name === 'router') {
                const prefix =  r.regexp.toString().replace(/\/\^|\/\?|\/\$/g, '').replace('(?=\\/|$)', '').replace(/\\(.)/g, '$1').replace(/\/i\n/g, '').replace(/\/i$/, '');
                r.handle.stack?.map((r: any) => {
                    const path = r.route?.path;
                    r.route?.stack?.map((r: any) => {
                        routes.push({
                            path: path,
                            method: r.method,
                            prefix: prefix
                        })
                    })
                })
            }
        })

        return routes;
    }
}

interface Route {
    path: string;
    method: string;
    prefix?: string;
}
