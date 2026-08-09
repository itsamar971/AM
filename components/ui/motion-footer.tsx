"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import Cal, { getCalApi } from "@calcom/embed-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─────────────────────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────────────────────
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

.mf-wrap {
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  background: #0b0d0c;
  color: #f2efe6;
  position: relative;
  overflow: hidden;
}

@keyframes mf-breathe {
  0%   { transform: translate(-50%,-50%) scale(1);    opacity:.5; }
  100% { transform: translate(-50%,-50%) scale(1.12); opacity:.9; }
}
@keyframes mf-marquee {
  from { transform:translateX(0); }
  to   { transform:translateX(-50%); }
}
@keyframes mf-beat {
  0%,100%{transform:scale(1);}
  15%,45%{transform:scale(1.28);}
  30%    {transform:scale(1);}
}
@keyframes mf-modal-in {
  from { opacity:0; transform:scale(.96) translateY(12px); }
  to   { opacity:1; transform:scale(1)   translateY(0); }
}
@keyframes mf-backdrop-in {
  from { opacity:0; }
  to   { opacity:1; }
}

.mf-breathe  { animation: mf-breathe  9s ease-in-out infinite alternate; }
.mf-marquee  { animation: mf-marquee 38s linear       infinite; }
.mf-beat     { animation: mf-beat     2s ease-in-out  infinite; }

/* Grid */
.mf-grid {
  background-size: 56px 56px;
  background-image:
    linear-gradient(to right,  rgba(255,255,255,.035) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,.035) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
}

/* Aurora */
.mf-aurora {
  background: radial-gradient(
    ellipse at 50% 50%,
    rgba(224,96,62,.16)  0%,
    rgba(30,215,96,.08) 40%,
    transparent          70%
  );
}

/* Giant background wordmark */
.mf-bg-word {
  font-size: clamp(8rem,26vw,22rem);
  line-height: 1;
  font-weight: 900;
  letter-spacing: -0.06em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255,255,255,.04);
  background: linear-gradient(180deg, rgba(255,255,255,.07) 0%, transparent 65%);
  -webkit-background-clip: text;
  background-clip: text;
  user-select: none;
  white-space: nowrap;
}

/* Heading gradient */
.mf-heading {
  background: linear-gradient(170deg, #ffffff 30%, rgba(255,255,255,.4) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 24px rgba(255,255,255,.12));
}

/* Glass pill */
.mf-pill {
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.09);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  transition: background .35s ease, border-color .35s ease, transform .35s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: .6rem;
  border-radius: 9999px;
  cursor: pointer;
  text-decoration: none;
  font-weight: 600;
}
.mf-pill:hover {
  background: rgba(255,255,255,.09);
  border-color: rgba(255,255,255,.18);
}
.mf-pill-primary {
  padding: 1.1rem 2.4rem;
  font-size: .95rem;
  color: #f2efe6;
}
.mf-pill-secondary {
  padding: .7rem 1.5rem;
  font-size: .75rem;
  color: rgba(242,239,230,.52);
  font-weight: 500;
}
.mf-pill-secondary:hover { color: #f2efe6; }

/* Orange accent CTA */
.mf-pill-cta {
  background: rgba(224,96,62,.12);
  border-color: rgba(224,96,62,.3);
}
.mf-pill-cta:hover {
  background: rgba(224,96,62,.22);
  border-color: rgba(224,96,62,.5);
}

/* ── Cal.com Modal ── */
.mf-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0,0,0,.78);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: mf-backdrop-in .25s ease forwards;
}
.mf-modal-box {
  position: relative;
  width: min(94vw, 860px);
  height: min(90vh, 680px);
  background: #111413;
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 1.25rem;
  overflow: hidden;
  animation: mf-modal-in .3s cubic-bezier(0.16,1,0.3,1) forwards;
  display: flex;
  flex-direction: column;
}
.mf-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgba(255,255,255,.07);
  flex-shrink: 0;
}
.mf-modal-title {
  font-size: .8rem;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: rgba(242,239,230,.55);
  font-family: 'Plus Jakarta Sans', sans-serif;
}
.mf-modal-close {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,.1);
  background: rgba(255,255,255,.04);
  color: rgba(242,239,230,.6);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background .2s ease, color .2s ease;
  flex-shrink: 0;
}
.mf-modal-close:hover {
  background: rgba(255,255,255,.1);
  color: #f2efe6;
}
.mf-modal-cal {
  flex: 1;
  overflow: hidden;
}
`;

// ─────────────────────────────────────────────────────────────────────────────
// Cal.com booking modal
// ─────────────────────────────────────────────────────────────────────────────
export function CalModal({ onClose }: { onClose: () => void }) {
  // Initialise Cal API with our namespace
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  // Close on backdrop click
  const backdropRef = useRef<HTMLDivElement>(null);
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose();
  };

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <div
      ref={backdropRef}
      className="mf-modal-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Book a call with AM Studio"
    >
      <div className="mf-modal-box">
        {/* Header */}
        <div className="mf-modal-header">
          <span className="mf-modal-title">Book a 30-min call · AM Studio</span>
          <button className="mf-modal-close" onClick={onClose} aria-label="Close booking">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="1" y1="1" x2="13" y2="13"/>
              <line x1="13" y1="1" x2="1" y2="13"/>
            </svg>
          </button>
        </div>

        {/* Cal.com embed */}
        <div className="mf-modal-cal">
          <Cal
            namespace="30min"
            calLink="am-studio-m4zh9g/30min"
            style={{ width: "100%", height: "100%", overflow: "scroll" }}
            config={{ layout: "month_view", theme: "dark" }}
          />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Magnetic wrapper
// ─────────────────────────────────────────────────────────────────────────────
function Magnetic({ children, className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      gsap.to(el, {
        x: (e.clientX - r.left - r.width  / 2) * 0.38,
        y: (e.clientY - r.top  - r.height / 2) * 0.38,
        scale: 1.05, ease: "power2.out", duration: .35,
      });
    };
    const onLeave = () =>
      gsap.to(el, { x:0, y:0, scale:1, ease:"elastic.out(1,.35)", duration:1.1 });

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, []);

  return <div ref={ref} className={cn(className)} {...rest}>{children}</div>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Marquee
// ─────────────────────────────────────────────────────────────────────────────
const STRIP_ITEMS = [
  "Brand Strategy",
  "Product Design",
  "Web Development",
  "Motion & Animation",
  "Design Systems",
  "Launch Ready",
  "Beyond The Brief",
  "Concept · Code · Ship",
];

function MarqueeStrip() {
  const inner = STRIP_ITEMS.map((t, i) => (
    <React.Fragment key={i}>
      <span style={{ whiteSpace: "nowrap" }}>{t}</span>
      <span style={{ color: "rgba(224,96,62,.7)", marginLeft: "1.5rem", marginRight: "1.5rem" }}>✦</span>
    </React.Fragment>
  ));
  return (
    <div style={{
      overflow: "hidden",
      borderTop: "1px solid rgba(255,255,255,.06)",
      borderBottom: "1px solid rgba(255,255,255,.06)",
      background: "rgba(11,13,12,.65)",
      backdropFilter: "blur(10px)",
      padding: "1rem 0",
    }}>
      <div className="mf-marquee" style={{
        display: "flex", width: "max-content",
        fontSize: ".7rem", fontWeight: 700,
        letterSpacing: ".28em", textTransform: "uppercase",
        color: "rgba(242,239,230,.38)",
      }}>
        {inner}{inner}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Inline SVG icons
// ─────────────────────────────────────────────────────────────────────────────
const IconCalendar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8"  y1="2" x2="8"  y2="6"/>
    <line x1="3"  y1="10" x2="21" y2="10"/>
  </svg>
);

const IconSearch = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const IconArrowUp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5"/>
    <polyline points="5 12 12 5 19 12"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────────────────────
export function CinematicFooter() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgWordRef  = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const pillsRef   = useRef<HTMLDivElement>(null);
  const [calOpen, setCalOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(bgWordRef.current,
        { yPercent: 18, opacity: 0 },
        { yPercent: 0, opacity: 1, ease: "power1.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", end: "center center", scrub: 1.2 } }
      );
      gsap.fromTo([headingRef.current, pillsRef.current],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: .18, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 55%", end: "center center", scrub: 1 } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* Cal.com modal — rendered at root level above everything */}
      {calOpen && <CalModal onClose={() => setCalOpen(false)} />}

      <section
        ref={sectionRef}
        className="mf-wrap"
        aria-label="Call to action footer"
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        {/* Aurora */}
        <div className="mf-aurora mf-breathe" style={{
          position: "absolute", left: "50%", top: "50%",
          width: "80vw", height: "60vh",
          borderRadius: "50%", filter: "blur(72px)",
          pointerEvents: "none", zIndex: 0,
        }} />
        {/* Grid */}
        <div className="mf-grid" style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }} />
        {/* BG word */}
        <div ref={bgWordRef} className="mf-bg-word" style={{
          position: "absolute", bottom: "-2vh", left: "50%",
          transform: "translateX(-50%)",
          zIndex: 0, pointerEvents: "none",
        }}>
          AM
        </div>

        {/* Marquee */}
        <div style={{ position: "relative", zIndex: 10, marginTop: "4rem" }}>
          <MarqueeStrip />
        </div>

        {/* Main content */}
        <div style={{
          position: "relative", zIndex: 10, flex: 1,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: "4rem 1.5rem 2rem",
          maxWidth: "60rem", margin: "0 auto", width: "100%",
        }}>
          <h2
            ref={headingRef}
            className="mf-heading"
            style={{
              fontSize: "clamp(2.8rem, 8vw, 6rem)",
              fontWeight: 900, letterSpacing: "-0.04em",
              textAlign: "center", marginBottom: "3rem", lineHeight: 1.05,
            }}
          >
            Ready to begin?
          </h2>

          <div ref={pillsRef} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.2rem", width: "100%" }}>

            {/* Primary CTAs */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
              {/* ← opens Cal.com modal */}
              <Magnetic>
                <button
                  type="button"
                  onClick={() => setCalOpen(true)}
                  className="mf-pill mf-pill-primary mf-pill-cta"
                >
                  <IconCalendar />
                  Book a Call
                </button>
              </Magnetic>

              <Magnetic>
                <a 
                  href="#work" 
                  className="mf-pill mf-pill-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <IconSearch />
                  View Our Work
                </a>
              </Magnetic>
            </div>

            {/* Secondary labels */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".6rem", justifyContent: "center", marginTop: ".4rem" }}>
              {["Sales", "Design", "Ship", "Deploy"].map((label) => (
                <Magnetic key={label}>
                  <button type="button" className="mf-pill mf-pill-secondary">{label}</button>
                </Magnetic>
              ))}
            </div>

          </div>
        </div>


      </section>
    </>
  );
}
