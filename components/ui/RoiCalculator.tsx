"use client";

import React, { useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { CalModal } from "./motion-footer";
import "./roi-calculator.css";

function AnimatedNumber({ 
  value, 
  format, 
  prefix = "", 
  suffix = "" 
}: { 
  value: number, 
  format: (v: number) => string, 
  prefix?: string, 
  suffix?: string 
}) {
  const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => `${prefix}${format(current)}${suffix}`);
  
  useEffect(() => {
    spring.set(value);
  }, [spring, value]);
  
  return <motion.span>{display}</motion.span>;
}

export function RoiCalculator() {
  const [teamSize, setTeamSize] = useState<number>(4);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(4);
  const [annualSalary, setAnnualSalary] = useState<number>(600000);
  const [calOpen, setCalOpen] = useState(false);

  // Calculations
  const hoursWastedYear = teamSize * hoursPerWeek * 52;
  const hourlyRate = annualSalary / 2080;
  const costPerYear = hoursWastedYear * hourlyRate;
  const costPerMonth = costPerYear / 12;
  const fte = hoursWastedYear / 2080;

  // Formatting helpers
  const formatINR = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 1,
    }).format(value);
  };

  return (
    <>
      {calOpen && <CalModal onClose={() => setCalOpen(false)} />}
      <div className="roi-calculator">
      {/* Left Column: Inputs */}
      <div className="roi-left">
        <h3 className="roi-heading roi-heading-orange">YOUR INPUTS</h3>

        <div className="roi-input-group">
          <div className="roi-input-header">
            <div>
              <label>TEAM SIZE</label>
              <p className="roi-hint">How many people do manual follow-ups or ops work</p>
            </div>
            <div className="roi-value">
              <span className="roi-value-number">{teamSize}</span>
              <span className="roi-value-label">people</span>
            </div>
          </div>
          <input
            type="range"
            min="1"
            max="50"
            value={teamSize}
            onChange={(e) => setTeamSize(Number(e.target.value))}
            className="roi-slider"
            style={{
              backgroundSize: `${((teamSize - 1) * 100) / 49}% 100%`,
            }}
          />
        </div>

        <div className="roi-input-group">
          <div className="roi-input-header">
            <div>
              <label>HOURS PER WEEK</label>
              <p className="roi-hint">Hours each person spends on that manual work every week</p>
            </div>
            <div className="roi-value">
              <span className="roi-value-number">{hoursPerWeek}</span>
              <span className="roi-value-label">hrs / week</span>
            </div>
          </div>
          <input
            type="range"
            min="1"
            max="40"
            value={hoursPerWeek}
            onChange={(e) => setHoursPerWeek(Number(e.target.value))}
            className="roi-slider"
            style={{
              backgroundSize: `${((hoursPerWeek - 1) * 100) / 39}% 100%`,
            }}
          />
        </div>

        <div className="roi-input-group">
          <div className="roi-input-header">
            <div>
              <label>AVERAGE ANNUAL SALARY</label>
              <p className="roi-hint">Typical yearly salary (INR) for one person on that team</p>
            </div>
            <div className="roi-value">
              <span className="roi-value-number">₹{formatINR(annualSalary)}</span>
              <span className="roi-value-label">per person / year</span>
            </div>
          </div>
          <input
            type="range"
            min="100000"
            max="5000000"
            step="50000"
            value={annualSalary}
            onChange={(e) => setAnnualSalary(Number(e.target.value))}
            className="roi-slider"
            style={{
              backgroundSize: `${((annualSalary - 100000) * 100) / 4900000}% 100%`,
            }}
          />
        </div>
      </div>

      {/* Right Column: Outputs */}
      <div className="roi-right">
        <h3 className="roi-heading roi-heading-orange">WHAT IT COSTS YOU</h3>

        <div className="roi-main-stat">
          <p className="roi-stat-label">Cost of manual work / year</p>
          <h2 className="roi-stat-value">
            <AnimatedNumber value={costPerYear} format={formatINR} prefix="₹" />
          </h2>
          <p className="roi-stat-subtext">Salary value lost to busywork across your team</p>
        </div>

        <div className="roi-metrics-grid">
          <div className="roi-metric-box">
            <p className="roi-metric-label">PER MONTH</p>
            <h4 className="roi-metric-value">
              <AnimatedNumber value={costPerMonth} format={formatINR} prefix="₹" />
            </h4>
            <p className="roi-metric-subtext">same burn, monthly</p>
          </div>
          <div className="roi-metric-box">
            <p className="roi-metric-label">HOURS WASTED / YEAR</p>
            <h4 className="roi-metric-value">
              <AnimatedNumber value={hoursWastedYear} format={formatNumber} />
            </h4>
            <p className="roi-metric-subtext">total team hours</p>
          </div>
          <div className="roi-metric-box">
            <p className="roi-metric-label">FULL-TIME EQUIVALENT</p>
            <h4 className="roi-metric-value">
              <AnimatedNumber value={fte} format={formatNumber} suffix=" FTE" />
            </h4>
            <p className="roi-metric-subtext">people-years of work</p>
          </div>
        </div>

        <button onClick={() => setCalOpen(true)} className="roi-cta-button">
          ELIMINATE THE BUSYWORK <span className="roi-cta-arrow">➔</span>
        </button>
      </div>
    </div>
    </>
  );
}
