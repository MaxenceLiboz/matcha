import { Verification } from "@domain/entities/Verification";
import { IAbstractRepository } from "./IAbstractRepository";

export interface IVerificationRepository extends IAbstractRepository<Verification> {
    save(verification: Verification): Promise<Verification>;
    getByUserIdAndType(user_id: number, type: Verification['type']): Promise<Verification[] | []>
    getValidByToken(token: string): Promise<Verification | null>
}