import Validator from "../../validation/validator";
import { Category } from "./category";
import ValidationHandler from "domain/validation/validation-handler";
import { Error } from "../../validation/error";


export class CategoryValidation extends Validator {

    private static NAME_MAX_LENGTH: number = 150;
    private static NAME_MIN_LENGTH: number = 5;

    private _category: Category;

    constructor(category: Category, handler: ValidationHandler) {
        super(handler);
        this._category = category;
    }

    validate(): void {
        this.checkNameConstraints();
    } 

    private checkNameConstraints(): void {

        const name = this._category.name;

        if (name === null) {
            this.validationHandler().appendError(new Error("'name' should not be null"));
            return;
        }

        if (name.trim().length === 0) {
            this.validationHandler().appendError(new Error("'name' should not empty or blank"));
            return;
        }

        if (name.length > CategoryValidation.NAME_MAX_LENGTH) {
            this.validationHandler().appendError(new Error("'name' must not be longer than 150 characters"));
            return;
        }

        if (name.length < CategoryValidation.NAME_MIN_LENGTH) {
            this.validationHandler().appendError(new Error("'name' must not be shorter than 150 characters"));
            return;
        }
    }
}