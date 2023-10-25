export let globalNavigation = undefined;
if (typeof window !== "undefined" && window.navigation) {
    const navigation = window.navigation;
    assertNavigation(navigation);
    globalNavigation = navigation;
}
function assertNavigation(value) {
    if (!value) {
        throw new Error("Expected Navigation");
    }
}
//# sourceMappingURL=global-navigation.js.map