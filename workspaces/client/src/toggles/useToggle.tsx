import { useToggles } from "./useToggles";

export const useToggle = (toggleName: string) =>
  useToggles().includes(toggleName);
