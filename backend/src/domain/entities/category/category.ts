import { v4 as uuidV4 } from "uuid";

export interface CategoryProperties {
  name: string;
  isActive?: boolean;
  createdAt?: Date;
}

export class Category {
    
  readonly props: Required<CategoryProperties>;
  private readonly _id: string;

  constructor(props: CategoryProperties, id?: string) {
    
    this._id = id || uuidV4();
    this.props = {
      ...props,
      isActive: props.isActive ?? true,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  get name(): string {
    return this.props.name;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get id(): string {
    return this._id;
  }
}
