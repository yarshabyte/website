"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  MapPin,
} from "lucide-react";
import Link from "next/link";

import { services } from "@/data/services";
import { socialLinks } from "@/data/socials";

const pageLinks = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
] as const;

const smallLabelClass =
  "text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-background/45";

const footerLinkClass =
  "w-fit focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

function SocialIcon({
  label,
}: {
  label: (typeof socialLinks)[number]["label"];
}) {
  if (label === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
        <path fill="currentColor" d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.756 6.162 6.162 6.162 3.405 0 6.162-2.757 6.162-6.162 0-3.402-2.757-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
      </svg>
    );
  }

  if (label === "LinkedIn") {
    return (
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
        <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    );
  }

  if (label === "Facebook") {
    return (
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
        <path fill="currentColor" d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-1.125 0-2.517.236-2.517 1.428v2.547h3.739l-.498 3.667h-3.24V24h-4.564v-.309z"/>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
      <path fill="currentColor" d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z"/>
    </svg>
  );
}

function AnimatedContactTitle({ lines, className }: { lines: string[]; className?: string }) {
  return (
    <h2 className={className}>
      {lines.map((line, li) => {
        const words = line.trim().split(/\s+/);
        return (
          <span key={li} className="block">
            {words.map((word, wi) => (
              <span key={wi} className="inline-block">
                <span className="inline-block overflow-hidden align-bottom leading-[0.88] pb-[0.05em] -mb-[0.05em]">
                  {word.split("").map((char, ci) => (
                    <span key={ci} data-contact-char className="inline-block will-change-transform">
                      {char}
                    </span>
                  ))}
                </span>
                {wi < words.length - 1 && <span>&nbsp;</span>}
              </span>
            ))}
          </span>
        );
      })}
    </h2>
  );
}

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const arrowContainerRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLAnchorElement>(null);
  const startProjectBtnRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const siteFrame = document.querySelector<HTMLElement>(".site-frame");
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      
      const charSpans = gsap.utils.toArray<HTMLElement>("[data-contact-char]", section);
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

      // --- Custom Cursor Logic ---
      if (window.matchMedia("(pointer: fine)").matches) {
        const arrow = arrowRef.current;
        const arrowContainer = arrowContainerRef.current;
        const startProjectBtn = startProjectBtnRef.current;
        
        if (arrow && arrowContainer && startProjectBtn) {
          let isHoveringLink = false;
          let isHoveringStart = false;
          let leaveTimeout: NodeJS.Timeout;
          let mouseX = window.innerWidth / 2;
          let mouseY = window.innerHeight / 2;
          
          const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            if (isHoveringStart || isHoveringLink) return;

            const rect = arrowContainer.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Fast, tight trailing when tracking the mouse
            gsap.to(arrow, {
              x: mouseX - centerX ,
              y: mouseY - centerY ,
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto",
            });
          };

          const handleMouseLeaveFooter = () => {
            // Smoothly glide back home if mouse leaves footer
            gsap.to(arrow, {
              x: 0,
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 0.6,
              ease: "expo.out",
              overwrite: true,
            });
          };

          const handleSectionClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest("a") || target.closest("button")) return;

            clearTimeout(leaveTimeout);
            isHoveringStart = true;
            
            const startRect = startProjectBtn.getBoundingClientRect();
            const arrowContainerRect = arrowContainer.getBoundingClientRect();
            
            const startCenterX = startRect.left + startRect.width / 2;
            const startCenterY = startRect.top + startRect.height / 2;
            const arrowCenterX = arrowContainerRect.left + arrowContainerRect.width / 2;
            const arrowCenterY = arrowContainerRect.top + arrowContainerRect.height / 2;
            
            gsap.to(arrow, {
              x: startCenterX - arrowCenterX,
              y: startCenterY - arrowCenterY,
              scale: 0.5,
              opacity: 0,
              duration: 0.6,
              ease: "expo.out",
              overwrite: true,
            });
            
            if (startProjectBtn.classList.contains("hover-btn-target")) {
              gsap.fromTo(startProjectBtn,
                { "--hover-progress": "0%" },
                { "--hover-progress": "150%", duration: 0.5, ease: "power2.out", overwrite: true }
              );
            }
            
            gsap.fromTo(startProjectBtn, 
              { scale: 1.1 }, 
              { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" }
            );

            setTimeout(() => {
              isHoveringStart = false;
              if (startProjectBtn.classList.contains("hover-btn-target")) {
                gsap.to(startProjectBtn, { "--hover-progress": "0%", duration: 0.4, ease: "power2.out", overwrite: true });
              }
              
              // Automatically return to the mouse cursor if they haven't moved to another link
              if (!isHoveringLink) {
                const updatedRect = arrowContainer.getBoundingClientRect();
                const updatedCenterX = updatedRect.left + updatedRect.width / 2;
                const updatedCenterY = updatedRect.top + updatedRect.height / 2;
                
                gsap.to(arrow, {
                  x: mouseX - updatedCenterX ,
                  y: mouseY - updatedCenterY ,
                  scale: 1,
                  opacity: 1,
                  duration: 0.5,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              }
            }, 800);
          };

          section.addEventListener("mousemove", handleMouseMove);
          section.addEventListener("mouseleave", handleMouseLeaveFooter);
          section.addEventListener("click", handleSectionClick);

          const links = section.querySelectorAll("a, button");
          links.forEach((link) => {
            if (link === arrow) return;
            
              link.addEventListener("mouseenter", () => {
                clearTimeout(leaveTimeout);
                isHoveringLink = true;
                
                const linkRect = link.getBoundingClientRect();
                const arrowContainerRect = arrowContainer.getBoundingClientRect();
                
                const linkCenterX = linkRect.left + linkRect.width / 2;
                const linkCenterY = linkRect.top + linkRect.height / 2;
                const arrowCenterX = arrowContainerRect.left + arrowContainerRect.width / 2;
                const arrowCenterY = arrowContainerRect.top + arrowContainerRect.height / 2;
                
                // Dissolve smoothly into the hovered link
                gsap.to(arrow, {
                  x: linkCenterX - arrowCenterX,
                  y: linkCenterY - arrowCenterY,
                  scale: 0.5,
                  opacity: 0,
                  duration: 0.5,
                  ease: "power3.out",
                  overwrite: true,
                });
                // Radial text/button animation
                if (link.classList.contains("hover-btn-target")) {
                  gsap.fromTo(link,
                    { "--hover-progress": "0%" },
                    { "--hover-progress": "150%", duration: 0.5, ease: "power2.out", overwrite: true }
                  );
                } else {
                  const textTarget = link.querySelector(".hover-text-target");
                  if (textTarget) {
                    gsap.fromTo(textTarget,
                      { "--hover-progress": "0%" },
                      { "--hover-progress": "150%", duration: 0.5, ease: "power2.out", overwrite: true }
                    );
                  }
                }
              });
              link.addEventListener("mouseleave", () => {
                leaveTimeout = setTimeout(() => {
                  isHoveringLink = false;
                  
                  // Immediately snap back to the last known mouse position to prevent disappearing bug
                  const rect = arrowContainer.getBoundingClientRect();
                  const centerX = rect.left + rect.width / 2;
                  const centerY = rect.top + rect.height / 2;
                  
                  gsap.to(arrow, {
                    x: mouseX - centerX ,
                    y: mouseY - centerY ,
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.out",
                    overwrite: "auto",
                  });
                }, 150);
                
                if (link.classList.contains("hover-btn-target")) {
                  gsap.to(link, {
                    "--hover-progress": "0%",
                    duration: 0.4,
                    ease: "power2.out",
                    overwrite: true,
                  });
                } else {
                  const textTarget = link.querySelector(".hover-text-target");
                  if (textTarget) {
                    gsap.to(textTarget, {
                      "--hover-progress": "0%",
                      duration: 0.4,
                      ease: "power2.out",
                      overwrite: true,
                    });
                  }
                }
              });
          });
        }
      }
    },
    { scope: sectionRef }
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .hover-text-target {
          --hover-progress: 0%;
          position: relative;
          display: inline-block;
        }
        .hover-text-target::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          color: var(--accent);
          clip-path: circle(var(--hover-progress) at center);
          pointer-events: none;
          z-index: 2;
        }
      `}} />
      <footer
        ref={sectionRef}
        id="contact"
        className="relative overflow-hidden bg-foreground text-background"
      >
      <div
        className="service-grid-surface pointer-events-none absolute inset-0 opacity-[0.035]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 top-0 size-80 rounded-full bg-accent/20 blur-[100px] sm:size-[30rem]"
        aria-hidden="true"
      />

      <div className="studio-container relative py-10 sm:py-12 lg:py-14">
        <div className="grid gap-6 border-b border-background/15 pb-9 sm:pb-11 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="flex items-center gap-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-background/55">
              <span className="size-1.5 rounded-full bg-accent" />
              Available for new projects
            </p>
            <AnimatedContactTitle
              lines={["Bring your", "ideas to life"]}
              className="mt-5 max-w-4xl font-display text-[clamp(3.5rem,6.5vw,6.5rem)] uppercase leading-[0.88] tracking-[-0.04em]"
            />
          </div>

          <div className="relative z-50 size-14 shrink-0 sm:size-16" ref={arrowContainerRef}>
            <Link
              ref={arrowRef}
              href="/contact"
              aria-label="Start a project"
              className="pointer-events-none absolute inset-0 group grid place-items-center rounded-full bg-accent text-foreground transition-colors duration-300 hover:rotate-[-8deg] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-background"
            >
              <ArrowUpRight
                className="size-6 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:size-7"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        <div className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.65fr_1.25fr_0.85fr] lg:gap-8 lg:py-12">
          <section>
            <p className={smallLabelClass}>Yarsha Byte</p>
            <p className="mt-4 max-w-sm text-base leading-7 text-background/68">
              Digital experiences, visual identities, and launch support for
              ambitious businesses in Nepal and beyond.
            </p>
            <div className="mt-6 grid gap-2.5 text-sm text-background/65">
              <a
                href="mailto:yarshabyte@gmail.com"
                className={`${footerLinkClass} inline-flex items-center gap-3`}
              >
                <Mail className="size-4 text-accent" aria-hidden="true" />
                <span className="hover-text-target" data-text="yarshabyte@gmail.com">yarshabyte@gmail.com</span>
              </a>
              <span className="inline-flex items-center gap-3">
                <MapPin className="size-4 text-accent" aria-hidden="true" />
                Butwal, Nepal
              </span>
            </div>
          </section>

          <nav aria-label="Footer navigation">
            <p className={smallLabelClass}>Explore</p>
            <div className="mt-4 grid gap-2.5">
              {pageLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${footerLinkClass} text-sm font-semibold`}
                >
                  <span className="hover-text-target" data-text={link.label}>{link.label}</span>
                </Link>
              ))}
            </div>
          </nav>

          <nav aria-label="Footer services">
            <p className={smallLabelClass}>Services</p>
            <div className="mt-4 grid gap-x-5 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/contact?service=${encodeURIComponent(service.slug)}`}
                  className={`${footerLinkClass} group inline-flex items-start gap-2 text-sm leading-6 text-background/68`}
                >
                  <span className="hover-text-target" data-text={service.title}>{service.title}</span>
                  <ArrowUpRight
                    className="mt-1 size-3 shrink-0 opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </nav>

          <section>
            <p className={smallLabelClass}>Follow</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {socialLinks.map((social) => {
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="group grid size-9 place-items-center rounded-full border border-background/15 text-background/70 transition duration-300 hover:border-accent hover:bg-accent hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    <span className="transition-transform duration-300 group-hover:scale-110">
                      <SocialIcon label={social.label} />
                    </span>
                  </a>
                );
              })}
            </div>

            <Link
              ref={startProjectBtnRef}
              href="/contact"
              className="hover-btn-target group relative mt-6 inline-flex min-h-14 items-center overflow-hidden rounded-full border border-background/15 text-sm font-semibold transition hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              style={{ "--hover-progress": "0%" } as React.CSSProperties}
            >
              {/* Default Content */}
              <span className="relative z-10 flex w-full items-center gap-3 px-8 text-background transition-colors group-hover:text-transparent">
                <span>Start a project</span>
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>

              {/* Hover Overlay */}
              <span 
                className="absolute inset-0 z-20 flex w-full items-center gap-3 bg-accent px-8 text-foreground"
                style={{ clipPath: "circle(var(--hover-progress) at center)" }}
                aria-hidden="true"
              >
                <span>Start a project</span>
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </section>
        </div>

        <div className="flex flex-col gap-4 border-t border-background/15 pt-6 text-xs font-medium text-background/42 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Yarsha Byte. All rights reserved.</p>
          <p>Designed and built by YarshaByte.</p>
        </div>
      </div>
    </footer>
    </>
  );
}
