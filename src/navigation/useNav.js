import { useCallback, useState } from "react";

// Router de pila única con back/forward, sin dependencias externas.
export function useNav(initialScreen = "splash") {
  // Dev: permite ir directo a una pantalla con ?screen=nombrePantalla
  const params = new URLSearchParams(window.location.search);
  const devScreen = params.get("screen") || initialScreen;
  const [stack, setStack] = useState([{ screen: devScreen, params: {} }]);

  const go = useCallback((screen, params = {}) => {
    setStack((s) => [...s, { screen, params }]);
  }, []);

  const back = useCallback(() => {
    setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  }, []);

  const reset = useCallback((screen, params = {}) => {
    setStack([{ screen, params }]);
  }, []);

  return { current: stack[stack.length - 1], go, back, reset, depth: stack.length };
}
