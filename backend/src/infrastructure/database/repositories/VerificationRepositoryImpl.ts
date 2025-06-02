import { IVerificationRepository } from "@domain/repositories/IVerificationRepository";
import { Insertable, Kysely, Updateable } from "kysely";
import { DB, Verification as VerificationTable} from "../db";
import { CustomError } from "@domain/erros/CustomError";
import { HTTP_STATUS } from "@domain/erros/HTTP_StatusEnum";
import { Verification } from "@domain/entities/Verification";
import { UnprocessableEntity } from "@domain/erros/UnprocessableEntity";

export class VerificationRepository implements IVerificationRepository {
    constructor(private readonly db: Kysely<DB>) {}
    async getVerificationById(id: number): Promise<Verification | null> {
        if (!id) {
            throw new CustomError('Id must not be null.', HTTP_STATUS.BAD_REQUEST);
        }
        const verification = await this.db
            .selectFrom('Verification')
            .selectAll()
            .where('id','=', id)
            .executeTakeFirst();
        if (!verification) {
            return null;
        }
        return VerificationMapper.toDomain(verification);
    }

    async save(verification: Verification): Promise<Verification> {
        if (verification.id) { // Update if user already exist
            const updateData: Updateable<VerificationTable> = VerificationMapper.toPersistenceUpdate(verification);
            const updatedRecord = await this.db
                .updateTable('Verification')
                .set(updateData)
                .where('id', '=', verification.id)
                .returningAll()
                .executeTakeFirstOrThrow();
            return VerificationMapper.toDomain(updatedRecord);
        } else { // Insert otherwise
            const insertData: Insertable<VerificationTable> = VerificationMapper.toPersistenceInsert(verification);
            const insertedRecord = await this.db
                .insertInto('Verification')
                .values(insertData)
                .executeTakeFirstOrThrow();

            if (!insertedRecord.insertId) {
                throw new UnprocessableEntity("Creation of the verification failed.");
            }

            const new_verification = await this.getVerificationById(Number(insertedRecord.insertId))

            if (new_verification == null) {
                throw new CustomError("Error occured while getting the created verification.", HTTP_STATUS.UNPROCESSABLE_ENTITY);
            }
            return new_verification;
        }
    }
}