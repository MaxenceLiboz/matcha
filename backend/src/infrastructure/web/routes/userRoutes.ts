import { Router } from 'express';
import { UserRepository } from '@infrastructure/database/repositories/UserRepositoryImpl';
import { UserService } from '@application/services/userService';
import { CreateUserUseCase, GetUserByUsernameAndEmailUseCase, VerifyUserUseCase } from '@application/use_cases/userUseCases';
import { UserController } from '../controllers/userController';
import { db } from '@infrastructure/database/database';
import validationMiddleware from '../middleware/validator/validatorMiddleware';
import { CreateUserSchema, SendUserVerificationOrForgotPasswordSchema, UserVerificationOrForgotPasswordSchema } from '@application/dtos/user.dto';
import { VerificationRepository } from '@infrastructure/database/repositories/VerificationRepositoryImpl';
import { CreateVerificationUseCase, ExpireVerificationUseCase, GetValidVerificationByTokenUseCase } from '@application/use_cases/verificationUseCases';
import { SendEmailUseCase } from '@application/use_cases/sendEmailUseCase';

export const userRoutes = Router();

const userRepository = new UserRepository(db);
const verificationRepository = new VerificationRepository(db);

const createUserUseCase = new CreateUserUseCase(userRepository);
const getUserUseByUsernameAndEmailCase = new GetUserByUsernameAndEmailUseCase(userRepository);

const verifyUserUseCase = new VerifyUserUseCase(userRepository);
const createVerificationUseCase = new CreateVerificationUseCase(verificationRepository);
const getValidVerificationByTokenUseCase = new GetValidVerificationByTokenUseCase(verificationRepository);
const expireVerificationUseCase = new ExpireVerificationUseCase(verificationRepository);

const sendEmailUseCase = new SendEmailUseCase();

const userService = new UserService(createUserUseCase, getUserUseByUsernameAndEmailCase, verifyUserUseCase, createVerificationUseCase, getValidVerificationByTokenUseCase, expireVerificationUseCase, sendEmailUseCase);
const userController = new UserController(userService);


userRoutes.post('/', validationMiddleware(CreateUserSchema), (req, res, next) => userController.createUser(req, res, next));
userRoutes.post('/verification', validationMiddleware(SendUserVerificationOrForgotPasswordSchema), (req, res, next) => userController.sendUserVerification(req, res, next));
userRoutes.post('/verify-user', validationMiddleware(UserVerificationOrForgotPasswordSchema), (req, res, next) => userController.verifyUser(req, res, next));
