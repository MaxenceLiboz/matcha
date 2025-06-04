import { User } from '@domain/entities/User';
import { IUserRepository } from '@domain/repositories/IUserRepository';
import { CreateUserDTO, UserResponseDTO, SendUserVerificationOrForgotPasswordDTO } from '@application/dtos/user.dto';
import { EmailInUseError, UsernameInUseError } from '@domain/erros/UserErros';
import { UnprocessableEntity } from '@domain/erros/UnprocessableEntity';
import bcrypt from 'bcrypt';
import { CustomError } from '@domain/erros/CustomError';
import { HTTP_STATUS } from '@domain/erros/HTTP_StatusEnum';

export class CreateUserUseCase {
    constructor(private readonly userRepository: IUserRepository) {}
  
    async execute(data: CreateUserDTO): Promise<UserResponseDTO> {
        const userToSave = User.create(data.email, data.first_name, data.last_name, data.username);
        // Check either the username or email that needs to be unique already exist
        const existingUser: User | null = await this.userRepository.getUserByUsernameOrEmail(data.username, data.email);
        if (existingUser && existingUser.email === data.email) {
            throw new EmailInUseError(data.email);
        } else if (existingUser && existingUser.username === data.username) {
            throw new UsernameInUseError(data.username);
        }

        // Needs to add hashing the password with bycript
        const hash_password = await bcrypt.hash(data.password, 10);
        
        // The save method now returns the user with DB-generated id, created_at, updated_at
        try {
            const savedUser = await this.userRepository.save(userToSave, hash_password);
            
            if (!savedUser.id) {
                throw new UnprocessableEntity("Creation of the user failed.");
            }
            return {
                id: savedUser.id,
                email: savedUser.email,
                first_name: savedUser.first_name,
                last_name: savedUser.last_name,
                username: savedUser.username,
                verified: savedUser.verified
            };
        } catch (error) {
            throw new UnprocessableEntity("Creation of the user failed.", error);
        }
    }
}

export class GetUserByUsernameAndEmailUseCase {
    constructor(private readonly userRepository: IUserRepository) {}

    async execute(data: SendUserVerificationOrForgotPasswordDTO) : Promise<UserResponseDTO> {
        const user = await this.userRepository.getUserByUsernameAndEmail(data.username, data.email);

        if (!user || !user.id) {
            throw new CustomError("Cannot find user", HTTP_STATUS.NOT_FOUND);
        }
        
        return {
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            verified: user.verified
        };
    }
}

export class VerifyUserUseCase {
    constructor(private readonly userRepository: IUserRepository) {}

    async execute(user_id: number) : Promise<void> {
        const user = await this.userRepository.getById(user_id);

        if (!user || !user.id) {
            throw new CustomError("Cannot find user", HTTP_STATUS.NOT_FOUND);
        }

        if (user.verified == true) {
            throw new CustomError("User already verified", HTTP_STATUS.CONFLICT);
        }

        user.verified = true;
        await this.userRepository.save(user);
    }
}
  