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
      0
    );
    return await this.profileRepository.save(profileToCreate);
  }
}
