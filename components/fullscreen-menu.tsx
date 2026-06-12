"use client";

import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { MenuBottomWave } from "@/components/menu-bottom-wave";
import { menuLinks } from "@/data/nav";
import { socialLinks } from "@/data/socials";

type FullscreenMenuProps = {
  open: boolean;
  onClose: () => void;
  /** Center of the menu trigger button (viewport px) */
  origin: { x: number; y: number } | null;
};

const revealEase = [0.42, 0, 0.58, 1] as const;
const contentEase = [0.42, 0, 0.58, 1] as const;

const menuRootVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.12 },
  },
  exit: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
};

const revealVariants: Variants = {
  hidden: (origin: { x: number; y: number }) => ({
    clipPath: `circle(0px at ${origin.x}px ${origin.y}px)`,
  }),
  visible: (origin: { x: number; y: number }) => ({
    clipPath: `circle(150vmax at ${origin.x}px ${origin.y}px)`,
    transition: { duration: 0.9, ease: revealEase },
  }),
  exit: (origin: { x: number; y: number }) => ({
    clipPath: `circle(0px at ${origin.x}px ${origin.y}px)`,
    transition: { duration: 0.74, ease: revealEase },
  }),
};

const linkVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: contentEase },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

function MenuHexDot() {
  return (
    <svg viewBox="0 0 12 14" className="inline-block h-3 w-3 shrink-0" aria-hidden="true">
      <polygon points="6,1 11,4 11,10 6,13 1,10 1,4" fill="var(--accent)" />
    </svg>
  );
}

function getFallbackOrigin(): { x: number; y: number } {
  if (typeof window === "undefined") {
    return { x: 100, y: 36 };
  }
  return { x: window.innerWidth - 40, y: 36 };
}

export function FullscreenMenu({ open, onClose, origin }: FullscreenMenuProps) {
  const reduceMotion = useReducedMotion();
  const clipOrigin = origin ?? getFallbackOrigin();

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="site-menu"
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[80] overflow-hidden"
          custom={clipOrigin}
          variants={reduceMotion ? undefined : revealVariants}
          initial={reduceMotion ? { opacity: 0 } : "hidden"}
          animate={reduceMotion ? { opacity: 1 } : "visible"}
          exit={reduceMotion ? { opacity: 0 } : "exit"}
          transition={reduceMotion ? { duration: 0.2 } : undefined}
          style={reduceMotion ? undefined : { willChange: "clip-path" }}
        >
          <motion.div
            className="relative flex h-full w-full flex-col bg-menu-bg"
            variants={menuRootVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {!reduceMotion ? <MenuBottomWave /> : (
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 top-[64vh] z-[1] bg-background"
                aria-hidden="true"
              />
            )}
            <div className="relative z-10 flex h-full flex-col">
              <nav
                className="flex flex-1 flex-col items-center justify-center px-6 pb-[28vh] sm:pb-[24vh]"
                aria-label="Primary navigation"
              >
                <ul className="flex w-full max-w-[92rem] flex-col flex-wrap items-center justify-center gap-3 overflow-visible sm:flex-row sm:gap-x-6 sm:gap-y-5 lg:gap-x-9 2xl:gap-x-11">
                  {menuLinks.map((link) => (
                    <motion.li key={link.href} variants={linkVariants}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="font-helvetica-bold group inline-flex max-w-[min(92vw,32rem)] items-baseline gap-3 break-words text-[clamp(2.45rem,5.1vw,5.2rem)] leading-[0.92] text-background transition hover:text-accent sm:max-w-none"
                      >
                        {link.label}
                        <MenuHexDot />
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                <motion.ul
                  className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
                  variants={linkVariants}
                >
                  {socialLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-background/70 transition hover:text-background"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </motion.ul>
              </nav>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
