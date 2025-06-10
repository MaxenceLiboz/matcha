import { NextFunction, Request, Response } from "express";
import { ProfileService } from "@application/services/profileService";
import { CreateProfileDTO } from "@application/dtos/profile.dto";
import { HTTP_STATUS } from "@domain/erros/HTTP_StatusEnum";

export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    ping (req: Request, res: Response, next: NextFunction): void {
        res.status(HTTP_STATUS.OK).json();
    }

    async createProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = (req as any).user.id;
        const profileData: CreateProfileDTO = req.body;
        const files = req.files as Express.Multer.File[];

        const newProfile = await this.profileService.createProfile(userId, profileData, files);
        
        res.status(HTTP_STATUS.CREATED).json(newProfile);
    }
}