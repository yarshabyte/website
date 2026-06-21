"use client";

import { FormEvent, useMemo, useState, useRef } from "react";
import { ArrowLeft, ArrowRight, Check, Mail, Phone, Sparkles } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

import {
  budgetRanges,
  contactIntents,
  referralSources,
} from "@/data/contact-options";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

const ease = [0.22, 1, 0.36, 1] as const;

type FormState = {
  intent: string;
  projectType: string;
  budget: string;
  source: string;
  name: string;
  email: string;
  message: string;
};

function AnimatedTitle({ text, className, children }: { text: string; className?: string; children?: React.ReactNode }) {
  const words = text.split(" ");
  return (
    <h1 className={className}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block">
          <span className="inline-block overflow-hidden align-bottom leading-[0.88] pb-[0.05em] -mb-[0.05em]">
            {word.split("").map((char, ci) => (
              <span key={ci} data-page-char className="inline-block will-change-transform">
                {char}
              </span>
            ))}
          </span>
          {wi < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
      {children}
    </h1>
  );
}

type Service = (typeof services)[number];

function getProjectType(title: string) {
  return title
    .replace("Website Design & Development", "Full Website")
    .replace("Poster & Graphic Design", "Poster Design")
    .replace("Branding & Digital Identity", "Brand Identity");
}

function getServiceIntent(service: Service) {
  if (service.slug === "portfolio") return "Build my portfolio";
  if (service.slug === "graphics" || service.slug === "video")
    return "Design campaign assets";
  if (service.slug === "setup") return "Need launch support";
  return "Start a project";
}

function createInitialForm(service?: Service): FormState {
  if (service) {
    return {
      intent: getServiceIntent(service),
      projectType: getProjectType(service.title),
      budget: "",
      source: "",
      name: "",
      email: "",
      message: `I'd like to start a ${service.title} project. ${service.outcome} Key deliverables: ${service.deliverables.join(", ")}.`,
    };
  }

  return {
    intent: contactIntents[0],
    projectType: "Full Website",
    budget: budgetRanges[1],
    source: referralSources[0],
    name: "",
    email: "",
    message: "",
  };
}

function OptionButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative min-h-14 overflow-hidden border px-4 text-left text-xs font-black uppercase tracking-[0.12em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
        active
          ? "border-accent bg-accent text-background"
          : "border-foreground/10 bg-foreground/[0.04] text-foreground/74 hover:border-accent/60 hover:text-foreground",
      )}
    >
      <span className="relative z-10 flex items-center justify-between gap-4">
        {children}
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <Check className="size-4" aria-hidden="true" />
            </motion.div>
          )}
        </AnimatePresence>
      </span>
    </button>
  );
}

type ContactPageClientProps = {
  prefilledServiceSlug?: string;
};

export function ContactPageClient({
  prefilledServiceSlug,
}: ContactPageClientProps) {
  const mainRef = useRef<HTMLElement>(null);
  const prefilledService = useMemo(
    () => services.find((service) => service.slug === prefilledServiceSlug),
    [prefilledServiceSlug],
  );
  const [step, setStep] = useState(prefilledService ? 2 : 0);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState<FormState>(() =>
    createInitialForm(prefilledService),
  );
  const reduceMotion = useReducedMotion();

  useGSAP(() => {
    if (reduceMotion) return;
    const charSpans = gsap.utils.toArray<HTMLElement>("[data-page-char]");
    if (charSpans.length === 0) return;
    
    gsap.set(charSpans, { y: "100%" });

    const siteFrame = document.querySelector<HTMLElement>(".site-frame");
    const initTitleAnimation = () => {
      const isLenisActive = siteFrame?.dataset.lenisReady === "true";
      const scroller = isLenisActive ? siteFrame! : window;

      gsap.to(charSpans, {
        y: "0%",
        duration: 1,
        stagger: 0.05,
        ease: "expo.out",
        scrollTrigger: {
          trigger: charSpans[0].closest("h1"),
          scroller,
          start: "top 88%",
        },
      });
    };

    const waitsForLenis = window.matchMedia("(min-width: 1024px)").matches && window.matchMedia("(pointer: fine)").matches;
    if (!waitsForLenis || siteFrame?.dataset.lenisReady === "true") {
      initTitleAnimation();
    } else if (siteFrame) {
      window.addEventListener("lenis:ready", initTitleAnimation, { once: true });
    }
  }, { scope: mainRef });

  const projectTypes = useMemo(
    () => services.map((service) => getProjectType(service.title)),
    [],
  );

  const handleOptionSelect = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setTimeout(() => {
      if (step < 4) {
        setStep((current) => current + 1);
      }
    }, 350);
  };

  const steps = [
    {
      eyebrow: "01 / Intent",
      title: "How can we help?",
      content: (
        <div className="grid gap-3 sm:grid-cols-2">
          {contactIntents.map((intent) => (
            <OptionButton
              key={intent}
              active={form.intent === intent}
              onClick={() => handleOptionSelect("intent", intent)}
            >
              {intent}
            </OptionButton>
          ))}
        </div>
      ),
    },
    {
      eyebrow: "02 / Scope",
      title: "What are we making?",
      content: (
        <div className="grid gap-3 sm:grid-cols-2">
          {projectTypes.map((projectType) => (
            <OptionButton
              key={projectType}
              active={form.projectType === projectType}
              onClick={() => handleOptionSelect("projectType", projectType)}
            >
              {projectType}
            </OptionButton>
          ))}
        </div>
      ),
    },
    {
      eyebrow: "03 / Budget",
      title: "Pick a budget range.",
      content: (
        <div className="grid gap-3 sm:grid-cols-2">
          {budgetRanges.map((budget) => (
            <OptionButton
              key={budget}
              active={form.budget === budget}
              onClick={() => handleOptionSelect("budget", budget)}
            >
              {budget}
            </OptionButton>
          ))}
        </div>
      ),
    },
    {
      eyebrow: "04 / Source",
      title: "How did you find us?",
      content: (
        <div className="grid gap-3 sm:grid-cols-2">
          {referralSources.map((source) => (
            <OptionButton
              key={source}
              active={form.source === source}
              onClick={() => handleOptionSelect("source", source)}
            >
              {source}
            </OptionButton>
          ))}
        </div>
      ),
    },
    {
      eyebrow: "05 / Details",
      title: "Ready to create magic?",
      content: (
        <div className="grid gap-4">
          <label className="grid gap-2">
            <span className="text-xs font-black uppercase tracking-[0.18em] text-foreground/58">
              Your name
            </span>
            <input
              value={form.name}
              autoFocus
              onChange={(e) => setForm((curr) => ({ ...curr, name: e.target.value }))}
              className="min-h-14 border border-foreground/10 bg-foreground/[0.04] px-4 text-base text-foreground outline-none transition placeholder:text-foreground/34 focus:border-accent"
              placeholder="Name"
              required
            />
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-black uppercase tracking-[0.18em] text-foreground/58">
              Email
            </span>
            <input
              value={form.email}
              onChange={(e) => setForm((curr) => ({ ...curr, email: e.target.value }))}
              className="min-h-14 border border-foreground/10 bg-foreground/[0.04] px-4 text-base text-foreground outline-none transition placeholder:text-foreground/34 focus:border-accent"
              placeholder="hello@example.com"
              type="email"
              required
            />
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-black uppercase tracking-[0.18em] text-foreground/58">
              Project note
            </span>
            <textarea
              value={form.message}
              onChange={(e) => setForm((curr) => ({ ...curr, message: e.target.value }))}
              className="min-h-32 resize-none border border-foreground/10 bg-foreground/[0.04] px-4 py-3 text-base leading-7 text-foreground outline-none transition placeholder:text-foreground/34 focus:border-accent"
              placeholder="Tell us what you want to launch."
            />
          </label>
        </div>
      ),
    },
  ];

  const currentStep = steps[step];
  const progress = ((step + 1) / steps.length) * 100;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step < steps.length - 1) {
      setStep((current) => current + 1);
      return;
    }
    setSent(true);
  };

  return (
    <main ref={mainRef} className="page-hero-spacing relative min-h-dvh overflow-hidden">
      <div className="service-grid-surface absolute inset-0 opacity-20" aria-hidden="true" />


      <Container className="relative z-10 grid min-h-[calc(100dvh-7rem)] gap-10 pb-12 pt-16 lg:grid-cols-[0.43fr_0.57fr] lg:items-start">
        <section className="self-start mt-4 lg:mt-8">
          
          <AnimatedTitle
            text="Let's talk"
            className="mt-6 text-[clamp(4rem,11vw,10.5rem)] font-black uppercase leading-[0.82] text-foreground"
          >
            <span className="inline-block overflow-hidden align-bottom leading-[0.88] pb-[0.05em] -mb-[0.05em]">
              <span className="ml-[0.08em] inline-block size-[0.16em] min-h-4 min-w-4 translate-y-[-0.04em] bg-accent [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)] will-change-transform" data-page-char />
            </span>
          </AnimatedTitle>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.16, ease }}
            className="mt-6 max-w-md text-base leading-8 text-foreground/66"
          >
            Tell us what you want to build. The form moves step by step so the
            brief stays quick, clear, and actually useful.
          </motion.p>

          <div className="mt-8 grid gap-3 text-sm font-semibold text-foreground/70">
            <a
              href="mailto:yarshabyte@gmail.com"
              className="inline-flex items-center gap-3 transition hover:text-accent"
            >
              <Mail className="size-4" />
              yarshabyte@gmail.com
            </a>
            <a href="tel:+977" className="inline-flex items-center gap-3 transition hover:text-accent">
              <Phone className="size-4" />
              Butwal, Nepal
            </a>
          </div>
        </section>

        <section className="self-start mt-4 lg:mt-8 w-full">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.58, ease }}
                className="border border-accent/45 bg-accent p-6 text-background sm:p-8 w-full"
              >
                <div className="grid size-16 place-items-center rounded-full bg-background text-accent">
                  <Check className="size-8" />
                </div>
                <h2 className="mt-8 font-display text-[clamp(3rem,7vw,6rem)] uppercase leading-[0.86]">
                  Brief received.
                </h2>
                <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-background/74">
                  Thanks for the message. We&apos;ll review the scope and get back
                  with a clear next step.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setStep(prefilledService ? 2 : 0);
                    setForm(createInitialForm(prefilledService));
                  }}
                  className="mt-8 inline-flex min-h-12 items-center gap-2 border border-background/20 px-5 text-sm font-black uppercase tracking-[0.14em] transition hover:bg-background hover:text-accent"
                >
                  Start again
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={submit}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.62, delay: 0.08, ease }}
                className="grid min-h-[43rem] w-full grid-rows-[auto_auto_1fr_auto] border border-foreground/10 bg-background/78 p-5 shadow-[0_28px_100px_rgba(0,0,0,0.22)] backdrop-blur sm:min-h-[46rem] sm:p-8"
              >
                <div className="flex items-center justify-between gap-5">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">
                      {currentStep.eyebrow}
                    </p>
                    <h2 className="mt-3 font-display text-[clamp(2.2rem,5vw,5.2rem)] uppercase leading-[0.9] text-foreground">
                      {currentStep.title}
                    </h2>
                  </div>
                  <span className="font-display text-4xl text-foreground/18">
                    {String(step + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="mt-5 h-1 overflow-hidden bg-foreground/10">
                  <motion.div
                    className="h-full bg-accent"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.38, ease }}
                  />
                </div>

                <div className="min-h-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 28, filter: "blur(8px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, x: -22, filter: "blur(8px)" }}
                      transition={{ duration: 0.38, ease }}
                      className="mt-8"
                    >
                      {currentStep.content}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-8 flex w-full items-center justify-between gap-3 self-end border-t border-foreground/10 pt-6">
                  <button
                    type="button"
                    onClick={() => setStep((current) => Math.max(0, current - 1))}
                    disabled={step === 0}
                    className="inline-flex min-h-12 items-center gap-2 border border-foreground/10 px-5 text-sm font-black uppercase tracking-[0.14em] text-foreground/72 transition hover:border-sky hover:text-foreground disabled:pointer-events-none disabled:opacity-35"
                  >
                    <ArrowLeft className="size-4" />
                    Back
                  </button>
                  <button
                    type="submit"
                    className="inline-flex min-h-12 items-center gap-2 bg-accent px-5 text-sm font-black uppercase tracking-[0.14em] text-background transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    {step === steps.length - 1 ? "Send brief" : "Next"}
                    {step === steps.length - 1 ? (
                      <Sparkles className="size-4" />
                    ) : (
                      <ArrowRight className="size-4" />
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </section>
      </Container>
    </main>
  );
}
