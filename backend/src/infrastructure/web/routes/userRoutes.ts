import { Router } from "express";
import { db } from "@infrastructure/database/database";
import { UserController } from "../controllers/userController";
import { UserService } from "@application/services/userService";
import { UserRepository } from "@infrastructure/database/repositories/UserRepositoryImpl";
import { UserUseCases } from "@application/use_cases/userUseCases";

export const userRoutes = Router();

const userRepository = new UserRepository(db);

const userUseCases = new UserUseCases(userRepository);

const userService = new UserService(userUseCases);
const userController = new UserController(userService);

userRoutes.get("/ping", userController.ping);
