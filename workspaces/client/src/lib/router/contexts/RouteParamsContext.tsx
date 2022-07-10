import { createContext } from "react";

type RouteParams = Record<string, string>;
export const RouteParamsContext = createContext<RouteParams>({});
