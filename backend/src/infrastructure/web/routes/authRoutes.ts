import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { AuthService } from "@application/services/authSevice";
import { UserUseCases } from "@application/use_cases/userUseCases";
import { AuthUseCases } from "@application/use_cases/authUseCases";
import { UserRepository } from "@infrastructure/database/repositories/UserRepositoryImpl";
import { db } from "@infrastructure/database/database";
import validationMiddleware from "../middleware/validator/validatorMiddleware";
import {
  CreateUserSchema,
  LoginUserSchema,
  ResetPasswordSchema,
  SendUserVerificationOrForgotPasswordSchema,
  UserVerificationOrForgotPasswordSchema,
} from "@application/dtos/user.dto";
import { VerificationUseCases } from "@application/use_cases/verificationUseCases";
import { SendEmailUseCase } from "@application/use_cases/sendEmailUseCase";
import { VerificationRepository } from "@infrastructure/database/repositories/VerificationRepositoryImpl";

export const authRoutes = Router();

const userRepository = new UserRepository(db);
const verificationRepository = new VerificationRepository(db);

const authUseCases = new AuthUseCases(userRepository);
const userUseCases = new UserUseCases(userRepository);
const verificationUseCases = new VerificationUseCases(verificationRepository);
const sendEmailUseCase = new SendEmailUseCase();

const authService = new AuthService(authUseCases, userUseCases, verificationUseCases, sendEmailUseCase);
const authController = new AuthController(authService);

authRoutes.post("/login", validationMiddleware(LoginUserSchema), (req, res, next) =>
  authController.loginUser(req, res, next)
);

authRoutes.post("/register", validationMiddleware(CreateUserSchema), (req, res, next) =>
  authController.registerUser(req, res, next)
);

authRoutes.post(
  "/send-verification",
  validationMiddleware(SendUserVerificationOrForgotPasswordSchema),
  (req, res, next) => authController.sendUserVerification(req, res, next)
);

authRoutes.post(
  "/forgot-password",
  validationMiddleware(SendUserVerificationOrForgotPasswordSchema),
  (req, res, next) => authController.forgotPassword(req, res, next)
);

authRoutes.post("/verify-user", validationMiddleware(UserVerificationOrForgotPasswordSchema), (req, res, next) =>
  authController.verifyUser(req, res, next)
);

authRoutes.get("/refresh-token", (req, res, next) => authController.refreshUserToken(req, res, next));

authRoutes.post("/reset-password", validationMiddleware(ResetPasswordSchema), (req, res, next) =>
  authController.resetPassword(req, res, next)
);
