import { User } from '@domain/entities/User';
import { User as UserTable } from '@infrastructure/database/db';
import { Selectable, Insertable, Updateable} from 'kysely';

export class UserMapper {
    // From DB record (Kysely result) to Domain Entity
    static toDomain(db_record: Selectable<UserTable>): User {
        return User.hydrate(
            db_record.id,
            db_record.email,
            db_record.first_name,
            db_record.last_name,
            db_record.username,
            db_record.verified === 1,
            db_record.created_at,
            db_record.updated_at
        );
    }

    static toPersistenceInsert(domainUser: User, password_hash: string): Insertable<UserTable> {
        return {
            email: domainUser.email,
            first_name: domainUser.first_name,
            last_name: domainUser.last_name,
            username: domainUser.username,
            password_hash: password_hash,
            verified: 0
        };
    }

    static toPersistenceUpdate(domainUser: User, password_hash?: string): Updateable<UserTable> {
        if (password_hash) {
            return {
                email: domainUser.email,
                first_name: domainUser.first_name,
                last_name: domainUser.last_name,
                username: domainUser.username,
                password_hash: password_hash,
            };
        } else {
            return {
                email: domainUser.email,
                first_name: domainUser.first_name,
                last_name: domainUser.last_name,
                username: domainUser.username,
                verified: domainUser.verified ? 1: 0
            };
        } 
    }
}