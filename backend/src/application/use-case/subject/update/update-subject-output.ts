import { Subject } from "domain/entities/subject/subject";


export class UpdateSubjectOutput {

    constructor(
        readonly id: string,
        readonly name: string,
        readonly isActive: boolean,
        readonly createdAt: Date,
    ) { }

    public static from(subject: Subject): UpdateSubjectOutput { 
        return new UpdateSubjectOutput(
            subject.id.value,
            subject.name,
            subject.isActive,
            subject.createdAt,
        );
    }
}