// Create new file: src/infrastructure/web/controllers/pictureController.ts
import { NextFunction, Request, Response } from "express";
import { PictureUseCases } from "@application/use_cases/pictureUseCases";
import { CustomError } from "@domain/erros/CustomError";
import { HTTP_STATUS } from "@domain/erros/HTTP_StatusEnum";
import path from "path";
import fs from "fs";
import { PictureService } from "@application/services/pictureService";

export class PictureController {
  constructor(private readonly pictureService: PictureService) {}
  async getPictureByRef(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const ref = req.params.ref;

      const picture = await this.pictureService.getPictureByRef(ref);

      // Construct the full path to the image
      const filePath = path.join(__dirname, "..", "..", "..", "uploads", picture.ref);

      // Check if file exists before sending
      if (!fs.existsSync(filePath)) {
        throw new CustomError("File not found on server.", HTTP_STATUS.NOT_FOUND);
      }

      // Set the content type and send the file
      res.setHeader("Content-Type", picture.mime_type);
      res.sendFile(filePath);
    } catch (error) {
      next(error);
    }
  }
}
