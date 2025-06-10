import { Kysely, Insertable, Updateable, Selectable } from "kysely";
import { DB, Profile as ProfileTable } from "@infrastructure/database/db";
import { IProfileRepository } from "@domain/repositories/IProfileRepository";
import { Profile } from "@domain/entities/Profile";
import { ProfileMapper } from "../mappers/ProfileMapper";
import { AbstractRepositoryImpl, IMapper } from "./AbstactRepositoryImpl";
import { CustomError } from "@domain/erros/CustomError";
import { HTTP_STATUS } from "@domain/erros/HTTP_StatusEnum";
import { UnprocessableEntity } from "@domain/erros/UnprocessableEntity";

export class ProfileRepository
  extends AbstractRepositoryImpl<Profile, "Profile">
  implements IProfileRepository
{
  constructor(db: Kysely<DB>) {
    super(
      db,
      "Profile",
      ProfileMapper as IMapper<Selectable<ProfileTable>, Profile>
    );
  }

  async save(profile: Profile): Promise<Profile> {
    if (profile.id) {
      // If the profile has an ID, it's an update
      const updateData: Updateable<ProfileTable> =
        ProfileMapper.toPersistenceUpdate(profile);

      await this.db
        .updateTable("Profile")
        .set(updateData)
        .where("id", "=", profile.id)
        .executeTakeFirstOrThrow();

      // Fetch and return the updated profile to ensure data consistency
      const updatedProfile = await this.getById(profile.id);
      if (!updatedProfile) {
        throw new CustomError(
          "Error fetching the updated profile.",
          HTTP_STATUS.UNPROCESSABLE_ENTITY
        );
      }
      return updatedProfile;
    } else {
      // If there's no ID, it's a new profile
      const insertData: Insertable<ProfileTable> =
        ProfileMapper.toPersistenceInsert(profile);

      const { insertId } = await this.db
        .insertInto("Profile")
        .values(insertData)
        .executeTakeFirstOrThrow();

      if (!insertId) {
        throw new UnprocessableEntity("Failed to create the profile.");
      }

      // Fetch and return the new profile to get the generated ID and timestamps
      const newProfile = await this.getById(Number(insertId));
      if (!newProfile) {
        throw new CustomError(
          "Error fetching the newly created profile.",
          HTTP_STATUS.UNPROCESSABLE_ENTITY
        );
      }
      return newProfile;
    }
  }
}
