import { CreateUserDTO, LoginUserDTO, SendUserVerificationOrForgotPasswordDTO, UserVerificationOrForgotPasswordDTO } from "@application/dtos/user.dto";
import { AuthService } from "@application/services/authSevice";
import { HTTP_STATUS } from "@domain/erros/HTTP_StatusEnum";
import { NextFunction, Request, response, Response } from "express";

export class AuthController {
    constructor(private authService: AuthService) {}

    async loginUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const loginUserDTO: LoginUserDTO = req.body;
        const jwtTokenResponse = await this.authService.loginUser(loginUserDTO);
        res.status(HTTP_STATUS.OK).json(jwtTokenResponse);
    }

    async registerUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const createUserDto: CreateUserDTO = req.body;
        await this.authService.registerUser(createUserDto);
        res.status(HTTP_STATUS.CREATED).json();
    }

    async sendUserVerification(req: Request, res: Response, next: NextFunction): Promise<void> {
        const sendUserVerificationOrForgotPasswordDTO: SendUserVerificationOrForgotPasswordDTO = req.body;
        await this.authService.sendUserVerification(sendUserVerificationOrForgotPasswordDTO);
        res.status(HTTP_STATUS.NO_CONTENT).json();
    }

    async verifyUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userVerificationDto: UserVerificationOrForgotPasswordDTO = req.body;
        await this.authService.verifyUser(userVerificationDto);
        res.status(HTTP_STATUS.NO_CONTENT).json();
    }

    async refreshUserToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            res.status(HTTP_STATUS.UNAUTHORIZED).json();
            return;
        }

        const jwtTokenResponse = await this.authService.refreshUserToken(token);
        res.status(HTTP_STATUS.OK).json(jwtTokenResponse);
    }

}