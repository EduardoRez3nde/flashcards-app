import { Category } from "domain/entities/category/category";


export class UpdateCategoryOutput {
    
    public readonly id: string;
    public readonly name: string;
    public readonly isActive: boolean;
    public readonly createdAt: Date;

    private constructor(category: Category) {
        this.id = category.id.value;
        this.name = category.name;
        this.isActive = category.isActive;
        this.createdAt = category.createdAt;
    }

    public static from(category: Category): UpdateCategoryOutput {
        return new UpdateCategoryOutput(category);
    }
}