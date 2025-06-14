import { Error } from "domain/validation/error";


export class DomainError extends Error {

    private _errors: Error[]

    private constructor(message: string, errors: Error[]) {
        super(message);
        this._errors = errors;
    }

    public static with(error: Error): DomainError {
        return new DomainError(error.message, [error]);
    }

    public static from(errors: Error[]): DomainError {
        return new DomainError("", errors);
    }

    get errors(): Error[] {
        return this._errors
    }
}