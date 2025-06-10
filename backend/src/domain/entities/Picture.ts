import { AbstractEntity } from "@domain/entities/AbstractEntity";
import { CustomError } from "@domain/erros/CustomError";
import { HTTP_STATUS } from "@domain/erros/HTTP_StatusEnum";

export class Picture extends AbstractEntity {
  public user_id: number;
  public ref: string;
  public mime_type: string;
  public is_profile: boolean;

  private constructor(
    user_id: number,
    ref: string,
    mime_type: string,
    is_profile?: boolean,
    id?: number,
    created_at?: Date,
    updated_at?: Date
  ) {
    super(id, created_at, updated_at);
    this.user_id = user_id;
    this.ref = ref;
    this.mime_type = mime_type;
    this.is_profile = is_profile || false;
  }

  // Factory for creating a NEW picture instance
  public static create(
    user_id: number,
    ref: string,
    mime_type: string,
    is_profile?: boolean
  ): Picture {
    if (!user_id || !ref || !mime_type) {
      throw new CustomError(
        `User ID, ref, and mime_type are required [user_id: ${user_id}, ref: ${ref}, mime_type: ${mime_type}]`,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    return new Picture(user_id, ref, mime_type, is_profile);
  }

  // Factory for hydrating a db picture instance
  public static hydrate(
    id: number,
    user_id: number,
    ref: string,
    mime_type: string,
    is_profile: boolean,
    created_at: Date,
    updated_at: Date
  ): Picture {
    return new Picture(
      user_id,
      ref,
      mime_type,
      is_profile,
      id,
      created_at,
      updated_at
    );
  }
}
