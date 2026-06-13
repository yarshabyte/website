"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { FullscreenMenu } from "@/components/fullscreen-menu";
import { MenuIcon } from "@/components/menu-icon";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const wasMenuOpen = useRef(false);
  const lastScrollY = useRef(0);
  const directionStartY = useRef(0);
  const lastDirection = useRef<"up" | "down" | null>(null);
  const isTicking = useRef(false);
  const scrollElementRef = useRef<Window | HTMLElement | null>(null);

  useEffect(() => {
    const siteFrame = document.querySelector<HTMLElement>(".site-frame");
    const previousBodyOverflow = document.body.style.overflow;
    const previousFrameOverflowY = siteFrame?.style.overflowY ?? "";

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      if (siteFrame) {
        siteFrame.style.overflowY = "hidden";
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      if (siteFrame) {
        siteFrame.style.overflowY = previousFrameOverflowY;
      }
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (wasMenuOpen.current && !isMenuOpen) {
      menuButtonRef.current?.focus({ preventScroll: true });
    }

    wasMenuOpen.current = isMenuOpen;
  }, [isMenuOpen]);

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
      const direction = delta > 0 ? "down" : delta < 0 ? "up" : null;

      if (currentY < 24) {
        setIsHeaderHidden(false);
        directionStartY.current = currentY;
      } else if (direction) {
        if (direction !== lastDirection.current) {
          lastDirection.current = direction;
          directionStartY.current = currentY;
        }

        const directionDistance = Math.abs(currentY - directionStartY.current);

        if (direction === "down" && directionDistance > 32) {
          setIsHeaderHidden(true);
        } else if (direction === "up" && directionDistance > 20) {
          setIsHeaderHidden(false);
        }
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
      directionStartY.current = lastScrollY.current;
      lastDirection.current = null;
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
      setIsHeaderHidden(false);
    }
    setIsMenuOpen((current) => !current);
  };

  return (
    <>
      <header
        className={`pointer-events-none fixed inset-x-0 top-0 z-[90] transition duration-300 ease-out ${
          isHeaderHidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <div className="relative h-[calc(4.1666vw+clamp(3.125rem,4.1666vw,6.5rem))] min-h-[4.75rem] w-full">
          <Link
            href="/"
            className="pointer-events-auto absolute left-[4.1666vw] top-[4.1666vw] flex min-w-0 items-center gap-3 sm:gap-4 lg:gap-[4.1666vw]"
            aria-label="Yarsa Byte home"
            onClick={() => setIsMenuOpen(false)}
          >
            <Image
              src="/logo-icon.png"
              alt="Yarsa Byte logo"
              width={104}
              height={104}
              className="size-[3.125rem] shrink-0 rounded-md bg-white object-contain p-1 sm:size-[3.75rem] lg:size-[clamp(3.75rem,4.1666vw,6.5rem)]"
              priority
              unoptimized
            />
            <span
              className={`truncate text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground transition-[opacity,transform] duration-300 sm:text-[0.78rem] ${
                isMenuOpen ? "-translate-y-2 opacity-0" : "translate-y-0 opacity-100"
              }`}
            >
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
            className="pointer-events-auto absolute right-[4.1666vw] top-[4.1666vw] grid h-[3.125rem] w-10 shrink-0 place-items-center text-foreground transition hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:h-[3.75rem] sm:w-14 lg:h-[clamp(3.75rem,4.1666vw,6.5rem)] lg:w-20"
          >
            <MenuIcon open={isMenuOpen} />
          </button>
        </div>
      </header>

      <FullscreenMenu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
