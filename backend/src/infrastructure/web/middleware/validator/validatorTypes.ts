// Define the types for our validation rules and schema
export enum VALIDATOR {
  REQUIRED = "required",
  STRING = "string",
  MAX_LENGTH = "maxLength",
  MIN_LENGTH = "minLength",
  NUMBER = "number",
  MAX = "max",
  MIN = "min",
  EMAIL = "email",
  PASSWORD = "password",
  IS_NUMBER = "isNumber",
  IS_IN = "isIn",
}

interface BaseRule {
  type: VALIDATOR;
  message?: string;
}

export interface RuleWithArg<TArg> extends BaseRule {
  arg: TArg;
}

// We can add different type of arguments
export type ValidationRule =
  | BaseRule
  | RuleWithArg<number>
  | RuleWithArg<string[]>;

export type SchemaDefinition = {
  [fieldName: string]: ValidationRule[];
};

// Type for the validator functions in the dictionary
type ValidatorFunction = (
  value: any,
  fieldName: string,
  arg?: any,
) => string | true;

// Type for the dictionary itself, ensuring all VALIDATOR enum keys are present
type ValidatorDictionaryType = {
  [K in VALIDATOR]: ValidatorFunction;
};

// Dictionnary that holds all the validation functions.
export const validatorDictionary: ValidatorDictionaryType = {
  [VALIDATOR.REQUIRED]: (value: any, fieldName: string) => {
    if (
      value === undefined ||
      value === null ||
      (typeof value === "string" && value.trim() === "")
    ) {
      return `${fieldName} is required.`;
    }
    return true;
  },

  [VALIDATOR.STRING]: (value: string, fieldName: string) => {
    if (value !== undefined && value !== null && typeof value !== "string") {
      return `${fieldName} must be a string.`;
    }
    return true;
  },

  [VALIDATOR.MIN_LENGTH]: (value: string, fieldName: string, min: number) => {
    if (typeof value === "string" && value.length < min) {
      return `${fieldName} must be at least ${min} characters long.`;
    }
    return true;
  },

  [VALIDATOR.MAX_LENGTH]: (value: string, fieldName: string, max: number) => {
    if (typeof value === "string" && value.length > max) {
      return `${fieldName} must be no more than ${max} characters long.`;
    }
    return true;
  },

  [VALIDATOR.EMAIL]: (value: any, fieldName: string) => {
    const emailRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    if (typeof value === "string" && !emailRegex.test(value)) {
      return `${fieldName} must be a valid email address.`;
    }
    return true;
  },

  [VALIDATOR.NUMBER]: (value: any, fieldName: string) => {
    if (
      value !== undefined &&
      value !== null &&
      (typeof value !== "number" || isNaN(value))
    ) {
      return `${fieldName} must be a number.`;
    }
    return true;
  },

  [VALIDATOR.MIN]: (value: number, fieldName: string, min: number) => {
    if (typeof value === "number" && value < min) {
      return `${fieldName} must be at least ${min}.`;
    }
    return true;
  },

  [VALIDATOR.MAX]: (value: number, fieldName: string, max: number) => {
    if (typeof value === "number" && value > max) {
      return `${fieldName} must be less than ${max}.`;
    }
    return true;
  },

  [VALIDATOR.PASSWORD]: (value: string, fieldName: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#-])[A-Za-z\d@$!%*?&_#-]{8,50}$/;

    if (typeof value !== "string" || !passwordRegex.test(value)) {
      return `${fieldName} policy not matched, at least 8 chars and at most 50 with 1 upper, 1 lower, 1 special and 1 digit.`;
    }
    return true;
  },

  [VALIDATOR.IS_IN]: (value: string, fieldName: string, arg: string[]) => {
    if (typeof value === "string" && !arg.includes(value)) {
      return `${fieldName} must be one of ${arg.join(", ")}.`;
    }
    return true;
  },

  [VALIDATOR.IS_NUMBER]: (value: any, fieldName: string) => {
    if (value !== undefined && isNaN(parseInt(value))) {
      return `${fieldName} must be a number.`;
    }
    return true;
  },
};
