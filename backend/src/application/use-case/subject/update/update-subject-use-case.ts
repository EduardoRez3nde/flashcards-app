import { UpdateSubjectOutput } from "./update-subject-output";
import { UseCase } from "application/use-case";
import { Either, left, right } from "application/utils/either";
import { Notification } from "domain/validation/handler/notification";
import { NotFoundError } from "domain/validation/errors/not-found-error";
import { Category } from "domain/entities/category/category";
import { CategoryRepository } from "domain/entities/category/category-repository";
import { Subject } from "domain/entities/subject/subject";
import { SubjectRepository } from "domain/entities/subject/subject-repository";
import SubjectID from "domain/entities/subject/subject-id";
import CategoryID from "domain/entities/category/category-id";
import { UpdateSubjectCommand } from "./update-subject-command";
import { UnexpectedError } from "domain/validation/errors/unexpected-error";


export class UpdateSubjectUseCase implements UseCase<UpdateSubjectCommand, Either<Notification, UpdateSubjectOutput>> {

    constructor(
        private readonly categoryRepository: CategoryRepository,
        private readonly subjectRepository: SubjectRepository
    ) {}

    async execute(input: UpdateSubjectCommand): Promise<Either<Notification, UpdateSubjectOutput>> { 

        const notification: Notification = Notification.create();
        const subjectId: SubjectID = SubjectID.from(input.id);

        const subject: Subject = await this.subjectRepository.findById(subjectId);

        if (!subject) {
            notification.appendError(new NotFoundError("Subject not found"));
            return left(notification);
        }

        const updateCategory: CategoryID | undefined = CategoryID.from(input.categoryID);

        if (updateCategory) {
            const category: Category = await this.categoryRepository.findById(updateCategory);
            if (!category) {
                notification.appendError(new NotFoundError("Category not found"));
                return left(notification);
            }
        }

        subject.update({
            name: input.name,
            isActive: input.isActive,
            categoryID: updateCategory,
        });
        
        subject.validate(notification);

        if (notification.hasError()) {
            return left(notification);
        }
    
        try {
            await this.subjectRepository.update(subject);
            const output: UpdateSubjectOutput = UpdateSubjectOutput.from(subject);
            return right(output);
            
        } catch (error) {
            const notificationError: Notification = Notification.create();
            notificationError.appendError(new UnexpectedError("Database Error"));
            return left(notificationError);
        }
    }
}