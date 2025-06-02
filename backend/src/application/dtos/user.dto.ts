import { SchemaDefinition, VALIDATOR } from "@infrastructure/web/middleware/validator/validatorTypes";

// Input DTO for creating a user
export interface CreateUserDTO {
    email: string;
    username: string;
    last_name: string;
    first_name: string;
    password: string;
}

// Input DTO for creating a user
export const CreateUserSchema : SchemaDefinition  = {
    email: [{type: VALIDATOR.REQUIRED}, {type: VALIDATOR.EMAIL}],
    username: [{type: VALIDATOR.REQUIRED}, {type: VALIDATOR.MIN_LENGTH, arg: 4}, {type: VALIDATOR.MAX_LENGTH, arg: 50}],
    last_name: [{type: VALIDATOR.REQUIRED}, {type: VALIDATOR.MIN_LENGTH, arg: 4}, {type: VALIDATOR.MAX_LENGTH, arg: 50}],
    first_name: [{type: VALIDATOR.REQUIRED}, {type: VALIDATOR.MIN_LENGTH, arg: 4}, {type: VALIDATOR.MAX_LENGTH, arg: 50}],
    password: [{type: VALIDATOR.REQUIRED}, {type: VALIDATOR.PASSWORD}]
}
  
// Output DTO for user responses
export interface UserResponseDTO {
    id: number;
    email: string;
    username: string;
    last_name: string;
    first_name: string;
    verified: boolean;
}