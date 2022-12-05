import { useEffect } from "react";

export const usePopState = (popStateListener: () => void) => {
  useEffect(() => {
    window.addEventListener("popstate", popStateListener);
    return () => {
      window.removeEventListener("popstate", popStateListener);
    };
  }, []);
};
