import { UseCase } from "application/use-case";
import { Either, left, right } from "application/utils/either";
import { SearchInput } from "domain/pagination/search-input";
import { Notification } from "domain/validation/handler/notification";
import { UnexpectedError } from "domain/validation/errors/unexpected-error";
import { SearchPaginatedSubjectCommand } from "./search-paginated-subject-command";
import { SearchPaginatedSubjectOutput } from "./search-paginated-subject-output";
import { SubjectFilter, SubjectRepository } from "domain/entities/subject/subject-repository";


export class SearchPaginatedCategoryUseCase implements UseCase<SearchPaginatedSubjectCommand, Either<Notification, SearchPaginatedSubjectOutput>> {

    constructor(private readonly subjectRepository: SubjectRepository) { }

    async execute(input: SearchPaginatedSubjectCommand): Promise<Either<Notification, SearchPaginatedSubjectOutput>> {

        try {
            const searchInput: SearchInput<SubjectFilter> = {
                page: input.page,
                perPage: input.perPage,
                sort: input.sort,
                sortDir: input.sortDir,
                filter: input.filter
            };

            const searchResult = await this.subjectRepository.search(searchInput);

            const lastPage: number = (searchResult.perPage > 0) 
                    ? Math.ceil(searchResult.total / searchResult.perPage)
                    : 0;

            const outputResult = searchResult.items.map(subject => ({
                id: subject.id.value,
                name: subject.name,
                categoryID: subject.categoryID.value,
                isActive: subject.isActive,
                createdAt: subject.createdAt
            }));

            const paginatedOutput: SearchPaginatedSubjectOutput = {
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