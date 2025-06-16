/**
 * Represents a generic domain event in the system.
 * 
 * All domain events must implement this interface to provide a timestamp
 * indicating when the event occurred.
 */
export interface DomainEvent {
    /** The date and time when the domain event occurred. */
    readonly dateTimeOccurred: Date;
}

/**
 * Defines a contract for publishing domain events.
 * 
 * This interface can be implemented by event dispatchers or buses to notify
 * other parts of the system (such as subscribers or listeners) about domain events.
 */
export interface DomainEventPublisher {

    /**
     * Dispatches a domain event to interested listeners or handlers.
     * 
     * @param event - The domain event to be dispatched.
     */
    dispatch(event: DomainEvent): void;
}
