import { Request, Response, Router } from 'express';
import { GetUsersServiceInterface } from "../useCases/interfaces/get-users-service.interface";
import { AddUserServiceInterface } from "../useCases/interfaces/add-user-service.interface";
import Multer from 'multer';
import { StorageMiddleware } from "../middlewares/storage.middleware";
import {UploadCsvMiddleware} from "../middlewares/upload-csv.middleware";
import { ProcessCsvFileServiceInterface } from "../useCases/interfaces/process-csv-file-service.interface";
import { ErrorHandleMiddleware } from "../middlewares/error-handle.middleware";
import { UploadErrors } from "../errors/upload.errors";

export class UserController {
    private storageMiddleware = Multer.diskStorage(new StorageMiddleware())
    private upload = Multer({ storage: this.storageMiddleware, fileFilter: UploadCsvMiddleware.CheckFile } );
    private router = Router();
    private readonly getUsersService: GetUsersServiceInterface;
    private readonly processCsvFileService: ProcessCsvFileServiceInterface;

    constructor(getUsersService: GetUsersServiceInterface, processCsvFileService: ProcessCsvFileServiceInterface) {
        this.getUsersService = getUsersService;
        this.processCsvFileService = processCsvFileService;

        this.getUsers = this.getUsers.bind(this);
        this.uploadCsv = this.uploadCsv.bind(this);

        this.initRoutes();
    }

    public getRoutes(): Router {
        return this.router;
    }

    private getUsers(req: Request, res: Response){
        const { q, page, limit } = req.query;
        let query: string;
        let pageInt: undefined | number;
        let limitInt: undefined | number;

        query = !q ? '' : query = q.toString();

        pageInt = page === undefined ? undefined :  parseInt(page.toString());

        limitInt = limit === undefined ?  undefined : parseInt(limit.toString());

        try {
            const users = this.getUsersService.execute(query, pageInt, limitInt);
            res.status(200).send(users);
            return;
        } catch (e) {
            console.log(e)
            res.status(500).send('Internal error');
        }
    }

    private async uploadCsv(req: any, res: Response): Promise<void> {
        try {
            if(req.fileValidationError) {
                res.status(400).send({ message: req.fileValidationError });
                return ;
            }

            if(!req.file) {
                res.status(400).send({ message: UploadErrors.NO_FILE_UPLOADED });
                return ;
            }

            this.processCsvFileService.execute(req.file.path);

            res.status(201).send(`Users created`);
        } catch (e) {
            console.log('ERROR', e)
            res.status(500).send('Internal error');
        }
    }

    private initRoutes(): void {
        this.router.get('/users', this.getUsers, ErrorHandleMiddleware.handle);
        this.router.post('/files', UploadCsvMiddleware.CheckHeader, this.upload.single(`files`), this.uploadCsv, ErrorHandleMiddleware.handle);
    }
}