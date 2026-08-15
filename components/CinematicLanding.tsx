"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import BoxLoader from "@/components/ui/box-loader";
import { SpinningText } from "@/components/ui/spinning-text";
import { Wave } from "@/components/ui/wave";
import { Hero } from "@/components/Hero";
import { CinematicFooter } from "@/components/ui/motion-footer";
import ScrollFAQAccordion from "@/components/ui/scroll-faqaccordion";
import { Timeline } from "@/components/ui/timeline";
import { SelectedProjects } from "@/components/ui/projects";
import { TeamExperience } from "@/components/ui/TeamExperience";
import { RoiCalculator } from "@/components/ui/RoiCalculator";
import TestimonialsSection from "@/components/ui/testimonials-3";
import {
  boundaryChecks,
  matchRoutes,
  navigation,
  operatingPrinciples,
  resumeSignals,
} from "@/lib/content";

type CinematicLandingProps = {
  getStartedHref: string;
};

const padProgress = (value: number) => String(value).padStart(3, "0");

export function CinematicLanding({ getStartedHref }: CinematicLandingProps) {
  const mainRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const loaderStatusRef = useRef<HTMLOutputElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const loaderCenterRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<any>(null);
  const [activeScene, setActiveScene] = useState("00");
  const [activeNav, setActiveNav] = useState("00");
  const [loaderComplete, setLoaderComplete] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setLoaderComplete(true);
      return;
    }

    const duration = 4000;
    const startedAt = performance.now();
    let animationFrame = 0;
    let transitionStarted = false;

    const updateLoader = async (time: number) => {
      const elapsed = Math.min((time - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 4);
      const progress = Math.round(eased * 100);

      if (loaderStatusRef.current) {
        loaderStatusRef.current.textContent = `LOADING ${padProgress(progress)}%`;
      }

      if (elapsed < 1) {
        animationFrame = requestAnimationFrame(updateLoader);
        return;
      }

      if (transitionStarted) return;
      transitionStarted = true;

      try {
        const { gsap } = await import("gsap");

        const boxes = document.querySelector(".boxes") as HTMLElement | null;
        const boxElements = document.querySelectorAll(".boxes .box");

        const tl = gsap.timeline({
          onComplete: () => {
            setLoaderComplete(true);
          },
        });

        // 1. Fade out LOADING 100% status text
        tl.to(loaderStatusRef.current, {
          autoAlpha: 0,
          duration: 0.18,
          ease: "power2.in",
        });

        // 2. Stop 3D tumbling animation and turn loader into a flat square
        if (boxElements.length) {
          tl.to(
            boxElements,
            {
              animation: "none",
              transform: "translate(0, 0)",
              duration: 0.25,
              ease: "power2.out",
            },
            "-=0.1",
          );
        }

        if (boxes) {
          tl.to(
            boxes,
            {
              rotateX: 0,
              rotateZ: 0,
              rotateY: 0,
              duration: 0.35,
              ease: "power3.inOut",
            },
            "-=0.2",
          );
        }

        // 3. Zoom the square in to fill the whole screen!
        tl.to(
          loaderCenterRef.current,
          {
            scale: 60,
            duration: 0.65,
            ease: "expo.in",
          },
          "+=0.05",
        );

        // 4. Fade out loader overlay revealing the home page hero section underneath!
        tl.to(
          loaderRef.current,
          {
            autoAlpha: 0,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.2",
        );
      } catch {
        setLoaderComplete(true);
      }
    };

    animationFrame = requestAnimationFrame(updateLoader);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const scenes = Array.from(
      main.querySelectorAll<HTMLElement>("[data-scene]"),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top),
          );

        const scene = visible[0]?.target as HTMLElement | undefined;
        if (scene?.dataset.scene) setActiveScene(scene.dataset.scene);
      },
      { rootMargin: "-46% 0px -46% 0px", threshold: 0 },
    );

    const navObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top)
          );

        if (visible.length > 0) {
          const id = visible[0].target.id;
          if (id === "hero" || id === "top") setActiveNav("00");
          else if (id === "read" || id === "approach") setActiveNav("01");
          else if (id === "work") setActiveNav("02");
          else if (id === "team") setActiveNav("03");
          else if (id === "contact") setActiveNav("04");
        }
      },
      { rootMargin: "-20% 0px -80% 0px", threshold: 0 }
    );

    scenes.forEach((scene) => observer.observe(scene));
    
    const navIds = ["top", "hero", "read", "approach", "work", "team", "contact"];
    navIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) navObserver.observe(el);
    });

    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const maxScroll = Math.max(main.scrollHeight - window.innerHeight, 1);
      const mainTop = main.getBoundingClientRect().top + window.scrollY;
      const progress = Math.min(
        Math.max((window.scrollY - mainTop) / maxScroll, 0),
        1,
      );
      progressRef.current?.style.setProperty(
        "transform",
        `scaleY(${progress})`,
      );
    };

    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      observer.disconnect();
      navObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    let cancelled = false;
    let dispose = () => undefined;

    const initializeMotion = async () => {
      await document.fonts?.ready;

      const [{ gsap }, { ScrollTrigger }, { default: Lenis }] =
        await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("lenis"),
        ]);

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();

      const context = gsap.context(() => {
        media.add(
          {
            desktop: "(min-width: 769px)",
            mobile: "(max-width: 768px)",
            reduced: "(prefers-reduced-motion: reduce)",
            smooth:
              "(pointer: fine) and (prefers-reduced-motion: no-preference)",
          },
          (mediaContext) => {
            const conditions = mediaContext.conditions as {
              desktop: boolean;
              mobile: boolean;
              reduced: boolean;
              smooth: boolean;
            };

            if (conditions.reduced) return;

            let destroySmoothScroll = () => undefined;

            if (conditions.smooth) {
              const lenis = new Lenis({
                duration: 1.05,
                easing: (time: number) =>
                  Math.min(1, 1.001 - Math.pow(2, -10 * time)),
                smoothWheel: true,
                syncTouch: false,
                wheelMultiplier: 0.88,
                touchMultiplier: 1,
              });
              lenisRef.current = lenis;
              const updateScrollTrigger = () => ScrollTrigger.update();
              const tick = (time: number) => lenis.raf(time * 1000);

              lenis.on("scroll", updateScrollTrigger);
              gsap.ticker.add(tick);

              destroySmoothScroll = () => {
                gsap.ticker.remove(tick);
                lenis.destroy();
              };
            }

            const makePinnedTimeline = (
              sceneSelector: string,
              scrub = 0.85,
              pin = true
            ) => {
              const scene = main.querySelector<HTMLElement>(sceneSelector);
              const stage = scene?.querySelector<HTMLElement>(".scene__stage");
              if (!scene || !stage) return null;

              return gsap.timeline({
                defaults: { ease: "none" },
                scrollTrigger: {
                  trigger: scene,
                  start: pin ? "top top" : "top 70%",
                  end: pin ? "bottom bottom" : "bottom 30%",
                  scrub,
                  pin: pin ? stage : false,
                  pinSpacing: pin,
                  anticipatePin: pin ? 1 : 0,
                  invalidateOnRefresh: true,
                },
              });
            };

            if (conditions.desktop || conditions.mobile) {
              const heroTimeline = makePinnedTimeline(".scene--hero", 0.95);
              heroTimeline
                ?.to(
                  ".hero__word--hero",
                  { xPercent: -54, autoAlpha: 0.16, scale: 0.84 },
                  0,
                )
                .to(
                  ".hero__word--cv",
                  { xPercent: -54, autoAlpha: 0.16, scale: 0.84 },
                  0,
                )
                .to(
                  ".hero__resume-sheet",
                  { xPercent: -22, yPercent: -18, scale: 3.1, rotation: 0, transformOrigin: "50% 50%" },
                  0,
                )
                .to(
                  ".hero__intro, .hero__meta, .hero__scroll-cue",
                  { autoAlpha: 0, yPercent: -28 },
                  0,
                )
                .to(".hero__portal-line", { scaleX: 1 }, 0.08);



              const readTimeline = conditions.mobile ? null : makePinnedTimeline(".scene--read", 0.8);
              if (conditions.mobile) {
                gsap.from(".read__headline-line", {
                  scrollTrigger: { trigger: ".read__content", start: "top 85%" },
                  yPercent: 112, stagger: 0.08, duration: 0.8, ease: "power3.out"
                });

                const docTl = gsap.timeline({
                  scrollTrigger: { trigger: ".read__document", start: "top 80%" }
                });
                docTl
                  .fromTo(".read__document", { xPercent: 100, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" })
                  .fromTo(".read__scan", { xPercent: -110 }, { xPercent: 110, duration: 0.8, ease: "none" }, "-=0.2")
                  .from(".read__signal", { xPercent: -16, autoAlpha: 0, stagger: 0.1, duration: 0.5 }, "-=0.4");

                gsap.from(".read__teacher", {
                  scrollTrigger: { trigger: ".read__teacher", start: "top 85%" },
                  yPercent: 55, autoAlpha: 0, duration: 0.8, ease: "power3.out"
                });
              } else {
                readTimeline
                  ?.fromTo(
                    ".read__document",
                    { clipPath: "inset(12% 38% 12% 38%)", scale: 1.36 },
                    { clipPath: "inset(0% 0% 0% 0%)", scale: 1 },
                    0,
                  )
                  .from(
                    ".read__headline-line",
                    { yPercent: 112, stagger: 0.08 },
                    0.05,
                  )
                  .fromTo(
                    ".read__scan",
                    { xPercent: -110 },
                    { xPercent: 110 },
                    0,
                  )
                  .from(
                    ".read__signal",
                    { xPercent: -16, autoAlpha: 0, stagger: 0.1 },
                    0.18,
                  )
                  .from(
                    ".read__teacher",
                    { yPercent: 55, autoAlpha: 0 },
                    0.48,
                  );
              }

              const matchTimeline = makePinnedTimeline(".scene--match", 0.92);
              const matchTrack =
                main.querySelector<HTMLElement>(".match__track");
              if (matchTimeline && matchTrack) {
                matchTimeline
                  .fromTo(
                    ".match__route-line",
                    { scaleX: 0 },
                    { scaleX: 1 },
                    0,
                  )
                  .to(
                    matchTrack,
                    {
                      x: () =>
                        -Math.max(
                          matchTrack.scrollWidth - window.innerWidth + 48,
                          0,
                        ),
                    },
                    0,
                  )
                  .to(
                    ".match__counter-word",
                    { letterSpacing: "0.02em", scale: 0.72 },
                    0,
                  );
              }

              const principlesTimeline = conditions.mobile ? null : makePinnedTimeline(
                ".scene--principles",
                0.88,
              );
              const principles = gsap.utils.toArray<HTMLElement>(
                ".principle",
                main,
              );

              if (principlesTimeline && principles.length) {
                gsap.set(principles.slice(1), {
                  autoAlpha: 0,
                });

                principles.slice(1).forEach((principle, index) => {
                  const previous = principles[index];
                  principlesTimeline
                    .to(
                      previous,
                      { autoAlpha: 0, duration: 0.25 },
                      index,
                    )
                    .fromTo(
                      principle,
                      { autoAlpha: 0 },
                      { autoAlpha: 1, duration: 0.25 },
                      index + 0.1,
                    )
                    .to(
                      ".principles__meter-fill",
                      {
                        scaleY: (index + 1) / (principles.length - 1),
                        duration: 0.25,
                      },
                      index,
                    );
                });
              }

              const boundaryTimeline = makePinnedTimeline(".scene--move", 0.8);
              boundaryTimeline
                ?.from(
                  ".boundary__row",
                  { xPercent: -15, autoAlpha: 0, stagger: 0.08, duration: 0.25 },
                  0,
                )
                .fromTo(
                  ".boundary__row-line",
                  { scaleX: 0 },
                  { scaleX: 1, stagger: 0.08, duration: 0.25, ease: "power1.out" },
                  0.04,
                )
                .from(
                  ".boundary__statement-word",
                  { yPercent: 108, stagger: 0.08, duration: 0.3 },
                  0.45,
                );

              const climaxTimeline = makePinnedTimeline(
                ".scene--climax",
                0.95,
              );
              climaxTimeline
                ?.fromTo(
                  ".climax__statement",
                  { 
                    scale: conditions.mobile ? 1.5 : 3.6, 
                    xPercent: conditions.mobile ? 0 : 22, 
                    transformOrigin: "50% 50%" 
                  },
                  { scale: 1, xPercent: 0 },
                  0,
                )
                .fromTo(
                  ".climax__cv",
                  { scale: 1.8, autoAlpha: 0.48 },
                  { scale: 0.62, autoAlpha: 0.12 },
                  0,
                )
                .to(".climax__rule", { scaleX: 1 }, 0.14);

              // Restored GSAP animation for scene--final (unpinned)
              const finalEl = main.querySelector(".scene--final");
              if (finalEl) {
                const finalTimeline = gsap.timeline({
                  scrollTrigger: {
                    trigger: finalEl,
                    start: "top 75%",
                  },
                });
                finalTimeline
                  .fromTo(
                    ".final__title-line",
                    { y: 140, autoAlpha: 0 },
                    { y: 0, autoAlpha: 1, stagger: 0.12, duration: 1.2, ease: "power3.out" },
                    0
                  )
                  .fromTo(
                    ".final__copy, .final__action, .final__eyebrow",
                    { y: 40, autoAlpha: 0 },
                    { y: 0, autoAlpha: 1, duration: 1, stagger: 0.1 },
                    0.3
                  );
              }
              const faqEl = main.querySelector(".scene--faq");
              if (faqEl) {
                const faqTimeline = gsap.timeline({
                  scrollTrigger: {
                    trigger: faqEl,
                    start: "top 90%", // Start animating much earlier
                    end: "center center", // Finish animating much later
                    scrub: 2.5, // Heavy smoothing so it glides slowly
                  },
                });
                faqTimeline.fromTo(
                  ".faq-box-item",
                  { x: -160, autoAlpha: 0 },
                  { x: 0, autoAlpha: 1, stagger: 0.25, duration: 1.5, ease: "power2.out" },
                  0,
                );
              }
            }

            const refreshFrame = requestAnimationFrame(() => {
              ScrollTrigger.refresh();
            });
            const refreshTimeout = setTimeout(() => {
              ScrollTrigger.refresh();
            }, 500);

            let ro: ResizeObserver | null = null;
            if (typeof window !== "undefined" && window.ResizeObserver) {
              ro = new ResizeObserver(() => {
                ScrollTrigger.refresh();
              });
              ro.observe(main);
            }

            return () => {
              cancelAnimationFrame(refreshFrame);
              clearTimeout(refreshTimeout);
              if (ro) ro.disconnect();
              destroySmoothScroll();
            };
          },
        );
      }, main);

      dispose = () => {
        media.revert();
        context.revert();
      };
    };

    void initializeMotion();

    return () => {
      cancelled = true;
      dispose();
    };
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = nextTheme;
    root.style.colorScheme = nextTheme;

    try {
      localStorage.setItem("careeros-theme", nextTheme);
    } catch {
      // The selected theme still applies when storage is unavailable.
    }
  };

  return (
    <div className="landing-shell" data-active-scene={activeScene}>
      <a className="skip-link" href="#main-content">
        Skip to the story
      </a>

      <div
        ref={loaderRef}
        className="loader"
        data-complete={loaderComplete ? "true" : "false"}
        aria-hidden="true"
      >
        <div ref={loaderCenterRef} className="loader__center">
          <BoxLoader />
          <output ref={loaderStatusRef} className="loader__status">
            LOADING 000%
          </output>
        </div>
      </div>

      <header className="site-nav fixed top-5 left-0 w-full flex justify-between items-center px-6 z-[500] pointer-events-none">
        <a className="wordmark flex pointer-events-auto text-white text-xl font-black z-50" href="#top" aria-label="AM Studio, back to top" style={{ display: 'flex !important', opacity: 1 }}>
          <span>AM</span>
          <span className="wordmark__cv"></span>
        </a>

        <nav className="pill-nav hidden md:flex" aria-label="Main navigation">
          {navigation.map((item) => {
            const isActive = activeNav === item.index;
            return (
              <a
                href={item.href}
                key={item.href}
                className={`pill-nav__item ${isActive ? "is-active" : ""}`}
                aria-current={isActive ? "page" : undefined}
                style={{ position: "relative" }}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveNav(item.index);
                  if (lenisRef.current) {
                    lenisRef.current.scrollTo(item.href);
                  } else {
                    const targetId = item.href.replace("#", "");
                    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="pill-nav-active-bg"
                    className="pill-nav__active-bg"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span style={{ position: "relative", zIndex: 1 }}>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white z-50 p-2 pointer-events-auto"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Dropdown Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[399] md:hidden pointer-events-auto"
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.nav
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-[100svh] w-[75vw] max-w-sm bg-[#0a0a0a] shadow-2xl border-l border-[#f2efe6]/10 flex flex-col items-start pt-28 px-8 gap-6 md:hidden z-[400] pointer-events-auto"
              >
                {navigation.map((item) => (
                  <a
                    href={item.href}
                    key={item.href}
                    className="text-white text-xl font-bold tracking-widest uppercase py-4 border-b border-white/10 w-full text-left"
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      setActiveNav(item.index);
                      if (lenisRef.current) {
                        lenisRef.current.scrollTo(item.href);
                      } else {
                        const targetId = item.href.replace("#", "");
                        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </motion.nav>
            </>
          )}
        </AnimatePresence>

        <div className="site-nav__actions hidden md:block">
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle light and dark theme"
          >
            <span className="theme-toggle__light" aria-hidden="true">
              LIGHT
            </span>
            <span className="theme-toggle__dark" aria-hidden="true">
              DARK
            </span>
          </button>
        </div>
      </header>

      <div className="story-progress" aria-hidden="true">
        <span className="story-progress__label">00</span>
        <span className="story-progress__track">
          <span ref={progressRef} className="story-progress__fill" />
        </span>
        <span className="story-progress__label">07</span>
      </div>

      <div className="scene-indicator" aria-hidden="true">
        <span>{activeScene}</span>
        <span> / 07</span>
      </div>

      <main id="main-content" ref={mainRef}>
        <Hero />

        <section
          className="scene scene--hero"
          id="hero"
          data-scene="00b"
          aria-labelledby="hero-title"
        >
          <div className="scene__stage hero__stage">
            <div className="scene__coordinate scene__coordinate--top">
              <span>PUBLIC RELEASE / 01</span>
              <span>AM STUDIO / GLOBAL</span>
            </div>

            <div className="hero__intro">
              <p className="eyebrow">The brief is only the beginning.</p>
              <p className="hero__intro-copy">
                One idea becomes a sharper brand, a working product, and a
                system that scales.
              </p>
            </div>

            <h1 className="hero__title" id="hero-title">
              <span className="hero__word hero__word--hero">INVOICE</span>
              <span className="hero__word hero__word--cv"></span>
            </h1>

            <div className="hero__resume-sheet" aria-hidden="true">
              <div className="resume-sheet__top-bar">
                <span className="resume-sheet__status-badge">
                  <span className="resume-sheet__dot" />
                  CLIENT BRIEF
                </span>
                <span className="resume-sheet__source">01 / SOURCE</span>
              </div>

              <div className="resume-sheet__role-wrapper">
                <h3 className="resume-sheet__role">Digital Product / Brand</h3>
                <span className="resume-sheet__subtext">SPECIFICATION // SCOPED</span>
              </div>

              <div className="resume-sheet__divider" />

              <div className="resume-sheet__section">
                <div className="resume-sheet__label">DELIVERABLES</div>
                <ul className="resume-sheet__list">
                  <li className="resume-sheet__item">
                    <span className="resume-sheet__bullet">✦</span> Built scalable design system
                  </li>
                  <li className="resume-sheet__item">
                    <span className="resume-sheet__bullet">✦</span> Shipped 3 production products
                  </li>
                  <li className="resume-sheet__item">
                    <span className="resume-sheet__bullet">✦</span> Led 2 full launch cycles
                  </li>
                </ul>
              </div>

              <div className="resume-sheet__divider" />

              <div className="resume-sheet__section">
                <div className="resume-sheet__label">STACK / CAPABILITIES</div>
                <div className="resume-sheet__chips">
                  <span>DESIGN</span>
                  <span>REACT</span>
                  <span>BRAND</span>
                  <span>MOTION</span>
                  <span>WEB</span>
                </div>
              </div>

              <div className="resume-sheet__footer-stamp">
                <span>AM STUDIO // VERIFIED</span>
                <span>2026</span>
              </div>
            </div>

            <div className="hero__meta">
              <span>SCOPED LIKE AN ENGINEER</span>
              <span>DESIGNED LIKE A PRODUCT</span>
              <span>SHIPPED WITH YOU IN THE LOOP</span>
            </div>

            <div className="hero__descriptor" aria-hidden="true">
              <span>BEYOND</span>
              <span>THE BRIEF.</span>
            </div>

            <a className="hero__scroll-cue" href="#read">
              <span>Scroll to see how</span>
              <span aria-hidden="true">↓</span>
            </a>
            <span className="hero__portal-line" aria-hidden="true" />
          </div>
        </section>

        <section
          className="scene scene--empty"
          id="empty-section"
          data-scene="00b"
          aria-label="Innovate and Build"
        >
          <div className="empty__stage">
            <div className="empty__top-stamp">
              <span>FOUNDATION // BRAND</span>
            </div>

            <div className="tilted-banner">
              <div className="tilted-banner__row">
                <div className="tilted-banner__track tilted-banner__track--left">
                  <span className="tilted-banner__line tilted-banner__text-1">
                    CONCEPT // CODE // SHIP // SCALE // CONCEPT // CODE // SHIP // SCALE // CONCEPT // CODE // SHIP // SCALE //&nbsp;
                  </span>
                  <span className="tilted-banner__line tilted-banner__text-1">
                    CONCEPT // CODE // SHIP // SCALE // CONCEPT // CODE // SHIP // SCALE // CONCEPT // CODE // SHIP // SCALE //&nbsp;
                  </span>
                </div>
              </div>

              <div className="tilted-banner__row">
                <div className="tilted-banner__track tilted-banner__track--right">
                  <span className="tilted-banner__line tilted-banner__text-2">
                    PIXEL PERFECT // CODE COMPLETE // PIXEL PERFECT // CODE COMPLETE // PIXEL PERFECT // CODE COMPLETE //&nbsp;
                  </span>
                  <span className="tilted-banner__line tilted-banner__text-2">
                    PIXEL PERFECT // CODE COMPLETE // PIXEL PERFECT // CODE COMPLETE // PIXEL PERFECT // CODE COMPLETE //&nbsp;
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="scene scene--read"
          id="read"
          data-scene="01"
          aria-labelledby="read-title"
        >
          <div className="scene__stage read__stage">
            <div className="read__document" aria-hidden="true">
              <span className="read__document-index">BRIEF / 01</span>
              <div className="read__scan" />
              {resumeSignals.map((signal) => (
                <div className="read__signal" key={signal.code}>
                  <span>{signal.code}</span>
                  <span>{signal.label}</span>
                  <strong>{signal.value}</strong>
                </div>
              ))}
            </div>

            <div className="read__content">
              <p className="section-label">01 / UNDERSTAND</p>
              <h2 className="read__headline" id="read-title">
                <span className="headline-clip">
                  <span className="read__headline-line">SCOPED LIKE</span>
                </span>
                <span className="headline-clip">
                  <span className="read__headline-line">AN ENGINEER.</span>
                </span>
              </h2>
            </div>

            <div className="read__teacher">
              <span className="read__teacher-index">THEN / 02</span>
              <p className="read__copy">
                See what is present, what is unclear, and what the product is
                actually asking for. Every conclusion stays linked to the
                source brief.
              </p>
              <p className="read__teacher-headline">DESIGN IT LIKE A PRODUCT.</p>
              <span>
                Specific scope. Clear milestones. A practical way to launch.
              </span>
            </div>
          </div>
        </section>

        <section
          className="scene scene--match"
          id="match"
          data-scene="02"
          aria-labelledby="match-title"
        >
          <div className="scene__stage match__stage">
            <div className="match__intro">
              <p className="section-label">02 / DESIGN</p>
              <h2 id="match-title">
                ONE IDEA.
                <br />
                EVERY DELIVERABLE YOU NEED.
              </h2>
            </div>

            <div
              className="match__track"
              role="group"
              aria-label="Illustrative opportunity directions"
            >
              <div className="match__origin">
                <span className="match__counter-word">BRIEF</span>
                <span>THE SOURCE</span>
              </div>
              {matchRoutes.map((route, index) => {
                const match = route.fit.match(/^\[(.*?)\]\s*—\s*(.*)$/);
                return (
                  <article className="match__stop" key={route.place}>
                    <span className="match__stop-number">
                      {String(index + 1).padStart(2, "0")} / {route.place}
                    </span>
                    <h3>{route.role}</h3>
                    {match ? (
                      <span className="match__stop-subtext">
                        <strong className="match__stop-anchor">[{match[1]}]</strong>
                        <span className="match__stop-divider"> — </span>
                        <span className="match__stop-desc">{match[2]}</span>
                      </span>
                    ) : (
                      <span className="match__stop-subtext">{route.fit}</span>
                    )}
                  </article>
                );
              })}
              <div className="match__destination">
                <span>PRODUCT</span>
                <strong>LIVE, WITH CONTEXT.</strong>
              </div>
              <span className="match__route-line" aria-hidden="true" />
            </div>

            <div className="match__footerline">
              <span>REMOTE-FIRST</span>
              <span>SCOPE BEFORE BUILD</span>
              <span>YOU SET THE DIRECTION</span>
            </div>
          </div>
        </section>

        <section
          className="scene scene--principles"
          id="tailor"
          data-scene="03"
          aria-labelledby="principles-title"
        >
          <div className="scene__stage principles__stage">
            <div className="principles__header">
              <p className="section-label">03 / THE OPERATING SYSTEM</p>
              <h2 id="principles-title" className="sr-only">
                How AM works
              </h2>
              <span>ONE SOURCE / FOUR MOVEMENTS</span>
            </div>

            <div className="principles__stack">
              {operatingPrinciples.map((principle) => (
                <article className="principle" key={principle.number}>
                  <span className="principle__number">{principle.number}</span>
                  <h3>{principle.verb}</h3>
                  <div className="principle__copy">
                    <p>{principle.statement}</p>
                    <span>{principle.detail}</span>
                  </div>
                </article>
              ))}
            </div>

            <div className="principles__source" aria-hidden="true">
              <div>
                <span>SOURCE BRIEF</span>
                <strong>ASSET 01</strong>
                <strong>ASSET 02</strong>
                <strong>ASSET 03</strong>
              </div>
              <span className="principles__source-arrow">→</span>
              <div>
                <span>CHANNEL VERSION</span>
                <strong>SAME IDEA</strong>
                <strong>NEW FORMAT</strong>
                <strong>CLEARER EXECUTION</strong>
              </div>
            </div>

            <div className="principles__meter" aria-hidden="true">
              <span className="principles__meter-fill" />
            </div>
          </div>
        </section>



        <section
          className="scene scene--move"
          id="move"
          data-scene="04"
          aria-labelledby="move-title"
        >
          <div className="scene__stage boundary__stage">
            <div className="boundary__header">
              <p className="section-label">04 / CONTROL</p>
              <h2 id="move-title">BEFORE ANYTHING SHIPS.</h2>
              <p>
                Fast does not mean unchecked. We stop when scope, approval,
                or a required asset is unclear.
              </p>
            </div>

            <div className="boundary__checks">
              {boundaryChecks.map(([label, status], index) => (
                <div className="boundary__row" key={label}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{label}</strong>
                  <span>{status}</span>
                  <span className="boundary__row-line" aria-hidden="true" />
                </div>
              ))}
            </div>

            <div className="boundary__statement">
              <span className="headline-clip">
                <span className="boundary__statement-word">UNKNOWN</span>
              </span>
              <span className="headline-clip">
                <span className="boundary__statement-word">IS NOT YES.</span>
              </span>
            </div>
          </div>
        </section>

        <Timeline />

        <section
          className="scene scene--climax"
          data-scene="05"
          aria-labelledby="climax-title"
        >
          <div className="scene__stage climax__stage">
            <div className="climax__cv" aria-hidden="true">
              BRIEF
            </div>
            <p className="climax__label">FROM BRIEF / TO BRAND</p>
            <h2 className="climax__statement" id="climax-title">
              <span>YOUR IDEA.</span>
              <span>NO LONGER</span>
              <span>STANDING STILL.</span>
            </h2>
            <span className="climax__rule" aria-hidden="true" />
            <p className="climax__footnote">
              Built around your brief. Shipped around your choices.
            </p>
          </div>
        </section>

        <section style={{ padding: "4rem 2rem", background: "#0a0a0a" }}>
          <RoiCalculator />
        </section>

        <SelectedProjects />
        <TeamExperience />

        <section
          className="scene scene--final"
          data-scene="06"
          aria-labelledby="final-title"
        >
          <div className="scene__stage final__stage">
            <div className="final__content">
              <p className="final__eyebrow">AM / Your next move</p>
              <h2 className="final__title" id="final-title">
                <span className="final__title-line">BEYOND</span>
                <span className="final__title-line">THE BRIEF.</span>
              </h2>
              <p className="final__copy">
                Start with the idea you have. See what it becomes, what it can
                look like, and where it can launch next.
              </p>
              <div className="final__action">
                <a className="primary-cta" href="#contact">
                  <span>Start your project</span>
                  <span aria-hidden="true">↗</span>
                </a>
                <span>One brief. No invented promises.</span>
              </div>
            </div>

            <div className="final__crop" aria-hidden="true">
              BRIEF
            </div>

          </div>
        </section>

        <section
          className="scene scene--faq"
          id="faq"
          data-scene="07"
          aria-label="Frequently Asked Questions"
          style={{ background: "#000000", color: "#f2efe6", height: "auto", minHeight: "100vh" }}
        >
          <div className="scene__stage faq__stage flex flex-col items-center justify-center min-h-screen py-12 px-6 md:px-12" style={{ height: "auto", minHeight: "100vh" }}>
            <ScrollFAQAccordion />
          </div>
        </section>

        <section className="flex flex-col min-h-screen w-full items-center justify-center bg-black px-6 md:px-12 py-24 text-[#f2efe6] border-t border-[#333]">
          <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center">
            <div className="max-w-xl text-center">
              <h2 className="mt-3 text-balance font-semibold text-3xl tracking-tight sm:text-4xl text-[#f2efe6]">
                Loved by builders everywhere
              </h2>
              <p className="mt-4 text-zinc-400">
                Don't take our word for it — here's what industry leaders have to
                say.
              </p>
            </div>
            
            {/* Foolproof Spacer */}
            <div style={{ height: '120px', width: '100%' }} aria-hidden="true" />
            
            <div className="w-full flex justify-center">
              <TestimonialsSection />
            </div>
            
            {/* Foolproof Bottom Spacer to account for translated cards */}
            <div style={{ height: '120px', width: '100%' }} aria-hidden="true" />
          </div>
        </section>

        <div id="contact">
          <CinematicFooter />
        </div>

        <footer className="site-footer-full" aria-label="Site Footer">
          <div className="footer-full__inner">
            <div className="footer-full__brand-col">
              <a className="footer-full__logo" href="#top" aria-label="AM Studio, back to top">
                <span>AM</span>
                <span className="footer-full__logo-sub">AGENCY</span>
              </a>
              <p className="footer-full__tagline">
                Transforming briefs into high-impact digital products, brands, and autonomous systems. Built around your brief. Shipped around your choices.
              </p>
              <div className="footer-full__status">
                <span className="footer-full__status-dot" aria-hidden="true" />
                <span>SYSTEM OPERATIONAL — ACCEPTING Q3/Q4 PROJECTS</span>
              </div>
            </div>

            <div className="footer-full__col">
              <h3 className="footer-full__heading">HEADQUARTERS & CONTACT</h3>
              <address className="footer-full__address">
                <p><strong>AM Studio HQ</strong></p>
                <p>Kompally, Hyderabad</p>
                <p>Telangana, India</p>
              </address>
              <div className="footer-full__contacts">
                <p><strong>Email:</strong> <a href="mailto:supportamstudio@gmail.com">supportamstudio@gmail.com</a></p>
                <p><strong>Phone:</strong> <a href="tel:+919542710588">+91 9542710588</a></p>
              </div>
            </div>

            <div className="footer-full__col">
              <h3 className="footer-full__heading">NAVIGATION</h3>
              <ul className="footer-full__links">
                <li><a href="#top">00 / HOME</a></li>
                <li><a href="#empty-section">01 / CONCEPT & BUILD</a></li>
                <li><a href="#read">02 / RESUME & SIGNALS</a></li>
                <li><a href="#match">03 / MATCH ROUTES</a></li>
                <li><a href="#principles">04 / OPERATING SYSTEM</a></li>
                <li><a href="#move">05 / BOUNDARY CONTROL</a></li>
              </ul>
            </div>

            <div className="footer-full__col">
              <h3 className="footer-full__heading">LEGAL & COMPLIANCE</h3>
              <ul className="footer-full__links">
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/terms">Terms of Service</a></li>
                <li><a href="/cookies">Cookie Settings</a></li>
                <li><a href="/security">Security & NDAs</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-full__bottom">
            <div className="footer-full__legal">
              <p>© 2026 AM Studio Inc. All rights reserved.</p>
              <p className="footer-full__legal-sub">
                Registered Trademark. All agency artifacts, design systems, and code templates are protected under international copyright law.
              </p>
            </div>

            <div className="footer-full__back-top">
              <a href="#top" aria-label="Back to top">
                <span>BACK TO TOP</span>
                <span aria-hidden="true">↑</span>
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
