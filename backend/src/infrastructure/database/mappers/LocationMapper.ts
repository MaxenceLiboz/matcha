import { Location } from '@domain/entities/Location';
import { Location as LocationTable } from '@infrastructure/database/db';
import { Selectable, Insertable, Updateable } from 'kysely';

export class LocationMapper {
    static toDomain(db_record: Selectable<LocationTable>): Location {
        return Location.hydrate(
            db_record.id,
            db_record.user_id,
            parseFloat(db_record.latitude as string), // Latitude/Longitude are Decimal in DB
            parseFloat(db_record.longitude as string),
            db_record.city || '',
            db_record.created_at,
            db_record.updated_at
        );
    }

    static toPersistenceInsert(domainLocation: Location): Insertable<LocationTable> {
        return {
            user_id: domainLocation.user_id,
            latitude: domainLocation.latitude,
            longitude: domainLocation.longitude,
            city: domainLocation.city,
        };
    }
    
    static toPersistenceUpdate(domainLocation: Location): Updateable<LocationTable> {
        return {
            latitude: domainLocation.latitude.toString(),
            longitude: domainLocation.longitude.toString(),
            city: domainLocation.city,
        };
    }
}