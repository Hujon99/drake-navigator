import { useEffect } from "react";
import Lenis from "lenis";

let instance: Lenis | null = null;
let rafId: number | null = null;

export function useLenis(enabled: boolean = true) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!enabled) {
      instance?.destroy();
      instance = null;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
      return;
    }
    if (instance) return;
    instance = new Lenis({ duration: 1.1, smoothWheel: true, lerp: 0.1 });
    const raf = (time: number) => {
      instance?.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      instance?.destroy();
      instance = null;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    };
  }, [enabled]);
}
