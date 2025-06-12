import { Picture } from '@domain/entities/Picture';
import { Picture as PictureTable } from '@infrastructure/database/db';
import { Selectable, Insertable, Updateable } from 'kysely';

export class PictureMapper {
    // From DB record (Kysely result) to Domain Entity
    static toDomain(db_record: Selectable<PictureTable>): Picture {
        return Picture.hydrate(
            db_record.id,
            db_record.user_id,
            db_record.ref,
            db_record.mime_type,
            db_record.is_profile === 1,
            db_record.created_at,
            db_record.updated_at
        );
    }

    static toPersistenceInsert(domainPicture: Picture): Insertable<PictureTable> {
        return {
            user_id: domainPicture.user_id,
            ref: domainPicture.ref,
            mime_type: domainPicture.mime_type,
            is_profile: domainPicture.is_profile ? 1 : 0
        };
    }

    static toPersistenceUpdate(domainPicture: Picture): Updateable<PictureTable> {
        return {
            ref: domainPicture.ref,
            mime_type: domainPicture.mime_type,
            is_profile: domainPicture.is_profile ? 1 : 0
        };
    }
}