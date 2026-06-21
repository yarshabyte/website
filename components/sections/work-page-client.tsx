"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Grid2X2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import Link from "next/link";

import { projects } from "@/data/projects";
import { InteractiveBlob } from "@/components/three/InteractiveBlob";
import { suppressThreeClockWarning } from "@/lib/suppress-three-clock-warning";

const ease = [0.22, 1, 0.36, 1] as const;

export function WorkPageClient() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [direction, setDirection] = useState(1);

  const count = projects.length;
  const activeProject = projects[activeIndex] ?? projects[0];

  useEffect(() => {
    suppressThreeClockWarning();
  }, []);

  const move = useCallback((dir: 1 | -1) => {
    setDirection(dir);
    setActiveIndex((current) => (current + dir + count) % count);
  }, [count]);

  useEffect(() => {
    if (isGridOpen) return;

    let isAnimating = false;
    let timeoutId: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      if (isAnimating) return;
      if (Math.abs(e.deltaY) < 25) return; // Threshold to prevent tiny accidental scrolls

      isAnimating = true;
      if (e.deltaY > 0) {
        move(1);
      } else {
        move(-1);
      }

      // Wait 1 second before allowing another scroll, to match transition duration
      timeoutId = setTimeout(() => {
        isAnimating = false;
      }, 1000);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(timeoutId);
    };
  }, [isGridOpen, move]);

  const variants = {
    enter: (direction: number) => {
      return {
        y: direction > 0 ? 100 : -100,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        y: direction < 0 ? 100 : -100,
        opacity: 0
      };
    }
  };

  const blobImageUrl =
    typeof activeProject.thumbnail === "string"
      ? activeProject.thumbnail
      : typeof activeProject.thumbnail === "object" && "src" in activeProject.thumbnail
      ? activeProject.thumbnail.src
      : "";

  return (
    <main className="relative min-h-dvh overflow-hidden bg-background">
      {/* 3D BLOB CANVAS - Positioned behind/around the content */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden md:block">
        <Canvas
          className="h-full w-full"
          camera={{ position: [0, 0, 15], fov: 30 }}
          gl={{
            alpha: true,
            antialias: false,
            powerPreference: "high-performance",
          }}
          dpr={[1, 1.15]}
          frameloop="always"
        >
          <InteractiveBlob 
            textureUrl={blobImageUrl} 
            reflectionColor={activeProject.color || "#edece2"}
            targetXDesktop={0}
            targetYDesktop={0}
          />
        </Canvas>
      </div>

      <AnimatePresence mode="wait">
        {!isGridOpen ? (
          <motion.div
            key="slider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            className="relative z-20 flex min-h-dvh flex-col justify-between px-6 py-8 md:px-12 md:py-12"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-foreground">
                YARSHA BYTE &nbsp;&bull;&nbsp; WORK
              </p>
            </div>

            {/* Main Slider Content */}
            <div className="flex flex-1 items-center justify-center pt-10">
              <div className="grid w-full max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-[0.5fr_0.5fr]">
                {/* Image Side */}
                <div className="relative aspect-[4/3] w-full max-w-xl overflow-hidden rounded-3xl md:aspect-[4/3] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
                  <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                      key={activeIndex}
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        y: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                      }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={activeProject.thumbnail}
                        alt={activeProject.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Info Side */}
                <div className="relative z-30 flex flex-col items-start justify-center md:pl-10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease }}
                      className="flex items-center gap-6"
                    >
                      <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-black uppercase leading-[0.9] text-foreground whitespace-nowrap">
                        {activeProject.title}
                      </h2>
                      <Link 
                        href={`/work/${activeProject.slug}`}
                        className="grid size-12 shrink-0 place-items-center rounded-full border border-foreground/10 bg-accent text-background transition hover:scale-110 shadow-lg"
                      >
                        <ArrowUpRight className="size-5" />
                      </Link>
                    </motion.div>
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex + "tags"}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, delay: 0.1, ease }}
                      className="mt-12 flex flex-col gap-1.5 text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] text-foreground/50"
                    >
                      {activeProject.tags.slice(0, 4).map((tag, i) => (
                        <span key={i}>{tag}</span>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Footer Navigation */}
            <div className="mt-10 flex items-center justify-between md:mt-0 relative z-30">
              <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-foreground/50">
                <span className="text-foreground">
                  {String(activeIndex + 1).padStart(3, "0")}
                </span>
                <span>/</span>
                <span>{String(count).padStart(3, "0")}</span>
              </div>

              <div className="absolute left-1/2 -translate-x-1/2">
                <button
                  type="button"
                  onClick={() => setIsGridOpen(true)}
                  className="inline-flex min-h-10 items-center gap-2 rounded-full border border-foreground/10 px-5 text-xs font-black uppercase tracking-[0.15em] transition hover:border-accent hover:text-accent bg-background/50 backdrop-blur-md"
                >
                  <Grid2X2 className="size-3" />
                  All Projects
                </button>
              </div>
              
              {/* Spacer for flex-between alignment */}
              <div className="w-20" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: "10%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "10%" }}
            transition={{ duration: 0.6, ease }}
            className="relative z-30 min-h-dvh bg-background px-6 py-12 md:px-12"
          >
            <div className="flex items-center justify-between border-b border-foreground/10 pb-8">
              <h2 className="text-[clamp(2rem,5vw,4rem)] font-black uppercase leading-[0.9] text-foreground">
                All Projects
              </h2>
              <button
                type="button"
                onClick={() => setIsGridOpen(false)}
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-foreground/10 px-5 text-xs font-black uppercase tracking-[0.15em] transition hover:border-accent hover:text-accent"
              >
                <X className="size-3" />
                Close
              </button>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <div
                  key={project.slug}
                  className="group block cursor-pointer"
                  onClick={() => {
                    setActiveIndex(index);
                    setIsGridOpen(false);
                  }}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-foreground/5">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <h3 className="font-display text-2xl font-black uppercase tracking-tight text-foreground">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="size-5 text-foreground/40 transition group-hover:text-accent" />
                  </div>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.1em] text-foreground/50">
                    {project.tags.slice(0, 3).join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
