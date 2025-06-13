import {
  CreateUserDTO,
  JWTTokenResponseDTO,
  LoginUserDTO,
  ResetPasswordDTO,
  SendUserVerificationOrForgotPasswordDTO,
  UserResponseDTO,
  UserVerificationOrForgotPasswordDTO,
} from "@application/dtos/user.dto";
import { AuthUseCases } from "@application/use_cases/authUseCases";
import { SendEmailUseCase } from "@application/use_cases/sendEmailUseCase";
import { UserUseCases } from "@application/use_cases/userUseCases";
import { VerificationUseCases } from "@application/use_cases/verificationUseCases";
import { CustomError } from "@domain/erros/CustomError";
import { HTTP_STATUS } from "@domain/erros/HTTP_StatusEnum";
import { config } from "@infrastructure/config";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export class AuthService {
  constructor(
    private readonly authUseCases: AuthUseCases,
    private readonly userUseCases: UserUseCases,
    private readonly verificationUseCases: VerificationUseCases,
    private readonly sendEmailUseCase: SendEmailUseCase
  ) {}

  async loginUser(data: LoginUserDTO): Promise<JWTTokenResponseDTO> {
    const users = await this.userUseCases.getByFileds({
      email: data.email,
    });

    if (users.length === 0 || users.length > 1) {
      throw new CustomError("Email or password incorrect", HTTP_STATUS.NOT_FOUND);
    }

    const user = users[0];
    if (user.verified == false) {
      throw new CustomError("User not verified, please check your email", HTTP_STATUS.UNAUTHORIZED);
    }

    if (!user.password_hash || !(await bcrypt.compare(data.password, user.password_hash))) {
      throw new CustomError("Incorrect password", HTTP_STATUS.UNAUTHORIZED);
    }

    const access_token = this.authUseCases.createJWTToken(user);
    const refresh_token = this.authUseCases.createJWTRefreshToken(user);
    return { access_token, refresh_token };
  }

  async registerUser(data: CreateUserDTO): Promise<void> {
    const user = await this.authUseCases.registerUser(data);

    await this.sendVerificationEmail(user);
  }

  async sendUserVerification(data: SendUserVerificationOrForgotPasswordDTO): Promise<void> {
    const user = await this.userUseCases.getUserByUsernameAndEmail(data).catch(() => null);
    if (user && user.verified == false) {
      await this.sendVerificationEmail(user);
    }
  }

  async forgotPassword(data: SendUserVerificationOrForgotPasswordDTO): Promise<void> {
    // Don´t throw error to prevent user iteration
    const user = await this.userUseCases.getUserByUsernameAndEmail(data).catch(() => null);

    if (user) {
      await this.sendResetPasswordEmail(user);
    }
  }

  async verifyUser(data: UserVerificationOrForgotPasswordDTO): Promise<void> {
    const verification = await this.verificationUseCases.getValidVerificationByToken(data.token);

    // If token found is not good type throw
    if (verification.type != "email_verification") {
      throw new CustomError("The token given is not an email verification token", HTTP_STATUS.BAD_REQUEST);
    }

    // Verify the user link to the verification token
    await this.authUseCases.verifyUser(verification.user_id);

    // Expire the current verification
    await this.verificationUseCases.expireVerification(verification);
  }

  async refreshUserToken(token: string): Promise<JWTTokenResponseDTO> {
    return await this.authUseCases.refreshToken(token);
  }

  async resetPassword(data: ResetPasswordDTO): Promise<void> {
    // 1. Get the verification entity and ensure it's valid and for password reset
    const verification = await this.verificationUseCases.getValidVerificationByToken(data.token);

    if (verification.type !== "password_reset") {
      throw new CustomError("Invalid token type provided.", HTTP_STATUS.BAD_REQUEST);
    }

    // 2. Update the user's password
    await this.authUseCases.updateUserPassword(verification.user_id, data.password);

    // 3. Expire the token so it cannot be used again
    await this.verificationUseCases.expireVerification(verification);
  }

  private async sendVerificationEmail(user: UserResponseDTO) {
    let expiration_date = new Date();
    expiration_date.setDate(expiration_date.getDate() + 1);

    // Create the verification token
    const verification = await this.verificationUseCases.createVerification({
      expiration_date: expiration_date,
      type: "email_verification",
      user_id: user.id,
      unique_token: uuidv4(),
    });

    // Send email
    this.sendEmailUseCase.execute({
      to: `${user.email}`,
      subject: "Verification de votre compte",
      text: `http://${config.FRONTEND_HOST}:${config.FRONTEND_PORT}/login?j=${verification.unique_token}`,
    });
  }

  private async sendResetPasswordEmail(user: UserResponseDTO) {
    let expiration_date = new Date();
    expiration_date.setDate(expiration_date.getDate() + 1);

    // Create the verification token
    const verification = await this.verificationUseCases.createVerification({
      expiration_date: expiration_date,
      type: "password_reset",
      user_id: user.id,
      unique_token: uuidv4(),
    });

    // Send email
    this.sendEmailUseCase.execute({
      to: `${user.email}`,
      subject: "Reset password",
      text: `http://${config.FRONTEND_HOST}:${config.FRONTEND_PORT}/reset-password?j=${verification.unique_token}`,
    });
  }
}
