import { Verification } from '@domain/entities/Verification';
import { Verification as VerificationTable } from '@infrastructure/database/db';
import { Selectable, Insertable, Updateable} from 'kysely';

export class VerificationMapper {
    // From DB record (Kysely result) to Domain Entity
    static toDomain(db_record: Selectable<VerificationTable>): Verification {
        return Verification.hydrate(
            db_record.id,
            db_record.expiration_date,
            db_record.type,
            db_record.unique_token,
            db_record.user_id,
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
                username: domainUser.username
            };
        } 
    }
}