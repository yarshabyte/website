"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type LoadingScreenProps = {
  isExiting: boolean;
};

export function LoadingScreen({ isExiting }: LoadingScreenProps) {
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setDrawn(true), 120);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-background transition-[opacity,visibility] duration-700 ease-in-out",
        isExiting ? "pointer-events-none opacity-0 invisible" : "opacity-100 visible",
      )}
      aria-hidden={isExiting}
      aria-busy={!isExiting}
      role="status"
      aria-label="Loading Yarsa Byte"
    >
      <div className="flex flex-col items-center gap-10">
        <svg
          viewBox="0 0 320 240"
          className="h-28 w-36 sm:h-32 sm:w-44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <g stroke="black" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            {[
              "M40 120 L80 96 L120 120 L160 96 L200 120 L240 96 L280 120",
              "M80 96 L100 72 L120 96 L140 72 L160 96 L180 72 L200 96",
              "M120 120 L120 168 L140 188 L160 168 L180 188 L200 168 L200 120",
              "M60 144 L80 168 L100 144 L120 168 L140 144",
              "M180 144 L200 168 L220 144 L240 168 L260 144",
              "M100 72 L120 48 L140 72 L160 48 L180 72 L200 48 L220 72",
              "M80 168 L100 192 L120 168 L140 192 L160 168 L180 192 L200 168 L220 192 L240 168",
            ].map((path, index) => (
              <path
                key={path}
                d={path}
                pathLength={1}
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: drawn ? 0 : 1,
                  transition: `stroke-dashoffset 1.15s ease-in-out ${index * 0.07}s`,
                }}
              />
            ))}
          </g>
        </svg>

        <p
          className={cn(
            "text-center text-[0.65rem] uppercase tracking-[0.42em] text-black transition-all duration-700 sm:text-xs",
            drawn ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
          )}
          style={{ transitionDelay: "0.6s" }}
        >
          <span className="font-light">Loading </span>
          <span className="font-helvetica-bold">Yarsa Byte</span>
        </p>
      </div>
    </div>
  );
}
