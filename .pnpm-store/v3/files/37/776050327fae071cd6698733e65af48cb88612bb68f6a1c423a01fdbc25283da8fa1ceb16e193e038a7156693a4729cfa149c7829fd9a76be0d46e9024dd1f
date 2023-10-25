import { NavigationEventTarget } from "./navigation-event-target.js";
class NoOperationNavigationResult {
    committed = new Promise(() => { });
    finished = new Promise(() => { });
}
export class NoOperationNavigation extends NavigationEventTarget {
    canGoBack = false;
    canGoForward = false;
    back(options) {
        return new NoOperationNavigationResult();
    }
    entries() {
        return [];
    }
    forward(options) {
        return new NoOperationNavigationResult();
    }
    traverseTo(key, options) {
        return new NoOperationNavigationResult();
    }
    navigate(url, options) {
        return new NoOperationNavigationResult();
    }
    reload(options) {
        return new NoOperationNavigationResult();
    }
    async updateCurrentEntry(options) {
        return undefined;
    }
}
//# sourceMappingURL=noop-navigation.js.map