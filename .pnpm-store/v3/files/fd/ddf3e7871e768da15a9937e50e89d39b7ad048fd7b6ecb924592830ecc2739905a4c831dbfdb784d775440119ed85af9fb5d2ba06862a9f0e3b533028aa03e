import { isEvent } from "./event.js";
export function isRespondEvent(value) {
    function isRespondEventLike(value) {
        return isEvent(value);
    }
    return isRespondEventLike(value) && typeof value.respondWith === "function";
}
//# sourceMappingURL=respond-event.js.map