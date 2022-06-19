import { TogglesProvider } from "./TogglesProvider";

type EnvironmentTogglesProviderProps = React.PropsWithChildren<{
  environment?: Record<string, string | undefined>;
}>;

export const EnvironmentTogglesProvider: React.FC<
  EnvironmentTogglesProviderProps
> = ({ children, environment = process?.env || {} }) => {
  const toggleKeys = Object.keys(environment).filter(isToggleKey);
  const toggles: Record<string, boolean> = {};
  toggleKeys.forEach(
    (toggleKey) =>
      (toggles[removeToggleKeyPrefix(toggleKey)] = parseBoolean(
        environment[toggleKey] ?? ""
      ))
  );

  return <TogglesProvider toggles={toggles}>{children}</TogglesProvider>;
};

const toggleKeyPrefix = /^REACT_APP_TOGGLE_/;
const isToggleKey = (potentialKey: string): boolean =>
  toggleKeyPrefix.test(potentialKey);

const removeToggleKeyPrefix = (key: string): string =>
  key.replace(toggleKeyPrefix, "");

const parseBoolean = (str: string): boolean => !/^(false|0)$/i.test(str);
