import { CustomError } from "@domain/erros/CustomError";
import { HTTP_STATUS } from "@domain/erros/HTTP_StatusEnum";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        next(new CustomError("Unauthorized", HTTP_STATUS.UNAUTHORIZED));
        return;
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        next(new CustomError("Unauthorized", HTTP_STATUS.UNAUTHORIZED));
    }
}