import { ProcessCsvFileServiceInterface } from "./interfaces/process-csv-file-service.interface";
import { promisify } from "util";
import { createReadStream, unlinkSync } from "fs";
import { pipeline, Transform } from "stream";
import csv from "csvtojson";
import { AddUserServiceInterface } from "./interfaces/add-user-service.interface";
const pipelineAsync = promisify(pipeline);

export class ProcessCsvFileService implements ProcessCsvFileServiceInterface {
    private readonly addUserService: AddUserServiceInterface;
    constructor(addUserService: AddUserServiceInterface) {
        this.addUserService = addUserService;
        this.execute.bind(this);
    }

    csvOptions = {
        delimiter: ',',
        headers: ['name', 'city', 'country', 'favorite_sport']
    };

    public async execute(filePath: string): Promise<void> {
        const fileStream = createReadStream(filePath);

        const transformStream = new Transform({
            transform: (chunk, encoding, callback) => {
                const data = chunk.toString();
                const parsed = JSON.parse(data);
                const { name, city, country, favorite_sport } = parsed;
                this.addUserService.execute(name, city, country, favorite_sport);
                callback();
            },
        });

        await pipelineAsync(
            fileStream,
            csv(this.csvOptions),
            transformStream
        );

        unlinkSync(filePath);
    }
}