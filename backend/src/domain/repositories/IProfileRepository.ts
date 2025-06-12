import { IAbstractRepository } from './IAbstractRepository';
import { Profile } from '@domain/entities/Profile';

export interface IProfileRepository extends IAbstractRepository<Profile> {
    save(profile: Profile): Promise<Profile>;
}