import { Profile, Gender, SexualPreference } from '@domain/entities/Profile';
import { Profile as ProfileTable } from '@infrastructure/database/db';
import { Selectable, Insertable, Updateable } from 'kysely';

export class ProfileMapper {
    // From DB record (Kysely result) to Domain Entity
    static toDomain(db_record: Selectable<ProfileTable>): Profile {
        return Profile.hydrate(
            db_record.id,
            db_record.user_id,
            db_record.age,
            db_record.gender as Gender,
            db_record.sexual_preference as SexualPreference,
            db_record.frame_rating,
            db_record.created_at,
            db_record.updated_at
        );
    }

    static toPersistenceInsert(domainProfile: Profile): Insertable<ProfileTable> {
        return {
            user_id: domainProfile.user_id,
            age: domainProfile.age,
            gender: domainProfile.gender,
            sexual_preference: domainProfile.sexual_preference,
            frame_rating: domainProfile.frame_rating
        };
    }

    static toPersistenceUpdate(domainProfile: Profile): Updateable<ProfileTable> {
        return {
            age: domainProfile.age,
            gender: domainProfile.gender,
            sexual_preference: domainProfile.sexual_preference,
            frame_rating: domainProfile.frame_rating
        };
    }
}