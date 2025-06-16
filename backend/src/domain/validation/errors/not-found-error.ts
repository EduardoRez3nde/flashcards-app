
export class NotFoundError extends Error {

    constructor(public readonly messsage: string) { 
        super(messsage);
    }

}