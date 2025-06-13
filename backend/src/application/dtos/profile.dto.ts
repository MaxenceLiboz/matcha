import { Location } from "@domain/entities/Location";
import { Gender, SexualPreference } from "@domain/entities/Profile";
import { Tag } from "@domain/entities/Tag";
import { SchemaDefinition, VALIDATOR } from "@infrastructure/web/middleware/validator/validatorTypes";
import { LocationResponseDTO } from "./location.dto";

export interface CreateProfileDTO {
  age: number;
  gender: Gender;
  sexual_preference: SexualPreference;
  biography: string;
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
  biography: [{ type: VALIDATOR.REQUIRED }, { type: VALIDATOR.MIN_LENGTH, arg: 1 }, { type: VALIDATOR.MAX_LENGTH, arg: 500 }],
  city: [{ type: VALIDATOR.REQUIRED }, { type: VALIDATOR.MIN_LENGTH, arg: 1 }, { type: VALIDATOR.MAX_LENGTH, arg: 50 }],
  interests: [
    { type: VALIDATOR.REQUIRED },
    { type: VALIDATOR.MIN_LENGTH, arg: 1 },
    { type: VALIDATOR.MAX_LENGTH, arg: 1000 },
  ],
};

export interface FullProfileDTO {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: Gender;
  sexualPreference: SexualPreference;
  fameRating: number;
  biography: string;
  location: LocationResponseDTO | null;
  profile_picture_ref: string;
  other_picture_ref: string[];
  tags: Pick<Tag, "name">[];
}
