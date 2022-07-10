import { useEffect } from "react";

export function usePopState(popStateListener: () => void) {
  useEffect(() => {
    window.addEventListener("popstate", popStateListener);
    return () => {
      window.removeEventListener("popstate", popStateListener);
    };
  }, []);
}
