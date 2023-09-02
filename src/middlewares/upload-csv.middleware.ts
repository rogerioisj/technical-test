import { NextFunction, Request, Response } from "express";

export class UploadCsvMiddleware {
    public static CheckHeader(req: Request, res: Response, next: NextFunction): void {
        if (!req.headers['content-type'] || req.headers['content-type'] !== 'multipart/form-data') {
            res.status(400).send({
                message: 'Content-Type must be multipart/form-data'
            });
            return;
        }

        next();
    }

    public static CheckFile(req: any, file: any, cb: any): void {
        if (!file) {
            req.fileValidationError = 'No file uploaded';
            return cb(null, false, req.fileValidationError);

        }

        if (file.mimetype !== 'text/csv') {
            req.fileValidationError = 'mimetype not allowed';
            return cb(null, false, req.fileValidationError);
        }

        if (file.fieldname !== 'files') {
            req.fileValidationError = 'field name not allowed';
            return cb(null, false, req.fileValidationError);
        }

        if (file.size > 10000000) {
            req.fileValidationError = 'File size cannot be more than 10MB';
            return cb(null, false, req.fileValidationError);
        }

        cb(null, true);
    }
}