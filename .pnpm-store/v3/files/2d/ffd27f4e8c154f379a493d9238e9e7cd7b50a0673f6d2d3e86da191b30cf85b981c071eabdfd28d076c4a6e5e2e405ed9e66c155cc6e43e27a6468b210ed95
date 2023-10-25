export function isPromise(value) {
    return (like(value) &&
        typeof value.then === "function");
}
export function ok(value, message = "Expected value") {
    if (!value) {
        throw new Error(message);
    }
}
export function isPromiseRejectedResult(value) {
    return value.status === "rejected";
}
export function like(value) {
    return !!value;
}
//# sourceMappingURL=is.js.map