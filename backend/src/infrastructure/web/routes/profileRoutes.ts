import { Router } from "express";
import { db } from "@infrastructure/database/database";
import validationMiddleware from "../middleware/validator/validatorMiddleware";
import { CreateProfileSchema } from "@application/dtos/profile.dto";
import { ProfileRepository } from "@infrastructure/database/repositories/ProfileRepositoryImpl";
import { PictureRepository } from "@infrastructure/database/repositories/PictureRepositoryImpl";
import { ProfileService } from "@application/services/profileService";
import { ProfileController } from "../controllers/profileController";
import { fileValidationMiddleware } from "../middleware/validator/fileValidationMiddleware";
import multer from "multer";
import { ProfileUseCases } from "@application/use_cases/profileUseCases";
import { UserUseCases } from "@application/use_cases/userUseCases";
import { PictureUseCases } from "@application/use_cases/pictureUseCases";
import { UserRepository } from "@infrastructure/database/repositories/UserRepositoryImpl";
import { LocationRepository } from "@infrastructure/database/repositories/LocationRepositoryImpl";
import { LocationUseCases } from "@application/use_cases/locationUseCases";
import { TagRepository } from "@infrastructure/database/repositories/TagReposiotryImpl";
import { TagUseCases } from "@application/use_cases/tagUseCases";

export const profileRoutes = Router();

const upload = multer({ storage: multer.memoryStorage() }).fields([
  { name: "profile_picture", maxCount: 1 },
  { name: "other_pictures", maxCount: 4 },
]);

const profileRepository = new ProfileRepository(db);
const pictureRepository = new PictureRepository(db);
const userRepository = new UserRepository(db);
const locationRepository = new LocationRepository(db);
const tagRepository = new TagRepository(db);

const profileUseCases = new ProfileUseCases(profileRepository);
const userUseCases = new UserUseCases(userRepository);
const pictureUseCases = new PictureUseCases(pictureRepository);
const locationUseCases = new LocationUseCases(locationRepository);
const tagUseCases = new TagUseCases(tagRepository);

const profileService = new ProfileService(
  profileUseCases,
  userUseCases,
  pictureUseCases,
  locationUseCases,
  tagUseCases
);
const profileController = new ProfileController(profileService);

profileRoutes.post("/ping", (req, res, next) => profileController.ping(req, res, next));

profileRoutes.post(
  "/",
  upload,
  validationMiddleware(CreateProfileSchema, "body"),
  fileValidationMiddleware({
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
    requiredFields: ["profile_picture"],
    minTotalFileCount: 1,
  }),
  (req, res, next) => profileController.createProfile(req, res, next)
);

profileRoutes.get("/", (req, res, next) => profileController.getOwnProfile(req, res, next));
