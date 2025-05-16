import { Request, Response, NextFunction } from 'express';
import { UserService } from '@application/services/userService';
import { CreateUserDTO } from '@application/dtos/user.dto';
import { EmailInUseError, UsernameInUseError } from '@domain/erros/UserErros';

export class UserController {
    constructor(
        private userService: UserService 
    ) {}

    async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const createUserDto: CreateUserDTO = req.body;
            const user = await this.userService.createUser(createUserDto);
            res.status(201).json(user);
        } catch (error) {
            if (error instanceof EmailInUseError || error instanceof UsernameInUseError) {
                res.status(409).json({ message: error.message }); // Conflict
            } else if (error instanceof Error && error.message.includes("required")) {
                res.status(400).json({ message: error.message });
            }
            else {
                next(error);
            }
        }
    }
}