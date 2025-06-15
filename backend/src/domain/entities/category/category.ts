import { AggregateRoot } from "../../aggregate-root";
import CategoryID from "./category-id";
import { CategoryValidation } from "./category-validation";
import { CategoryCreatedEvent } from "../../events/category/category-create-event";
import CategoryUpdateNameEvent from "../../events/category/category-update-name-event";
import ValidationHandler from "../../validation/validation-handler";

export interface CategoryProperties {
  name: string;
  isActive?: boolean;
  createdAt?: Date;
}

export class Category extends AggregateRoot<CategoryID> {
    
  private  _name: string;
  private  _isActive: boolean;
  private _createdAt: Date;

  private constructor(props: CategoryProperties, id: CategoryID) {
    super(id);
    this._name = props.name;
    this._isActive =  props.isActive;
    this._createdAt = props.createdAt;
  }

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

  public static with(id: CategoryID, props: CategoryProperties) {
    return new Category(props, id);
  }

  public updateName(newName: string): void {

    if (!newName || newName.length === 0) {
      throw new Error("Name cannot be empty or null");
    }
    this._name = newName;
    
    this.addEvent(CategoryUpdateNameEvent.create(this.id, this.name));
  }

  public activate(): void {
    this._isActive = true;
  }

  public deactivate(): void {
    this._isActive = false;
  }

  validate(handler: ValidationHandler): void {
    new CategoryValidation(this, handler).validate();
  }

  get name(): string {
    return this._name;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  get createdAt(): Date {
    return this._createdAt;
  }
}
