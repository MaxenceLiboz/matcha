import { CreateUserDTO, UserResponseDTO, SendUserVerificationOrForgotPasswordDTO, UserVerificationOrForgotPasswordDTO, LoginUserDTO, JWTTokenResponseDTO } from '@application/dtos/user.dto';
import { UserUseCases } from '@application/use_cases/userUseCases';
import { VerificationUseCases } from '@application/use_cases/verificationUseCases';
import { SendEmailUseCase } from '@application/use_cases/sendEmailUseCase';
import {v4 as uuidv4} from 'uuid';
import { config } from '@infrastructure/config';
import { CustomError } from '@domain/erros/CustomError';
import { HTTP_STATUS } from '@domain/erros/HTTP_StatusEnum';
import bcrypt from 'bcrypt';
import { AuthUseCases } from '@application/use_cases/authUseCases';

export class UserService {
    constructor(
        private readonly userUseCases: UserUseCases
    ) {}
}