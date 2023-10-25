import { defer } from "../defer.js";
import { getNavigation } from "../get-navigation.js";
import { isPromise } from "../is.js";
export function createRepeatingPromise(fn) {
    let promise;
    function getPromise() {
        if (promise)
            return promise;
        const current = promise = fn();
        promise.finally(() => {
            if (promise === current) {
                promise = undefined;
            }
        });
        return promise;
    }
    return {
        get [Symbol.toStringTag]() {
            return "[Promise Repeating]";
        },
        then(onResolve, onReject) {
            return getPromise().then(onResolve, onReject);
        },
        catch(onReject) {
            return getPromise().catch(onReject);
        },
        finally(onFinally) {
            return getPromise().finally(onFinally);
        }
    };
}
export function createNavigationEvent(type, navigation = getNavigation()) {
    return createRepeatingPromise(getNavigationPromise);
    function getNavigationPromise() {
        return createNavigationPromise(type, navigation);
    }
}
export function createNavigationEvents(navigation = getNavigation()) {
    return {
        navigate: createNavigationEvent("navigate", navigation),
        navigateerror: createNavigationEvent("navigateerror", navigation),
        navigatesuccess: createNavigationEvent("navigatesuccess", navigation),
        entrieschange: createNavigationEvent("entrieschange", navigation),
        currententrychange: createNavigationEvent("currententrychange", navigation)
    };
}
export async function createNavigationPromise(type, navigation = getNavigation(), onEventFn) {
    const { promise, resolve, reject } = defer();
    navigation.addEventListener(type, onEvent, {
        once: true
    });
    if (type !== "navigate") {
        navigation.addEventListener("navigate", onNavigate, {
            once: true
        });
    }
    if (type !== "navigateerror") {
        navigation.addEventListener("navigateerror", onError, {
            once: true
        });
    }
    return promise;
    function removeListeners() {
        navigation.removeEventListener(type, onEvent);
        if (type !== "navigate") {
            navigation.removeEventListener("navigate", onNavigate);
        }
        if (type !== "navigateerror") {
            navigation.removeEventListener("navigateerror", onError);
        }
    }
    function onEvent(event) {
        removeListeners();
        if (onEventFn) {
            try {
                const result = onEventFn(event);
                if (isPromise(result)) {
                    return result.then(() => resolve(event), reject);
                }
            }
            catch (error) {
                return reject(error);
            }
        }
        else if (isNavigateEvent(event)) {
            onNavigate(event);
        }
        resolve(event);
    }
    function isNavigateEvent(event) {
        return event.type === "navigate";
    }
    function onNavigate(event) {
        event.intercept();
    }
    function onError(event) {
        removeListeners();
        reject(event.error);
    }
}
//# sourceMappingURL=create-promise.js.map