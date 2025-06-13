/// <reference path="../../config/environment.d.ts"/>
import { NextFunction, Request, Response } from "express";
import { ProfileService } from "@application/services/profileService";
import { CreateProfileDTO } from "@application/dtos/profile.dto";
import { HTTP_STATUS } from "@domain/erros/HTTP_StatusEnum";
import { CustomError } from "@domain/erros/CustomError";

export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  ping(req: Request, res: Response, next: NextFunction): void {
    res.status(HTTP_STATUS.OK).json();
  }

  async createProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        throw new CustomError("Unauthorized", HTTP_STATUS.UNAUTHORIZED);
      }

      const profileData: CreateProfileDTO = req.body;
      const files = req.files as Express.Multer.File[];

      const newProfile = await this.profileService.createProfile(userId, profileData, files);

      res.status(HTTP_STATUS.CREATED).json(newProfile);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError("Unprocessable entity", HTTP_STATUS.UNPROCESSABLE_ENTITY, error);
    }
  }

  async getOwnProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new CustomError("Unauthorized", HTTP_STATUS.UNAUTHORIZED);
      }
      const profile = await this.profileService.getProfileByUserId(userId);
      res.status(HTTP_STATUS.OK).json(profile);
    } catch (error) {
      next(error);
    }
  }
}
