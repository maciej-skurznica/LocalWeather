import { useEffect, useRef } from "react";

const useClickOutside = (onClickOutsideHandler: () => void) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClick = (event: Event) => {
      const target = event.target as Node | null;
      if (ref.current && !ref.current.contains(target)) {
        onClickOutsideHandler();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });
  return ref;
};

export default useClickOutside;
