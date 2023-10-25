export class AbortError extends Error {
    constructor(message) {
        super(`AbortError${message ? `: ${message}` : ""}`);
        this.name = "AbortError";
    }
}
export function isAbortError(error) {
    return error instanceof Error && error.name === "AbortError";
}
export class InvalidStateError extends Error {
    constructor(message) {
        super(`InvalidStateError${message ? `: ${message}` : ""}`);
        this.name = "InvalidStateError";
    }
}
export function isInvalidStateError(error) {
    return error instanceof Error && error.name === "InvalidStateError";
}
//# sourceMappingURL=navigation-errors.js.map