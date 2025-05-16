export class UserNotFoundError extends Error {
    constructor(id: string) {
        super(`User with id ${id} not found.`);
        this.name = 'UserNotFoundError';
    }
}
  
export class EmailInUseError extends Error {
    constructor(email: string) {
        super(`Email ${email} is already in use.`);
        this.name = 'EmailInUseError';
    }
}

export class UsernameInUseError extends Error {
    constructor(username: string) {
        super(`Username ${username} is already in use.`);
        this.name = 'UsernameInUseError';
    }
}