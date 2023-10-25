import { isEvent } from "./event.js";
import { isAbortError } from "../navigation-errors.js";
export function isAbortSignal(value) {
    function isAbortSignalLike(value) {
        return typeof value === "object";
    }
    return (isAbortSignalLike(value) &&
        typeof value.aborted === "boolean" &&
        typeof value.addEventListener === "function");
}
export function isAbortController(value) {
    function isAbortControllerLike(value) {
        return typeof value === "object";
    }
    return (isAbortControllerLike(value) &&
        typeof value.abort === "function" &&
        isAbortSignal(value.signal));
}
export function isSignalEvent(value) {
    function isSignalEventLike(value) {
        return value.hasOwnProperty("signal");
    }
    return (isEvent(value) && isSignalEventLike(value) && isAbortSignal(value.signal));
}
export function isSignalHandled(event, error) {
    if (isSignalEvent(event) &&
        event.signal.aborted &&
        error instanceof Error &&
        isAbortError(error)) {
        return true;
    }
}
//# sourceMappingURL=signal-event.js.map