import { useAuth0 } from "@auth0/auth0-react";

export const LandingPage = () => {
  const { loginWithRedirect } = useAuth0();
  return <button onClick={() => loginWithRedirect()}>Log in</button>;
};
