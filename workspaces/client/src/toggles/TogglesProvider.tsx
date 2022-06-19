import React, { useContext } from "react";
import { FeatureToggles } from "./toggles.types";

const TogglesContext = React.createContext<FeatureToggles>({});
export const useToggles = () => useContext(TogglesContext);
export const useToggle = (toggleName: string) =>
  useToggles()[toggleName] ?? false;

interface TogglesProviderProps {
  toggles: FeatureToggles;
}

export const TogglesProvider: React.FC<
  React.PropsWithChildren<TogglesProviderProps>
> = ({ children, toggles }) => (
  <TogglesContext.Provider value={toggles}>{children}</TogglesContext.Provider>
);
