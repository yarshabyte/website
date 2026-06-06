"use client";

import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";

import { InteractiveBlob } from "@/components/three/InteractiveBlob";
import { suppressThreeClockWarning } from "@/lib/suppress-three-clock-warning";

export function HeroCanvas() {
  useEffect(() => {
    suppressThreeClockWarning();
  }, []);
  return (
    <Canvas
      className="h-full w-full touch-none"
      camera={{ position: [0, 0, 6.8], fov: 36 }}
      gl={{
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      }}
      dpr={[1, 1.15]}
      frameloop="always"
    >
      <ambientLight intensity={0.14} color="#FDFBF7" />
      <directionalLight position={[2, 3, 5]} intensity={0.22} color="#7BA05B" />
      <InteractiveBlob />
    </Canvas>
  );
}
