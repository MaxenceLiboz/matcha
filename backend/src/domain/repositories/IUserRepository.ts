import { User } from '@domain/entities/User';

export interface IUserRepository {
    getUserById(id: number): Promise<User | null>;
    getUserByUsernameOrEmail(username: string, email:string): Promise<User | null>;
    save(user: User, password_hash? : string): Promise<User>;
}