import { useAuth0 } from "@auth0/auth0-react";
import { Toggle } from "lib/toggles/Toggle";

const LoginRedirect: React.FC = () => {
  const { loginWithRedirect } = useAuth0();
  loginWithRedirect();
  return null;
};

export const Authenticated: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth0();
  return (
    <>
      <Toggle name="auth">
        {isAuthenticated ? children : <LoginRedirect />}
      </Toggle>
      <Toggle isOff name="auth">
        {children}
      </Toggle>
    </>
  );
};
