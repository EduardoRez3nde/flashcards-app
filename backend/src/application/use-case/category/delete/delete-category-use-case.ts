import { UseCase } from "application/use-case";
import { DeleteCategoryCommand } from "./delete-category-command";
import { Either, left, right } from "application/utils/either";
import { DeleteCategoryOutput } from "./delete-category-output";
import { Notification } from "domain/validation/handler/notification";
import CategoryID from "domain/entities/category/category-id";
import { Category } from "domain/entities/category/category";
import { CategoryRepository } from "domain/entities/category/category-repository";
import { NotFoundError } from "domain/validation/errors/not-found-error";


export class DeleteCategoryUseCase implements UseCase<DeleteCategoryCommand, Either<Notification, DeleteCategoryOutput>> {

    constructor(private readonly categoryRepository: CategoryRepository) { }

    async execute(input: DeleteCategoryCommand): Promise<Either<Notification, DeleteCategoryOutput>> {

        const notification: Notification = Notification.create();

        const id: CategoryID = CategoryID.from(input.id);

        const category: Category = await this.categoryRepository.findById(id);

        if (!category) {
            notification.appendError(new NotFoundError(`Category with id ${id} not found`));
            return left(notification);
        }

        try {
            await this.categoryRepository.deleteById(id);
            return right(undefined);
            
        } catch(err) {
            notification.appendError(new Error((err as Error).message));
            return left(notification);
        }
    }

}