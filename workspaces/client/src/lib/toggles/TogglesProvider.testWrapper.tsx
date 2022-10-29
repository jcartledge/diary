import { type FeatureToggles } from "lib/toggles/toggles.types";
import { TogglesProvider } from "lib/toggles/TogglesProvider";
import { createHelper } from "souvlaki";

export const withToggles = createHelper(
  (toggles: FeatureToggles = []) =>
    ({ children }) =>
      <TogglesProvider toggles={toggles}>{children}</TogglesProvider>
);

export const withToggle = (toggle: string) => withToggles([toggle]);
