import { useAuth0 } from "@auth0/auth0-react";
import { Conditional } from "lib/util/Conditional";

export const Anonymous: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const auth0 = useAuth0();
  const { isAuthenticated } = auth0;
  return <Conditional predicate={!isAuthenticated}>{children}</Conditional>;
};
