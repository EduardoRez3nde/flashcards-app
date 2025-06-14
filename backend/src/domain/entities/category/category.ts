import { v4 as uuidV4 } from "uuid";
import CategoryID from "./category-id";
import { AggregateRoot } from "domain/aggregate-root";
import { CategoryCreatedEvent } from "domain/events/category/category-create-event";
import { CategoryUpdateNameEvent } from "domain/events/category/category-update-name-event";
import ValidationHandler from "domain/validation/validation-handler";
import { CategoryValidation } from "./category-validation";

export interface CategoryProperties {
  name: string;
  isActive?: boolean;
  createdAt?: Date;
}

export class Category extends AggregateRoot<CategoryID> {
    
  private  _name: string;
  private  _isActive: boolean;
  private _createdAt: Date;

  private constructor(props: CategoryProperties, id?: CategoryID) {
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

    const category: Category = new Category(props);

    category.addEvent(CategoryCreatedEvent.create(id, name));

    return category; 
  }

  public updateName(newName: string): void {

    if (!newName || this.name.length === 0) {
      throw new Error("Name cannot be empty");
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
    return this.name;
  }

  get isActive(): boolean {
    return this.isActive;
  }

  get createdAt(): Date {
    return this.createdAt;
  }
}
