import { NextFunction, Request, Response } from "express";
import { UploadErrors } from "../errors/upload.errors";

export class UploadCsvMiddleware {
    public static CheckHeader(req: Request, res: Response, next: NextFunction): void {
        if (!req.headers['content-type'] || req.headers['content-type']?.includes('multipart/form-data') === false) {
            next(new UploadErrors(UploadErrors.INVALID_CONTENT_TYPE));
        }

        next();
    }

    public static CheckFile(req: any, file: any, cb: any): void {
        if (!file) {
            return cb(new UploadErrors(UploadErrors.NO_FILE_UPLOADED), false);
        }

        if (file.mimetype !== 'text/csv') {
            return cb(new UploadErrors(UploadErrors.MIMETYPE_NOT_ALLOWED), false);
        }

        if (file.fieldname !== 'files') {
            return cb(new UploadErrors(UploadErrors.INVALID_FIELD_NAME), false);
        }

        cb(null, true);
    }
}