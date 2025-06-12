import { Profile } from "@domain/entities/Profile";
import { CreateProfileDTO } from "../dtos/profile.dto";
import { IProfileRepository } from "@domain/repositories/IProfileRepository";
import { IPictureRepository } from "@domain/repositories/IPictureRepository";
import { Picture } from "@domain/entities/Picture";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs/promises";
import { ProfileUseCases } from "@application/use_cases/profileUseCases";
import { UserUseCases } from "@application/use_cases/userUseCases";
import { profile } from "console";
import { PictureUseCases } from "@application/use_cases/pictureUseCases";
import { CustomError } from "@domain/erros/CustomError";
import { HTTP_STATUS } from "@domain/erros/HTTP_StatusEnum";
import { LocationUseCases } from "@application/use_cases/locationUseCases";
import { TagUseCases } from "@application/use_cases/tagUseCases";

export class ProfileService {
  constructor(
    private readonly profileUseCases: ProfileUseCases,
    private readonly userUseCases: UserUseCases,
    private readonly pictureUseCases: PictureUseCases,
    private readonly locationUseCases: LocationUseCases,
    private readonly tagUseCases: TagUseCases
  ) {}

  async createProfile(
    user_id: number,
    data: CreateProfileDTO,
    files: Express.Multer.File[]
  ): Promise<Profile> {
    // 1. Check that the user exist
    const user = await this.userUseCases.getById(user_id);
    if (!user || !user.id) {
      throw new Error("User not found");
    }

    const profile = await this.profileUseCases.getByUserId(user_id);
    if (profile) {
      throw new CustomError("Profile already exist", HTTP_STATUS.CONFLICT);
    }

    // 2. Create the profile
    const new_profile = await this.profileUseCases.save(data, user_id);

    // 3. Save all images
    const images = await this.pictureUseCases.save(files, user_id);

    // 4. Save the location
    await this.locationUseCases.save(
      user.id,
      parseFloat(data.latitude),
      parseFloat(data.longitude),
      data.city
    );

    // 5. Save tags

    // 5. Process and link tags!
    if (data.interests) {
      const interestsArray = data.interests.split(";");
      await this.tagUseCases.processAndLinkTags(user_id, interestsArray);
    }

    return new_profile;
  }
}
