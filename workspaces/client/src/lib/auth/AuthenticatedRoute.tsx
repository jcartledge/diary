import { Route } from "lib/router";
import { Authenticated } from "./Authenticated";

export const AuthenticatedRoute: React.FC<
  React.ComponentProps<typeof Route>
> = ({ children, ...routeProps }) => (
  <Authenticated>
    <Route {...routeProps}>{children}</Route>
  </Authenticated>
);
