"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { ContactSection } from "@/components/sections/contact-section";
import { teamMembers } from "@/data/team";
import { ArrowUpRight } from "lucide-react";

const capabilities = [
  "Web design",
  "Brand identity",
  "Motion graphics",
  "Video editing",
  "Digital marketing",
  "Creative strategy",
];

export function AboutPageClient() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Refs for animations
  const heroRef = useRef<HTMLElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroText1Ref = useRef<HTMLDivElement>(null);
  const heroText2Ref = useRef<HTMLDivElement>(null);
  const storyTextRef = useRef<HTMLParagraphElement>(null);
  const teamListRef = useRef<HTMLDivElement>(null);
  const floatingImageRef = useRef<HTMLDivElement>(null);
  
  // State for floating image hover
  const [hoveredMemberIndex, setHoveredMemberIndex] = useState<number | null>(null);

  // Mouse move handler for the floating team image
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (floatingImageRef.current) {
        gsap.to(floatingImageRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.8,
          ease: "power3.out",
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const siteFrame = document.querySelector<HTMLElement>(".site-frame");
    let initialized = false;

    const initAnimations = () => {
      if (initialized) return;
      initialized = true;

      const isLenisActive = siteFrame?.dataset.lenisReady === "true";
      const scroller = isLenisActive ? siteFrame! : window;

      // 1. Initial Hero Entry Animation
      const tl = gsap.timeline();
      tl.fromTo(
        ".hero-char",
        { y: 150, rotateZ: 10, opacity: 0 },
        { 
          y: 0, 
          rotateZ: 0, 
          opacity: 1, 
          duration: 1.2, 
          stagger: 0.05, 
          ease: "power4.out",
          delay: 0.2
        }
      ).fromTo(
        ".hero-sub",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8"
      );

      // 2. Hero Scroll Pin & Parallax (Unified for desktop and mobile)
      const tlHero = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          scroller,
          start: "top top",
          end: "+=100%", // Exact timing: just long enough for text to clear
          scrub: 1,
          pin: true, // Pin the ENTIRE section to fix flexbox pinSpacer overlapping
        }
      });
      
      // Animate the "About Yarsha Byte" text UP so it simulates normal scrolling
      tlHero.to(".hero-sub", { y: -80, opacity: 0, ease: "none" }, 0);

      // Adjust these xPercent values to change the speed
      tlHero.to(heroText1Ref.current, { xPercent: -100, ease: "none" }, 0);
      tlHero.to(heroText2Ref.current, { xPercent: 100, ease: "none" }, 0);

      // 3. Story Text Scrubbing (Words highlight as you scroll)
      if (storyTextRef.current) {
        const words = storyTextRef.current.querySelectorAll(".story-word");
        gsap.fromTo(
          words,
          { color: "rgba(var(--foreground-rgb), 0.1)" },
          {
            color: "rgba(var(--foreground-rgb), 1)",
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: storyTextRef.current,
              scroller,
              start: "top 80%",
              end: "bottom 50%",
              scrub: 1,
            }
          }
        );
      }

      // 4. Team List Entrance
      if (teamListRef.current) {
        const items = teamListRef.current.querySelectorAll(".team-list-item");
        gsap.fromTo(
          items,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: teamListRef.current,
              scroller,
              start: "top 85%",
            }
          }
        );
      }

      // 5. Infinite Marquee
      const marquee = document.querySelector(".marquee-track");
      if (marquee) {
        gsap.to(marquee, {
          xPercent: -50,
          ease: "none",
          duration: 20,
          repeat: -1,
        });
      }
    };

    if (siteFrame?.dataset.lenisReady === "true") {
      initAnimations();
    } else {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === "data-lenis-ready") {
            if (siteFrame?.dataset.lenisReady === "true") {
              initAnimations();
              observer.disconnect();
            }
          }
        });
      });
      if (siteFrame) observer.observe(siteFrame, { attributes: true });
    }
  }, { scope: containerRef });

  // Utility to wrap characters in spans for GSAP
  const wrapChars = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="hero-char inline-block whitespace-pre">
        {char}
      </span>
    ));
  };

  const storyText = "We exist to make professional digital work practical. Instead of fragmenting disciplines, we operate as a single unit from concept to launch. The result? Zero handoff gaps, faster decisions, and an output that stays consistent across your website, identity, and campaigns.";

  return (
    <main ref={containerRef} className="bg-background text-foreground selection:bg-accent selection:text-accent-foreground overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section ref={heroRef} className="relative min-h-[100svh] flex flex-col justify-center pt-24 md:pt-32">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('/noise.png')] mix-blend-overlay"></div>
        
        <div className="px-6 md:px-12 flex flex-col items-center justify-center text-center w-full">
          <p className="hero-sub text-sm md:text-base font-bold uppercase tracking-[0.3em] text-accent mb-8">
            About Yarsha Byte
          </p>
          
          <h1 ref={heroTitleRef} className="font-display text-[clamp(5.5rem,25vw,18rem)] font-black uppercase leading-[1] md:leading-[0.8] tracking-tighter flex flex-col items-center whitespace-nowrap w-full">
            <div ref={heroText1Ref} className="pb-2 md:pb-4 flex justify-center w-full">
              {wrapChars("SIX MINDS.")}
            </div>
            <div ref={heroText2Ref} className="pb-2 md:pb-4 text-foreground/40 pl-6 md:pl-32 flex justify-center w-full">
              {wrapChars("ONE DIRECTION.")}
            </div>
          </h1>
        </div>
      </section>

      {/* --- STORY SCRUB SECTION --- */}
      <section className="pt-16 pb-32 md:pt-24 md:pb-48 px-6 md:px-12 max-w-7xl mx-auto">
        <p ref={storyTextRef} className="font-display text-3xl md:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight uppercase">
          {storyText.split(" ").map((word, i) => (
            <span key={i} className="story-word inline-block mr-[0.25em]">
              {word}
            </span>
          ))}
        </p>
      </section>

      {/* --- FLOATING TEAM SECTION --- */}
      <section className="py-24 relative z-10 border-t border-foreground/10 cursor-default">
        
        {/* The floating image that follows cursor (Hidden on mobile) */}
        <div 
          ref={floatingImageRef}
          className="fixed top-0 left-0 w-64 h-80 pointer-events-none z-50 overflow-hidden rounded-2xl shadow-2xl transition-opacity duration-300 transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
          style={{ opacity: hoveredMemberIndex !== null ? 1 : 0 }}
        >
          {hoveredMemberIndex !== null && (
            <Image
              src={teamMembers[hoveredMemberIndex].image}
              alt={teamMembers[hoveredMemberIndex].name}
              fill
              className="object-cover"
            />
          )}
        </div>

        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent mb-12">
            The Team
          </p>

          <div ref={teamListRef} className="flex flex-col">
            {teamMembers.map((member, i) => (
              <Link 
                key={member.slug} 
                href={`/team/${member.slug}`}
                className="team-list-item group flex flex-col md:flex-row md:items-center justify-between py-6 md:py-8 border-b border-foreground/10 hover:border-foreground/40 transition-colors"
                onMouseEnter={() => setHoveredMemberIndex(i)}
                onMouseLeave={() => setHoveredMemberIndex(null)}
                onClick={(e) => {
                  // On mobile, first tap expands the accordion, second tap navigates
                  if (window.innerWidth < 768 && hoveredMemberIndex !== i) {
                    e.preventDefault();
                    setHoveredMemberIndex(i);
                  }
                }}
              >
                <div className="flex flex-col md:pointer-events-none">
                  <h3 className="font-display text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tight transition-transform duration-500 md:group-hover:translate-x-4">
                    {member.name}
                  </h3>
                  <span className="text-foreground/50 text-xs sm:text-sm md:text-lg font-medium mt-1 md:mt-2 transition-transform duration-500 md:group-hover:translate-x-4">
                    {member.role}
                  </span>
                </div>
                
                {/* Mobile Inline Image Reveal (Accordion) */}
                <div 
                  className={`md:hidden w-full overflow-hidden transition-all duration-500 ease-out ${
                    hoveredMemberIndex === i ? "max-h-96 mt-6 opacity-100" : "max-h-0 mt-0 opacity-0"
                  }`}
                >
                  <div className="relative w-full aspect-[4/3] sm:aspect-square rounded-xl overflow-hidden bg-foreground/5">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-accent">Tap again to view profile</span>
                    <ArrowUpRight className="size-4 text-accent" />
                  </div>
                </div>

                <div className="mt-4 md:mt-0 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-4 md:group-hover:translate-x-0 hidden md:flex items-center gap-2 pointer-events-none">
                  <span className="text-sm font-bold uppercase tracking-widest text-accent">View Profile</span>
                  <div className="size-10 rounded-full bg-accent flex items-center justify-center text-background">
                    <ArrowUpRight className="size-5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- INFINITE MARQUEE SECTION --- */}
      <section className="py-24 overflow-hidden border-b border-foreground/10 relative z-10">
        <div className="relative flex whitespace-nowrap marquee-track w-max">
          {[...capabilities, ...capabilities, ...capabilities, ...capabilities].map((cap, i) => (
            <div key={i} className="flex items-center">
              <span 
                className="font-display text-6xl md:text-9xl font-black uppercase tracking-tighter mx-8 text-transparent"
                style={{ WebkitTextStroke: "2px var(--foreground)" }}
              >
                {cap}
              </span>
              <span className="text-accent text-5xl md:text-8xl">•</span>
            </div>
          ))}
        </div>
      </section>

      <ContactSection />
    </main>
  );
}
