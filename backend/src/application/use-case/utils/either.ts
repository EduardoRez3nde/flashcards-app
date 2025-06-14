

export type Either<L, R> = Left<L, R> | Right<L, R>;

export class Left<L, R> {

    constructor(readonly value: L) { }

    isRight(): this is Right<L, R> { return false; }
    isLeft(): this is Left<L, R> { return true; }
}

export class Right<L, R> {

    constructor(readonly value: R) { }

    isRight(): this is Right<L, R> { return true; }
    isLeft(): this is Left<L, R> { return false; }
}

export const left = <L, R>(value: L): Either<L, R> => new Left(value);

export const right = <Left, R>(value: R): Either<Left, R> => new Right(value);