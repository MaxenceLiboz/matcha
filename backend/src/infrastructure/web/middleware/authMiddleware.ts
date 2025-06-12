/// <reference path="../../config/environment.d.ts"/>
import { CustomError } from "@domain/erros/CustomError";
import { HTTP_STATUS } from "@domain/erros/HTTP_StatusEnum";
import { config } from "@infrastructure/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserResponseDTO } from "@application/dtos/user.dto";

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    next(new CustomError("Unauthorized", HTTP_STATUS.UNAUTHORIZED));
    return;
  }

  try {
    jwt.verify(token, config.JWT_SECRET);
    const decoded = jwt.decode(token);

    if (!decoded || typeof decoded === "string" || !decoded.id) {
      throw new CustomError("Invalid token", HTTP_STATUS.UNAUTHORIZED);
    }

    const user = {
      id: decoded.id,
      email: decoded.email,
      username: decoded.username,
      last_name: decoded.last_name,
      first_name: decoded.first_name,
      verified: decoded.verified,
    };

    req.user = user;

    next();
  } catch (err) {
    next(new CustomError("Unauthorized", HTTP_STATUS.UNAUTHORIZED));
  }
}
