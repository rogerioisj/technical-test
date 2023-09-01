import { DiskStorageOptions } from "multer";
import { Request } from "express";

export class StorageMiddleware implements DiskStorageOptions {
    destination(req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void): void {
        cb(null, './temp/');
    }

    filename(req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void): void {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${ file.fieldname }-${ uniqueSuffix }.csv`);
    }
}
