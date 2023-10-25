/**
 * Represents the location (URL) of the object it is linked to.
 * Changes done on it are reflected on the object it relates to.
 * Both the `Document` and `Window` interface have such a linked `Location`,
 * accessible via `Document.location` and `Window.location` respectively.
 */
export declare class LocationMock extends URL implements Location {
    ancestorOrigins: DOMStringList;
    /**
     * Causes the window to load and display the document at the URL specified.
     */
    assign(
    /**
     * The URL of the page to navigate to.
     */
    url: string): void;
    /**
     * Reloads the resource from the current URL.
     * @param forcedReload
     */
    reload(
    /**
     * If `true`, the page will always reload from the server. If `false` or
     * unspecified, the browser may reload the page from its HTTP cache.
     */
    _forcedReload?: boolean): void;
    /**
     * Replaces the current resource with the one at the provided URL.
     * The difference from the `assign()` method is that after using `replace()`
     * the current page will not be saved in session `History`, meaning the user
     * won't be able to use the back button to navigate to it.
     */
    replace(
    /**
     * The URL of the page to navigate to.
     */
    url: string): void;
}
