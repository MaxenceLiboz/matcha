// src/domain/repositories/ITagRepository.ts
import { Tag } from "@domain/entities/Tag"; // Assuming you'll create a simple Tag entity
import { IAbstractRepository } from "./IAbstractRepository";

export interface ITagRepository extends IAbstractRepository<Tag> {
  findOrCreate(name: string): Promise<Tag>;
  linkUserToTag(userId: number, tagId: number): Promise<void>;
  getByUserId(user_id: number): Promise<Tag[]>;
}
