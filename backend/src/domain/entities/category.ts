export interface CategoryProperties {
  name: string;
  isActive?: boolean;
  createdAt?: Date;
}

export class Category {
    
  readonly props: Required<CategoryProperties>;
  private id: string;

  constructor(props: CategoryProperties, id?: string) {
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
}
