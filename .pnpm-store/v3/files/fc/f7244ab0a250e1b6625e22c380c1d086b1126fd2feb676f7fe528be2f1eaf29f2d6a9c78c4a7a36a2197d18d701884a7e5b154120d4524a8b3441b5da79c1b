export function isEvent(value) {
    function isLike(value) {
        return !!value;
    }
    return (isLike(value) &&
        (typeof value.type === "string" || typeof value.type === "symbol"));
}
export function assertEvent(value, type) {
    if (!isEvent(value)) {
        throw new Error("Expected event");
    }
    if (typeof type !== "undefined" && value.type !== type) {
        throw new Error(`Expected event type ${String(type)}, got ${value.type.toString()}`);
    }
}
//# sourceMappingURL=event.js.map