// src/infrastructure/repositories/abstract.repository.impl.ts
import { Kysely, Selectable, sql } from 'kysely';
import { DB } from '../db';
import { IAbstractRepository } from '@domain/repositories/IAbstractRepository';
import { CustomError } from '@domain/erros/CustomError';
import { HTTP_STATUS } from '@domain/erros/HTTP_StatusEnum';

// Define a generic Mapper interface for type safety
export interface IMapper<TDBModel, TDomainModel> {
    toDomain(dbObject: TDBModel): TDomainModel;
}

export abstract class AbstractRepositoryImpl<
    TDomain,
    TTableName extends keyof DB,
    > implements IAbstractRepository<TDomain> {
        protected readonly db: Kysely<DB>;
        protected readonly tableName: TTableName;
        protected readonly mapper: IMapper<Selectable<DB[TTableName]>, TDomain>;

    constructor(
        db: Kysely<DB>,
        tableName: TTableName,
        mapper: IMapper<Selectable<DB[TTableName]>, TDomain>
    ) {
        this.db = db;
        this.tableName = tableName;
        this.mapper = mapper;
    }

    async getById(id: number): Promise<TDomain | null> {
        if (id === null || id === undefined) {
            throw new CustomError('ID must not be null or undefined.', HTTP_STATUS.BAD_REQUEST);
        }

        const { rows: results } = await sql<Selectable<DB[TTableName]>>`SELECT * FROM ${sql.table(this.tableName)} WHERE id = ${id}`.execute(this.db);

        if (!results || results.length > 1) {
            return null;
        }

        return this.mapper.toDomain(results[0]);
    }

}