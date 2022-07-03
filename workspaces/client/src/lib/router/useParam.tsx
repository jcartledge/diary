import { useContext } from "react";
import { RouteParamsContext } from "./RouteParamsContext";

export const useParam = (paramName: string) =>
  useContext(RouteParamsContext)[paramName] ?? "";
