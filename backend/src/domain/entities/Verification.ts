import { HTTP_STATUS } from "@domain/erros/HTTP_StatusEnum";
import { AbstractEntity } from "./AbstractEntity";
import { CustomError } from "@domain/erros/CustomError";



export class Verification extends AbstractEntity {
    public expiration_date: Date;
    public type: "email_verification" | "password_reset";
    public unique_token: string;
    public user_id: number;

    // Private constructor to enforce factory method usage for creation/hydration
    private constructor(
        expiration_date: Date,
        type: "email_verification" | "password_reset",
        unique_token: string,
        user_id: number,
        id?: number,
        created_at?: Date,
        updated_at?: Date
    ) {
        super(id, created_at, updated_at);
        this.expiration_date = expiration_date;
        this.type = type;
        this.unique_token = unique_token;
        this.user_id = user_id;
    }

    // Factory for creating a NEW Verification instance (before DB persistence)
    public static create (
        expiration_date: Date,
        type: "email_verification" | "password_reset",
        unique_token: string,
        user_id: number,
    ): Verification {

        if (!expiration_date || !type || !unique_token || !user_id) {
            throw new CustomError(`Everything is required [expiration_date: ${expiration_date}, type: ${type}, unique_token: ${unique_token}, user_id: ${user_id}]`, HTTP_STATUS.BAD_REQUEST);
        }
        // id, created_at, updated_at are created by the DB
        return new Verification(expiration_date, type, unique_token, user_id);
    }

    // Factory for hydrating a db user instance
    public static hydrate (
        id: number,
        expiration_date: Date,
        type: "email_verification" | "password_reset",
        unique_token: string,
        user_id: number,
        created_at: Date,
        updated_at: Date,
    ): Verification {
        return new Verification(expiration_date, type, unique_token, user_id, id, created_at, updated_at);
    }
    
}