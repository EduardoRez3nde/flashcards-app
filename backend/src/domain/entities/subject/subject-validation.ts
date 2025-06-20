import Validator from "../../validation/validator";
import ValidationHandler from "domain/validation/validation-handler";
import { Subject } from "./subject";


export class SubjectValidation extends Validator {

    private static NAME_MAX_LENGTH: number = 150;
    
    private static NAME_MIN_LENGTH: number = 3;

    private readonly _subject: Subject;

    constructor(subject: Subject, handler: ValidationHandler) {
        super(handler);
        this._subject = subject;
    }

    public validate(): void {
        this.checkNameConstraints();
        // Add other validation calls here (e.g., checkDescriptionConstraints)
    } 

    private checkNameConstraints(): void {

        const name = this._subject.name;

        if (name === null || name === undefined) {
            this.validationHandler().appendError(new Error("'name' should not be null"));
            return;
        }

        if (name.trim().length === 0) {
            this.validationHandler().appendError(new Error("'name' should not be empty or blank"));
            return;
        }

        if (name.length > SubjectValidation.NAME_MAX_LENGTH) {
            this.validationHandler().appendError(new Error(`'name' must not be longer than ${SubjectValidation.NAME_MAX_LENGTH} characters`));
            return;
        }

        if (name.length < SubjectValidation.NAME_MIN_LENGTH) {
            this.validationHandler().appendError(new Error(`'name' must not be shorter than ${SubjectValidation.NAME_MIN_LENGTH} characters`));
            return;
        }
    }
}
