export class UnexpectedError extends Error { 

    constructor(message: string) {
        super(message);
        this.name = "Unexpected Error";
        Object.setPrototypeOf(this, UnexpectedError.prototype);
    }
}