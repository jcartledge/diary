export async function transition(navigation) {
    let transition = undefined;
    let finalPromise;
    while (navigation.transition && transition !== navigation.transition) {
        transition = navigation.transition;
        finalPromise = transition.finished;
        await finalPromise.catch(error => void error);
    }
    return finalPromise;
}
//# sourceMappingURL=transition.js.map