import { Request, Response, NextFunction } from 'express';
import { UserService } from '@application/services/userService';
import { CreateUserDTO, SendUserVerificationOrForgotPasswordDTO, UserVerificationOrForgotPasswordDTO } from '@application/dtos/user.dto';
import { HTTP_STATUS } from '@domain/erros/HTTP_StatusEnum';
export class UserController {
    constructor(private userService: UserService ) {}

    async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const createUserDto: CreateUserDTO = req.body;
        const user = await this.userService.createUser(createUserDto);
        res.status(HTTP_STATUS.CREATED).json(user);
    }

    async sendUserVerification(req: Request, res: Response, next: NextFunction): Promise<void> {
        const sendUserVerificationOrForgotPasswordDTO: SendUserVerificationOrForgotPasswordDTO = req.body;
        const user = await this.userService.sendUserVerification(sendUserVerificationOrForgotPasswordDTO);
        res.status(HTTP_STATUS.NO_CONTENT).json(user);
    }

    async verifyUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userVerificationDto: UserVerificationOrForgotPasswordDTO = req.body;
        const user = await this.userService.verifyUser(userVerificationDto);
        res.status(HTTP_STATUS.NO_CONTENT).json(user);
    }
}