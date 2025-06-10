import { SchemaDefinition, VALIDATOR } from "@infrastructure/web/middleware/validator/validatorTypes";

export interface CreateProfileDTO {
    age: number;
    gender: "Male" | "Female" | "Other";
    sexual_preference: "Heterosexual" | "Homosexual" | "Other";
}

export const CreateProfileSchema: SchemaDefinition = {
    age: [
        { type: VALIDATOR.REQUIRED },
        { type: VALIDATOR.IS_NUMBER },
    ],
    gender: [
        { type: VALIDATOR.REQUIRED },
        { type: VALIDATOR.IS_IN, arg: ['Male', 'Female', 'Other'] }
    ],
    sexual_preference: [
        { type: VALIDATOR.REQUIRED },
        { type: VALIDATOR.IS_IN, arg: ['Heterosexual', 'Homosexual', 'Other'] }
    ]
};