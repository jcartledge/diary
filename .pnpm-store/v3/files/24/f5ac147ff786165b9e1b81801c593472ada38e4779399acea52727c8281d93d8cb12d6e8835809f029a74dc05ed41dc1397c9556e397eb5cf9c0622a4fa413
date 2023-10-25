import { getNavigation } from "../get-navigation.js";
import { createNavigationPromise } from "./create-promise.js";
import { isPromise, ok } from "../is.js";
export * from "./events.js";
export * from "./create-promise.js";
export function intercept(options, navigation = getNavigation()) {
    return createNavigationPromise("navigate", navigation, options?.handler ? onNavigateWithHandler : onNavigateDirectIntercept);
    function onNavigateDirectIntercept(event) {
        event.intercept(options);
    }
    function onNavigateWithHandler(event) {
        ok(options?.handler, "Expected options.handler");
        const { handler, ...rest } = options;
        return new Promise((resolve, reject) => {
            event.intercept({
                ...rest,
                async handler() {
                    try {
                        const result = handler();
                        if (isPromise(result)) {
                            await result;
                        }
                        resolve();
                    }
                    catch (error) {
                        reject(error);
                    }
                }
            });
        });
    }
}
//# sourceMappingURL=index.js.map