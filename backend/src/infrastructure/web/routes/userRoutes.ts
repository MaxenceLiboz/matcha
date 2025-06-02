import { Router } from 'express';
import { UserRepository } from '@infrastructure/database/repositories/UserRepositoryImpl';
import { UserService } from '@application/services/userService';
import { CreateUserUseCase } from '@application/use_cases/userUseCases';
import { UserController } from '../controllers/userController';
import { db } from '@infrastructure/database/database';
import validationMiddleware from '../middleware/validator/validatorMiddleware';
import { CreateUserSchema } from '@application/dtos/user.dto';
import { Verification } from '@domain/entities/Verification';

export const userRoutes = Router();

const userRepository = new UserRepository(db);

const createUserUseCase = new CreateUserUseCase(userRepository);

const userService = new UserService(createUserUseCase);
const userController = new UserController(userService);


userRoutes.post('/', validationMiddleware(CreateUserSchema), (req, res, next) => userController.createUser(req, res, next));
