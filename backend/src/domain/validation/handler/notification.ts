import { DomainError } from "domain/validation/errors/domain-error";
import { Error } from "../error";
import ValidationHandler, { Validation } from "../validation-handler";

export class Notification extends ValidationHandler {

    private _errors: Error[];

    private constructor(errors: Error[]) {
        super();
        this._errors = errors;
    }

    public static create(): Notification {
        return new Notification([]);
    }

    appendError(error: Error): ValidationHandler {
        this._errors.push(error);
        return this;
    }
    
    addHandlers(handler: ValidationHandler): ValidationHandler {
        this._errors.push(...handler.getErrors());
        return this;
    }

    validate<T>(validation: Validation<T>): T {
        try {
            return validation.validate();
        } catch (error) {
            if (error instanceof DomainError) {
                this._errors.push(...error.errors);
            }
        }
        return null;
    }

    getErrors(): Error[] {
        return this._errors;
    }     
}