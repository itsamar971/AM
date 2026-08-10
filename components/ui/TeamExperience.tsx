import React from "react";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import "./team-experience.css";

const teamData = [
  {
    id: "01",
    date: "JULY 2025 - PRESENT",
    title: "N AMARNADH REDDY",
    subtitle: "TECH & FINANCE",
    color: "#111111", // Dark/Black to match reference
    tags: ["UI/UX", "SYSTEM DESIGN", "CASH FLOW"],
    photo: "/amar.png",
    linkedin: "https://www.linkedin.com/in/n-amarnadh-reddy/",
    website: "https://www.amarnadhreddy.site",
  },
  {
    id: "02",
    date: "JULY 2025 - PRESENT",
    title: "MEGHANA THIPANNI",
    subtitle: "SALES, MARKETING & OPERATIONS",
    color: "#111111", // Dark/Black to match reference
    tags: ["B2B SALES", "GROWTH", "CRM", "OPERATIONS"],
    photo: "/IMG-20260806-WA0008.jpg",
    linkedin: "https://www.linkedin.com/in/meghana-thipanni-914582312/",
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
                SYSTEM.LOG / THE CREW
              </span>
            </div>
            
            <h2 className="team-title">
              THE CREW<br />
              <span className="blue-text" style={{ fontSize: '0.4em', display: 'block', marginTop: '0.5rem', letterSpacing: '0.05em' }}>THE PEOPLE BEHIND THE PIXELS</span>
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
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="team-card-title m-0">{member.title}</h3>
                    <div className="flex items-center gap-3">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                            <rect x="2" y="9" width="4" height="12"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                          </svg>
                        </a>
                      )}
                      {member.website && (
                        <a href={member.website} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                          <Globe size={20} />
                        </a>
                      )}
                    </div>
                  </div>
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
                  <div className="team-card-photo-box" style={member.photo ? { padding: 0, overflow: 'hidden' } : {}}>
                    {member.photo && (
                      <img src={member.photo} alt={member.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
