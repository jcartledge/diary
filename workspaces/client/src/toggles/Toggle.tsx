import { useToggle } from "./useToggle";

type ToggleProps = React.PropsWithChildren<{ name: string; is?: boolean }>;

export const Toggle: React.FC<ToggleProps> = ({ children, name, is = true }) =>
  useToggle(name) === is ? <>{children}</> : null;
