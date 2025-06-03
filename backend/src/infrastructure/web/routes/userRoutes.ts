import { Router } from 'express';
import { UserRepository } from '@infrastructure/database/repositories/UserRepositoryImpl';
import { UserService } from '@application/services/userService';
import { CreateUserUseCase, GetUserUseCase } from '@application/use_cases/userUseCases';
import { UserController } from '../controllers/userController';
import { db } from '@infrastructure/database/database';
import validationMiddleware from '../middleware/validator/validatorMiddleware';
import { CreateUserSchema, UserVerificationSchema } from '@application/dtos/user.dto';
import { VerificationRepository } from '@infrastructure/database/repositories/VerificationRepositoryImpl';
import { CreateVerificationUseCase } from '@application/use_cases/verificationUseCases';
import { SendEmailUseCase } from '@application/use_cases/sendEmailUseCase';

export const userRoutes = Router();

const userRepository = new UserRepository(db);
const verificationRepository = new VerificationRepository(db);

const createUserUseCase = new CreateUserUseCase(userRepository);
const getUserUseCase = new GetUserUseCase(userRepository);
const createVerificationUseCase = new CreateVerificationUseCase(verificationRepository);
const sendEmailUseCase = new SendEmailUseCase();

const userService = new UserService(createUserUseCase, getUserUseCase, createVerificationUseCase, sendEmailUseCase);
const userController = new UserController(userService);


userRoutes.post('/', validationMiddleware(CreateUserSchema), (req, res, next) => userController.createUser(req, res, next));
userRoutes.post('/verification', validationMiddleware(UserVerificationSchema), (req, res, next) => userController.sendUserVerification(req, res, next));
