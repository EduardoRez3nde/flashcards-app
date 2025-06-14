import { DomainError } from "./domain-error";

export interface Validation<T> {
    validate(): T;
}

export default abstract class ValidationHandler {

    abstract append(error: DomainError): ValidationHandler;

    abstract append(handler: ValidationHandler): ValidationHandler;

    abstract validate<T>(validation: Validation<T>): T;

    abstract getErrors(): DomainError[];

    hasError(): boolean {
        return this.getErrors() != null && this.getErrors().length > 0;
    }

    firstError(): DomainError {
        return (this.hasError()) ? this.getErrors()[0] : null;
    }
}