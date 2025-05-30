import { User } from '@domain/entities/User';
import { IUserRepository } from '@domain/repositories/IUserRepository';
import { CreateUserDTO, UserResponseDTO } from '@application/dtos/user.dto';
import { EmailInUseError, UsernameInUseError } from '@domain/erros/UserErros';
import { UnprocessableEntity } from '@domain/erros/UnprocessableEntity';
import bcrypt from 'bcrypt';

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
            
            return {
                // id: savedUser.id,
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

  