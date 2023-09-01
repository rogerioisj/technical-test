import { describe, expect, test } from '@jest/globals';
import { ExpressServer } from '../../src/expressServer';
import { Request, Response, Router } from 'express';

describe('Given an instance of ExpressServer', () => {
    let server: ExpressServer;
    let router: Router;
    const port = 3002;

    beforeEach(() => {
        server = new ExpressServer();
        router = Router();
        server.setPort(port);

        router.get('/', (req: Request, res: Response) => {
            res.send('GET Test');
        });
        router.post('/', (req: Request, res: Response) => {
            res.send('POST Test');
        });
        server.setRoutes(router, '/test');
    });

    afterEach(() => {
        server = {} as ExpressServer;
        router = {} as Router;
    });

    test('Port should be equal to const port', () => {
        expect(server.getPort()).toBe(port);
    });

    test('Routes should be equal to router', () => {
        const routes = server.getRoutes();

        expect(routes.length).toEqual(2);
        expect(routes[0].path).toEqual('/');
        expect(routes[0].method).toEqual('get');
        expect(routes[0].prefix).toEqual('/test');
        expect(routes[1].path).toEqual('/');
        expect(routes[1].method).toEqual('post');
        expect(routes[1].prefix).toEqual('/test');
    });

    test('Should throw an error when port is below than 0', () => {
        expect(() => {
            server.setPort(-1);
        }).toThrow();
    });

    test('Should throw an error when port is below higher than 65535', () => {
        expect(() => {
            server.setPort(65536);
        }).toThrow();
    });

    test('Should throw an error when port is NaN', () => {
        expect(() => {
            server.setPort('' as any);
        }).toThrow();
    });

    test('Should throw an error when routes is undefined', () => {
        expect(() => {
            server.setRoutes(undefined as any);
        }).toThrow();
    });
});
