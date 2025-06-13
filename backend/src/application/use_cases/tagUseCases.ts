import { TagResponseDTO } from "@application/dtos/tag.dto";
import { ITagRepository } from "@domain/repositories/ITagrepository";

export class TagUseCases {
  constructor(private readonly tagRepository: ITagRepository) {}

  async processAndLinkTags(userId: number, interests: string[]): Promise<void> {
    if (!interests || interests.length === 0) {
      return;
    }

    for (const interestName of interests) {
      // Clean up the tag name (remove '#' and trim whitespace)
      const cleanedName = interestName.replace(/#/g, "").trim();
      if (cleanedName.length === 0) continue;

      // Find an existing tag or create a new one
      const tag = await this.tagRepository.findOrCreate(cleanedName);

      // Link the tag to the user
      if (tag && tag.id) {
        await this.tagRepository.linkUserToTag(userId, tag.id);
      }
    }
  }

  async getAllTags(): Promise<TagResponseDTO[]> {
    const tags = await this.tagRepository.getByFields({});

    return tags.map((tag) => ({
      name: tag.name,
    }));
  }
}
