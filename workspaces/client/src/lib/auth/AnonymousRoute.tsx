import { Route } from "lib/router";
import { type RouteProps } from "lib/router/components/Route";
import { Anonymous } from "./Anonymous";

type AnonymousRouteProps = React.PropsWithChildren<RouteProps>;

export const AnonymousRoute: React.FC<AnonymousRouteProps> = ({
  children,
  ...routeProps
}) => (
  <Anonymous>
    <Route {...routeProps}>{children}</Route>
  </Anonymous>
);
