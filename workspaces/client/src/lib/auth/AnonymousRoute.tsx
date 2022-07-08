import { Route } from "lib/router";
import { Anonymous } from "./Anonymous";

type AnonymousRouteProps = React.PropsWithChildren<{
  path: string;
}>;

export const AnonymousRoute: React.FC<AnonymousRouteProps> = ({
  children,
  path,
}) => (
  <Anonymous>
    <Route path={path}>{children}</Route>
  </Anonymous>
);
