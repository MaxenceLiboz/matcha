import { Selectable, Kysely, Insertable, Updateable } from "kysely"; // Import Kysely utility types
import { DB, User as UserTable } from "@infrastructure/database/db";
import { IUserRepository } from "@domain/repositories/IUserRepository";
import { User } from "@domain/entities/User";
import { UserMapper } from "../mappers/UserMapper";
import { CustomError } from "@domain/erros/CustomError";
import { HTTP_STATUS } from "@domain/erros/HTTP_StatusEnum";
import { UnprocessableEntity } from "@domain/erros/UnprocessableEntity";
import { UserNotFoundError } from "@domain/erros/UserErros";
import { AbstractRepositoryImpl, IMapper } from "./AbstactRepositoryImpl";

export class UserRepository extends AbstractRepositoryImpl<User, "User"> implements IUserRepository {
  constructor(db: Kysely<DB>) {
    super(db, "User", UserMapper as IMapper<Selectable<UserTable>, User>);
  }

  async getUserByUsernameOrEmail(username: string, email: string): Promise<User | null> {
    if (!username || !email) {
      throw new CustomError("Username or email is undefined.", HTTP_STATUS.BAD_REQUEST);
    }
    const user = await this.db
      .selectFrom("User")
      .selectAll()
      .where((eb) => eb.or([eb("username", "=", username), eb("email", "=", email)]))
      .executeTakeFirst();
    if (!user) {
      return null;
    }
    return UserMapper.toDomain(user);
  }

  async getUserByUsernameAndEmail(username: string, email: string): Promise<User | null> {
    if (!username || !email) {
      throw new CustomError("Username or email is undefined.", HTTP_STATUS.BAD_REQUEST);
    }
    const user = await this.db
      .selectFrom("User")
      .selectAll()
      .where("username", "=", username)
      .where("email", "=", email)
      .executeTakeFirst();
    if (!user) {
      return null;
    }
    return UserMapper.toDomain(user);
  }

  async save(user: User, password_hash?: string): Promise<User> {
    if (user.id) {
      // Update if user already exist
      const updateData: Updateable<UserTable> = UserMapper.toPersistenceUpdate(user, password_hash);
      await this.db.updateTable("User").set(updateData).where("id", "=", user.id).executeTakeFirstOrThrow();

      const updated_user = await this.getById(user.id);

      if (updated_user == null) {
        throw new CustomError("Error occured while getting the updated user.", HTTP_STATUS.UNPROCESSABLE_ENTITY);
      }
      return updated_user;
    } else {
      // Insert otherwise
      if (!password_hash) {
        throw new CustomError("Password is undefined while inserting a new user.", HTTP_STATUS.BAD_REQUEST);
      }
      const insertData: Insertable<UserTable> = UserMapper.toPersistenceInsert(user, password_hash);
      const insertedRecord = await this.db.insertInto("User").values(insertData).executeTakeFirstOrThrow();

      if (!insertedRecord.insertId) {
        throw new UnprocessableEntity("Creation of the user failed.");
      }

      const new_user = await this.getById(Number(insertedRecord.insertId));

      if (new_user == null) {
        throw new CustomError("Error occured while getting the created user.", HTTP_STATUS.UNPROCESSABLE_ENTITY);
      }
      return new_user;
    }
  }
}
