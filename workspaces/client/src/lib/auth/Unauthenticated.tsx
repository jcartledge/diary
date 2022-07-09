import { useAuth0 } from "@auth0/auth0-react";
import { Conditional } from "lib/util/Conditional";

export const Unauthenticated: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth0();
  return <Conditional predicate={!isAuthenticated}>{children}</Conditional>;
};
