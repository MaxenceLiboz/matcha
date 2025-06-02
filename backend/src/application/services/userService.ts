import { CreateUserUseCase } from '@application/use_cases/userUseCases';
import { CreateUserDTO, UserResponseDTO } from '@application/dtos/user.dto';
import { CreateVerificationUseCase } from '@application/use_cases/verificationUseCases';
import { SendEmailUseCase } from '@application/use_cases/sendEmailUseCase';

export class UserService {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly createVerificationUseCase: CreateVerificationUseCase,
        private readonly sendEmailUseCase: SendEmailUseCase
    ) {}

    async createUser(data: CreateUserDTO): Promise<UserResponseDTO> {
        const user = await this.createUserUseCase.execute(data);

        // Create the expiration date
        let expiration_date = new Date(); 
        expiration_date.setDate(expiration_date.getDate() + 1);

        
        const verification = await this.createVerificationUseCase.execute({
            expiration_date: expiration_date,
            type: 'email_verification',
            user_id: user.id,
            unique_token: window.crypto.randomUUID()
        });

        this.sendEmailUseCase.execute({
            to: `${user.email}`,
            subject: "Verification de votre compte",
            text: verification.unique_token,
        })
        
        return user;
    }
}