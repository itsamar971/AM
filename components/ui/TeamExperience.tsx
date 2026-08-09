import React from "react";
import { motion } from "framer-motion";
import "./team-experience.css";

const teamData = [
  {
    id: "01",
    date: "JULY 2025 - PRESENT",
    title: "TROVO FI",
    subtitle: "FOUNDER",
    color: "#111111", // Dark/Black to match reference
    tags: ["FINTECH", "CREDIT CARDS", "UPI CASHBACK", "BNPL"],
  },
  {
    id: "02",
    date: "FEB 2026 - PRESENT",
    title: "ZANIKA",
    subtitle: "CTO & UI DESIGNER",
    color: "#111111", // Dark/Black to match reference
    tags: ["REACT NATIVE", "REACT", "NEXT.JS", "FULL STACK"],
  },
];

export function TeamExperience() {
  return (
    <section id="team" className="team-section">
      <div className="team-bg-grid"></div>

      <div className="team-content">
        {/* Header */}
        <div className="team-header-top">
          <div className="team-pill-wrapper">
            <div className="team-pill">
              <span>
                <span className="team-pill-dot"></span>
                SYSTEM.LOG / EXPERIENCE
              </span>
            </div>
            
            <h2 className="team-title">
              EXPERIENCE<br />
              <span className="blue-text">HIGHLIGHTS</span>
            </h2>
          </div>

          <div className="team-desc-box">
            <p>
              MEASURING DESIGN IMPACT THROUGH PRODUCTS THAT SHIP, USERS THAT STAY, AND BUSINESSES THAT GROW.
            </p>
          </div>
        </div>

        <div className="team-divider"></div>

        {/* Sub-header */}
        <div className="team-subheader">
          <div className="team-subheader-left">
            <span className="team-subheader-line"></span>
            <span>CAREER_CHRONICLE</span>
          </div>
          <div className="team-subheader-right">
            <span>HORIZONTAL_TIMELINE_LOG</span>
            <div className="team-subheader-controls">
              <div className="team-control-btn">&lt;</div>
              <div className="team-control-btn">&gt;</div>
            </div>
          </div>
        </div>

        {/* Track Line behind cards */}
        <div className="team-track-line"></div>

        {/* Grid */}
        <div className="team-grid">
          {teamData.map((member, index) => (
            <motion.div 
              key={member.id} 
              className="team-card"
              style={{ backgroundColor: member.color }}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
            >
              <div className="team-card-layout">
                <div className="team-card-left">
                  <div className="team-card-date">{member.date}</div>
                  <h3 className="team-card-title">{member.title}</h3>
                  <div className="team-card-subtitle">{member.subtitle}</div>

                  <div className="team-card-tags">
                    {member.tags.map(tag => (
                      <span key={tag} className="team-card-tag">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="team-card-right">
                  <div className="team-card-squares">
                    <div className="team-card-square"></div>
                    <div className="team-card-square"></div>
                  </div>
                  <div className="team-card-photo-box"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
