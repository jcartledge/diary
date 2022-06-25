import { useToggle } from "./useToggle";

type ToggleProps = React.PropsWithChildren<{ name: string; isOff?: boolean }>;

export const Toggle: React.FC<ToggleProps> = ({
  children,
  name,
  isOff = false,
}) => (useToggle(name) !== isOff ? <>{children}</> : null);
