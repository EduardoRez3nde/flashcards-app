import ValidationHandler from "./validation-handler";

/**
 * Abstract base class for implementing domain validators.
 *
 * A `Validator` uses a `ValidationHandler` to collect and manage validation errors.
 * Subclasses should implement the `validate` method with specific validation logic.
 */
export default abstract class Validator {

    private handler: ValidationHandler;

    /**
     * Creates a new instance of `Validator` with a given `ValidationHandler`.
     * 
     * @param validationHandler - The handler responsible for managing validation errors.
     */
    protected constructor(validationHandler: ValidationHandler) {
        this.handler = validationHandler;
    }

    /**
     * Executes the validation logic. This method must be implemented by subclasses.
     */
    abstract validate(): void;

    /**
     * Returns the associated `ValidationHandler`, which contains validation errors.
     * 
     * @returns The validation handler instance.
     */
    validationHandler(): ValidationHandler {
        return this.handler;
    }
}
