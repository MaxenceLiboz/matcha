import { CustomError } from "./CustomError";
import { HTTP_STATUS } from "./HTTP_StatusEnum";

export class UnprocessableEntity extends CustomError {
    constructor(message: string, error?: unknown) {
        super(message, HTTP_STATUS.UNPROCESSABLE_ENTITY, error);
        this.name = 'UnprocessableEntityError';
    }
}