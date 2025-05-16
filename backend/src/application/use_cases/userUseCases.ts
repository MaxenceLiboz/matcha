import { User } from '@domain/entities/User';
import { IUserRepository } from '@domain/repositories/IUserRepository';
import { CreateUserDTO, UserResponseDTO } from '@application/dtos/user.dto';
import { EmailInUseError, UsernameInUseError } from '@domain/erros/UserErros';

export class CreateUserUseCase {
    constructor(private readonly userRepository: IUserRepository) {}
  
    async execute(data: CreateUserDTO): Promise<UserResponseDTO> {
        // Check either the username or email that needs to be unique already exist
        const existingUser: User | null = await this.userRepository.getUserByUsernameOrEmail(data.email, data.username);
        if (existingUser && existingUser.email === data.email) {
            throw new EmailInUseError(data.email);
        } else if (existingUser && existingUser.username === data.username) {
            throw new UsernameInUseError(data.username);
        }

        let userToSave = User.create(data.email, data.first_name, data.last_name, data.username);
        
        // The save method now returns the user with DB-generated id, created_at, updated_at
        const savedUser = await this.userRepository.save(userToSave);
        
        // Ensure savedUser has an ID, or throw an error if persistence failed silently (shouldn't happen with good repo)
        if (!savedUser.id || !savedUser.created_at || !savedUser.updated_at) {
            throw new Error('User persistence failed to return generated fields.');
        }

        return {
            // id: savedUser.id,
            email: savedUser.email,
            first_name: savedUser.first_name,
            last_name: savedUser.last_name,
            username: savedUser.username,
            verified: savedUser.verified
        };
    }
  }

  