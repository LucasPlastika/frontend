"use client";

import { useEffect, type RefObject } from "react";

export type CurveType =
  | "bottom-curve"
  | "bottom-curve-lg"

interface CurveConfig {
  desktop: number;
  mobile: number;
  growth: number;
  orientation: "top" | "bottom";
}

const CURVES: Record<CurveType, CurveConfig> = {
  "bottom-curve":    { desktop: 120, mobile: 160, growth: 60, orientation: "top" },
  "bottom-curve-lg": { desktop: 60,  mobile: 80,  growth: 60, orientation: "top" },
  // "top-curve":       { desktop: 230, mobile: 270, growth: 20, orientation: "bottom" },
  // "top-curve-lg":    { desktop: 120, mobile: 170, growth: 20, orientation: "bottom" },
};

const EASE = 0.08;
const SNAP = 0.5;

export function useScrollClipPath(
  ref: RefObject<HTMLElement | null>,
  type: CurveType = "bottom-curve",
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const cfg = CURVES[type];
    let current = -1;
    let target = 0;
    let raf = 0;
    let running = false;

    function loop() {
      current += (target - current) * EASE;
      if (Math.abs(target - current) < SNAP) current = target;

      el!.style.clipPath = `ellipse(${current}% 100% at ${cfg?.orientation})`;

      if (current === target) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(loop);
    }

    function kick() {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    }

    function onScroll() {
      const rect = el!.getBoundingClientRect();
      const isMobile = window.innerWidth <= 1024;
      const base = isMobile ? cfg?.mobile : cfg?.desktop;

      let progress: number;
      if (cfg?.orientation === "top") {
        progress = Math.min(1, Math.max(0, -rect.top / rect.height));
      } else {
        progress = Math.min(1, Math.max(0, 1 - rect.top / window.innerHeight));
      }

      if (cfg?.orientation === "top") {
        target = base + cfg?.growth * progress;
      } else {
        target = base + cfg?.growth * (1 - progress);
      }
      if (current < 0) current = target;
      kick();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ref, type]);
}
