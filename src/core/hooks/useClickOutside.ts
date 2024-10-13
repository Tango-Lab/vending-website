import { useEffect, useRef } from 'react';

export interface HookType {
  onClickOutSide?: () => void
}

function useClickOutside<T extends HTMLElement>(param: HookType) {
  const { onClickOutSide } = param;
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (onClickOutSide) {
          onClickOutSide();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClickOutSide]);

  return ref;
}

export default useClickOutside;
