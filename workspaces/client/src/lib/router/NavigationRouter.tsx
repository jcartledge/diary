import { type Navigation } from "@virtualstate/navigation";
import { useEffect, useState } from "react";
import { Router } from "./Router";

type NavigationRouterProps = React.PropsWithChildren<{
  navigation: Navigation;
}>;

export const NavigationRouter: React.FC<NavigationRouterProps> = ({
  navigation,
  children,
}) => {
  const [path] = useState(window.location.pathname);
  useEffect(() => {
    const navigateListener = () => {};
    navigation.addEventListener("navigate", navigateListener);
    return () => navigation.removeEventListener("navigate", navigateListener);
  }, []);
  return <Router initialPath={path}>{children}</Router>;
};
