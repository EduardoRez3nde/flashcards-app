import { UseCase } from "application/use-case";
import { UpdateCategoryCommand } from "./update-category-command";
import { Either, left, right } from "application/utils/either";
import { UpdateCategoryOutput } from "./update-category-output";
import { CategoryRepository } from "domain/entities/category/category-repository";
import { Notification } from "domain/validation/handler/notification";
import { Category } from "domain/entities/category/category";
import CategoryID from "domain/entities/category/category-id";
import { NotFoundError } from "domain/validation/errors/not-found-error";
import { UnexpectedError } from "domain/validation/errors/unexpected-error";

export class UpdateCategoryUseCase implements UseCase<UpdateCategoryCommand, Either<Notification, UpdateCategoryOutput>> {

    constructor(private readonly categoryRepository: CategoryRepository) { }

    async execute(input: UpdateCategoryCommand): Promise<Either<Notification, UpdateCategoryOutput>> {

        const notification: Notification = Notification.create();

        const id: CategoryID = CategoryID.from(input.id);

        const result: Category | null = await this.categoryRepository.findById(id);

        if (!result) {
            notification.appendError(new NotFoundError(`Category with id ${id} not found`));
            return left(notification);
        }

        const updateName: string = input.name;
        const updateIsActive: boolean = input.isActive;

        result.updateCategory(updateName, updateIsActive);

        result.validate(notification);

        if (notification.hasError())
            return left(notification);

        try {
            await this.categoryRepository.update(result);
            return right(UpdateCategoryOutput.from(result));
        } catch(error) {
            notification.appendError(new UnexpectedError("An unexpected error occurred while updating the category"));
            return left(notification);
        }
    }
}