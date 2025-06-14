import ValidationHandler from "./validation-handler";

export default abstract class Validator {

    private handler: ValidationHandler;

    protected constructor(validationHandler: ValidationHandler) {
        this.handler = validationHandler;
    }

    abstract validate(): void;

    validationHandler(): ValidationHandler {
        return this.handler;
    }
}