import { User } from '@domain/entities/User';

export interface IUserRepository {
    getUserByUsernameOrEmail(username: string, email:string): Promise<User | null>;
    save(user: User, password_hash? : string): Promise<User>;
}