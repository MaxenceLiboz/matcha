import { UserResponseDTO } from "@application/dtos/user.dto";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MYSQL_DATABASE: string;
      HOST: string;
      MYSQL_PORT?: string;
      MYSQL_HOST?: string;
      MYSQL_USER: string;
      MYSQL_PASSWORD?: string;
      PORT?: string;
      FRONTEND_HOST: string;
      FRONTEND_PORT: string;
      JWT_SECRET: string;
      JWT_EXPIRES_IN: ms.StringValue;
      JWT_REFRESH_SECRET: string;
      JWT_REFRESH_EXPIRES_IN: ms.StringValue;
    }
  }

  namespace Express {
    interface Request {
      user?: UserResponseDTO;
    }
  }
}

export {};
