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
      className={cn(
        "relative z-20 w-full max-w-7xl mx-auto p-6 md:p-12 rounded-none bg-[#000000] text-[#f2efe6]",
        className
      )}
    >
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        {/* Left Column: Asymmetric Header Block */}
        <div className="faq-box-item lg:w-5/12 border-l-4 border-[#e0603e] pl-6 py-2">
          <span
            className="text-[#e0603e] text-xs md:text-sm font-mono tracking-[0.25em] uppercase font-bold block mb-3"
            style={{ fontFamily: '"SFMono-Regular", Consolas, monospace' }}
          >
            04 // KNOWLEDGE BASE
          </span>
          <h2
            className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase mb-6 leading-none"
            style={{ fontFamily: '"Arial Black", "Helvetica Neue", sans-serif' }}
          >
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-[#f2efe6]/70 text-base md:text-lg leading-relaxed font-mono">
            Insights into our process, technical capabilities, and how we partner with ambitious teams to deliver exceptional digital products.
          </p>
        </div>

        {/* Right Column: Brutalist Stacked Accordion Cards */}
        <div className="lg:w-7/12 w-full">
          <Accordion.Root
            type="single"
            collapsible
            value={openItem || ""}
            onValueChange={setOpenItem}
            className="space-y-6"
          >
            {data.map((item) => {
              const isOpen = openItem === item.id.toString();
              return (
                <Accordion.Item
                  value={item.id.toString()}
                  key={item.id}
                  className={cn(
                    "faq-box-item rounded-none transition-all duration-300 border-2",
                    isOpen
                      ? "bg-[#141816] border-[#e0603e] shadow-[6px_6px_0px_0px_#e0603e]"
                      : "bg-[#0b0e0d] border-white/20 hover:border-white/60 shadow-[6px_6px_0px_0px_rgba(255,255,255,0.08)]"
                  )}
                >
                  <Accordion.Header className="w-full">
                    <Accordion.Trigger className="flex w-full items-center justify-between p-6 md:p-8 cursor-pointer bg-transparent border-none appearance-none outline-none text-left rounded-none group">
                      <div className="flex items-center space-x-6 text-left flex-1 pr-4">
                        <span
                          className={cn(
                            "text-sm md:text-base font-mono font-bold tracking-widest shrink-0 px-3 py-1 border-2 rounded-none transition-colors",
                            isOpen
                              ? "bg-[#e0603e] text-[#000000] border-[#e0603e]"
                              : "bg-[#000000] text-[#e0603e] border-[#e0603e]/40 group-hover:border-[#e0603e]"
                          )}
                          style={{ fontFamily: '"SFMono-Regular", Consolas, monospace' }}
                        >
                          {String(item.id).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "font-bold text-lg md:text-2xl tracking-tight uppercase leading-snug transition-colors",
                            isOpen ? "text-[#e0603e]" : "text-white group-hover:text-white"
                          )}
                          style={{ fontFamily: '"Arial Black", "Helvetica Neue", sans-serif' }}
                        >
                          {item.question}
                        </span>
                      </div>

                      {/* Clean Right-Aligned Geometric Action Button */}
                      <span
                        className={cn(
                          "flex-shrink-0 flex items-center justify-center w-10 h-10 border-2 rounded-none transition-all duration-300 ml-4",
                          isOpen
                            ? "border-[#e0603e] bg-[#e0603e] text-[#000000] rotate-180"
                            : "border-white/30 text-white bg-[#000000] group-hover:border-white group-hover:bg-white group-hover:text-[#000000]"
                        )}
                      >
                        {isOpen ? <Minus className="h-5 w-5 stroke-[3]" /> : <Plus className="h-5 w-5 stroke-[3]" />}
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
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-8 pt-4 border-t-2 border-white/10 mt-2">
                        <p className={cn("text-[#f2efe6]/80 text-base md:text-lg leading-relaxed font-sans", answerClassName)}>
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
      </div>
    </div>
  );
}
