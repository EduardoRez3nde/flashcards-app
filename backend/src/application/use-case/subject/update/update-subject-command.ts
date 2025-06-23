export class UpdateSubjectCommand {

    constructor(
        readonly id?: string,
        readonly name?: string,
        readonly isActive?: boolean,
        readonly categoryID? : string
    ) { }       
}