// useAspectFit.ts
import { useEffect } from 'react';

export function useAspectFit(
  ref: React.RefObject<HTMLElement | null>,
  aspectRatio: number // e.g. 16/9, or spriteDimensions.x / spriteDimensions.y
) {
  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    const resize = () => {
      const { width, height } = parent.getBoundingClientRect();
      const parentRatio = width / height;

      let w, h;
      if (parentRatio > aspectRatio) {
        // Parent is wider → limit by height
        h = height;
        w = h * aspectRatio;
      } else {
        // Parent is taller → limit by width
        w = width;
        h = w / aspectRatio;
      }

      el.style.width = `${w}px`;
      el.style.height = `${h}px`;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(parent);

    requestAnimationFrame(resize);
    return () => observer.disconnect();
  }, [ref, aspectRatio]);
}
