import { CreateProfileDTO } from "@application/dtos/profile.dto";
import { Profile } from "@domain/entities/Profile";
import { IProfileRepository } from "@domain/repositories/IProfileRepository";

export class ProfileUseCases {
  constructor(private readonly profileRepository: IProfileRepository) {}

  async save(profile: CreateProfileDTO, user_id: number): Promise<Profile> {
    const profileToCreate = Profile.create(
      user_id,
      profile.age,
      profile.gender,
      profile.sexual_preference,
      0,
    );
    return await this.profileRepository.save(profileToCreate);
  }

  async getByUserId(user_id: number): Promise<Profile | null> {
    const profiles = await this.profileRepository.getByFields({ user_id });

    if (profiles.length > 1 || profiles.length === 0) {
      return null;
    }
    return profiles[0];
  }
}
