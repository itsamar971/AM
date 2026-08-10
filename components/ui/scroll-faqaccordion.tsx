"use client";

import * as React from "react";
import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon?: string;
  iconPosition?: "left" | "right";
}

interface ScrollFAQAccordionProps {
  data?: FAQItem[];
  className?: string;
  questionClassName?: string;
  answerClassName?: string;
}

export default function ScrollFAQAccordion({
  data = [
    {
      id: 1,
      question: "What exactly does AM Studio deliver?",
      answer: "We are an elite software design and engineering agency. We deliver high-impact digital products, immersive brand experiences, and scalable autonomous systems. We don't just build software; we craft cinematic digital experiences."
    },
    {
      id: 2,
      question: "How does the engagement process work?",
      answer: "It starts with an intensive discovery phase where we align on business objectives. From there, we move into rapid prototyping, technical architecture, and finally execution, maintaining transparent communication throughout the entire lifecycle."
    },
    {
      id: 3,
      question: "Do you work with startups or enterprise clients?",
      answer: "Both. We partner with ambitious early-stage founders to build zero-to-one MVPs, and we collaborate with enterprise teams to modernise legacy systems or launch innovative new product lines."
    },
    {
      id: 4,
      question: "What is your typical project timeline?",
      answer: "Every project is bespoke. Zero-to-one product launches typically take 8 to 16 weeks, while extensive platform architectures and ongoing fractional engineering engagements operate on a longer-term retained basis."
    },
    {
      id: 5,
      question: "What tech stack do you specialise in?",
      answer: "We leverage modern, scalable technologies including Next.js, React, TypeScript, GSAP for high-performance animations, and various headless CMS and cloud infrastructure providers tailored to the specific needs of the project."
    }
  ],
  className,
  questionClassName,
  answerClassName,
}: ScrollFAQAccordionProps) {
  const [openItem, setOpenItem] = React.useState<string | null>(null);

  return (
    <div
      style={{
        position: "relative",
        zIndex: 20,
        width: "100%",
        maxWidth: "1000px",
        margin: "0 auto",
        minHeight: "100vh", // Force container to take full height of the viewport
        padding: "5rem 1rem 2rem 1rem", // Add top padding to always clear the nav bar
        backgroundColor: "#000000",
        color: "#f2efe6",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center", // This perfectly vertically centers the entire block!
      }}
      className={className}
    >
      {/* Header Block */}
      <div style={{ textAlign: "center", marginBottom: "3rem", width: "100%" }}>
        <span
          style={{
            color: "#e0603e",
            fontSize: "0.875rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            fontWeight: "bold",
            display: "block",
            marginBottom: "0.5rem",
            fontFamily: '"SFMono-Regular", Consolas, monospace',
          }}
        >
          04 // KNOWLEDGE BASE
        </span>
        <h2
          style={{
            fontSize: "clamp(2rem, 5vw, 4rem)", // Restored to a bold, premium size
            fontWeight: 900,
            textTransform: "uppercase",
            color: "white",
            lineHeight: 1.1,
            margin: "0 0 1rem 0",
            fontFamily: '"Arial Black", "Helvetica Neue", sans-serif',
          }}
        >
          FREQUENTLY ASKED QUESTIONS
        </h2>
        <p style={{ color: "rgba(242, 239, 230, 0.7)", fontSize: "1rem", fontFamily: "monospace", maxWidth: "600px", margin: "0 auto", display: "none" }}>
          {/* Hidden description to save vertical space */}
        </p>
      </div>

      {/* Accordion Block */}
      <div style={{ width: "100%" }}>
        <Accordion.Root
          type="single"
          collapsible
          value={openItem || ""}
          onValueChange={(val) => {
            setOpenItem(val);
            // Optionally dispatch immediately to start adjusting before animation completes
            setTimeout(() => window.dispatchEvent(new Event("resize")), 50);
          }}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {data.map((item) => {
            const isOpen = openItem === item.id.toString();
            return (
              <Accordion.Item
                value={item.id.toString()}
                key={item.id}
                className="faq-box-item" // Re-added for GSAP targeting
                style={{
                  borderRadius: "0",
                  border: isOpen ? "2px solid #e0603e" : "1px solid rgba(255,255,255,0.2)",
                  backgroundColor: isOpen ? "#141816" : "#0b0e0d",
                  boxShadow: isOpen ? "5px 5px 0px 0px #e0603e" : "5px 5px 0px 0px rgba(255,255,255,0.06)",
                  transition: "all 0.2s ease",
                  overflow: "hidden"
                }}
              >
                <Accordion.Header style={{ margin: 0, width: "100%" }}>
                  <Accordion.Trigger
                    style={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1.25rem 1.5rem",
                      cursor: "pointer",
                      backgroundColor: "transparent",
                      border: "none",
                      textAlign: "left",
                      color: "inherit",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", flex: 1 }}>
                      <span
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: "bold",
                          fontFamily: '"SFMono-Regular", Consolas, monospace',
                          padding: "0.2rem 0.6rem",
                          border: isOpen ? "2px solid #e0603e" : "2px solid rgba(224, 96, 62, 0.4)",
                          backgroundColor: isOpen ? "#e0603e" : "#000000",
                          color: isOpen ? "#000000" : "#e0603e",
                          transition: "all 0.2s ease",
                        }}
                      >
                        {String(item.id).padStart(2, "0")}
                      </span>
                      <span
                        style={{
                          fontSize: "1rem",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                          fontFamily: '"Arial Black", "Helvetica Neue", sans-serif',
                          color: isOpen ? "#e0603e" : "#ffffff",
                          transition: "color 0.2s ease",
                        }}
                      >
                        {item.question}
                      </span>
                    </div>

                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "2rem",
                        height: "2rem",
                        border: isOpen ? "2px solid #e0603e" : "2px solid rgba(255,255,255,0.3)",
                        backgroundColor: isOpen ? "#e0603e" : "#000000",
                        color: isOpen ? "#000000" : "#ffffff",
                        transition: "all 0.2s ease",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        flexShrink: 0,
                      }}
                    >
                      {isOpen ? <Minus style={{ strokeWidth: 3, width: "1rem", height: "1rem" }} /> : <Plus style={{ strokeWidth: 3, width: "1rem", height: "1rem" }} />}
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>

                <Accordion.Content asChild forceMount>
                  <motion.div
                    initial="collapsed"
                    animate={isOpen ? "open" : "collapsed"}
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 },
                    }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    onAnimationComplete={() => {
                      window.dispatchEvent(new Event("resize"));
                    }}
                    onUpdate={() => {
                      // Trigger a soft refresh to keep pin spacing perfectly accurate during the animation
                      if (typeof window !== "undefined" && (window as any).ScrollTrigger) {
                         (window as any).ScrollTrigger.refresh(true);
                      }
                    }}
                  >
                    <div style={{ padding: "0 2rem 2rem 2rem", marginTop: "1rem", borderTop: "2px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem" }}>
                      <p style={{ color: "rgba(242, 239, 230, 0.8)", fontSize: "1.125rem", lineHeight: 1.6, fontFamily: "sans-serif", margin: 0 }}>
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                </Accordion.Content>
              </Accordion.Item>
            );
          })}
        </Accordion.Root>
      </div>

      {/* Stack CTA Button */}
      <div style={{ marginTop: "4rem", marginBottom: "1rem", width: "100%", display: "flex", justifyContent: "center" }}>
        <a 
          href="/stack" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#DF5F3E",
            color: "#000",
            fontWeight: "900",
            padding: "1rem 2.5rem",
            borderRadius: "0",
            border: "2px solid #DF5F3E",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            textDecoration: "none",
            fontSize: "0.9rem",
            transition: "all 0.15s ease-out",
            boxShadow: "6px 6px 0px #ffffff"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translate(4px, 4px)";
            e.currentTarget.style.boxShadow = "2px 2px 0px #ffffff";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translate(0px, 0px)";
            e.currentTarget.style.boxShadow = "6px 6px 0px #ffffff";
          }}
        >
          Play with our stack <span style={{ marginLeft: "8px" }}>➔</span>
        </a>
      </div>
    </div>
  );
}
