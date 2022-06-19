import { useContext } from "react";
import { TogglesContext } from "./TogglesContext";

export const useToggles = () => useContext(TogglesContext);
