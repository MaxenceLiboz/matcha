import { CustomError } from "./CustomError";
import { HTTP_STATUS } from "./HTTP_StatusEnum";

export class UserNotFoundError extends CustomError {
  constructor() {
    super(`User not found.`, HTTP_STATUS.NOT_FOUND);
    this.name = "UserNotFoundError";
  }
}

export class EmailInUseError extends CustomError {
  constructor(email: string) {
    super(`Email ${email} is already in use.`, HTTP_STATUS.CONFLICT);
    this.name = "EmailInUseError";
  }
}

export class UsernameInUseError extends CustomError {
  constructor(username: string) {
    super(`Username ${username} is already in use.`, HTTP_STATUS.CONFLICT);
    this.name = "UsernameInUseError";
  }
}
