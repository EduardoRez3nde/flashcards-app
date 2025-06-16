import { DomainError } from "domain/validation/errors/domain-error";
import { Error } from "../error";
import ValidationHandler, { Validation } from "../validation-handler";


/**
 * A concrete implementation of `ValidationHandler` that accumulates validation errors.
 * 
 * This class serves as a notification object to collect multiple validation errors during processing,
 * allowing the application to handle all errors at once rather than failing on the first one.
 */
export class Notification extends ValidationHandler {

    /** The list of accumulated validation errors. */
    private _errors: Error[];

    /**
     * Private constructor to enforce use of the `create` factory method.
     * 
     * @param errors - Initial list of errors (usually empty).
     */
    private constructor(errors: Error[]) {
        super();
        this._errors = errors;
    }

    /**
     * Factory method to create an empty `Notification`.
     * 
     * @returns A new instance of `Notification` with no errors.
     */
    public static create(): Notification {
        return new Notification([]);
    }

    /**
     * Appends a single error to the notification.
     * 
     * @param error - The validation error to append.
     * @returns This notification instance for chaining.
     */
    appendError(error: Error): ValidationHandler {
        this._errors.push(error);
        return this;
    }
    
    /**
     * Adds errors from another `ValidationHandler` to this notification.
     * 
     * @param handler - A validation handler containing errors to merge.
     * @returns This notification instance for chaining.
     */
    addHandlers(handler: ValidationHandler): ValidationHandler {
        this._errors.push(...handler.getErrors());
        return this;
    }

    /**
     * Executes a validation logic block, capturing any domain errors that occur.
     * 
     * @param validation - A validation function returning a value or throwing a `DomainError`.
     * @returns The result of the validation, or `null` if it failed.
     */
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

    /**
     * Returns the list of accumulated validation errors.
     * 
     * @returns An array of `Error` objects.
     */
    getErrors(): Error[] {
        return this._errors;
    }     
}