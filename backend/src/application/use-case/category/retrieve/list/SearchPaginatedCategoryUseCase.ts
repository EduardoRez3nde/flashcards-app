import { UseCase } from "application/use-case";
import { SearchPaginatedCategoryCommand } from "./SearchPaginatedCategoryCommand";
import { Either, left, right } from "application/utils/either";
import { CategoryOutput, SearchPaginatedCategoryOutput } from "./SearchPaginatedCategoryOutput";
import { SearchInput } from "domain/pagination/search-input";
import { CategoryFilter, CategoryRepository } from "domain/entities/category/category-repository";
import { PaginationOutput } from "domain/pagination/pagination-output";
import { Notification } from "domain/validation/handler/notification";
import { UnexpectedError } from "domain/validation/errors/unexpected-error";
import { Category } from "@prisma/client";

export class SearchPaginatedCategoryUseCase implements UseCase<SearchPaginatedCategoryCommand, Either<Notification, SearchPaginatedCategoryOutput>> {

    constructor(private readonly categoryRepository: CategoryRepository) { }

    async execute(input: SearchPaginatedCategoryCommand): Promise<Either<Notification, SearchPaginatedCategoryOutput>> {

        try {
            const searchInput: SearchInput<CategoryFilter> = {
                page: input.page,
                perPage: input.perPage,
                sort: input.sort,
                sortDir: input.sortDir,
                filter: input.filter
            };

            const searchResult = await this.categoryRepository.search(searchInput);

            const lastPage: number = (searchResult.perPage > 0) 
                    ? Math.ceil(searchResult.total / searchResult.perPage)
                    : 0;

            const outputResult = searchResult.items.map(category => ({
                id: category.id.value,
                name: category.name,
                isActive: category.isActive,
                createdAt: category.createdAt
            }));

            const paginatedOutput: SearchPaginatedCategoryOutput = {
                items: outputResult,
                total: searchResult.total,
                currentPage: searchResult.currentPage,
                lastPage,
                perPage: searchResult.perPage
            }

            return right(paginatedOutput);

        } catch (error) {
            const notification: Notification = Notification.create();
            notification.appendError(new UnexpectedError("Erro inesperado no servidor"));
            return left(notification);
        }
    }

}