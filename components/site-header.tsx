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
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const lastScrollY = useRef(0);
  const isTicking = useRef(false);
  const scrollElementRef = useRef<Window | HTMLElement | null>(null);

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

  useEffect(() => {
    if (isMenuOpen) {
      return;
    }

    const getScrollElement = () => {
      const wrapper = document.querySelector<HTMLElement>(".site-frame");
      if (!wrapper) {
        return window;
      }

      const style = window.getComputedStyle(wrapper);
      const canScroll = wrapper.scrollHeight > wrapper.clientHeight;
      const overflowY = style.overflowY;

      if (wrapper.dataset.lenisReady === "true" || (canScroll && overflowY !== "visible")) {
        return wrapper;
      }

      return window;
    };

    const readScrollTop = (element: Window | HTMLElement) =>
      element instanceof Window ? element.scrollY : element.scrollTop;

    const handleScrollPosition = (currentY: number) => {
      const delta = currentY - lastScrollY.current;
      const scrollingDown = delta > 8;
      const scrollingUp = delta < -8;

      if (currentY < 12) {
        setIsHeaderHidden(false);
      } else if (scrollingDown) {
        setIsHeaderHidden(true);
      } else if (scrollingUp) {
        setIsHeaderHidden(false);
      }

      lastScrollY.current = currentY;
    };

    const scheduleUpdate = (currentY: number) => {
      if (isTicking.current) {
        return;
      }

      isTicking.current = true;
      window.requestAnimationFrame(() => {
        handleScrollPosition(currentY);
        isTicking.current = false;
      });
    };

    const onScroll = () => {
      const element = scrollElementRef.current ?? window;
      scheduleUpdate(readScrollTop(element));
    };

    const onLenisScroll = (event: Event) => {
      const detail = (event as CustomEvent<{ scroll: number }>).detail;
      if (!detail) {
        return;
      }

      scheduleUpdate(detail.scroll);
    };

    const attachListener = () => {
      const element = getScrollElement();
      if (scrollElementRef.current === element) {
        return;
      }

      scrollElementRef.current?.removeEventListener("scroll", onScroll);
      scrollElementRef.current = element;
      lastScrollY.current = readScrollTop(element);
      element.addEventListener("scroll", onScroll, { passive: true });
    };

    attachListener();
    window.addEventListener("lenis:ready", attachListener);
    window.addEventListener("lenis:scroll", onLenisScroll as EventListener);

    return () => {
      window.removeEventListener("lenis:ready", attachListener);
      window.removeEventListener("lenis:scroll", onLenisScroll as EventListener);
      scrollElementRef.current?.removeEventListener("scroll", onScroll);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    if (!isMenuOpen) {
      updateMenuOrigin();
      setIsHeaderHidden(false);
    }
    setIsMenuOpen((current) => !current);
  };

  return (
    <>
      <header
        className={`pointer-events-none fixed inset-x-0 top-0 z-[90] transition duration-300 ease-out lg:left-3 lg:right-3 lg:top-3 ${
          isHeaderHidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <div className="studio-container flex h-[var(--header-height)] items-center justify-between gap-[var(--space-grid)]">
          <Link
            href="/"
            className="pointer-events-auto flex min-w-0 items-center gap-2.5 sm:gap-3"
            aria-label="Yarsa Byte home"
            onClick={() => setIsMenuOpen(false)}
          >
            <Image
              src="/logo-icon.png"
              alt="Yarsa Byte logo"
              width={64}
              height={64}
              className="size-10 shrink-0 rounded-md bg-white object-contain p-1 sm:size-11"
              priority
            />
            <span className="truncate text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-foreground sm:text-[0.8rem]">
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
            className="pointer-events-auto grid size-12 shrink-0 place-items-center text-foreground transition hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:size-15"
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
