"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { projectData } from "@/lib/projectsData";
import { ArrowUpRight } from "lucide-react";
import "./case-study.css";

export default function CaseStudyPage() {
  const { slug } = useParams();
  const router = useRouter();
  
  const project = projectData.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="cs-max-page flex flex-col items-center justify-center">
        <h1 className="max-display-solid mb-8">404_NOT_FOUND</h1>
        <button className="max-btn sharp-border" onClick={() => router.push('/')}>[ RETURN ]</button>
      </div>
    );
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as any } }
  };

  return (
    <div className="cs-max-page">
      {/* Navigation */}
      <nav className="max-nav sharp-border-bottom">
        <Link href="/" className="max-nav-brand">SYSTEM.LOG</Link>
        <button className="max-btn sharp-border" onClick={() => router.push('/#work')}>
          [ ESCAPE ]
        </button>
      </nav>

      {/* Hero Section */}
      <section className="max-hero-grid sharp-border-bottom">
        <div className="max-hero-left sharp-border-right">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="max-mono text-sm text-zinc-500 mb-8">CASE_STUDY // {project.id}</div>
            
            <h1 className="max-display mb-8">{project.name}</h1>
            
            <div className="sharp-border-top sharp-border-bottom py-8 mb-8">
              <div className="max-data-block sharp-border-bottom pb-4 mb-4">
                <span className="max-data-label">INDUSTRY</span>
                <span className="max-data-value">{project.techStack?.[3] || "TECHNOLOGY"}</span>
              </div>
              <div className="max-data-block sharp-border-bottom pb-4 mb-4">
                <span className="max-data-label">STACK</span>
                <span className="max-data-value">{project.techStack?.slice(0, 3).join(", ") || "VARIOUS"}</span>
              </div>
              <div className="max-data-block">
                <span className="max-data-label">ROLE</span>
                <span className="max-data-value">{project.strategicRoles?.[0] || "LEAD"}</span>
              </div>
            </div>

            <div className="max-tagline-panel sharp-border">
              <p className="max-tagline-text max-mono">
                {project.heroTagline || project.description}
              </p>
            </div>
            
            {project.websiteUrl && project.websiteUrl !== "#" && (
              <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="max-btn sharp-border mt-12 inline-flex items-center gap-2 w-fit">
                [ LAUNCH_PROJECT ] <ArrowUpRight size={16} />
              </a>
            )}
          </motion.div>
        </div>
        
        <div className="max-hero-right">
          {project.thumbnail && (
            <motion.div 
              className="max-image-frame sharp-border m-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img src={project.thumbnail} alt={project.name} className="max-image" />
            </motion.div>
          )}
        </div>
      </section>

      {/* Problem & Vision */}
      <section className="max-section sharp-border-bottom">
        <div className="max-split-layout">
          <motion.div 
            className="max-panel sharp-border-right"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeUp}
          >
            <div className="max-mono text-zinc-500 mb-12">01 // THE_PROBLEM</div>
            <h2 className="max-display-solid mb-8">MARKET<br/>GAP</h2>
            <div className="max-accent-line"></div>
            <p className="max-body-text">"{project.problemStatement}"</p>
          </motion.div>

          <motion.div 
            className="max-panel max-panel-bg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeUp}
          >
            <div className="max-mono text-zinc-500 mb-12">02 // THE_SOLUTION</div>
            <h2 className="max-display-solid mb-8">FOUNDER<br/>MANDATE</h2>
            <div className="max-accent-line"></div>
            <p className="max-body-text">{project.visionStatement}</p>
          </motion.div>
        </div>
      </section>

      {/* Product Breakdown Grid */}
      {project.features && project.features.length > 0 && (
        <section className="max-section sharp-border-bottom">
          <div className="p-8 lg:p-16 sharp-border-bottom">
            <h2 className="max-display-solid">SYSTEM<br/>ARCHITECTURE</h2>
          </div>
          <div className="max-features-grid">
            {project.features.map((feature, index) => (
              <motion.div 
                key={index} 
                className={`max-feature-card ${index % 3 !== 2 ? 'sharp-border-right' : ''} ${index < project.features!.length - 3 ? 'sharp-border-bottom' : ''}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: index * 0.1 }}
              >
                <div className="max-feature-index">0{index + 1}</div>
                <h3 className="max-feature-title max-mono">{feature.title}</h3>
                <div className="max-accent-line mb-4"></div>
                <p className="max-feature-desc">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Strategic Roles */}
      <section className="max-section sharp-border-bottom">
        <div className="max-split-layout">
          <div className="max-panel sharp-border-right">
            <h2 className="max-display-solid mb-8">EXECUTION</h2>
            <p className="max-body-text mb-12">
              Operating as the foundational product architect and team leader, responsible for driving end-to-end design strategy, establishing engineering standards, and orchestrating core system pipelines.
            </p>
            <div className="max-roles-container">
              {project.strategicRoles && project.strategicRoles.map((role, index) => (
                <div key={index} className="max-role-tag sharp-border">
                  {role}
                </div>
              ))}
            </div>
          </div>
          <div className="max-panel max-panel-bg flex items-center justify-center">
             <div className="text-9xl font-black opacity-5">EXEC</div>
          </div>
        </div>
      </section>

      {/* Gallery / Showcases */}
      {project.caseStudyImages && project.caseStudyImages.length > 0 && (
        <section className="p-8 lg:p-16 sharp-border-bottom">
          <div className="max-mono text-zinc-500 mb-12">03 // INTERFACE_LOGS</div>
          
          <div className="flex flex-col gap-24 max-w-7xl mx-auto py-12">
            {project.caseStudyImages.map((img, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div 
                  key={idx} 
                  className={`flex flex-col lg:flex-row items-center gap-16 ${isEven ? '' : 'lg:flex-row-reverse'}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-10%" }}
                  variants={fadeUp}
                >
                  {/* Text Side */}
                  <div className="flex-1 space-y-6">
                    <div className="max-mono text-zinc-500 text-sm">MODULE_VIEW // 0{idx + 1}</div>
                    <h3 className="max-display-solid" style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}>
                      {typeof img === 'string' ? `INTERFACE ${idx + 1}` : img.title}
                    </h3>
                    <div className="max-accent-line w-1/4"></div>
                    <p className="max-body-text" style={{ fontSize: '1.25rem' }}>
                      {typeof img === 'string' ? "Additional module view for the system architecture." : img.description}
                    </p>
                  </div>

                  {/* Image Side */}
                  <div className="flex-1 w-full">
                    <div className="max-image-frame sharp-border">
                      <img src={typeof img === 'string' ? img : img.src} alt={`Preview ${idx + 1}`} className="w-full h-auto block object-contain" style={{ maxHeight: '600px' }} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
