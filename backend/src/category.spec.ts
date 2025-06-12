import { Category } from "./test";

describe("Category Tests", (): void => {

    test("constructor of category", (): void => {
        const category: Category = new Category("Computer Science");
        expect(category.name).toBe("Computer Science");
    })
});