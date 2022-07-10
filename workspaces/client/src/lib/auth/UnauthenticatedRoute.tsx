import { Route } from "lib/router";
import { Unauthenticated } from "./Unauthenticated";

export const UnauthenticatedRoute: React.FC<
  React.ComponentProps<typeof Route>
> = ({ children, ...routeProps }) => (
  <Unauthenticated>
    <Route {...routeProps}>{children}</Route>
  </Unauthenticated>
);
