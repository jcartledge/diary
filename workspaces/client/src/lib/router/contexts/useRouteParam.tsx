import { useContext } from "react";
import { RouteParamsContext } from "./RouteParamsContext";

export const useRouteParam = (paramName: string) =>
  useContext(RouteParamsContext)[paramName] ?? "";
