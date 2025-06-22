import { Subject } from "domain/entities/subject/subject";

export class CreateSubjectOutput {

    private _id: string;
    private _name: string;
    private _isActive: boolean;
    private _createdAt: Date;
    private _categoryID: string;

    private constructor(
        id: string, 
        name: string, 
        isActive: boolean,
        createdAt: Date,
        categoryID: string,
    ) {
        this._id = id;
        this._name = name;
        this._isActive = isActive;
        this._createdAt = createdAt;
        this._categoryID = categoryID;
    }

    public static from(subject: Subject): CreateSubjectOutput {
        return new CreateSubjectOutput(
            subject.id.value,
            subject.name,
            subject.isActive,
            subject.createdAt,
            subject.categoryID.value,
        );
    }

    get id(): string { return this._id; }
    get name(): string { return this._name; }
    get isActive(): boolean { return this._isActive; }
    get createdAt(): Date { return this._createdAt; }
    get categoryID(): string { return this._categoryID; }   
}