"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

const BALL_SPEED = 0.17;

function DotLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-4 place-items-center rounded-full border border-foreground/20">
        <span className="size-1.5 rounded-full bg-accent" />
      </span>
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground/90">
        {children}
      </p>
    </div>
  );
}

function MiniMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block size-3 bg-accent [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)]",
        className,
      )}
      aria-hidden="true"
    />
  );
}

function AnimatedTestimonialTitle({ text, className }: { text: string; className?: string }) {
  const words = text.trim().split(/\s+/);
  return (
    <h2 className={className}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block">
          <span className="inline-block overflow-hidden align-bottom leading-[0.88] pb-[0.05em] -mb-[0.05em]">
            {word.split("").map((char, ci) => (
              <span key={ci} data-testimonial-char className="inline-block will-change-transform">
                {char}
              </span>
            ))}
          </span>
          {wi < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
      <MiniMark className="ml-[0.08em] translate-y-[-0.12em]" />
    </h2>
  );
}

function TestimonialCard({
  author,
  title,
  message,
  image,
}: {
  author: string;
  title: string;
  message: string;
  image: string;
}) {
  return (
    <div className="rounded-[10px] border border-foreground/10 bg-[color-mix(in_srgb,var(--background)_88%,var(--foreground)_8%)] p-6 shadow-[20px_30px_50px_10px_rgba(0,0,0,0.08)] sm:p-7 lg:p-[4.1666vw]">
      <h3 className="mb-10 flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-foreground/88 sm:text-xs">
        <span className="grid size-4 place-items-center rounded-full border border-foreground/20">
          <span className="size-1.5 rounded-full bg-accent" />
        </span>
        {author}, {title}
      </h3>

      <p className="testimonial-quote relative text-[0.8125rem] font-medium leading-[1.65] text-foreground/60 sm:text-[0.875rem] sm:leading-[1.7]">
        <Image
          src={`/profile/${image}`}
          alt={author}
          width={80}
          height={80}
          draggable={false}
          className="pointer-events-none p-2 absolute left-0 top-[5px] size-16 select-none rounded-full object-cover [-webkit-user-drag:none]"
        />
        <span>{message}</span>
      </p>
    </div>
  );
}

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const dragCursorRef = useRef<HTMLDivElement>(null);
  const dragBgRef = useRef<HTMLSpanElement>(null);
  const slideRefs = useRef<HTMLElement[]>([]);
  const dragState = useRef({
    dragging: false,
    pointerId: -1,
    startX: 0,
    startTranslate: 0,
    translate: 0,
    minX: 0,
    slideWidth: 0,
    lastTrackX: 0,
    mouseX: 0,
    mouseY: 0,
    ballX: 0,
    ballY: 0,
    lastTime: 0,
    velocity: 0,
    lastX: 0,
  });

  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

  const resetSlideScale = () => {
    gsap.to(slideRefs.current, {
      scale: 1,
      duration: 0.45,
      ease: "power2.out",
      overwrite: true,
    });
  };

  const endDrag = (pointerId: number) => {
    const slider = sliderRef.current;
    const state = dragState.current;

    if (state.pointerId !== pointerId && pointerId !== -1) {
      return;
    }

    state.dragging = false;
    state.pointerId = -1;

    if (slider && pointerId !== -1) {
      try {
        slider.releasePointerCapture(pointerId);
      } catch {
        /* pointer already released */
      }
    }

    resetSlideScale();

    const timeSinceLastMove = Date.now() - state.lastTime;
    if (timeSinceLastMove < 100 && Math.abs(state.velocity) > 0.2) {
      const amplitude = 300 * state.velocity;
      const targetX = clamp(state.translate + amplitude, state.minX, 0);
      
      gsap.to(trackRef.current, {
        x: targetX,
        duration: 0.8,
        ease: "power3.out",
        onUpdate: () => {
          if (trackRef.current) {
            dragState.current.translate = gsap.getProperty(trackRef.current, "x") as number;
            updateProgress();
          }
        }
      });
    } else {
      updateProgress();
    }
  };

  const updateProgress = () => {
    const progress = progressRef.current;
    const { translate, minX } = dragState.current;

    if (!progress || minX === 0) {
      progress?.style.setProperty("transform", "scaleX(0)");
      return;
    }

    const ratio = clamp(translate / minX, 0, 1);
    progress.style.transform = `scaleX(${ratio})`;
  };

  const measure = () => {
    const slider = sliderRef.current;
    const track = trackRef.current;
    const slides = slideRefs.current.filter(Boolean);
    const firstSlide = slides[0];
    const lastSlide = slides[slides.length - 1];

    if (!slider || !track || !firstSlide || !lastSlide) {
      return;
    }

    const slideWidth = firstSlide.offsetWidth;
    const trackPaddingRight =
      parseFloat(window.getComputedStyle(track).paddingRight) || 0;
    const totalWidth =
      lastSlide.offsetLeft + lastSlide.offsetWidth + trackPaddingRight;
    const minX = Math.min(0, slider.clientWidth - totalWidth);

    dragState.current.slideWidth = slideWidth;
    dragState.current.minX = minX;
    track.style.width = `${totalWidth}px`;
    dragState.current.translate = clamp(dragState.current.translate, minX, 0);
    gsap.set(track, { x: dragState.current.translate });
    updateProgress();

    const sliderRect = slider.getBoundingClientRect();
    const lastRect = lastSlide.getBoundingClientRect();
    const trackX = gsap.getProperty(track, "x") as number;

  };

  useGSAP(
    () => {
      const section = sectionRef.current;
      const slider = sliderRef.current;
      const track = trackRef.current;
      const dragCursor = dragCursorRef.current;
      const dragBg = dragBgRef.current;

      if (!section || !slider || !track || !dragCursor || !dragBg) {
        return;
      }

      const siteFrame = document.querySelector<HTMLElement>(".site-frame");
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      
      const charSpans = gsap.utils.toArray<HTMLElement>("[data-testimonial-char]");
      if (!reduceMotion && charSpans.length > 0) {
        gsap.set(charSpans, { y: "100%" });
      }

      const initTitleAnimation = () => {
        if (reduceMotion || charSpans.length === 0) return;
        
        const isLenisActive = siteFrame?.dataset.lenisReady === "true";
        const scroller: HTMLElement | Window = isLenisActive ? siteFrame! : window;

        gsap.to(charSpans, {
          y: "0%",
          duration: 1,
          stagger: 0.05,
          ease: "expo.out",
          scrollTrigger: {
            trigger: charSpans[0].closest("h2"),
            scroller,
            start: "top 88%",
          },
        });
      };

      const waitsForLenis =
        window.matchMedia("(min-width: 1024px)").matches &&
        window.matchMedia("(pointer: fine)").matches;

      if (!waitsForLenis || siteFrame?.dataset.lenisReady === "true") {
        initTitleAnimation();
      } else if (siteFrame) {
        window.addEventListener("lenis:ready", initTitleAnimation, {
          once: true,
        });
      }

      measure();

      const onResize = () => measure();
      window.addEventListener("resize", onResize);

      let currentTrackX = track.getBoundingClientRect().left;
      let cursorFrame = 0;

      const releaseCursorPress = () => {
        dragCursor.classList.remove("is-on");
        gsap.to(dragBg, {
          scale: 1,
          duration: 0.4,
          ease: "power4.out",
        });
      };

      const cursorLoop = () => {
        if (window.innerWidth >= 1024) {
          const state = dragState.current;
          const distX = state.mouseX - state.ballX;
          const distY = state.mouseY - state.ballY;

          state.ballX += distX * BALL_SPEED;
          state.ballY += distY * BALL_SPEED;

          const centerHeight = dragCursor.offsetHeight / 2;
          const centerWidth = dragCursor.offsetWidth / 2;

          gsap.to(dragCursor, {
            x: state.ballX - centerWidth,
            y: state.ballY - centerHeight,
            ease: "none",
            duration: 0.15,
            overwrite: true,
          });

          const newTrackX = track.getBoundingClientRect().left;
          const diff = newTrackX - currentTrackX;
          const speed = Math.abs(Math.round(diff * 1.75) / 100);
          const speedMax = Math.min(Math.max(speed, 0), 1);

          gsap.to(slideRefs.current, {
            scale: 1 - speedMax / 5,
            duration: 0.18,
            overwrite: true,
          });

          currentTrackX = newTrackX;

          cursorFrame += 1;
          if (
            cursorFrame % 45 === 0 &&
            dragCursor.classList.contains("moving")
          ) {
           
          }
        }

        requestAnimationFrame(cursorLoop);
      };

      const rafId = requestAnimationFrame(cursorLoop);

      const onPointerDown = (event: PointerEvent) => {
        if (event.button !== 0) {
          return;
        }

        dragState.current.dragging = true;
        dragState.current.pointerId = event.pointerId;
        dragState.current.startX = event.clientX;
        dragState.current.startTranslate = dragState.current.translate;
        dragState.current.mouseX = event.clientX;
        dragState.current.mouseY = event.clientY;
        dragState.current.lastTime = Date.now();
        dragState.current.lastX = event.clientX;
        dragState.current.velocity = 0;

        dragCursor.classList.add("is-on");
        gsap.to(dragBg, {
          scale: 0.8,
          duration: 0.4,
          ease: "power4.out",
        });

        slider.setPointerCapture(event.pointerId);
        gsap.killTweensOf(track);
      };

      const onPointerMove = (event: PointerEvent) => {
        dragState.current.mouseX = event.clientX;
        dragState.current.mouseY = event.clientY;

        if (
          !dragState.current.dragging ||
          event.pointerId !== dragState.current.pointerId
        ) {
          return;
        }

        const now = Date.now();
        const dt = now - dragState.current.lastTime;
        if (dt > 0) {
          dragState.current.velocity = (event.clientX - dragState.current.lastX) / dt;
          dragState.current.lastTime = now;
          dragState.current.lastX = event.clientX;
        }

        const delta = event.clientX - dragState.current.startX;
        const next = clamp(
          dragState.current.startTranslate + delta,
          dragState.current.minX,
          0,
        );

        dragState.current.translate = next;
        gsap.set(track, { x: next });
        updateProgress();
      };

      const onPointerUp = (event: PointerEvent) => {
        releaseCursorPress();
        endDrag(event.pointerId);
      };

      const onWindowPointerUp = (event: PointerEvent) => {
        if (dragState.current.dragging) {
          releaseCursorPress();
          endDrag(event.pointerId);
        }
      };

      const onMouseEnter = (event: MouseEvent) => {
        dragState.current.mouseX = event.clientX;
        dragState.current.mouseY = event.clientY;
        dragState.current.ballX = event.clientX;
        dragState.current.ballY = event.clientY;

        dragCursor.classList.add("moving");
        gsap.to(dragBg, {
          scale: 1,
          duration: 0.4,
          ease: "power4.out",
        });
        document.body.style.cursor = "none";
      };

      const onMouseLeave = () => {
        dragCursor.classList.remove("is-on", "moving");
        gsap.to(dragBg, {
          scale: 0,
          delay: 0.1,
          duration: 0.3,
          ease: "power4.out",
        });
        document.body.style.cursor = "";
        resetSlideScale();
      };

      const onMouseMove = (event: MouseEvent) => {
        dragState.current.mouseX = event.clientX;
        dragState.current.mouseY = event.clientY;

        if (!dragCursor.classList.contains("moving")) {
          onMouseEnter(event);
        }
      };

      const onScroll = () => {
        if (
          dragCursor.classList.contains("moving") &&
          !dragState.current.dragging
        ) {
          const rect = slider.getBoundingClientRect();
          const state = dragState.current;
          const isInside =
            state.mouseX >= rect.left &&
            state.mouseX <= rect.right &&
            state.mouseY >= rect.top &&
            state.mouseY <= rect.bottom;
          if (!isInside) {
            onMouseLeave();
          }
        }
      };

      const onDragStart = (event: DragEvent) => {
        event.preventDefault();
      };

      slider.addEventListener("pointerdown", onPointerDown);
      slider.addEventListener("pointermove", onPointerMove);
      slider.addEventListener("pointerup", onPointerUp);
      slider.addEventListener("pointercancel", onPointerUp);
      slider.addEventListener("mouseenter", onMouseEnter);
      slider.addEventListener("mouseleave", onMouseLeave);
      slider.addEventListener("mousemove", onMouseMove);
      slider.addEventListener("dragstart", onDragStart);
      window.addEventListener("pointerup", onWindowPointerUp);
      window.addEventListener("pointercancel", onWindowPointerUp);
      window.addEventListener("scroll", onScroll, {
        capture: true,
        passive: true,
      });

      return () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener("resize", onResize);
        slider.removeEventListener("pointerdown", onPointerDown);
        slider.removeEventListener("pointermove", onPointerMove);
        slider.removeEventListener("pointerup", onPointerUp);
        slider.removeEventListener("pointercancel", onPointerUp);
        slider.removeEventListener("mouseenter", onMouseEnter);
        slider.removeEventListener("mouseleave", onMouseLeave);
        slider.removeEventListener("mousemove", onMouseMove);
        slider.removeEventListener("dragstart", onDragStart);
        window.removeEventListener("pointerup", onWindowPointerUp);
        window.removeEventListener("pointercancel", onWindowPointerUp);
        window.removeEventListener("scroll", onScroll, { capture: true });
        document.body.style.cursor = "";
        gsap.set(dragCursor, { clearProps: "x,y" });
      };
    },
    { scope: sectionRef, dependencies: [testimonials.length] },
  );

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative overflow-hidden bg-background py-20 text-foreground lg:px-[4.1666vw] lg:py-24"
    >
      <div
        ref={dragCursorRef}
        className="testimonials-drag-cursor"
        aria-hidden="true"
      >
        <span ref={dragBgRef} />
        <svg viewBox="0 0 54 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            className="drag-cursor-dot"
            d="M27 1.5C28.3807 1.5 29.5 2.61929 29.5 4C29.5 5.38071 28.3807 6.5 27 6.5C25.6193 6.5 24.5 5.38071 24.5 4C24.5 2.61929 25.6193 1.5 27 1.5Z"
            fill="currentColor"
          />
          <path
            className="drag-cursor-ar-1"
            d="M2.5 6.5H12.5M2.5 6.5L7.5 1.5M2.5 6.5L7.5 11.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="drag-cursor-ar-2"
            d="M51.5 6.5H41.5M51.5 6.5L46.5 1.5M51.5 6.5L46.5 11.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <header className="mx-auto grid max-w-[104rem] gap-8 px-5 sm:px-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-end lg:gap-10 lg:px-0">
        <DotLabel>Testimonials</DotLabel>
        <AnimatedTestimonialTitle
          text="We keep our promise"
          className="font-display text-[clamp(2.8rem,6.8vw,7.5rem)] uppercase leading-[0.86] tracking-[-0.04em] text-foreground"
        />
      </header>

      <div
        ref={sliderRef}
        data-testimonials-slider
        className="relative mt-10 touch-pan-x select-none overflow-hidden lg:mx-auto lg:mt-14 lg:max-w-[104rem] lg:cursor-grab"
      >
        <div
          ref={trackRef}
          className="flex will-change-transform pl-5 pr-5 sm:pl-8 sm:pr-8 lg:pl-0 lg:pr-0"
          style={{ touchAction: "pan-x" }}
        >
          {testimonials.map((item, index) => (
            <article
              key={`${item.author}-${index}`}
              ref={(node) => {
                if (node) {
                  slideRefs.current[index] = node;
                }
              }}
              data-testimonial-slide
              className="w-[calc(100vw-3.5rem-14vw)] shrink-0 pr-4 will-change-transform sm:w-[calc(100vw-4rem-14vw)] sm:pr-5 lg:w-[33.33vw] lg:pr-[4.1666vw]"
            >
              <TestimonialCard
                author={item.author}
                title={item.title}
                message={item.message}
                image={item.image}
              />
            </article>
          ))}
        </div>

        <div
          className="pointer-events-none absolute -bottom-6 left-5 h-px w-[calc(100%-2.5rem)] origin-left bg-foreground/15 sm:left-8 sm:w-[calc(100%-4rem)] lg:-bottom-8 lg:left-[54.1658vw] lg:w-[20.833vw]"
          aria-hidden="true"
        >
          <span
            ref={progressRef}
            className="block h-full w-full origin-left bg-accent"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </section>
  );
}
