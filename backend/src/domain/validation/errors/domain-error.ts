import { Error } from "domain/validation/error";

/**
 * Represents a domain-specific error that can aggregate multiple validation errors.
 * Extends the base Error class to include a list of related errors.
 */
export class DomainError extends Error {

    /** List of validation errors associated with this domain error. */
    private _errors: Error[];

    /**
     * Private constructor to enforce the use of static factory methods.
     * 
     * @param message - The error message.
     * @param errors - An array of validation errors related to this domain error.
     */
    private constructor(message: string, errors: Error[]) {
        super(message);
        this._errors = errors;
    }

    /**
     * Creates a DomainError instance from a single validation error.
     * 
     * @param error - A single validation error.
     * @returns A DomainError containing the provided error.
     */
    public static with(error: Error): DomainError {
        return new DomainError(error.message, [error]);
    }

    /**
     * Creates a DomainError instance from multiple validation errors.
     * 
     * @param errors - An array of validation errors.
     * @returns A DomainError containing the provided errors.
     */
    public static from(errors: Error[]): DomainError {
        return new DomainError("", errors);
    }

    /** Returns the list of validation errors associated with this domain error. */
    get errors(): Error[] {
        return this._errors;
    }
}
