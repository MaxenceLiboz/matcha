import { Selectable, Kysely, Insertable, Updateable } from 'kysely'; // Import Kysely utility types
import { DB, User as UserTable } from '@infrastructure/database/db';
import { IUserRepository } from '@domain/repositories/IUserRepository';
import { User } from '@domain/entities/User';
import { UserMapper } from '../mappers/UserMapper';


export class UserRepository implements IUserRepository {
    constructor(private readonly db: Kysely<DB>) {}

    async getUserByUsernameOrEmail(username: string, email: string): Promise<User | null> {
        if (!username || !email) {
            throw new Error('Username or email is undefined.');
        }
        const user = await this.db
            .selectFrom('User')
            .selectAll()
            .where(
                (col) => col('username', '=', username).or('email', '=', email)
            )
            .executeTakeFirst();
        if (!user) {
            return null;
        }
        return UserMapper.toDomain(user);
    }

    async save(user: User, password_hash?: string): Promise<User> {
        if (user.id) { // Update if user already exist
            const updateData: Updateable<UserTable> = UserMapper.toPersistenceUpdate(user);
            const updatedRecord = await this.db
                .updateTable('User')
                .set(updateData)
                .where('id', '=', user.id)
                .returningAll()
                .executeTakeFirstOrThrow();
            return UserMapper.toDomain(updatedRecord);
        } else { // Insert otherwise
            if (!password_hash) {
                throw new Error("Password hash is undefined while inserting a new user.");
            }
            const insertData: Insertable<UserTable> = UserMapper.toPersistenceInsert(user, password_hash);
            const insertedRecord = await this.db
                .insertInto('User')
                .values(insertData)
                .returningAll()
                .executeTakeFirstOrThrow();
            return UserMapper.toDomain(insertedRecord);
        }
    }
}