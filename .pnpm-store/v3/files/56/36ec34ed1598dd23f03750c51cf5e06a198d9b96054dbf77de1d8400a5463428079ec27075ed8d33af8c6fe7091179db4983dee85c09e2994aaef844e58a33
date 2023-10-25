import { isSignalEvent, isSignalHandled } from "./signal-event.js";
import { AbortError } from "../navigation-errors.js";
import { EventTargetListenersMatch, EventTargetListenersThis, } from "./event-target-options.js";
import { EventTargetListeners } from "./event-target-listeners.js";
export class SyncEventTarget extends EventTargetListeners {
    [EventTargetListenersThis];
    constructor(thisValue = undefined) {
        super();
        this[EventTargetListenersThis] = thisValue;
    }
    dispatchEvent(event) {
        const listeners = this[EventTargetListenersMatch]?.(event.type) ?? [];
        // Don't even dispatch an aborted event
        if (isSignalEvent(event) && event.signal.aborted) {
            throw new AbortError();
        }
        for (let index = 0; index < listeners.length; index += 1) {
            const descriptor = listeners[index];
            // Remove the listener before invoking the callback
            // This ensures that inside of the callback causes no more additional event triggers to this
            // listener
            if (descriptor.once) {
                // by passing the descriptor as the options, we get an internal redirect
                // that forces an instance level object equals, meaning
                // we will only remove _this_ descriptor!
                this.removeEventListener(descriptor.type, descriptor.callback, descriptor);
            }
            try {
                descriptor.callback.call(this[EventTargetListenersThis] ?? this, event);
            }
            catch (error) {
                if (!isSignalHandled(event, error)) {
                    throw error;
                }
            }
            if (isSignalEvent(event) && event.signal.aborted) {
                throw new AbortError();
            }
        }
    }
}
//# sourceMappingURL=sync-event-target.js.map