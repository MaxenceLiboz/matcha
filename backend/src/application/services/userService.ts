import { CreateUserUseCase } from '@application/use_cases/userUseCases';
import { CreateUserDTO, UserResponseDTO } from '@application/dtos/user.dto';

export class UserService {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
    ) {}

    async createUser(data: CreateUserDTO): Promise<UserResponseDTO> {
        return this.createUserUseCase.execute(data);
    }
}