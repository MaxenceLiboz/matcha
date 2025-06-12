// src/infrastructure/database/repositories/TagRepositoryImpl.ts
import { Kysely } from 'kysely';
import { DB, Tag as TagTable } from '@infrastructure/database/db';
import { Tag } from '@domain/entities/Tag';
import { AbstractRepositoryImpl } from './AbstactRepositoryImpl';
// You would also create a TagMapper, similar to your other mappers
import { TagMapper } from '../mappers/TagMapper';
import { CustomError } from '@domain/erros/CustomError';
import { HTTP_STATUS } from '@domain/erros/HTTP_StatusEnum';
import { ITagRepository } from '@domain/repositories/ITagrepository';

export class TagRepository extends AbstractRepositoryImpl<Tag, 'Tag'> implements ITagRepository {
    constructor(db: Kysely<DB>) {
        super(db, 'Tag', TagMapper);
    }

    async findOrCreate(name: string): Promise<Tag> {
        // First, try to find the tag
        const existingTag = await this.db
            .selectFrom('Tag')
            .selectAll()
            .where('name', '=', name)
            .executeTakeFirst();

        if (existingTag) {
            return TagMapper.toDomain(existingTag);
        }

        // If not found, create it
        const { insertId } = await this.db
            .insertInto('Tag')
            .values({ name })
            .executeTakeFirstOrThrow();
        
        const newTag = await this.getById(Number(insertId));
        if (!newTag) {
            throw new CustomError("Failed to create or find the tag.", HTTP_STATUS.UNPROCESSABLE_ENTITY);
        }
        return newTag;
    }

    async linkUserToTag(userId: number, tagId: number): Promise<void> {
        // Avoid creating duplicates
        const existingLink = await this.db.selectFrom('User_Tag')
            .selectAll()
            .where('user_id', '=', userId)
            .where('tag_id', '=', tagId)
            .executeTakeFirst();
            
        if (!existingLink) {
            await this.db.insertInto('User_Tag')
                .values({ user_id: userId, tag_id: tagId })
                .execute();
        }
    }
}