import { CreateCategoryUseCase } from "application/use-case/category/create/create-category-use-case";


export class CategoryController {

    constructor(
        private readonly createCategoryUseCase: CreateCategoryUseCase
    ) { }

    
}