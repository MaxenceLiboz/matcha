import { IAbstractRepository } from './IAbstractRepository';
import { Picture } from '@domain/entities/Picture';

export interface IPictureRepository extends IAbstractRepository<Picture> {
    save(picture: Picture): Promise<Picture>;
}