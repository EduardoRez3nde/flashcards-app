
export interface DomainEvent {
    readonly dateTimeOccurred: Date;
};

export interface DomainEventPublisher {
    dispatch(event: DomainEvent): void;
}