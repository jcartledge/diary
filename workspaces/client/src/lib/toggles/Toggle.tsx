import React from "react";
import { useToggle } from "./useToggle";

type ToggleProps = React.PropsWithChildren<{
  name: string;
  isOff?: boolean;
  fallback?: React.ComponentType;
}>;

export const Toggle: React.FC<ToggleProps> = ({
  children,
  name,
  isOff = false,
  fallback: Fallback = () => null,
}) => (useToggle(name) !== isOff ? <>{children}</> : <Fallback />);
