import { Error } from "./error";

export interface Validation<T> {
    validate(): T;
}

export default abstract class ValidationHandler {

    abstract appendError(error: Error): ValidationHandler;

    abstract addHandlers(handler: ValidationHandler): ValidationHandler;

    abstract validate<T>(validation: Validation<T>): T;

    abstract getErrors(): Error[];

    hasError(): boolean {
        return this.getErrors() != null && this.getErrors().length > 0;
    }

    firstError(): Error {
        return (this.hasError()) ? this.getErrors()[0] : null;
    }
}