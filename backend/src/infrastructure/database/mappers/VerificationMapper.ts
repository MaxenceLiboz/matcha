import { Verification } from "@domain/entities/Verification";
import { Verification as VerificationTable } from "@infrastructure/database/db";
import { Selectable, Insertable, Updateable } from "kysely";

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
      db_record.updated_at,
    );
  }

  static toPersistenceInsert(
    domainVerification: Verification,
  ): Insertable<VerificationTable> {
    return {
      expiration_date: domainVerification.expiration_date,
      type: domainVerification.type,
      unique_token: domainVerification.unique_token,
      user_id: domainVerification.user_id,
    };
  }

  static toPersistenceUpdate(
    domainVerification: Verification,
  ): Updateable<VerificationTable> {
    return {
      expiration_date: domainVerification.expiration_date,
    };
  }
}
