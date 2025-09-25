import { useCallback, useEffect, useRef, useState } from "react";
export const useEvent = (handler) => {
const saved = useRef(handler);
useEffect(() => { saved.current = handler; }, [handler]);
return useCallback((...args) => saved.current?.(...args), []);
};
export const useIsHoverCapable = () => {
const [capable, setCapable] = useState(() => {
try { return window.matchMedia("(hover:hover)").matches; } catch { return false; }
});
useEffect(() => {
try {
const mql = window.matchMedia("(hover:hover)");
const onChange = () => setCapable(mql.matches);
mql.addEventListener("change", onChange);
return () => mql.removeEventListener("change", onChange);
} catch {}
}, []);
return capable;
};