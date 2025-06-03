import { IVerificationRepository } from "@domain/repositories/IVerificationRepository";
import { Insertable, Kysely, Updateable, UpdateResult } from "kysely";
import { DB, Verification as VerificationTable} from "../db";
import { CustomError } from "@domain/erros/CustomError";
import { HTTP_STATUS } from "@domain/erros/HTTP_StatusEnum";
import { Verification } from "@domain/entities/Verification";
import { UnprocessableEntity } from "@domain/erros/UnprocessableEntity";
import { VerificationMapper } from "../mappers/VerificationMapper";
import { AbstractRepositoryImpl } from "./AbstactRepositoryImpl";

export class VerificationRepository extends AbstractRepositoryImpl<Verification, 'Verification'> implements IVerificationRepository {
    constructor(db: Kysely<DB>) {
        super(db, 'Verification', VerificationMapper);
    }

    async getByUserIdAndType(user_id: number, type: Verification['type']): Promise<Verification[] | []> {
        return await this.db
            .selectFrom('Verification')
            .selectAll()
            .where('user_id', '=', user_id)
            .where('type', '=', type)
            .execute();
    }

    async save(verification: Verification): Promise<Verification> {
        if (verification.id) { // Update if verification already exist
            const updateData: Updateable<VerificationTable> = VerificationMapper.toPersistenceUpdate(verification);
            await this.db
                .updateTable('Verification')
                .set(updateData)
                .where('id', '=', verification.id)
                .executeTakeFirstOrThrow();

            const new_verification = await this.getById(verification.id);
            if (new_verification == null) {
                throw new CustomError("Error occured while getting the updated verification.", HTTP_STATUS.UNPROCESSABLE_ENTITY);
            }
            return new_verification;
        } else { // Insert otherwise
            const insertData: Insertable<VerificationTable> = VerificationMapper.toPersistenceInsert(verification);
            const insertedRecord = await this.db
                .insertInto('Verification')
                .values(insertData)
                .executeTakeFirstOrThrow();

            if (!insertedRecord.insertId) {
                throw new UnprocessableEntity("Creation of the verification failed.");
            }

            const new_verification = await this.getById(Number(insertedRecord.insertId))

            if (new_verification == null) {
                throw new CustomError("Error occured while getting the created verification.", HTTP_STATUS.UNPROCESSABLE_ENTITY);
            }
            return new_verification;
        }
    }
}