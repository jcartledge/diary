import { EventDescriptorSymbol } from "./descriptor.js";
import { matchEventCallback } from "./callback.js";
import { isSignalEvent } from "./signal-event.js";
import { isAbortError } from "../navigation-errors.js";
import { EventTargetListeners as EventTargetListenersSymbol, EventTargetListenersIgnore, EventTargetListenersMatch, } from "./event-target-options.js";
function isFunctionEventCallback(fn) {
    return typeof fn === "function";
}
const EventTargetDescriptors = Symbol.for("@virtualstate/navigation/event-target/descriptors");
export class EventTargetListeners {
    [EventTargetDescriptors] = [];
    [EventTargetListenersIgnore] = new WeakSet();
    get [EventTargetListenersSymbol]() {
        return [...(this[EventTargetDescriptors] ?? [])];
    }
    [EventTargetListenersMatch](type) {
        const external = this[EventTargetListenersSymbol];
        const matched = [
            ...new Set([...(external ?? []), ...(this[EventTargetDescriptors] ?? [])]),
        ]
            .filter((descriptor) => descriptor.type === type || descriptor.type === "*")
            .filter((descriptor) => !this[EventTargetListenersIgnore]?.has(descriptor));
        const listener = typeof type === "string" ? this[`on${type}`] : undefined;
        if (typeof listener === "function" && isFunctionEventCallback(listener)) {
            matched.push({
                type,
                callback: listener,
                [EventDescriptorSymbol]: true,
            });
        }
        return matched;
    }
    addEventListener(type, callback, options) {
        const listener = {
            ...options,
            isListening: () => !!this[EventTargetDescriptors]?.find(matchEventCallback(type, callback)),
            descriptor: {
                [EventDescriptorSymbol]: true,
                ...options,
                type,
                callback,
            },
            timestamp: Date.now(),
        };
        if (listener.isListening()) {
            return;
        }
        this[EventTargetDescriptors]?.push(listener.descriptor);
    }
    removeEventListener(type, callback, options) {
        if (!isFunctionEventCallback(callback)) {
            return;
        }
        const externalListeners = this[EventTargetListenersSymbol] ?? this[EventTargetDescriptors] ?? [];
        const externalIndex = externalListeners.findIndex(matchEventCallback(type, callback, options));
        if (externalIndex === -1) {
            return;
        }
        const index = this[EventTargetDescriptors]?.findIndex(matchEventCallback(type, callback, options)) ??
            -1;
        if (index !== -1) {
            this[EventTargetDescriptors]?.splice(index, 1);
        }
        const descriptor = externalListeners[externalIndex];
        if (descriptor) {
            this[EventTargetListenersIgnore]?.add(descriptor);
        }
    }
    hasEventListener(type, callback) {
        if (callback && !isFunctionEventCallback(callback)) {
            return false;
        }
        const foundIndex = this[EventTargetDescriptors]?.findIndex(matchEventCallback(type, callback)) ?? -1;
        return foundIndex > -1;
    }
}
export function isSignalHandled(event, error) {
    if (isSignalEvent(event) &&
        event.signal.aborted &&
        error instanceof Error &&
        isAbortError(error)) {
        return true;
    }
}
//# sourceMappingURL=event-target-listeners.js.map