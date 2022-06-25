import React from "react";
import { createHelper } from "souvlaki";
import { FeatureToggles } from "toggles/toggles.types";
import { TogglesProvider } from "toggles/TogglesProvider";

export const withToggles = createHelper(
  (toggles: FeatureToggles = []): React.FC<React.PropsWithChildren<{}>> =>
    ({ children }) =>
      <TogglesProvider toggles={toggles}>{children}</TogglesProvider>
);

export const withToggle = (toggle: string) => withToggles([toggle]);
