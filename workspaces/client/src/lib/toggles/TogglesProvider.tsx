import { type FeatureToggles } from "./toggles.types";
import { TogglesContext } from "./TogglesContext";

interface TogglesProviderProps {
  toggles: FeatureToggles;
}

export const TogglesProvider: React.FC<
  React.PropsWithChildren<TogglesProviderProps>
> = ({ children, toggles }) => (
  <TogglesContext.Provider value={toggles}>{children}</TogglesContext.Provider>
);
