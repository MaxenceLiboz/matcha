import { User } from '@domain/entities/User';
import { IAbstractRepository } from './IAbstractRepository';

export interface IUserRepository extends IAbstractRepository<User> {
    getUserByUsernameOrEmail(username: string, email:string): Promise<User | null>;
    getUserByUsernameAndEmail(username: string, email:string): Promise<User | null>;
    save(user: User, password_hash? : string): Promise<User>;
}