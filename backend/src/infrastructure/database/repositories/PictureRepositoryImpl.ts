import { Kysely, Insertable, Updateable, Selectable } from "kysely";
import { DB, Picture as PictureTable } from "@infrastructure/database/db";
import { IPictureRepository } from "@domain/repositories/IPictureRepository";
import { Picture } from "@domain/entities/Picture";
import { PictureMapper } from "../mappers/PictureMapper";
import { AbstractRepositoryImpl, IMapper } from "./AbstactRepositoryImpl";
import { CustomError } from "@domain/erros/CustomError";
import { HTTP_STATUS } from "@domain/erros/HTTP_StatusEnum";
import { UnprocessableEntity } from "@domain/erros/UnprocessableEntity";

export class PictureRepository
  extends AbstractRepositoryImpl<Picture, "Picture">
  implements IPictureRepository
{
  constructor(db: Kysely<DB>) {
    // Pass the db instance, table name, and mapper to the abstract class
    super(
      db,
      "Picture",
      PictureMapper as IMapper<Selectable<PictureTable>, Picture>
    );
  }

  async save(picture: Picture): Promise<Picture> {
    if (picture.id) {
      // If the picture has an ID, it's an update
      const updateData: Updateable<PictureTable> =
        PictureMapper.toPersistenceUpdate(picture);

      await this.db
        .updateTable("Picture")
        .set(updateData)
        .where("id", "=", picture.id)
        .executeTakeFirstOrThrow();

      // Fetch and return the updated picture
      const updatedPicture = await this.getById(picture.id);
      if (!updatedPicture) {
        throw new CustomError(
          "Error fetching the updated picture.",
          HTTP_STATUS.UNPROCESSABLE_ENTITY
        );
      }
      return updatedPicture;
    } else {
      // If there's no ID, it's a new picture
      const insertData: Insertable<PictureTable> =
        PictureMapper.toPersistenceInsert(picture);

      const { insertId } = await this.db
        .insertInto("Picture")
        .values(insertData)
        .executeTakeFirstOrThrow();

      if (!insertId) {
        throw new UnprocessableEntity("Failed to create the picture.");
      }

      // Fetch and return the new picture
      const newPicture = await this.getById(Number(insertId));
      if (!newPicture) {
        throw new CustomError(
          "Error fetching the newly created picture.",
          HTTP_STATUS.UNPROCESSABLE_ENTITY
        );
      }
      return newPicture;
    }
  }
}
