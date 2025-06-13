import Entity from "./entity";
import { DomainEvent } from "./events/domain-event";
import Identifier from "./identifier";


abstract class AggregateRoot<ID extends Identifier<any>> extends Entity<ID> {

    private readonly _events: DomainEvent[] = [];

    constructor(id: ID) {
        super(id);
    }

    get events(): readonly DomainEvent[] {
        return this._events;
    }

    protected addEvent(event: DomainEvent): void {
        if (!event) return;
        this._events.push(event);
    }

    protected clearEvent(): void {
        this._events.length = 0;
    }
}

