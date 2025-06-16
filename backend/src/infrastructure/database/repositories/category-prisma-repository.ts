import { Prisma, PrismaClient } from "@prisma/client";
import { Category } from "domain/entities/category/category";
import CategoryID from "domain/entities/category/category-id";
import { CategoryFilter, CategoryRepository } from "domain/entities/category/category-repository";
import { PaginationOutput, PaginationOutputMapper } from "domain/pagination/pagination-output";
import { SearchInput } from "domain/pagination/search-input";


export class CategoryPrismaRepository implements CategoryRepository {

    /**
     * Injects the Prisma Client instance.
     * @param {PrismaClient} prisma - The Prisma Client instance for database communication.
    */
    constructor(private readonly prisma: PrismaClient) { }

    /**
     * Persists a new category entity to the database.
     * It maps the domain entity to the Prisma data model.
     * @param {Category} category - The category domain entity to create.
     * @returns {Promise<Category>} The created category entity.
    */
    async create(category: Category): Promise<Category> {
        
        const data = {
            id: category.id.value,
            name: category.name,
            isActive: category.isActive,
            createdAt: category.createdAt
        };

        await this.prisma.category.create({ data });
        return category;
    }

    /**
     * Deletes a category from the database by its unique ID.
     * This operation is idempotent; it won't throw an error if the ID doesn't exist.
     * @param {CategoryID} id - The ID of the category to delete.
     * @returns {Promise<void>}
    */
    async deleteById(id: CategoryID): Promise<void> {

        await this.prisma.category.delete({
             where: { id: id.value } 
            })
            .catch(() => { });
    }

    /**
     * Updates an existing category in the database.
     * It maps the domain entity to the Prisma data model for the update operation
     * and maps the result back to a new domain entity instance.
     * @param {Category} category - The category domain entity with updated data.
     * @returns {Promise<Category>} The updated category domain entity.
    */
    async update(category: Category): Promise<Category> {
        
        const data = {
            name: category.name,
            isActive: category.isActive
        }

        const updateCategory = await this.prisma.category.update({
            where: {
                id: category.id.value 
            },
            data
        });

        return Category.with(
            CategoryID.from(updateCategory.id),
            {
                name: updateCategory.name,
                isActive: updateCategory.isActive,
                createdAt: updateCategory.createdAt
            }
        );
    }

    /**
     * Finds a single category by its unique ID.
     * @param {CategoryID} id - The ID of the category to find.
     * @returns {Promise<Category | null>} The category domain entity if found, otherwise null.
    */
    async findById(id: CategoryID): Promise<Category | null> {
        
        const category = await this.prisma.category.findUnique({
            where: { id: id.value }
        });

        if (!category) return null;

        return Category.with(
            CategoryID.from(category.id),
            {
                name: category.name,
                isActive: category.isActive,
                createdAt: category.createdAt
            }
        );
    }

    /**
     * Performs a paginated and filtered search for categories.
     * It builds a dynamic query based on the search input.
     * @param {SearchInput<CategoryFilter>} searchInput - The search parameters, including pagination and filters.
     * @returns {Promise<PaginationOutput<Category>>} A paginated list of category domain entities.
    */
    async search(searchInput: SearchInput<CategoryFilter>): Promise<PaginationOutput<Category>> {

        const page: number = searchInput.page;
        const perPage: number = searchInput.perPage;
        const offset: number = (page - 1) * perPage;

        const where: Prisma.CategoryWhereInput = { };

        if (searchInput.filter?.name) {
            where.name = {
                contains: searchInput.filter.name,
                mode: "insensitive"
            }
        };

        const [total, categories] = await this.prisma.$transaction([

            this.prisma.category.count({ where }),

            this.prisma.category.findMany({
                where,
                skip: offset,
                take: perPage,
                orderBy: {
                    [searchInput.sort!]: searchInput.sort!,
                },
            })
        ]);
        
        const domainCategories = categories.map((category) =>
            Category.with(CategoryID.from(category.id),{
                name: category.name,
                isActive: category.isActive,
                createdAt: category.createdAt
            })
        );

        return PaginationOutputMapper.toOutput(
            domainCategories,
            total,
            page,
            perPage,
        );
    }
}