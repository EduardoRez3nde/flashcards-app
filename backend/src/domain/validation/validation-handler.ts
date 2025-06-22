/**
 * Represents a generic validation contract that must return a value of type T.
 */
export interface Validation<T> {
    /**
     * Executes the validation logic and returns a value of type T.
     */
    validate(): T;
}

/**
 * Abstract base class for handling validation logic and errors.
 *
 * Implementations of this class provide mechanisms to collect, combine, and query validation errors.
 */
export default abstract class ValidationHandler {

    /**
     * Appends a new validation error to the handler.
     * 
     * @param error - The error to append.
     * @returns The current validation handler for chaining.
     */
    abstract appendError(error: Error): ValidationHandler;

    /**
     * Merges another validation handler's errors into the current one.
     * 
     * @param handler - Another validation handler to merge.
     * @returns The current validation handler for chaining.
     */
    abstract addHandlers(handler: ValidationHandler): ValidationHandler;

    /**
     * Executes a validation and captures any thrown domain errors.
     * 
     * @param validation - A validation operation.
     * @returns The result of the validation or null if an error occurred.
     */
    abstract validate<T>(validation: Validation<T>): T;

    /**
     * Returns the list of validation errors.
     */
    abstract getErrors(): Error[];

    /**
     * Checks whether the handler contains any errors.
     * 
     * @returns True if there are any errors, false otherwise.
     */
    public hasError(): boolean {
        return this.getErrors() != null && this.getErrors().length > 0;
    }

    /**
     * Returns the first validation error, if any.
     * 
     * @returns The first error or null if none exist.
     */
    public firstError(): Error {
        return (this.hasError()) ? this.getErrors()[0] : null;
    }
}
