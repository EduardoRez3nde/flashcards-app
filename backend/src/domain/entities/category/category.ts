import { AggregateRoot } from "../../aggregate-root";
import CategoryID from "./category-id";
import { CategoryValidation } from "./category-validation";
import { CategoryCreatedEvent } from "../../events/category/category-create-event";
import CategoryUpdateNameEvent from "../../events/category/category-update-name-event";
import ValidationHandler from "../../validation/validation-handler";


/**
 * Properties used to construct a Category.
 */
export interface CategoryProperties {
  name: string;
  isActive?: boolean;
  createdAt?: Date;
}

/**
 * Domain entity representing a Category.
 * 
 * Follows DDD principles by extending AggregateRoot and encapsulates business rules
 * such as name validation, activation status, event registration, and entity creation.
 */
export class Category extends AggregateRoot<CategoryID> {

  private _name: string;
  private _isActive: boolean;
  private _createdAt: Date;

  /**
   * Private constructor used internally for controlled instantiation.
   * 
   * @param props - The properties of the Category.
   * @param id - The unique identifier for the Category.
   */
  private constructor(props: CategoryProperties, id: CategoryID) {
    super(id);
    this._name = props.name;
    this._isActive = props.isActive;
    this._createdAt = props.createdAt;
  }

  /**
   * Factory method to create a new Category.
   * Automatically sets the category as active and assigns current date as creation date.
   * Triggers a `CategoryCreatedEvent`.
   * 
   * @param name - Name of the category.
   * @returns A new instance of `Category`.
   */
  public static create(name: string): Category {
    const id: CategoryID = CategoryID.unique();
    const props: CategoryProperties = {
      name,
      isActive: true,
      createdAt: new Date()
    };

    const category: Category = new Category(props, id);
    category.addEvent(CategoryCreatedEvent.create(id, name));
    return category;
  }

  /**
   * Factory method to recreate a Category from existing data (e.g., from persistence).
   * 
   * @param id - The existing `CategoryID`.
   * @param props - Category properties.
   * @returns A new instance of `Category` with provided data.
   */
  public static with(id: CategoryID, props: CategoryProperties): Category {
    return new Category(props, id);
  }

  /**
   * Updates the name of the category.
   * Triggers a `CategoryUpdateNameEvent`.
   * 
   * @param newName - The new name to assign.
   * @throws If the name is empty or null.
   */
  public updateName(newName: string): void {
    if (!newName || newName.length === 0) {
      throw new Error("Name cannot be empty or null");
    }
    this._name = newName;
    this.addEvent(CategoryUpdateNameEvent.create(this.id, this.name));
  }

  public updateCategory(name?: string, isActive?: boolean): void {
    
    if (name != null && this._name !== name) {
        this._name = name;
        this.addEvent(CategoryUpdateNameEvent.create(this.id, this._name));
    }

    if (isActive !== null && isActive !== undefined) {
      (isActive) ? this.activate() : this.deactivate();
    }
  }

  /**
   * Activates the category.
   */
  public activate(): void {
    this._isActive = true;
  }

  /**
   * Deactivates the category.
   */
  public deactivate(): void {
    this._isActive = false;
  }

  /**
   * Validates the current state of the category using the provided validation handler.
   * 
   * @param handler - The validation handler to use.
   */
  validate(handler: ValidationHandler): void {
    new CategoryValidation(this, handler).validate();
  }

  /** @returns The category's name. */
  get name(): string {
    return this._name;
  }

  /** @returns Whether the category is active. */
  get isActive(): boolean {
    return this._isActive;
  }

  /** @returns The category's creation date. */
  get createdAt(): Date {
    return this._createdAt;
  }
}