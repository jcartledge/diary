/**
 * @param handleCatch rejected promises automatically to allow free usage
 */
export function deferred(handleCatch) {
    let resolve = undefined, reject = undefined;
    const promise = new Promise((resolveFn, rejectFn) => {
        resolve = resolveFn;
        reject = rejectFn;
    });
    ok(resolve);
    ok(reject);
    return {
        resolve,
        reject,
        promise: handleCatch ? promise.catch(handleCatch) : promise,
    };
}
function ok(value) {
    if (!value) {
        throw new Error("Value not provided");
    }
}
//# sourceMappingURL=deferred.js.map