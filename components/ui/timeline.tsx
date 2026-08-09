import React from "react";
import { Search, Target, Layout, Code, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import "./timeline.css";

const timelineData = [
  {
    id: "01",
    title: "RESEARCH",
    description:
      "ANALYZING MARKET TRENDS, COMPETITOR LANDSCAPES, AND IDENTIFYING CORE AUDIENCE FRICTION POINTS TO ESTABLISH A DATA-DRIVEN FOUNDATION.",
    icon: Search,
    color: "#ff4e00", // Orange
  },
  {
    id: "02",
    title: "IDEATE",
    description:
      "BRAINSTORMING SOLUTIONS, MAPPING OUT STRATEGIC OPPORTUNITIES, AND DEFINING THE OVERARCHING ARCHITECTURE FOR THE PROJECT.",
    icon: Target,
    color: "#2563eb", // Blue
  },
  {
    id: "03",
    title: "DESIGN",
    description:
      "ARCHITECTING COMPREHENSIVE USER FLOWS, DEFINING PERSONA PROFILING, AND CONSTRUCTING SEMANTIC MAPS AND WIREFRAMES.",
    icon: Layout,
    color: "#eab308", // Yellow
  },
  {
    id: "04",
    title: "BUILD",
    description:
      "TRANSLATING VISUAL CONCEPTS INTO PRODUCTION-READY CODE WITH SCALABLE, MODULAR, AND HIGH-PERFORMANCE ENGINEERING PRACTICES.",
    icon: Code,
    color: "#ec4899", // Pink
  },
  {
    id: "05",
    title: "SHIP",
    description:
      "DEPLOYING THE FINAL PRODUCT, CONDUCTING RIGOROUS QA, AND INITIATING CONTINUOUS MONITORING FOR SEAMLESS PERFORMANCE.",
    icon: Rocket,
    color: "#22c55e", // Green
  },
];

export function Timeline() {
  return (
    <section id="approach" className="timeline-section">
      {/* Background Grid */}
      <div className="timeline-bg-grid"></div>

      <div className="timeline-content">
        {/* Header */}
        <div className="timeline-header">
          <div className="timeline-pill">
            <span>
              <span className="timeline-pill-dot"></span>
              THE WAY WE WORK
            </span>
          </div>
          
          <h2 className="timeline-title">
            FROM VISION TO <span>REALITY</span>
          </h2>
          
          <p className="timeline-subtitle">
            A proven, step-by-step process designed to deliver high-converting websites and scalable growth systems for your business.
          </p>
        </div>

        {/* Timeline */}
        <div className="timeline-track-container">
          {/* Center Line */}
          <div className="timeline-center-line"></div>
          <div className="timeline-center-line-gradient"></div>

          {/* Stages */}
          <div className="timeline-stages">
            {timelineData.map((stage, index) => {
              const isEven = index % 2 !== 0; // 0 is odd in UI terms (left), 1 is even (right)
              const Icon = stage.icon;

              return (
                <div key={stage.id} className={`timeline-stage ${isEven ? 'is-even' : ''}`}>
                  
                  {/* Card Section */}
                  <motion.div 
                    className="timeline-card-wrapper"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <div className="timeline-connector"></div>
                    <div 
                      className="timeline-card"
                      style={{ boxShadow: `6px 6px 0 0 ${stage.color}` }}
                    >
                      <div className="timeline-card-header">
                        <div className="timeline-icon-box">
                          <Icon />
                        </div>
                        <span className="timeline-stage-label">
                          STAGE_{stage.id}
                        </span>
                      </div>
                      
                      <h3 className="timeline-card-title" style={{ color: stage.color }}>
                        {stage.title}
                      </h3>
                      
                      <p className="timeline-card-desc">
                        {stage.description}
                      </p>
                    </div>
                  </motion.div>

                  {/* Center Node */}
                  <motion.div 
                    className="timeline-node" 
                    style={{ backgroundColor: stage.color }}
                    initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
                    whileInView={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
                  >
                    <span>{stage.id}</span>
                  </motion.div>

                  {/* Empty space for the other side on desktop */}
                  <div className="timeline-spacer"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
