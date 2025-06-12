/*
/infrastructure/http/middleware/fileValidatorMiddleware.ts (Updated)
*/
import { NextFunction, Request, Response } from "express";
import { CustomError } from "@domain/erros/CustomError";
import { HTTP_STATUS } from "@domain/erros/HTTP_StatusEnum";

interface FileValidationOptions {
    maxSize: number; // in bytes
    allowedMimeTypes: string[];
    minTotalFileCount?: number; 
    requiredFields?: string[];
}

export function fileValidationMiddleware(options: FileValidationOptions) {
    return (req: Request, res: Response, next: NextFunction) => {
        // req.files is now an object of arrays, e.g., { profilePicture: [file], otherPicture: [file1, file2] }
        const filesByField = req.files as { [fieldname: string]: Express.Multer.File[] };

        if (!filesByField || Object.keys(filesByField).length === 0) {
            // If no files are present at all, check if any were required
            if (options.minTotalFileCount && options.minTotalFileCount > 0) {
                return next(new CustomError(`At least ${options.minTotalFileCount} picture(s) required.`, HTTP_STATUS.BAD_REQUEST));
            }
            if (options.requiredFields && options.requiredFields.length > 0) {
                 return next(new CustomError(`Required picture field '${options.requiredFields[0]}' is missing.`, HTTP_STATUS.BAD_REQUEST));
            }
            return next(); // No files and none required, so we're good.
        }

        // --- New Validation Logic ---
        
        // 1. Check for required fields
        if (options.requiredFields) {
            for (const fieldName of options.requiredFields) {
                if (!filesByField[fieldName] || filesByField[fieldName].length === 0) {
                    return next(new CustomError(`Picture field '${fieldName}' is required.`, HTTP_STATUS.BAD_REQUEST));
                }
            }
        }
        
        let totalFiles = 0;
        // 2. Iterate over all uploaded files from all fields
        for (const fieldName in filesByField) {
            const files = filesByField[fieldName];
            totalFiles += files.length;

            for (const file of files) {
                // Apply the same validation logic as before to each file
                if (file.size > options.maxSize) {
                    return next(new CustomError(`File ${file.originalname} is too large. Max size is ${options.maxSize / 1024 / 1024}MB.`, HTTP_STATUS.BAD_REQUEST));
                }
                if (!options.allowedMimeTypes.includes(file.mimetype)) {
                    return next(new CustomError(`File type for ${file.originalname} is not allowed. Allowed types: ${options.allowedMimeTypes.join(', ')}.`, HTTP_STATUS.BAD_REQUEST));
                }
            }
        }

        // 3. Check for the minimum total number of files
        if (options.minTotalFileCount && totalFiles < options.minTotalFileCount) {
             return next(new CustomError(`At least ${options.minTotalFileCount} total picture(s) required.`, HTTP_STATUS.BAD_REQUEST));
        }

        next();
    };
}