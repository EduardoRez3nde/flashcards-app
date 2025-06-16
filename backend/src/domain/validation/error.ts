/**
 * Represents a domain validation error.
 *
 * This class encapsulates a single validation error message
 * and is commonly used within validation mechanisms to report issues.
 */
export class Error {

    /**
     * Creates a new `Error` instance.
     * 
     * @param message - The descriptive error message.
     */
    constructor(readonly message: string) { }
}
