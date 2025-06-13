import { Picture } from "@domain/entities/Picture";
import { IPictureRepository } from "@domain/repositories/IPictureRepository";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs/promises";

export class PictureUseCases {
  constructor(private readonly pictureRepository: IPictureRepository) {}

  async save(
    files: Express.Multer.File[],
    user_id: number,
  ): Promise<Picture[]> {
    let pictures = [];

    const allFiles = Object.values(files).flat();

    for (const file of allFiles) {
      const uniqueFilename = `${uuidv4()}`;
      const uploadPath = path.join(
        __dirname,
        "..",
        "..",
        "uploads",
        uniqueFilename,
      );

      // Ensure the uploads directory exists
      await fs.mkdir(path.dirname(uploadPath), { recursive: true });
      await fs.writeFile(uploadPath, file.buffer);

      // Create the picture entity and save it
      const pictureToCreate = Picture.create(
        user_id,
        uniqueFilename,
        file.mimetype,
        file.fieldname === "profile_picture",
      );
      pictures.push(await this.pictureRepository.save(pictureToCreate));
    }

    return pictures;
  }

    async getByFields(fields: Partial<Picture>): Promise<Picture[]> {
      return await this.pictureRepository.getByFields(fields);
    }
}
