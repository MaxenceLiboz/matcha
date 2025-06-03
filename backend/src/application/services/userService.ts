import { CreateUserUseCase, GetUserUseCase } from '@application/use_cases/userUseCases';
import { CreateUserDTO, UserResponseDTO, UserVerificationDTO } from '@application/dtos/user.dto';
import { CreateVerificationUseCase } from '@application/use_cases/verificationUseCases';
import { SendEmailUseCase } from '@application/use_cases/sendEmailUseCase';
import {v4 as uuidv4} from 'uuid';
import { config } from '@infrastructure/config';

export class UserService {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly getUserUseCase: GetUserUseCase,
        private readonly createVerificationUseCase: CreateVerificationUseCase,
        private readonly sendEmailUseCase: SendEmailUseCase
    ) {}

    async createUser(data: CreateUserDTO): Promise<UserResponseDTO> {
        const user = await this.createUserUseCase.execute(data);

        // Create the expiration date
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
        })
        
        return user;
    }

    async sendUserVerification(data: UserVerificationDTO) : Promise<void> {
        const user = await this.getUserUseCase.execute(data);

        // Create the expiration date
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
        })

    }
}