import Entity from "./entity";
import { DomainEvent, DomainEventPublisher } from "./events/domain-event";
import Identifier from "./identifier";

/**
 * Represents the root of an aggregate in Domain-Driven Design (DDD).
 * 
 * An `AggregateRoot` is an entity that manages the lifecycle and consistency
 * of a set of related entities and domain events.
 *
 * @template ID - The type of identifier used for the aggregate.
 */
export abstract class AggregateRoot<ID extends Identifier<any>> extends Entity<ID> {

    /** Holds all domain events raised by this aggregate. */
    private readonly _events: DomainEvent[] = [];

    /**
     * Creates a new aggregate root with the given identifier.
     * 
     * @param id - Unique identifier for the aggregate.
     */
    constructor(id: ID) {
        super(id);
    }

    /**
     * Returns a read-only array of domain events associated with this aggregate.
     */
    get events(): readonly DomainEvent[] {
        return this._events;
    }

    /**
     * Adds a domain event to the aggregate.
     * 
     * @param event - The domain event to be added.
     */
    public addEvent(event: DomainEvent): void {
        if (!event) return;
        this._events.push(event);
    }

    /**
     * Clears all domain events from the aggregate.
     */
    public clearEvent(): void {
        this._events.length = 0;
    }

    /**
     * Dispatches all domain events using the provided event publisher
     * and then clears the events.
     * 
     * @param published - The domain event publisher responsible for dispatching events.
     */
    public publishedEvent(published: DomainEventPublisher): void {
        if (!published) return;

        this.events.forEach((event) => published.dispatch(event));

        this.clearEvent();
    }
}
