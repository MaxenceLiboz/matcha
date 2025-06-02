import { NextFunction, Request, Response } from "express";
import { RuleWithArg, SchemaDefinition, VALIDATOR, validatorDictionary } from "./validatorTypes";
import { CustomError } from "@domain/erros/CustomError";
import { HTTP_STATUS } from "@domain/erros/HTTP_StatusEnum";


export default function validationMiddleware(
    schema: SchemaDefinition,
    dataLocation: 'body' | 'query' | 'params' = 'body' // Type dataLocation
) {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        let dataToValidate: Record<string, any> | undefined;

        switch (dataLocation) {
            case 'body':
                dataToValidate = req.body;
                break;
            case 'query':
                dataToValidate = req.query as Record<string, any>; // Cast as query can be ParsedQs
                break;
            case 'params':
                dataToValidate = req.params;
                break;
            default:
                throw new CustomError(`Invalid data location specified for validation`, HTTP_STATUS.UNPROCESSABLE_ENTITY);
        }

        const validationErrors = validateData(dataToValidate, schema);

        if (validationErrors.length > 0) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                error: {
                    message: validationErrors.map(errorObj => `${errorObj.message}`).join("\n"),
                    statutCode: HTTP_STATUS.BAD_REQUEST
                }
            });
            return;
        }

        next();
    };
}

// Helper function to perform the actual validation logic
function validateData(
    dataToValidate: Record<string, any> | undefined,
    schema: SchemaDefinition
): Array<{ field: string; message: string }> {
    const errors: Array<{ field: string; message: string }> = [];

    if (!dataToValidate) { // Handle cases where req.body might be undefined
        // Check if any field is required
        for (const fieldName in schema) {
            const rules = schema[fieldName];
            const isExplicitlyRequired = rules.some(rule => rule.type === VALIDATOR.REQUIRED);
            if (isExplicitlyRequired) {
                errors.push({ field: fieldName, message: `${fieldName} is required.` });
            }
        }
        return errors;
    }

    for (const fieldName in schema) {
        const rules = schema[fieldName];
        const value = dataToValidate[fieldName]; // Value can be undefined if not present in data

        const isFieldRequired = rules.some(rule => rule.type === VALIDATOR.REQUIRED);
        const isValueEmpty = value === undefined || value === null || (typeof value === 'string' && value.trim() === '');

        if (!isFieldRequired && isValueEmpty) {
            continue;
        }

        for (const rule of rules) {
            const validatorFn = validatorDictionary[rule.type];
            if (!validatorFn) {
                console.warn(`Unknown validator type: ${rule.type} for field ${fieldName}`);
                continue;
            }

            if (rule.type === VALIDATOR.REQUIRED) {
                const result = validatorFn(value, fieldName);
                if (result !== true) {
                    errors.push({ field: fieldName, message: rule.message || result });
                    break; // If required validation fails, no need to check other rules for this field
                }
                continue;
            }

            // For other rules, only apply if the value is not empty.
            if (!isValueEmpty) {
                const result = validatorFn(value, fieldName, (rule as RuleWithArg<any>).arg);
                if (result !== true) {
                    errors.push({ field: fieldName, message: rule.message || result });
                }
            }
        }
    }
    return errors;
}