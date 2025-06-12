import { Tag } from '@domain/entities/Tag';
import { Tag as TagTable } from '@infrastructure/database/db';
import { Selectable, Insertable, Updateable } from 'kysely';

export class TagMapper {
    // From DB record (Kysely result) to Domain Entity
    static toDomain(db_record: Selectable<TagTable>): Tag {
        return Tag.hydrate(
            db_record.id,
            db_record.name,
            db_record.created_at,
            db_record.updated_at
        );
    }

    // From Domain Entity to an object for DB insertion
    static toPersistenceInsert(domainTag: Tag): Insertable<TagTable> {
        return {
            name: domainTag.name,
        };
    }

    // From Domain Entity to an object for DB updates
    static toPersistenceUpdate(domainTag: Tag): Updateable<TagTable> {
        return {
            name: domainTag.name,
        };
    }
}