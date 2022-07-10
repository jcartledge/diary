import { createContext } from "react";
import { type FeatureToggles } from "./toggles.types";

export const TogglesContext = createContext<FeatureToggles>([]);
