"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { FullscreenMenu } from "@/components/fullscreen-menu";
import { MenuIcon } from "@/components/menu-icon";

type MenuOrigin = { x: number; y: number };

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuOrigin, setMenuOrigin] = useState<MenuOrigin | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const updateMenuOrigin = useCallback(() => {
    const button = menuButtonRef.current;
    if (!button) {
      return;
    }

    const rect = button.getBoundingClientRect();
    setMenuOrigin({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    updateMenuOrigin();
    window.addEventListener("resize", updateMenuOrigin);

    return () => window.removeEventListener("resize", updateMenuOrigin);
  }, [isMenuOpen, updateMenuOrigin]);

  const toggleMenu = () => {
    if (!isMenuOpen) {
      updateMenuOrigin();
    }
    setIsMenuOpen((current) => !current);
  };

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[90] lg:left-3 lg:right-3 lg:top-3">
        <div className="flex h-20 items-center justify-between gap-4 px-50 pt-6 sm:h-[4.5rem] sm:pt-6">
          <Link
            href="/"
            className="pointer-events-auto flex min-w-0 items-center gap-2"
            aria-label="Yarsa Byte home"
            onClick={() => setIsMenuOpen(false)}
          >
            <Image
              src="/logo-icon.png"
              alt=""
              width={64}
              height={64}
              className="size-11 shrink-0 rounded bg-white object-contain p-1 sm:size-9"
              priority
            />
            <span className="truncate text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground sm:text-xs sm:tracking-[0.22em]">
              Yarsa Byte
            </span>
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            aria-controls="site-menu"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
            className="pointer-events-auto grid size-12 shrink-0 place-items-center text-foreground transition hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:size-14"
          >
            <MenuIcon open={isMenuOpen} stroke={isMenuOpen ? "#252524" : "currentColor"} />
          </button>
        </div>
      </header>

      <FullscreenMenu
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        origin={menuOrigin}
      />
    </>
  );
}
