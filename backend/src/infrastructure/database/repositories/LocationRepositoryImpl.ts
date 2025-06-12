import { Kysely, Insertable, Updateable, Selectable } from "kysely";
import { DB, Location as LocationTable } from "@infrastructure/database/db";
import { ILocationRepository } from "@domain/repositories/ILocationRepository";
import { Location } from "@domain/entities/Location";
import { LocationMapper } from "../mappers/LocationMapper";
import { AbstractRepositoryImpl, IMapper } from "./AbstactRepositoryImpl";
import { CustomError } from "@domain/erros/CustomError";
import { HTTP_STATUS } from "@domain/erros/HTTP_StatusEnum";
import { UnprocessableEntity } from "@domain/erros/UnprocessableEntity";

export class LocationRepository
  extends AbstractRepositoryImpl<Location, "Location">
  implements ILocationRepository
{
  constructor(db: Kysely<DB>) {
    super(
      db,
      "Location",
      LocationMapper as IMapper<Selectable<LocationTable>, Location>,
    );
  }

  async save(location: Location): Promise<Location> {
    // Check if a location for this user already exists
    const existing = await this.getByFields({ user_id: location.user_id });

    if (existing.length > 0 && existing[0].id) {
      // Update existing location
      const updateData: Updateable<LocationTable> =
        LocationMapper.toPersistenceUpdate(location);
      await this.db
        .updateTable("Location")
        .set(updateData)
        .where("user_id", "=", location.user_id)
        .executeTakeFirstOrThrow();
      const updatedLocation = await this.getByFields({
        user_id: location.user_id,
      });
      return updatedLocation[0];
    } else {
      // Insert new location
      const insertData: Insertable<LocationTable> =
        LocationMapper.toPersistenceInsert(location);
      const { insertId } = await this.db
        .insertInto("Location")
        .values(insertData)
        .executeTakeFirstOrThrow();
      if (!insertId) {
        throw new UnprocessableEntity("Failed to save the location.");
      }
      const newLocation = await this.getById(Number(insertId));
      if (!newLocation) {
        throw new CustomError(
          "Error fetching newly created location.",
          HTTP_STATUS.UNPROCESSABLE_ENTITY,
        );
      }
      return newLocation;
    }
  }
}
