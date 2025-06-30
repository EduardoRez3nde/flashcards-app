import { AggregateRoot } from "domain/aggregate-root";
import SubjectID from "./subject-id";
import ValidationHandler from "domain/validation/validation-handler";
import { SubjectCreatedEvent } from "domain/events/subject/subject-create-event";
import CategoryID from "../category/category-id";
import { SubjectValidation } from "./subject-validation";


export interface SubjectProps {
    name: string;
    categoryID: CategoryID;
    isActive?: boolean;
    createdAt?: Date;
};

export class Subject extends AggregateRoot<SubjectID> {

    private _name: string;
    private _categoryID: CategoryID;
    private _isActive: boolean;
    private _createdAt: Date;

    private constructor(id: SubjectID, props: SubjectProps) {
        super(id);
        this._name = props.name;
        this._categoryID = props.categoryID;
        this._isActive = props.isActive ?? true;
        this._createdAt = props.createdAt ?? new Date();
    }

    public static create(input: { name: string, categoryID: CategoryID }): Subject {
        const subjectId: SubjectID = SubjectID.unique();
        const subject: Subject = new Subject(subjectId, input);
        subject.addEvent(SubjectCreatedEvent.create(subjectId, this.name));
        return subject;
    }

    public update(props: { name?: string; isActive?: boolean; categoryID?: CategoryID }): void {
        if (props.name != null) {
            this._name = props.name;
        }
        if (props.isActive != null) {
            this._isActive = props.isActive;
        }
        if (props.categoryID != null && !this._categoryID.equals(props.categoryID)) {
            this._categoryID = props.categoryID;
        }
    }

    public static with(id: SubjectID, input: { name: string, isActive: boolean, createdAt: Date, categoryID: CategoryID }): Subject {
        return new Subject(id, input);
    }

    get name(): string { return this._name; }
    get isActive(): boolean { return this._isActive; }
    get createdAt(): Date { return this._createdAt; }
    get categoryID(): CategoryID { return this._categoryID; }

    public activate(): void {
        this._isActive = true;
    }

    public deactivate(): void {
        this._isActive = false;
    }

    public validate(handler: ValidationHandler): void {
        new SubjectValidation(this, handler).validate();
    }
}