export class CustomError extends Error {
    statusCode: number;
    error: unknown;

    constructor(message: string, statusCode: number, error? : unknown) {
        console.log(message);
        super(message);
        this.statusCode = statusCode;
        this.error = error;

        Error.captureStackTrace(this, this.constructor);
    }
}
