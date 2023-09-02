import { MulterError } from "multer";
import {UploadErrors} from "../errors/upload.errors";

export class ErrorHandleMiddleware {
    public static handle(err: any, req: any, res: any, next: any): void {
        if (err instanceof MulterError) {
            if (err.message === 'Unexpected field') {
                res.status(400).send({
                    message: 'Invalid field name'
                });
                return;
            }
        }

        if (err instanceof UploadErrors) {
            res.status(400).send({
                message: err.message
            });
            return;
        }

        res.status(500).send({
            message: 'Internal error'
        });
    }
}
