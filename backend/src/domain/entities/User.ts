import { AbstractEntity } from "@domain/entities/AbstractEntity";
import { CustomError } from "@domain/erros/CustomError";
import { HTTP_STATUS } from "@domain/erros/HTTP_StatusEnum";

export class User extends AbstractEntity {

    public email: string;
    public first_name: string;
    public last_name: string;
    public username: string;
    public verified: boolean;

    // Private constructor to enforce factory method usage for creation/hydration
    private constructor(
        email: string,
        first_name: string,
        last_name: string,
        username: string,
        verified?: boolean,
        id?: number,
        created_at?: Date,
        updated_at?: Date
    ) {
        super(id, created_at, updated_at);
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.username = username;
        this.verified = verified || false;
    }

    // Factory for creating a NEW user instance (before DB persistence)
    public static create (
        email: string,
        first_name: string,
        last_name: string,
        username: string,
        verified?: boolean
    ): User {
        // let error: boolean = false;
        // let message: string;
        // if (!email || !email.match("^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$")) 

        if (!email || !first_name || !last_name || !username) {
            throw new CustomError(`Everything is required [email: ${email}, first_name: ${first_name}, last_name: ${last_name}, username: ${username}]`, HTTP_STATUS.BAD_REQUEST);
        }
        // id, created_at, updated_at are created by the DB
        return new User(email, first_name, last_name, username, verified);
    }

    // Factory for hydrating a db user instance
    public static hydrate (
        id: number,
        email: string,
        first_name: string,
        last_name: string,
        username: string,
        verified: boolean,
        created_at: Date,
        updated_at: Date,
    ): User {
        return new User(email, first_name, last_name, username, verified, id, created_at, updated_at);
    }
}