import { UseCase } from "application/use-case";
import CreateCategoryCommand from "./create-category-command";
import { Either, left, right } from "application/utils/either";
import CreateCategoryOutput from "./create-category-output";
import { CategoryRepository } from "domain/entities/category/category-repository";
import { Notification } from "domain/validation/handler/notification";
import { Category } from "domain/entities/category/category";
import { Error } from "domain/validation/error";


export class CreateCategoryUseCase implements 
    UseCase<CreateCategoryCommand, Either<Notification, CreateCategoryOutput>> {

    constructor(readonly categoryRepository: CategoryRepository) { }

    async execute(input: CreateCategoryCommand): Promise<Either<Notification, CreateCategoryOutput>> { 
           
        const notification: Notification = Notification.create();

        const category: Category = Category.create(input.name);
        category.validate(notification);

        if (notification.hasError())
            return left(notification);

        // ajustar para uma abordagem funcional
        try {
            await this.categoryRepository.create(category);
            const output: CreateCategoryOutput = CreateCategoryOutput.of(category);
            return right(output);
        } catch (error) {
            const notificationError: Notification = Notification.create();
            notificationError.appendError(new Error("Database Error"));
            return left(notificationError);
        } 
    }
}