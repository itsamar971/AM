import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { projectData } from "@/lib/projectsData";
import "./projects.css";

export function SelectedProjects() {
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

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
            <React.Fragment key={project.id}>
            <motion.div 
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
              <div className="project-card-image-area" style={{ 
                backgroundImage: project.thumbnail ? `url("${project.thumbnail}")` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}>
                <div className="project-card-ref">[{project.ref}]</div>
              </div>

              {/* Footer */}
              <div className="project-card-footer">
                <span className="project-card-name">{project.name}</span>
                <button 
                  className="project-card-btn"
                  onClick={() => setExpandedProjectId(expandedProjectId === project.id ? null : project.id)}
                >
                  [ {expandedProjectId === project.id ? "CLOSE" : "OPEN"} ]
                </button>
              </div>
            </motion.div>
            
            {/* Inline Expanded View */}
            {expandedProjectId === project.id && (
              <motion.div 
                className="expanded-project-wrapper"
                initial={{ opacity: 0, height: 0, scale: 0.95 }}
                animate={{ opacity: 1, height: "auto", scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="expanded-card-bar" style={{ backgroundColor: project.expandedBarColor || project.barColor }}>
                  <div className="project-card-title-group">
                    <div className="project-card-square"></div>
                    <span>PROJECT_INFO_{project.id}</span>
                  </div>
                  <div className="expanded-card-controls">
                    <span></span><span></span><span></span>
                  </div>
                </div>
                
                {project.thumbnail && (
                  <img src={project.thumbnail} alt={project.name} className="expanded-card-image" />
                )}
                
                <div className="expanded-card-content">
                  <div className="expanded-card-header">
                    <h3>{project.name}</h3>
                    <hr />
                  </div>
                  
                  {project.description && (
                    <div className="expanded-desc-box">
                      {project.description}
                    </div>
                  )}
                  
                  {project.output && (
                    <div className="expanded-output-row">
                      <div className="expanded-output-box">{project.output}</div>
                      <div className="expanded-output-line"></div>
                    </div>
                  )}
                  
                  {project.techStack && (
                    <div className="expanded-tech-stack">
                      {project.techStack.map(tech => (
                        <div key={tech} className="expanded-tech-pill">
                          <div className="expanded-tech-icon"></div>
                          {tech}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="expanded-actions">
                    <Link href={`/case-study/${project.slug}`} className="expanded-btn btn-primary no-underline" style={{ textDecoration: 'none' }}>
                      VIEW_CASE_STUDY <ArrowUpRight size={20} />
                    </Link>
                    {project.websiteUrl && project.websiteUrl !== "#" && (
                      <button className="expanded-btn btn-secondary" onClick={() => window.open(project.websiteUrl, '_blank')}>
                        LAUNCH_EXPERIENCE <ArrowUpRight size={20} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
