import { TagResponseDTO } from "@application/dtos/tag.dto";
import { TagUseCases } from "@application/use_cases/tagUseCases";

export class TagService {
  constructor(private readonly tagUseCases: TagUseCases) {}

  async getAllTags(): Promise<TagResponseDTO[]> {
    return this.tagUseCases.getAllTags();
  }
}
