import React from "react";
import { RouterContext } from "./RouterContext";

type RouterProps = React.PropsWithChildren<{
  initialPath: string;
}>;

export const Router: React.FC<RouterProps> = ({
  children,
  initialPath = "",
}) => {
  return (
    <RouterContext.Provider value={initialPath}>
      {children}
    </RouterContext.Provider>
  );
};
