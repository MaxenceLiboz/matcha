/// <reference path="../../infrastructure/config/environment.d.ts"/>
import { User } from "@domain/entities/User";
import { IUserRepository } from "@domain/repositories/IUserRepository";
import { config } from "@infrastructure/config";
import { CreateUserDTO, UserResponseDTO } from "@application/dtos/user.dto";
import { EmailInUseError, UsernameInUseError } from "@domain/erros/UserErros";
import jwt, { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import { UnprocessableEntity } from "@domain/erros/UnprocessableEntity";
import { CustomError } from "@domain/erros/CustomError";
import { HTTP_STATUS } from "@domain/erros/HTTP_StatusEnum";


export class AuthUseCases {
    constructor(private readonly userRepository: IUserRepository) {}

    async registerUser(data: CreateUserDTO): Promise<UserResponseDTO> {
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

    async verifyUser(user_id: number) : Promise<void> {
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

    createJWTToken(user: User) : string {
        const payload = {
            id: user.id,
            email: user.email,
            username: user.username,
            firstName: user.first_name,
            lastName: user.last_name
        };

        const accessToken = jwt.sign(
            payload,
            config.JWT_SECRET,
            { expiresIn: config.JWT_EXPIRES_IN }
        );

        return accessToken
    }

    createJWTRefreshToken(user: User) : string {
        const payload = {
            id: user.id,
        };

        const refreshToken = jwt.sign(
            payload,
            config.JWT_REFRESH_SECRET,
            { expiresIn: config.JWT_REFRESH_EXPIRES_IN }
        );

        return refreshToken;
    }

    async refreshToken(token: string) : Promise<{access_token: string, refresh_token: string}> {
        if (!token) {
            throw new CustomError("No token provided", HTTP_STATUS.UNAUTHORIZED);
        }

        try {
            const decoded = jwt.verify(token, config.JWT_REFRESH_SECRET);

            if (!decoded || typeof decoded === 'string' || !decoded.id) {
                throw new CustomError("Invalid token", HTTP_STATUS.UNAUTHORIZED);
            }

            const user = await this.userRepository.getById(decoded.id);
    
            if (!user || !user.id) {
                throw new CustomError("Cannot find user", HTTP_STATUS.NOT_FOUND);
            }
    
            const access_token = this.createJWTToken(user);
            const refresh_token = this.createJWTRefreshToken(user);
            return {access_token, refresh_token};
        } catch (err) {
            throw new CustomError("Invalid token", HTTP_STATUS.UNAUTHORIZED);
        }
    }
}