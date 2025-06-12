import { AbstractEntity } from "@domain/entities/AbstractEntity";
import { CustomError } from "@domain/erros/CustomError";
import { HTTP_STATUS } from "@domain/erros/HTTP_StatusEnum";

export type Gender = "Male" | "Female" | "Other";
export type SexualPreference = "Heterosexual" | "Homosexual" | "Other";

export class Profile extends AbstractEntity {
  public user_id: number;
  public age: number;
  public gender: Gender;
  public sexual_preference: SexualPreference;
  public fame_rating: number;

  private constructor(
    user_id: number,
    age: number,
    gender: Gender,
    sexual_preference: SexualPreference,
    fame_rating: number,
    id?: number,
    created_at?: Date,
    updated_at?: Date
  ) {
    super(id, created_at, updated_at);
    this.user_id = user_id;
    this.age = age;
    this.gender = gender;
    this.sexual_preference = sexual_preference;
    this.fame_rating = fame_rating;
  }

  // Factory for creating a NEW profile instance
  public static create(
    user_id: number,
    age: number,
    gender: Gender,
    sexual_preference: SexualPreference,
    fame_rating: number
  ): Profile {
    if (
      !user_id ||
      age === undefined ||
      !gender ||
      !sexual_preference ||
      fame_rating === undefined
    ) {
      throw new CustomError(
        `All fields are required [user_id: ${user_id}, age: ${age}, gender: ${gender}, sexual_preference: ${sexual_preference}, fame_rating: ${fame_rating}]`,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    // Validate fame_rating is a positive integer (>= 0)
    if (fame_rating < 0 || !Number.isInteger(fame_rating)) {
      throw new CustomError(
        `Frame rating must be a positive integer (>= 0) [fame_rating: ${fame_rating}]`,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    return new Profile(user_id, age, gender, sexual_preference, fame_rating);
  }

  // Factory for hydrating a db profile instance
  public static hydrate(
    id: number,
    user_id: number,
    age: number,
    gender: Gender,
    sexual_preference: SexualPreference,
    fame_rating: number,
    created_at: Date,
    updated_at: Date
  ): Profile {
    return new Profile(
      user_id,
      age,
      gender,
      sexual_preference,
      fame_rating,
      id,
      created_at,
      updated_at
    );
  }

  // Method to update profile data
  public updateProfile(
    age: number,
    gender: Gender,
    sexual_preference: SexualPreference,
    fame_rating: number
  ): void {
    // Validate fame_rating
    if (fame_rating < 0 || !Number.isInteger(fame_rating)) {
      throw new CustomError(
        `Frame rating must be a positive integer (>= 0) [fame_rating: ${fame_rating}]`,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    this.age = age;
    this.gender = gender;
    this.sexual_preference = sexual_preference;
    this.fame_rating = fame_rating;
  }
}
