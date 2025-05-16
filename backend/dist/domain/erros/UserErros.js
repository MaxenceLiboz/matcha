"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsernameInUseError = exports.EmailInUseError = exports.UserNotFoundError = void 0;
class UserNotFoundError extends Error {
    constructor(id) {
        super(`User with id ${id} not found.`);
        this.name = 'UserNotFoundError';
    }
}
exports.UserNotFoundError = UserNotFoundError;
class EmailInUseError extends Error {
    constructor(email) {
        super(`Email ${email} is already in use.`);
        this.name = 'EmailInUseError';
    }
}
exports.EmailInUseError = EmailInUseError;
class UsernameInUseError extends Error {
    constructor(username) {
        super(`Username ${username} is already in use.`);
        this.name = 'UsernameInUseError';
    }
}
exports.UsernameInUseError = UsernameInUseError;
