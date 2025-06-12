import { SchemaDefinition, VALIDATOR } from "@infrastructure/web/middleware/validator/validatorTypes";

export interface CreateProfileDTO {
  age: number;
  gender: "Male" | "Female" | "Other";
  sexual_preference: "Heterosexual" | "Homosexual" | "Other";
  interests: string;
  city: string;
  latitude: string;
  longitude: string;
}

export const CreateProfileSchema: SchemaDefinition = {
  age: [
    { type: VALIDATOR.REQUIRED },
    { type: VALIDATOR.IS_NUMBER },
    { type: VALIDATOR.MIN, arg: 18 },
    { type: VALIDATOR.MAX, arg: 99 },
  ],
  gender: [{ type: VALIDATOR.REQUIRED }, { type: VALIDATOR.IS_IN, arg: ["Male", "Female", "Other"] }],
  sexual_preference: [
    { type: VALIDATOR.REQUIRED },
    { type: VALIDATOR.IS_IN, arg: ["Heterosexual", "Homosexual", "Other"] },
  ],
  city: [{ type: VALIDATOR.REQUIRED }, { type: VALIDATOR.MIN_LENGTH, arg: 1 }, { type: VALIDATOR.MAX_LENGTH, arg: 50 }],
  interests: [
    { type: VALIDATOR.REQUIRED },
    { type: VALIDATOR.MIN_LENGTH, arg: 1 },
    { type: VALIDATOR.MAX_LENGTH, arg: 1000 },
  ],
};
