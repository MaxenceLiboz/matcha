import { Request, Response, NextFunction } from 'express';
import { UserService } from '@application/services/userService';
import { CreateUserDTO, LoginUserDTO, SendUserVerificationOrForgotPasswordDTO, UserVerificationOrForgotPasswordDTO } from '@application/dtos/user.dto';
import { HTTP_STATUS } from '@domain/erros/HTTP_StatusEnum';
export class UserController {
    constructor(private userService: UserService ) {}

    async ping(req: Request, res: Response, next: NextFunction): Promise<void> {
        res.status(HTTP_STATUS.OK).json();
    }
}