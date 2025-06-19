import { prisma } from "infrastructure/database/prisma/prisma";
import { CategoryRepository } from "domain/entities/category/category-repository";
import { CategoryPrismaRepository } from "infrastructure/database/repositories/category-prisma-repository";
import { CreateCategoryUseCase } from "application/use-case/category/create/create-category-use-case";
import { CategoryController } from "../controllers/category-controller";
import { DeleteCategoryUseCase } from "application/use-case/category/delete/delete-category-use-case";
import { SearchPaginatedCategoryUseCase } from "application/use-case/category/retrieve/list/SearchPaginatedCategoryUseCase";
import { UpdateCategoryUseCase } from "application/use-case/category/update/update-category-use-case";


const categoryRepository: CategoryRepository = new CategoryPrismaRepository(prisma);

const createCategoryUseCase: CreateCategoryUseCase = new CreateCategoryUseCase(categoryRepository);

const deleteCategoryUseCase: DeleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository);

const searchCategoryUseCase: SearchPaginatedCategoryUseCase = new SearchPaginatedCategoryUseCase(categoryRepository);

const updateCategoryUseCase: UpdateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository);

export const categoryController = new CategoryController(
    createCategoryUseCase,
    deleteCategoryUseCase,
    searchCategoryUseCase,
    updateCategoryUseCase,
);
