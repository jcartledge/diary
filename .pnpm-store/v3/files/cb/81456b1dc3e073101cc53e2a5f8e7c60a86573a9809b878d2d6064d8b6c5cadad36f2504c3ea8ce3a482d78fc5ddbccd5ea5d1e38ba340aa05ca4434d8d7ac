import { NavigationLocation, AppLocationAwaitFinished, AppLocationTransitionURL, } from "./location.js";
import { InvalidStateError } from "./navigation-errors.js";
const State = Symbol.for("@virtualstate/navigation/history/state");
/**
 * @experimental
 */
export class NavigationHistory extends NavigationLocation {
    #options;
    #navigation;
    constructor(options) {
        super(options);
        this.#options = options;
        this.#navigation = options.navigation;
    }
    get length() {
        return this.#navigation.entries().length;
    }
    scrollRestoration = "manual";
    get state() {
        const currentState = this.#navigation.currentEntry?.getState();
        if (typeof currentState === "string" || typeof currentState === "number" || typeof currentState === "boolean") {
            return currentState;
        }
        return this.#options[State] ?? undefined;
    }
    back() {
        const entries = this.#navigation.entries();
        const index = this.#navigation.currentEntry?.index ?? -1;
        const back = entries[index - 1];
        const url = back?.url;
        if (!url)
            throw new InvalidStateError("Cannot go back");
        return this[AppLocationTransitionURL](url, () => this.#navigation.back());
    }
    forward() {
        const entries = this.#navigation.entries();
        const index = this.#navigation.currentEntry?.index ?? -1;
        const forward = entries[index + 1];
        const url = forward?.url;
        if (!url)
            throw new InvalidStateError("Cannot go forward");
        return this[AppLocationTransitionURL](url, () => this.#navigation.forward());
    }
    go(delta) {
        if (typeof delta !== "number" || delta === 0 || isNaN(delta)) {
            return this[AppLocationAwaitFinished](this.#navigation.reload());
        }
        const entries = this.#navigation.entries();
        const { currentEntry } = this.#navigation;
        if (!currentEntry) {
            throw new Error(`Could not go ${delta}`);
        }
        const nextIndex = currentEntry.index + delta;
        const nextEntry = entries[nextIndex];
        if (!nextEntry) {
            throw new Error(`Could not go ${delta}`);
        }
        const nextEntryKey = nextEntry.key;
        return this[AppLocationAwaitFinished](this.#navigation.traverseTo(nextEntryKey));
    }
    replaceState(data, unused, url) {
        if (url) {
            return this[AppLocationTransitionURL](url, (url) => this.#navigation.navigate(url.toString(), {
                state: data,
                history: "replace",
            }));
        }
        else {
            return this.#navigation.updateCurrentEntry({
                state: data
            });
        }
    }
    pushState(data, unused, url) {
        if (url) {
            return this[AppLocationTransitionURL](url, (url) => this.#navigation.navigate(url.toString(), {
                state: data,
            }));
        }
        else {
            return this.#navigation.updateCurrentEntry({
                state: data,
            });
        }
    }
}
/**
 * @experimental
 * @internal
 */
export class NavigationSync extends NavigationHistory {
}
//# sourceMappingURL=history.js.map