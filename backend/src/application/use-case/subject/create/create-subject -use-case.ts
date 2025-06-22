import { UseCase } from "application/use-case";
import { CreateSubjectCommand } from "./create-subject-command";
import { Either, left, right } from "application/utils/either";
import { Notification } from "domain/validation/handler/notification";
import { Category } from "domain/entities/category/category";
import { Subject } from "domain/entities/subject/subject";
import { SubjectRepository } from "domain/entities/subject/subject-repository";
import { CategoryRepository } from "domain/entities/category/category-repository";
import { CreateSubjectOutput } from "./create-subject-output";
import { UnexpectedError } from "domain/validation/errors/unexpected-error";
import { NotFoundError } from "domain/validation/errors/not-found-error";


export class CreateSubjectUseCase implements UseCase<CreateSubjectCommand, Either<Notification, CreateSubjectOutput>> {

    constructor(
        private readonly subjectRepository: SubjectRepository, 
        private readonly categoryRepository: CategoryRepository
    ) { }

    async execute(input: CreateSubjectCommand): Promise<Either<Notification, CreateSubjectOutput>> {

        const notification: Notification = Notification.create();

        const category: Category = await this.categoryRepository.findById(input.categoryID);

        if (!category) {
            notification.appendError(new NotFoundError("Category not found"));
            return left(notification);
        }

        const subject: Subject =  Subject.create({
            name: input.name,
            categoryID: category.id 
        });
        subject.validate(notification);

        if (notification.hasError()) {
            return left(notification);
        }

        try {
            await this.subjectRepository.create(subject);
            const output: CreateSubjectOutput = CreateSubjectOutput.from(subject);
            return right(output);
            
        } catch (error) {
            const notificationError: Notification = Notification.create();
            notificationError.appendError(new UnexpectedError("Database Error"));
            return left(notificationError);
        }
    }
}