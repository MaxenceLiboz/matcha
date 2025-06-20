import { CustomError } from "@domain/erros/CustomError";
import { NextFunction, Request, Response } from "express";

export default function errorMiddleware(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof CustomError) {
    console.log("----------------------------------------");
    console.log(error.stack);
    if (error.error) {
      console.log("----------------------------------------");
      console.log(error.error);
    }
    res.status(error.statusCode).json({
      error: {
        message: error.message,
        statusCode: error.statusCode,
      },
    });
  } else {
    next();
  }
}
