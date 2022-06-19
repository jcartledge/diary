import { useToggle } from "./useToggle";

type ToggleProps = React.PropsWithChildren<{ name: string }>;

export const Toggle: React.FC<ToggleProps> = ({ children, name }) =>
  useToggle(name) ? <>{children}</> : null;
