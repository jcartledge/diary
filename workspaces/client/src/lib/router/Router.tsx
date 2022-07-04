import React, { useState } from "react";
import { PathSetter, RouterContext } from "./RouterContext";

type RouterProps = React.PropsWithChildren<{
  initialPath?: string;
  updatePath?: PathSetter;
}>;

export const Router: React.FC<RouterProps> = ({
  children,
  updatePath,
  initialPath = "",
}) => {
  const [path, setPath] = useState(initialPath);
  const contextValue = updatePath
    ? { path: initialPath, setPath: updatePath }
    : { path, setPath };
  return (
    <RouterContext.Provider value={contextValue}>
      {children}
    </RouterContext.Provider>
  );
};
