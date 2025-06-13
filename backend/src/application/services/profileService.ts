import { Profile } from "@domain/entities/Profile";
import { CreateProfileDTO, FullProfileDTO } from "../dtos/profile.dto";
import { ProfileUseCases } from "@application/use_cases/profileUseCases";
import { UserUseCases } from "@application/use_cases/userUseCases";
import { PictureUseCases } from "@application/use_cases/pictureUseCases";
import { CustomError } from "@domain/erros/CustomError";
import { HTTP_STATUS } from "@domain/erros/HTTP_StatusEnum";
import { LocationUseCases } from "@application/use_cases/locationUseCases";
import { TagUseCases } from "@application/use_cases/tagUseCases";
import { UserNotFoundError } from "@domain/erros/UserErros";
import path from "path";
import { Location } from "@domain/entities/Location";
import { LocationResponseDTO } from "@application/dtos/location.dto";

export class ProfileService {
  constructor(
    private readonly profileUseCases: ProfileUseCases,
    private readonly userUseCases: UserUseCases,
    private readonly pictureUseCases: PictureUseCases,
    private readonly locationUseCases: LocationUseCases,
    private readonly tagUseCases: TagUseCases
  ) {}

  async createProfile(user_id: number, data: CreateProfileDTO, files: Express.Multer.File[]): Promise<Profile> {
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
    await this.locationUseCases.save(user.id, parseFloat(data.latitude), parseFloat(data.longitude), data.city);

    // 5. Save tags
    if (data.interests) {
      const interestsArray = data.interests.split(";");
      await this.tagUseCases.processAndLinkTags(user_id, interestsArray);
    }

    return new_profile;
  }

  async getProfileByUserId(user_id: number): Promise<FullProfileDTO> {
    // 1. Get basic user info
    const user = await this.userUseCases.getById(user_id);
    if (!user) {
      throw new UserNotFoundError();
    }

    // 2. Fetch profile
    const profile = await this.profileUseCases.getByUserId(user_id);
    if (!profile) {
      throw new CustomError("Profile not found for this user.", HTTP_STATUS.NOT_FOUND);
    }

    // 3. Fetch location
    const location = await this.locationUseCases.getByFields({ user_id });
    let locationDTO: LocationResponseDTO | null = null;
    if (location) {
      locationDTO = {
        latitude: location.latitude.toString(),
        longitude: location.longitude.toString(),
        city: location.city,
      };
    }

    // 4. Fetch pictures reference
    const pictures = await this.pictureUseCases.getByFields({ user_id });
    let profile_picture_ref: string = "";
    let other_picture_ref: string[] = [];

    pictures.forEach((picture) => {
      if (picture.is_profile) {
        profile_picture_ref = picture.ref;
      } else {
        other_picture_ref.push(picture.ref);
      }
    });

    // 5. Fetch tags
    const tags = await this.tagUseCases.getByUserId(user_id);

    // Map everything to our DTO
    return {
      id: user.id!,
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      age: profile.age,
      gender: profile.gender,
      sexualPreference: profile.sexual_preference,
      fameRating: profile.fame_rating,
      biography: profile.biography,
      location: locationDTO,
      profile_picture_ref,
      other_picture_ref,
      tags: tags.map((tag) => ({ name: tag.name })),
    };
  }
}
