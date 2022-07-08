import React from "react";

type RouteParams = Record<string, string>;
export const RouteParamsContext = React.createContext<RouteParams>({});
