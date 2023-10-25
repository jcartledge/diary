import { globalNavigation } from "./global-navigation.js";
import { Navigation as NavigationPolyfill } from "./navigation.js";
let navigation;
export function getNavigation() {
    if (globalNavigation) {
        return globalNavigation;
    }
    if (navigation) {
        return navigation;
    }
    return (navigation = new NavigationPolyfill());
}
//# sourceMappingURL=get-navigation.js.map