// Create new file: src/infrastructure/web/routes/pictureRoutes.ts
import { Router } from "express";
import { PictureController } from "../controllers/pictureController";
import { PictureUseCases } from "@application/use_cases/pictureUseCases";
import { PictureRepository } from "@infrastructure/database/repositories/PictureRepositoryImpl";
import { db } from "@infrastructure/database/database";
import { PictureService } from "@application/services/pictureService";

export const pictureRoutes = Router();

const pictureRepository = new PictureRepository(db);
const pictureUseCases = new PictureUseCases(pictureRepository);
const pictureService = new PictureService(pictureUseCases);
const pictureController = new PictureController(pictureService);

// Route definition
pictureRoutes.get("/:ref", (req, res, next) => pictureController.getPictureByRef(req, res, next));