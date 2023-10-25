import { isPromise, like } from "../is.js";
import { getRouterRoutes, isRouter } from "./router.js";
import { exec } from "./url-pattern.js";
export async function transitionEvent(router, event) {
    const promises = [];
    const { signal, } = event;
    const url = getURL(event);
    const { pathname } = url;
    transitionPart("route", (route, match) => route.fn(event, match), handleResolve, handleReject);
    if (promises.length) {
        await Promise.all(promises);
    }
    function transitionPart(type, fn, resolve = handleResolve, reject = handleReject) {
        let isRoute = false;
        resolveRouter(router);
        return isRoute;
        function matchRoute(route, parentMatch) {
            const { router, pattern, string } = route;
            let match = parentMatch;
            if (string) {
                if (string !== pathname) {
                    return;
                }
            }
            else if (pattern) {
                match = exec(pattern, url);
                if (!match)
                    return;
            }
            if (isRouter(router)) {
                return resolveRouter(router, match);
            }
            isRoute = true;
            try {
                const maybe = fn(route, match);
                if (isPromise(maybe)) {
                    promises.push(maybe
                        .then(resolve)
                        .catch(reject));
                }
                else {
                    resolve(maybe);
                }
            }
            catch (error) {
                reject(error);
            }
        }
        function resolveRouter(router, match) {
            const routes = getRouterRoutes(router);
            resolveRoutes(routes[type]);
            resolveRoutes(routes.router);
            function resolveRoutes(routes) {
                for (const route of routes) {
                    if (signal?.aborted)
                        break;
                    matchRoute(route, match);
                }
            }
        }
    }
    function noop() { }
    function handleResolve(value) {
        transitionPart("resolve", (route, match) => route.fn(value, event, match), noop, handleReject);
    }
    function handleReject(error) {
        const isRoute = transitionPart("reject", (route, match) => route.fn(error, event, match), noop, (error) => Promise.reject(error));
        if (!isRoute) {
            throw error;
        }
    }
    function getURL(event) {
        if (isDestination(event)) {
            return new URL(event.destination.url);
        }
        else if (isRequest(event)) {
            return new URL(event.request.url);
        }
        else if (isURL(event)) {
            return new URL(event.url);
        }
        throw new Error("Could not get url from event");
        function isDestination(event) {
            return (like(event) &&
                !!event.destination);
        }
        function isRequest(event) {
            return (like(event) &&
                !!event.request);
        }
        function isURL(event) {
            return (like(event) &&
                !!(event.url && (typeof event.url === "string" ||
                    event.url instanceof URL)));
        }
    }
}
//# sourceMappingURL=transition.js.map