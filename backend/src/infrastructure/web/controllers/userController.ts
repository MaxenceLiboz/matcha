import { Request, Response, NextFunction } from 'express';
import { UserService } from '@application/services/userService';
import { CreateUserDTO } from '@application/dtos/user.dto';
export class UserController {
    constructor(private userService: UserService ) {}

    async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const createUserDto: CreateUserDTO = req.body;
        const user = await this.userService.createUser(createUserDto);
        res.status(201).json(user);
    }
}