import { SchemaDefinition, VALIDATOR } from "@infrastructure/web/middleware/validator/validatorTypes";

export interface CreateUserDTO {
    email: string;
    username: string;
    last_name: string;
    first_name: string;
    password: string;
}
export const CreateUserSchema : SchemaDefinition  = {
    email: [{type: VALIDATOR.REQUIRED}, {type: VALIDATOR.EMAIL}],
    username: [{type: VALIDATOR.REQUIRED}, {type: VALIDATOR.MIN_LENGTH, arg: 4}, {type: VALIDATOR.MAX_LENGTH, arg: 50}],
    last_name: [{type: VALIDATOR.REQUIRED}, {type: VALIDATOR.MIN_LENGTH, arg: 4}, {type: VALIDATOR.MAX_LENGTH, arg: 50}],
    first_name: [{type: VALIDATOR.REQUIRED}, {type: VALIDATOR.MIN_LENGTH, arg: 4}, {type: VALIDATOR.MAX_LENGTH, arg: 50}],
    password: [{type: VALIDATOR.REQUIRED}, {type: VALIDATOR.PASSWORD}]
}

export interface UserResponseDTO {
    id: number;
    email: string;
    username: string;
    last_name: string;
    first_name: string;
    verified: boolean;
}

export interface SendUserVerificationOrForgotPasswordDTO {
    email: string;
    username: string;
}
export const SendUserVerificationOrForgotPasswordSchema : SchemaDefinition  = {
    email: [{type: VALIDATOR.REQUIRED}, {type: VALIDATOR.EMAIL}],
    username: [{type: VALIDATOR.REQUIRED}, {type: VALIDATOR.MIN_LENGTH, arg: 4}, {type: VALIDATOR.MAX_LENGTH, arg: 50}],
}

export interface UserVerificationOrForgotPasswordDTO {
    token: string;
}
export const UserVerificationOrForgotPasswordSchema : SchemaDefinition  = {
    token: [{type: VALIDATOR.REQUIRED}, {type: VALIDATOR.MIN_LENGTH, arg: 36}, {type: VALIDATOR.MAX_LENGTH, arg: 36}],
}