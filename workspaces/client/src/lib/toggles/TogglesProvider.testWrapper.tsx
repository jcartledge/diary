import { type FeatureToggles } from "lib/toggles/toggles.types";
import { TogglesProvider } from "lib/toggles/TogglesProvider";
import React from "react";

export const wrapWithToggles =
  (toggles: FeatureToggles = []): React.FC<React.PropsWithChildren> =>
  ({ children }) => (
    <TogglesProvider toggles={toggles}>{children}</TogglesProvider>
  );

export const wrapWithToggle = (toggle: string) => wrapWithToggles([toggle]);
