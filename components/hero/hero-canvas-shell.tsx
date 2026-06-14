"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { CanvasLoader } from "@/components/three/CanvasLoader";

const HeroCanvas = dynamic(
  () =>
    import("@/components/three/HeroCanvas").then((mod) => mod.HeroCanvas),
  {
    ssr: false,
    loading: () => <CanvasLoader />,
  },
);

/** Buzzworthy-style blob: free-floating, no visible container. */
export function HeroCanvasShell() {
  const [canRenderWebGl, setCanRenderWebGl] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 640px)");
    const update = () => setCanRenderWebGl(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-[22vh] z-[2] h-[34vh] w-[92vw] max-w-none -translate-x-1/2 sm:top-[calc(4.5rem+5vh)] sm:h-[min(52vh,26rem)] sm:w-[min(58vw,24rem)] sm:max-w-[26rem] lg:left-0 lg:top-[calc(4.5rem+4vh)] lg:h-[min(56vh,28rem)] lg:w-[min(42vw,26rem)] lg:translate-x-0"
      aria-hidden="true"
    >
      <div
        className="hero-glow absolute left-1/2 top-[52%] h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl sm:left-[42%] sm:top-[48%] sm:h-[95%] sm:w-[95%]"
        aria-hidden="true"
      />
      {canRenderWebGl ? (
        <HeroCanvas />
      ) : (
        <div className="absolute left-1/2 top-1/2 aspect-square w-[min(72vw,17rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/10 bg-[radial-gradient(circle_at_34%_28%,var(--sky),var(--accent)_42%,var(--navy)_76%)] shadow-[inset_-22px_-26px_55px_rgba(30,26,24,0.3),0_24px_70px_color-mix(in_srgb,var(--accent)_24%,transparent)]">
          <div className="absolute inset-[12%] rounded-full border border-background/20" />
          <div className="absolute inset-[28%] rounded-full border border-background/15" />
        </div>
      )}
    </div>
  );
}
