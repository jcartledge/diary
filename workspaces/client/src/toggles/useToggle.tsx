import { useToggles } from "./useToggles";

export const useToggle = (toggleName: string) =>
  useToggles()[toggleName] ?? false;
