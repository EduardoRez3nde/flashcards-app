import Validator from "../../validation/validator";
import { Category } from "./category";
import ValidationHandler from "domain/validation/validation-handler";

/**
 * A specific validator for the Category entity.
 * It encapsulates all business validation rules for a category.
 */
export class CategoryValidation extends Validator {

    /**
     * The maximum allowed length for the category name.
     */
    private static NAME_MAX_LENGTH: number = 150;
    
    /**
     * The minimum allowed length for the category name.
     */
    private static NAME_MIN_LENGTH: number = 5;

    private readonly _category: Category;

    /**
     * Creates a new instance of the Category validator.
     * @param {Category} category - The Category entity instance to be validated.
     * @param {ValidationHandler} handler - The handler that will accumulate validation errors.
     */
    constructor(category: Category, handler: ValidationHandler) {
        super(handler);
        this._category = category;
    }

    /**
     * Executes all validation checks for the category.
     */
    public validate(): void {
        this.checkNameConstraints();
        // Add other validation calls here (e.g., checkDescriptionConstraints)
    } 

    /**
     * Checks the business rules (constraints) for the 'name' property.
     * - Cannot be null.
     * - Cannot be empty.
     * - Must respect the maximum and minimum length limits.
     */
    private checkNameConstraints(): void {
        const name = this._category.name;

        if (name === null || name === undefined) {
            this.validationHandler().appendError({ message: "'name' should not be null" });
            return;
        }

        if (name.trim().length === 0) {
            this.validationHandler().appendError({ message: "'name' should not be empty or blank" });
            return;
        }

        if (name.length > CategoryValidation.NAME_MAX_LENGTH) {
            this.validationHandler().appendError({ message: `'name' must not be longer than ${CategoryValidation.NAME_MAX_LENGTH} characters` });
            return;
        }

        if (name.length < CategoryValidation.NAME_MIN_LENGTH) {
            this.validationHandler().appendError({ message: `'name' must not be shorter than ${CategoryValidation.NAME_MIN_LENGTH} characters` });
            return;
        }
    }
}
