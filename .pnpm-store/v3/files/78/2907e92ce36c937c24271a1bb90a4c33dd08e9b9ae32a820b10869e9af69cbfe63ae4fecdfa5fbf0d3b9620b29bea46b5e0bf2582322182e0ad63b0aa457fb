import { EventTargetListeners as EventTargetListenersSymbol, } from "./event-target/index.js";
const Navigation = Symbol.for("@virtualstate/navigation/instance");
export class NavigationNavigation {
    [Navigation];
    get [EventTargetListenersSymbol]() {
        return this[Navigation][EventTargetListenersSymbol];
    }
    constructor(navigation) {
        this[Navigation] = navigation;
    }
    get canGoBack() {
        return this[Navigation].canGoBack;
    }
    get canGoForward() {
        return this[Navigation].canGoForward;
    }
    get currentEntry() {
        return this[Navigation].currentEntry;
    }
    set oncurrententrychange(value) {
        this[Navigation].oncurrententrychange = value;
    }
    set onnavigate(value) {
        this[Navigation].onnavigate = value;
    }
    set onnavigateerror(value) {
        this[Navigation].onnavigateerror = value;
    }
    set onnavigatesuccess(value) {
        this[Navigation].onnavigatesuccess = value;
    }
    get transition() {
        return this[Navigation].transition;
    }
    addEventListener(type, listener, options) {
        if (typeof type === "string") {
            this[Navigation].addEventListener(type, listener, typeof options === "boolean" ? { once: true } : options);
        }
    }
    back(options) {
        return this[Navigation].back(options);
    }
    dispatchEvent(event) {
        return this[Navigation].dispatchEvent(event);
    }
    entries() {
        return this[Navigation].entries();
    }
    forward(options) {
        return this[Navigation].forward(options);
    }
    traverseTo(key, options) {
        return this[Navigation].traverseTo(key, options);
    }
    hasEventListener(type, callback) {
        return this[Navigation].hasEventListener(type, callback);
    }
    navigate(url, options) {
        return this[Navigation].navigate(url, options);
    }
    reload(options) {
        return this[Navigation].reload(options);
    }
    removeEventListener(type, listener, options) {
        if (typeof type === "string") {
            return this[Navigation].removeEventListener(type, listener, options);
        }
    }
    updateCurrentEntry(options) {
        return this[Navigation].updateCurrentEntry(options);
    }
}
//# sourceMappingURL=navigation-navigation.js.map