export class DeleteSubjectCommand { 

    constructor(readonly id: string) { }

    public static create(id: string): DeleteSubjectCommand {
        return new DeleteSubjectCommand(id);
    }
}