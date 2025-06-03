import { Verification } from "@domain/entities/Verification";
import { CustomError } from "@domain/erros/CustomError";
import { HTTP_STATUS } from "@domain/erros/HTTP_StatusEnum";
import { IVerificationRepository } from "@domain/repositories/IVerificationRepository";

export class CreateVerificationUseCase {
    constructor(private readonly verificationRepository: IVerificationRepository) {}

    async execute(verification: Verification) : Promise<Verification> {

        if (!verification.user_id || !verification.unique_token || !verification.type || !verification.expiration_date) {
            throw new CustomError('Verification entity can´t be create without all informations', HTTP_STATUS.UNPROCESSABLE_ENTITY);
        }

        const old_verifs = await this.verificationRepository.getByUserIdAndType(verification.user_id, verification.type);

        old_verifs.forEach(old_verif => {
            old_verif.expiration_date = new Date(Date.now())
            this.verificationRepository.save(old_verif);
        })

        return await this.verificationRepository.save(verification);
    }
}