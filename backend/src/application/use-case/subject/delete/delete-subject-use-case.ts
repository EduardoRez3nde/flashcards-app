import { UseCase } from "application/use-case";
import { Either, left, right } from "application/utils/either";
import { Notification } from "domain/validation/handler/notification";
import { DeleteSubjectOutput } from "./delete-subject-output";
import { DeleteSubjectCommand } from "./delete-subject-command";
import { Subject } from "domain/entities/subject/subject";
import { SubjectRepository } from "domain/entities/subject/subject-repository";
import SubjectID from "domain/entities/subject/subject-id";
import { NotFoundError } from "domain/validation/errors/not-found-error";


export class DeleteCategoryUseCase implements UseCase<DeleteSubjectCommand, Either<Notification, DeleteSubjectOutput>> {

    constructor(private readonly subjectRepository: SubjectRepository) { }

    async execute(input: DeleteSubjectCommand): Promise<Either<Notification, DeleteSubjectOutput>> {
        
        const notification: Notification = Notification.create();
        
        const subjectId: SubjectID = SubjectID.from(input.id);

        const subject: Subject = await this.subjectRepository.findById(subjectId);

        if (!subject) {
            notification.appendError(new NotFoundError("Subject not found"));
            return left(notification);
        }

        try {
            await this.subjectRepository.deleteById(subjectId);
            return right(new DeleteSubjectOutput());
            
        } catch(err) {
            notification.appendError(new Error((err as Error).message));
            return left(notification);
        }    
    }
}