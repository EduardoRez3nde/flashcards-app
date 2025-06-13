import { now } from "sequelize/types/utils";
import { Category } from "./domain/entities/category";

describe("Category Tests", (): void => {

    test("constructor of category", (): void => {

        const now = new Date();

        const category: Category = new Category({
            name: "Computer Science", 
            isActive: true, 
            createdAt: now,
        });

        expect(category.props).toStrictEqual({
            name: "Computer Science", 
            isActive: true, 
            createdAt: now,
        });

        expect(category.createdAt).toBeInstanceOf(Date);
    });

    test("should set isActive to true if not provided", (): void => {

        const now: Date = new Date();

        const category: Category = new Category({
            name: "Computer Science",
            createdAt: now,
        });

        expect(category.props).toStrictEqual({
            name: "Computer Science",
            isActive: true,
            createdAt: now,
        });
    });

    test("should set createdAt to now if not provided", (): void => {
        
        const before: Date = new Date();

        const category: Category = new Category({
            name: "Math",
            isActive: true
        });

        const after: Date = new Date();

        expect(category.name).toBe("Math");
        expect(category.isActive).toBe(true);
        expect(category.createdAt.getTime()).toBeGreaterThanOrEqual(before.getTime());
        expect(category.createdAt.getTime()).toBeLessThanOrEqual(after.getTime());
    });
});

