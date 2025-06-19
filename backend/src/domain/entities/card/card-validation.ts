import Validator from "domain/validation/validator";
import { Card } from "./card";
import ValidationHandler from "domain/validation/validation-handler";

export class CardValidation extends Validator {

    /**
     * The maximum allowed length for the card name.
     */
    private static NAME_MAX_LENGTH: number = 150;
    
    /**
     * The minimum allowed length for the card name.
     */
    private static NAME_MIN_LENGTH: number = 3;

    private readonly card: Card;

    constructor(card: Card, handler: ValidationHandler) {
        super(handler);
        this.card = card;
    }

    validate(): void {
        this.checkNameConstraints();
    }

    private checkNameConstraints(): void {

        const name: string = this.card.name;

        if (name === null || name === undefined) {
            this.validationHandler().appendError(new Error("'name' should not be null"));
            return;
        }

        if (name.trim().length === 0) {
            this.validationHandler().appendError(new Error("'name' should not be empty or blank"));
            return;
        }

        if (name.length > CardValidation.NAME_MAX_LENGTH) {
            this.validationHandler().appendError(new Error(`'name' must not be longer than ${CardValidation.NAME_MAX_LENGTH} characters`));
            return;
        }

        if (name.length < CardValidation.NAME_MIN_LENGTH) {
            this.validationHandler().appendError(new Error(`'name' must not be shorter than ${CardValidation.NAME_MIN_LENGTH} characters`));
            return;
        }
    }
}

