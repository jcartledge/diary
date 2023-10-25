import { NavigationTransitionNavigationType, NavigationTransitionWait, NavigationIntercept, } from "./navigation-transition.js";
import { InvalidStateError } from "./navigation-errors.js";
export const NavigationTransitionPlanNavigationSymbol = Symbol.for("@virtualstate/navigation/transition/plan/Navigation");
export const NavigationTransitionPlanWhile = Symbol.for("@virtualstate/navigation/transition/plan/while");
export const NavigationTransitionPlanWait = Symbol.for("@virtualstate/navigation/transition/plan/wait");
export function plan(options) {
    const { transition, currentPlan, constructNavigation, finishedTransitions } = options;
    const nextPlan = {
        [NavigationTransitionPlanNavigationSymbol]: currentPlan?.[NavigationTransitionPlanNavigationSymbol] ??
            constructNavigation(),
        transitions: [],
        ...currentPlan,
        knownTransitions: new Set(currentPlan?.knownTransitions ?? []),
        [NavigationTransitionPlanWhile]: transition[NavigationIntercept],
        [NavigationTransitionPlanWait]: transition[NavigationTransitionWait],
    };
    if (nextPlan.knownTransitions.has(transition)) {
        throw new InvalidStateError("Transition already found in plan, this may lead to unexpected behaviour, please raise an issue at ");
    }
    nextPlan.knownTransitions.add(transition);
    if (transition[NavigationTransitionNavigationType] === "traverse") {
        nextPlan.transitions.push(transition);
    }
    else {
        // Reset on non traversal
        nextPlan.transitions = [].concat([transition]);
    }
    nextPlan.transitions = nextPlan.transitions
        // Remove finished transitions
        .filter((transition) => finishedTransitions?.has(transition));
    return nextPlan;
}
//# sourceMappingURL=navigation-transition-planner.js.map