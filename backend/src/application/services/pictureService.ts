import { PictureUseCases } from "@application/use_cases/pictureUseCases";
import { CustomError } from "@domain/erros/CustomError";
import { HTTP_STATUS } from "@domain/erros/HTTP_StatusEnum";
import path from "path";
import fs from "fs";
import { Picture } from "@domain/entities/Picture";

export class PictureService {
    constructor(private readonly pictureUseCases: PictureUseCases) {}

    async getPictureByRef(ref: string) : Promise<Picture> {
        if (!ref) {
          throw new CustomError("Picture reference is required.", HTTP_STATUS.BAD_REQUEST);
        }
  
        // We only need one picture
        const pictures = await this.pictureUseCases.getByFields({ ref });
        if (pictures.length === 0) {
          throw new CustomError("Picture not found.", HTTP_STATUS.NOT_FOUND);
        }
        const picture = pictures[0];

        return picture;
    }
}