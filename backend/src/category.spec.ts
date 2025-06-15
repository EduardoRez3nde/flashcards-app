import CategoryID from "./domain/entities/category/category-id";
import { Category } from "./domain/entities/category/category";
import CategoryUpdateNameEvent from "./domain/events/category/category-update-name-event";

describe("Category Tests", (): void => {

    test("should create a category with a valid name.", (): void => {

        const category: Category = Category.create("Computer Science");

        expect(category.id).toBeInstanceOf(CategoryID);
        expect(category.name).toBe("Computer Science");
        expect(category.isActive).toBe(true);
        expect(category.createdAt).toEqual(expect.any(Date));
        expect(category.events).not.toBeNull();
    });

    test("Should update the category name with a new valid name.", (): void => {

        const nameMaxLength: number = 150;
        const nameMinLength: number = 5;

        const category: Category = Category.create("Computer Science");

        category.updateName("Mathematics");

        expect(category.name).toBe("Mathematics");
        expect(category.name.length).toBeGreaterThanOrEqual(nameMinLength);
        expect(category.name.length).toBeLessThanOrEqual(nameMaxLength);
    });

    test("Should throw an error if the new name is empty or undefined", (): void => {
        
        const category: Category = Category.create("Computer Science");

        expect(() => category.updateName(null as any))
            .toThrow(new Error("Name cannot be empty or null"));
    });

    test("Should add the CategoryUpdateNameEvent event after updating.", (): void => {

        const category: Category = Category.create("Computer Science");
        category.clearEvent();
        category.updateName("Programming");

        expect(category.events).not.toBeNull();
        expect(category.events).toHaveLength(1);

        const event: CategoryUpdateNameEvent = category.events[0] as CategoryUpdateNameEvent;

        expect(event).toBeInstanceOf(CategoryUpdateNameEvent);
        expect(category.id).toBe(event.id);
        expect(category.name).toBe(event.name);
    });
});

