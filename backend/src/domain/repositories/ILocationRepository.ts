import { IAbstractRepository } from './IAbstractRepository';
import { Location } from '@domain/entities/Location';

export interface ILocationRepository extends IAbstractRepository<Location> {
    save(location: Location): Promise<Location>;
}