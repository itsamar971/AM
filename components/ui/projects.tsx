import React from "react";
import { motion } from "framer-motion";
import "./projects.css";

const projectData = [
  {
    id: "01",
    barColor: "#f97316", // Orange
    name: "PROJECT TITLE 01",
    ref: "REF_400",
  },
  {
    id: "02",
    barColor: "#22c55e", // Green
    name: "PROJECT TITLE 02",
    ref: "REF_412",
  },
  {
    id: "03",
    barColor: "#3b82f6", // Blue
    name: "PROJECT TITLE 03",
    ref: "REF_424",
  },
  {
    id: "04",
    barColor: "#eab308", // Yellow
    name: "PROJECT TITLE 04",
    ref: "REF_436",
  },
];

export function SelectedProjects() {
  return (
    <section id="work" className="projects-section">
      <div className="projects-bg-grid"></div>

      <div className="projects-content">
        {/* Header */}
        <div className="projects-header-top">
          <div className="projects-pill-wrapper">
            <div className="projects-pill">
              <span>
                <span className="projects-pill-dot"></span>
                SYSTEM.LOG / WORK
              </span>
            </div>
            
            <h2 className="projects-title">
              SELECTED<br />
              <span className="blue-text">WORK</span>
            </h2>
          </div>

          <div className="projects-desc-box">
            <p>
              CRAFTING HIGH-IMPACT DIGITAL EXPERIENCES THROUGH THOUGHTFUL UX STRATEGY, VISUAL STORYTELLING, AND PIXEL-PERFECT INTERFACE DESIGN.
            </p>
          </div>
        </div>

        <div className="projects-divider"></div>

        {/* Grid */}
        <div className="projects-grid">
          {projectData.map((project, index) => (
            <motion.div 
              key={project.id} 
              className="project-card"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
            >
              {/* Window Bar */}
              <div className="project-card-bar" style={{ backgroundColor: project.barColor }}>
                <div className="project-card-title-group">
                  <div className="project-card-square"></div>
                  <span className="project-card-bar-title">PROJECT_INFO_{project.id}</span>
                </div>
                <div className="project-card-controls">
                  <span>_</span>
                  <span>□</span>
                  <span>×</span>
                </div>
              </div>

              {/* Image Area */}
              <div className="project-card-image-area">
                <div className="project-card-ref">[{project.ref}]</div>
              </div>

              {/* Footer */}
              <div className="project-card-footer">
                <span className="project-card-name">{project.name}</span>
                <button className="project-card-btn">[ OPEN ]</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
