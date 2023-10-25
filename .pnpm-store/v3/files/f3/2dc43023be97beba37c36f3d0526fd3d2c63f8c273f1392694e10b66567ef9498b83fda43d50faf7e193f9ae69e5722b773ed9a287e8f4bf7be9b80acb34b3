import { isEvent } from "./event.js";
export function isInterceptEvent(value) {
    function isInterceptEventLike(value) {
        return isEvent(value);
    }
    return (isInterceptEventLike(value) && typeof value.intercept === "function");
}
//# sourceMappingURL=intercept-event.js.map