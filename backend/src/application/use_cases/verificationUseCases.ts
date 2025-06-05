import { Verification } from "@domain/entities/Verification";
import { CustomError } from "@domain/erros/CustomError";
import { HTTP_STATUS } from "@domain/erros/HTTP_StatusEnum";
import { IVerificationRepository } from "@domain/repositories/IVerificationRepository";

export class VerificationUseCases {
    constructor(private readonly verificationRepository: IVerificationRepository) {}

    async createVerification(verification: Verification) : Promise<Verification> {
        if (!verification.user_id || !verification.unique_token || !verification.type || !verification.expiration_date) {
            throw new CustomError('Verification entity can´t be create without all informations', HTTP_STATUS.UNPROCESSABLE_ENTITY);
        }

        const old_verifs = await this.verificationRepository.getByUserIdAndType(verification.user_id, verification.type);

        old_verifs.forEach(old_verif => {
            if (old_verif.expiration_date > new Date(Date.now())) {
                old_verif.expiration_date = new Date(Date.now())
                this.verificationRepository.save(old_verif);
            }
        })

        return await this.verificationRepository.save(verification);
    }

    async getValidVerificationByToken(token: string) : Promise<Verification> {
        if (!token) {
            throw new CustomError('Token is undefined', HTTP_STATUS.UNPROCESSABLE_ENTITY);
        }

        const verification =  await this.verificationRepository.getValidByToken(token);
        if (verification == null) {
            throw new CustomError("No valid verification found with given token", HTTP_STATUS.NOT_FOUND);
        }
        return verification
    }

    async expireVerification(verification: Verification) : Promise<void> {
        if (!verification.id) {
            throw new CustomError('Can´t exprired verification without its id', HTTP_STATUS.UNPROCESSABLE_ENTITY);
        }

        verification.expiration_date = new Date(Date.now());

        await this.verificationRepository.save(verification);
    }
}