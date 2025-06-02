import { Verification } from "@domain/entities/Verification";

export interface IVerificationRepository {
    getVerificationById(id: number): Promise<Verification | null>;
    save(verification: Verification): Promise<Verification>;
}