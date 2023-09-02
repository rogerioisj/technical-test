export class UploadErrors extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'Errors';
    }

    public static INVALID_CONTENT_TYPE = 'Content-Type must be multipart/form-data';
    public static INVALID_FIELD_NAME = 'Invalid field name';
    public static NO_FILE_UPLOADED = 'No file uploaded';
    public static MIMETYPE_NOT_ALLOWED = 'mimetype not allowed';
    public static FILE_SIZE_EXCEEDED = 'File size cannot be more than 10MB';
}
