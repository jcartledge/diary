import { isRouter, Router } from "./router.js";
import { getNavigation } from "../get-navigation.js";
let router;
export function getRouter() {
    if (isRouter(router)) {
        return router;
    }
    const navigation = getNavigation();
    const local = new Router(navigation, "navigate");
    router = local;
    return local;
}
export function route(...args) {
    let pattern, fn;
    if (args.length === 1) {
        [fn] = args;
    }
    else if (args.length === 2) {
        [pattern, fn] = args;
    }
    return routes(pattern).route(fn);
}
export function routes(...args) {
    let router;
    if (!args.length) {
        router = new Router();
        getRouter().routes(router);
    }
    else if (args.length === 1) {
        const [arg] = args;
        if (isRouter(arg)) {
            router = arg;
            getRouter().routes(router);
        }
        else {
            const pattern = arg;
            router = new Router();
            getRouter().routes(pattern, router);
        }
    }
    else if (args.length >= 2) {
        const [pattern, routerArg] = args;
        router = routerArg ?? new Router();
        getRouter().routes(pattern, router);
    }
    return router;
}
//# sourceMappingURL=route.js.map