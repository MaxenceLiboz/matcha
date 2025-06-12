import { User } from '@domain/entities/User';
import { IUserRepository } from '@domain/repositories/IUserRepository';
import { CreateUserDTO, UserResponseDTO, SendUserVerificationOrForgotPasswordDTO } from '@application/dtos/user.dto';
import { EmailInUseError, UsernameInUseError } from '@domain/erros/UserErros';
import { UnprocessableEntity } from '@domain/erros/UnprocessableEntity';
import bcrypt from 'bcrypt';
import { CustomError } from '@domain/erros/CustomError';
import { HTTP_STATUS } from '@domain/erros/HTTP_StatusEnum';

export class UserUseCases {
    constructor(private readonly userRepository: IUserRepository) {}

    async getUserByUsernameAndEmail(data: SendUserVerificationOrForgotPasswordDTO) : Promise<UserResponseDTO> {
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

    async getUserByUsernameOrEmail(username: string, email: string): Promise<User | null> {
        return await this.userRepository.getUserByUsernameOrEmail(username, email);
    }

    async getByFileds(fileds: {[filed: string]: any}): Promise<User[]> {
        return await this.userRepository.getByFields(fileds);
    }

    async getById(id: number): Promise<User | null> {
        return await this.userRepository.getById(id);
    }
}