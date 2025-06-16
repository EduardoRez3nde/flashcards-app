import { prisma } from "infrastructure/database/prisma/prisma";
import { CategoryRepository } from "domain/entities/category/category-repository";
import { CategoryPrismaRepository } from "infrastructure/database/repositories/category-prisma-repository";
import { CreateCategoryUseCase } from "application/use-case/category/create/create-category-use-case";
import { CategoryController } from "../controllers/category-controller";


const categoryRepository: CategoryRepository = new CategoryPrismaRepository(prisma);

const createCategoryUseCase: CreateCategoryUseCase = new CreateCategoryUseCase(categoryRepository);

export const categoryController = new CategoryController(createCategoryUseCase);
