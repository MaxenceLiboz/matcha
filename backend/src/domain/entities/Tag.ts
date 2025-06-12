import { AbstractEntity } from "./AbstractEntity";
import { CustomError } from "@domain/erros/CustomError";
import { HTTP_STATUS } from "@domain/erros/HTTP_StatusEnum";

export class Tag extends AbstractEntity {
  public name: string;

  private constructor(
    name: string,
    id?: number,
    created_at?: Date,
    updated_at?: Date,
  ) {
    super(id, created_at, updated_at);
    this.name = name;
  }

  // Factory for creating a NEW Tag instance (before DB persistence)
  public static create(name: string): Tag {
    if (!name || name.trim().length === 0) {
      throw new CustomError(
        "Tag name cannot be empty.",
        HTTP_STATUS.BAD_REQUEST,
      );
    }
    // id, created_at, updated_at are handled by the DB
    return new Tag(name.trim());
  }

  // Factory for hydrating a Tag instance from the database
  public static hydrate(
    id: number,
    name: string,
    created_at: Date,
    updated_at: Date,
  ): Tag {
    return new Tag(name, id, created_at, updated_at);
  }
}
