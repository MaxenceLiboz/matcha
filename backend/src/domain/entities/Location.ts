import { AbstractEntity } from "./AbstractEntity";
import { CustomError } from "@domain/erros/CustomError";
import { HTTP_STATUS } from "@domain/erros/HTTP_StatusEnum";

export class Location extends AbstractEntity {
  public user_id: number;
  public latitude: number;
  public longitude: number;
  public city: string;

  private constructor(
    user_id: number,
    latitude: number,
    longitude: number,
    city: string,
    id?: number,
    created_at?: Date,
    updated_at?: Date
  ) {
    super(id, created_at, updated_at);
    this.user_id = user_id;
    this.latitude = latitude;
    this.longitude = longitude;
    this.city = city;
  }

  public static create(
    user_id: number,
    latitude: number,
    longitude: number,
    city: string,
  ): Location {
    if (!user_id || latitude === undefined || longitude === undefined || !city) {
      throw new CustomError(
        "User ID, coordinates, and city are required for Location.",
        HTTP_STATUS.BAD_REQUEST
      );
    }
    return new Location(user_id, latitude, longitude, city);
  }

  public static hydrate(
    id: number,
    user_id: number,
    latitude: number,
    longitude: number,
    city: string,
    created_at: Date,
    updated_at: Date
  ): Location {
    return new Location(user_id, latitude, longitude, city, id, created_at, updated_at);
  }
}