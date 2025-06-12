import { CustomError } from "@domain/erros/CustomError";
import { HTTP_STATUS } from "@domain/erros/HTTP_StatusEnum";
import nodemailer from "nodemailer";

interface MailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || "587", 10),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export class SendEmailUseCase {
  constructor() {}

  async execute(mailOptions: MailOptions): Promise<void> {
    try {
      const info = await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: mailOptions.to,
        subject: mailOptions.subject,
        text: mailOptions.text,
        html: mailOptions.html,
      });
    } catch (error) {
      console.error("Error sending email via Gmail:", error);
      throw new CustomError(
        "Failed to send email.",
        HTTP_STATUS.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
