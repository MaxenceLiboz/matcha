import { CreateUserUseCase, VerifyUserUseCase, GetUserByUsernameAndEmailUseCase } from '@application/use_cases/userUseCases';
import { CreateUserDTO, UserResponseDTO, SendUserVerificationOrForgotPasswordDTO, UserVerificationOrForgotPasswordDTO } from '@application/dtos/user.dto';
import { CreateVerificationUseCase, ExpireVerificationUseCase, GetValidVerificationByTokenUseCase } from '@application/use_cases/verificationUseCases';
import { SendEmailUseCase } from '@application/use_cases/sendEmailUseCase';
import {v4 as uuidv4} from 'uuid';
import { config } from '@infrastructure/config';
import { CustomError } from '@domain/erros/CustomError';
import { HTTP_STATUS } from '@domain/erros/HTTP_StatusEnum';

export class UserService {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly getUserByUsernameAndEmailUseCase: GetUserByUsernameAndEmailUseCase,
        private readonly verifyUserUseCase: VerifyUserUseCase,
        private readonly createVerificationUseCase: CreateVerificationUseCase,
        private readonly getValidVerificationByTokenUseCase: GetValidVerificationByTokenUseCase,
        private readonly expireVerificationUseCase: ExpireVerificationUseCase,
        private readonly sendEmailUseCase: SendEmailUseCase
    ) {}

    async createUser(data: CreateUserDTO): Promise<UserResponseDTO> {
        const user = await this.createUserUseCase.execute(data);

        this.sendVerificationEmail(user);
        return user;
    }

    async sendUserVerification(data: SendUserVerificationOrForgotPasswordDTO) : Promise<void> {
        const user = await this.getUserByUsernameAndEmailUseCase.execute(data);

        if (user.verified == false) {
            await this.sendVerificationEmail(user);
            return;
        }
        throw new CustomError('User already verified, try to login', HTTP_STATUS.BAD_REQUEST);
    }

    async verifyUser(data: UserVerificationOrForgotPasswordDTO) : Promise<void> {
        const verification = await this.getValidVerificationByTokenUseCase.execute(data.token);

        // If token found is not good type throw
        if (verification.type != 'email_verification') {
            throw new CustomError("The token given is not an email verification token", HTTP_STATUS.BAD_REQUEST);
        }
        
        // Verify the user link to the verification token
        await this.verifyUserUseCase.execute(verification.user_id);

        // Expire the current verification
        await this.expireVerificationUseCase.execute(verification);
    }

    private async sendVerificationEmail(user: UserResponseDTO) {
        let expiration_date = new Date();
        expiration_date.setDate(expiration_date.getDate() + 1);

        // Create the verification token
        const verification = await this.createVerificationUseCase.execute({
            expiration_date: expiration_date,
            type: 'email_verification',
            user_id: user.id,
            unique_token: uuidv4()
        });

        // Send email
        this.sendEmailUseCase.execute({
            to: `${user.email}`,
            subject: "Verification de votre compte",
            text: `http://${config.FRONTEND_HOST}:${config.FRONTEND_PORT}/login?j=${verification.unique_token}`,
        });
    }
}