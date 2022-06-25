import { useAuth0 } from "@auth0/auth0-react";
import { useToggle } from "toggles/useToggle";

export const Authenticated: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const auth0 = useAuth0();
  const { isAuthenticated } = auth0;
  const isToggledOn = useToggle("auth");
  return isAuthenticated || !isToggledOn ? <>{children}</> : <LoginRedirect />;
};

const LoginRedirect: React.FC = () => {
  const { loginWithRedirect } = useAuth0();
  loginWithRedirect();
  return null;
};
