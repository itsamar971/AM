"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, useAnimation, AnimatePresence, useMotionValue, useMotionTemplate, MotionValue, useSpring } from "framer-motion";

const IconUser = ({ className, size }: { className?: string, size?: number | string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);
const IconReact = ({ className, size }: { className?: string, size?: number | string }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" role="img" viewBox="0 0 24 24" height={size} width={size} className={className} xmlns="http://www.w3.org/2000/svg"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"></path></svg>
);
const IconNext = ({ className, size }: { className?: string, size?: number | string }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" role="img" viewBox="0 0 24 24" height={size} width={size} className={className} xmlns="http://www.w3.org/2000/svg"><path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z"></path></svg>
);
const IconThree = ({ className, size }: { className?: string, size?: number | string }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" role="img" viewBox="0 0 24 24" height={size} width={size} className={className} xmlns="http://www.w3.org/2000/svg"><path d="M.38 0a.268.268 0 0 0-.256.332l2.894 11.716a.268.268 0 0 0 .01.04l2.89 11.708a.268.268 0 0 0 .447.128L23.802 7.15a.268.268 0 0 0-.112-.45l-5.784-1.667a.268.268 0 0 0-.123-.035L6.38 1.715a.268.268 0 0 0-.144-.04L.456.01A.268.268 0 0 0 .38 0zm.374.654L5.71 2.08 1.99 5.664zM6.61 2.34l4.864 1.4-3.65 3.515zm-.522.12l1.217 4.926-4.877-1.4zm6.28 1.538l4.878 1.404-3.662 3.53zm-.52.13l1.208 4.9-4.853-1.392zm6.3 1.534l4.947 1.424-3.715 3.574zm-.524.12l1.215 4.926-4.876-1.398zm-15.432.696l4.964 1.424-3.726 3.586zM8.047 8.15l4.877 1.4-3.66 3.527zm-.518.137l1.236 5.017-4.963-1.432zm6.274 1.535l4.965 1.425-3.73 3.586zm-.52.127l1.235 5.012-4.958-1.43zm-9.63 2.438l4.873 1.406-3.656 3.523zm5.854 1.687l4.863 1.403-3.648 3.51zm-.54.04l1.214 4.927-4.875-1.4zm-3.896 4.02l5.037 1.442-3.782 3.638z"></path></svg>
);
const IconFramer = ({ className, size }: { className?: string, size?: number | string }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" role="img" viewBox="0 0 24 24" height={size} width={size} className={className} xmlns="http://www.w3.org/2000/svg"><path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"></path></svg>
);
const IconCss = ({ className, size }: { className?: string, size?: number | string }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 384 512" height={size} width={size} className={className} xmlns="http://www.w3.org/2000/svg"><path d="M0 32l34.9 395.8L192 480l157.1-52.2L384 32H0zm313.1 80l-4.8 47.3L193 208.6l-.3.1h111.5l-12.8 146.6-98.2 28.7-98.8-29.2-6.4-73.9h48.9l3.2 38.3 52.6 13.3 54.7-15.4 3.7-61.6-166.3-.5v-.1l-.2.1-3.6-46.3L193.1 162l6.5-2.7H76.7L70.9 112h242.2z"></path></svg>
);
const IconGeneric = ({ letter, className, size }: { letter: string, className?: string, size?: number | string }) => (
  <div style={{ width: size, height: size }} className={`flex items-center justify-center font-black rounded text-current ${className}`}>
    <span style={{ fontSize: typeof size === 'number' ? size * 0.7 : '70%' }}>{letter}</span>
  </div>
);
const IconJava = ({ className, size }: { className?: string, size?: number | string }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" role="img" viewBox="0 0 24 24" height={size} width={size} className={className} xmlns="http://www.w3.org/2000/svg"><path d="M12.016 0c-.57 0-1.026.43-1.026 1.054v.105c0 2.235 2.106 3.993 2.106 7.64 0 .912-.352 1.956-.56 2.502-1.396.11-2.91.432-4.227.973-1.895.782-3.114 2.15-3.114 3.738 0 1.258.825 2.457 2.164 3.238.163.094.34.18.525.26-1.572.766-2.585 1.776-2.585 2.923 0 1.488 1.485 2.802 3.86 3.6 2.186.735 5.068 1.156 8.162 1.156 5.86 0 10.605-2.022 10.605-4.512 0-1.127-.932-2.115-2.404-2.875 1.574-.757 2.56-1.764 2.56-2.905 0-1.614-1.272-3.003-3.237-3.794.137-.488.204-.985.204-1.47 0-3.928-2.164-5.63-2.164-7.514V1.053c0-.623-.456-1.053-1.026-1.053h-2.11c-.57 0-1.025.43-1.025 1.054v2.545c0 2.16-1.378 3.51-1.378 5.753v.596c-1.343-.454-2.85-.756-4.437-.89v-.93c0-2.42-1.464-3.873-1.464-6.024V1.053C14.127.43 13.67 0 13.1 0h-1.084zM16.63 7.828c.456 1.117.784 2.19.866 3.275 1.346.52 2.378 1.246 2.378 2.052 0 .807-1.032 1.533-2.378 2.053.036.084.072.17.108.257 1.405-.28 2.628-.846 3.42-1.605-1.158-1.11-3.327-1.89-5.918-2.167-.282-1.066-.755-2.074-1.39-3.032.613-.255 1.273-.526 1.96-.83-.024.364-.282 1.03.954 0zm-5.066 3.868c2.91.077 5.742 1.037 7.733 2.593-1.455 1.12-3.725 1.83-6.262 2.023-.972-.51-2.148-.79-3.414-.79-1.282 0-2.46.28-3.414.787-2.613-.2-4.96-.944-6.43-2.115 2.057-1.63 5.06-2.618 8.163-2.618h.624zm-6.52 3.125c.613.636 1.558 1.152 2.705 1.488-.707.394-1.32.868-1.802 1.393-.934-.694-1.485-1.466-1.485-2.28 0-.214.195-.414.582-.602zM15.54 16.73c1.036-.263 1.94-.688 2.656-1.218-.396.44-1 .858-1.748 1.218h-.908zm-4.73 1.895c1.65 0 3.033.407 3.033 1.054 0 .647-1.382 1.054-3.033 1.054-1.65 0-3.034-.407-3.034-1.054 0-.647 1.383-1.054 3.034-1.054zm5.558.125c1.378.146 2.596.398 3.526.732-1.15.54-2.73.96-4.524 1.196.223-.19.42-.4.59-.624.168-.4.29-.838.408-1.304z" /></svg>
);
const IconExpress = ({ className, size }: { className?: string, size?: number | string }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" role="img" viewBox="0 0 24 24" height={size} width={size} className={className} xmlns="http://www.w3.org/2000/svg"><path d="M11.96 15.01c-1.353-.021-2.457-.344-3.218-.89-.785-.567-1.125-1.282-1.125-2.091h2.247c0 .486.202.83.568 1.053.404.263 1.032.384 1.701.364 1.375 0 2.244-.445 2.244-1.376 0-.79-1.215-1.133-2.613-1.395-2.025-.386-4.092-.912-4.092-3.1 0-1.196.587-2.188 1.62-2.815 1.054-.627 2.512-.953 4.293-.953 1.62 0 3.039.304 4.031.911 1.033.628 1.58 1.56 1.58 2.735H17.03c0-.466-.203-.79-.587-1.033-.426-.263-1.053-.385-1.803-.385-1.154 0-1.924.385-1.924 1.256 0 .75 1.154 1.033 2.511 1.296 2.066.385 4.193.911 4.193 3.119.04 1.256-.607 2.288-1.64 2.917-1.072.628-2.612.951-4.475.951-.486.02-1.315-.121-1.315-.121zm-6.278-8.79l-2.065 4.516-2.066-4.516H0l3.058 6.015-3.26 6.056h1.599l2.288-4.76 2.289 4.76h1.58L4.545 12.23l3.018-6.01z" /></svg>
);
const IconFigma = ({ className, size }: { className?: string, size?: number | string }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" role="img" viewBox="0 0 24 24" height={size} width={size} className={className} xmlns="http://www.w3.org/2000/svg"><path d="M8.017 19.992c0 2.214 1.794 4.008 4.008 4.008 2.215 0 4.009-1.794 4.009-4.008V16H8.017v3.992zM8.017 8H12v8H8.017A4.004 4.004 0 0 1 4.009 12c0-2.214 1.794-4.008 4.008-4.008zM12 0H8.017C5.802 0 4.009 1.794 4.009 4.008c0 2.215 1.793 4.009 4.008 4.009H12V0zm4.009 8H12v8h4.009a4.004 4.004 0 0 0 4.008-4.009A4.004 4.004 0 0 0 16.009 8zM12 0v8h4.009c2.214 0 4.008-1.794 4.008-4.009 0-2.214-1.794-4.008-4.008-4.008H12z" /></svg>
);
const IconAdobe = ({ className, size }: { className?: string, size?: number | string }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" role="img" viewBox="0 0 24 24" height={size} width={size} className={className} xmlns="http://www.w3.org/2000/svg"><path d="M14.975 0h9.006v24H14.975zm-14.95 0h9.007l-9.007 24zm9.49 14.887 2.268-5.83 5.485 14.92h-3.666l-1.39-4.032H9.288l.228-.507z" /></svg>
);

const GRID_CONSTANTS = {
  STUD_WIDTH: 65,
  ROW_HEIGHT: 80,
  MAX_ROWS: 20,
  COLS: 24,
  APEX_HEIGHT: 150
};

const STUD_THEMES = {
  green: {
    wall: "linear-gradient(90deg, #087028 0%, #10923b 20%, #1ab84d 38%, #20cc55 50%, #1ab84d 62%, #10923b 80%, #087028 100%)",
    cap: "linear-gradient(135deg, #42f585 0%, #25dd62 40%, #18c04e 70%, #10a040 100%)",
    shadow: "radial-gradient(ellipse, rgba(0,40,0,0.6) 0%, transparent 70%)",
    rim: "rgba(255,255,255,0.7)",
  },
  dark: {
    wall: "linear-gradient(90deg, #09090b 0%, #18181b 20%, #27272a 38%, #3f3f46 50%, #27272a 62%, #18181b 80%, #09090b 100%)",
    cap: "linear-gradient(135deg, #52525b 0%, #3f3f46 40%, #27272a 70%, #18181b 100%)",
    shadow: "radial-gradient(ellipse, rgba(0,0,0,0.8) 0%, transparent 70%)",
    rim: "rgba(255,255,255,0.2)",
  },
  yellow: {
    wall: "linear-gradient(90deg, #a16207 0%, #ca8a04 20%, #eab308 38%, #facc15 50%, #eab308 62%, #ca8a04 80%, #a16207 100%)",
    cap: "linear-gradient(135deg, #fef08a 0%, #fde047 40%, #eab308 70%, #ca8a04 100%)",
    shadow: "radial-gradient(ellipse, rgba(80,50,0,0.6) 0%, transparent 70%)",
    rim: "rgba(255,255,255,0.7)",
  },
  blue: {
    wall: "linear-gradient(90deg, #1e3a8a 0%, #1d4ed8 20%, #2563eb 38%, #3b82f6 50%, #2563eb 62%, #1d4ed8 80%, #1e3a8a 100%)",
    cap: "linear-gradient(135deg, #93c5fd 0%, #60a5fa 40%, #3b82f6 70%, #2563eb 100%)",
    shadow: "radial-gradient(ellipse, rgba(0,0,80,0.6) 0%, transparent 70%)",
    rim: "rgba(255,255,255,0.7)",
  },
  red: {
    wall: "linear-gradient(90deg, #7f1d1d 0%, #b91c1c 20%, #dc2626 38%, #ef4444 50%, #dc2626 62%, #b91c1c 80%, #7f1d1d 100%)",
    cap: "linear-gradient(135deg, #fca5a5 0%, #f87171 40%, #ef4444 70%, #dc2626 100%)",
    shadow: "radial-gradient(ellipse, rgba(80,0,0,0.6) 0%, transparent 70%)",
    rim: "rgba(255,255,255,0.7)",
  }
};

type StudColor = keyof typeof STUD_THEMES;

const LegoStud = ({ color = "green", yOffset = 0 }: { color?: StudColor, yOffset?: number }) => {
  const t = STUD_THEMES[color];
  const studHeight = 16;
  const studWidth = 72; 
  const studCapHeight = 16;
  
  return (
    <div className="flex-1 flex items-end justify-center relative" style={{ transform: `translateY(${yOffset}px)` }}>
      <div
        className="absolute bottom-[-3px] left-1/2 -translate-x-1/2 w-[75%] rounded-[50%] z-0"
        style={{ height: "10px", background: t.shadow }}
      />
      
      <div className="relative z-10" style={{ width: `${studWidth}%`, maxWidth: "42px", marginBottom: "-1px" }}>
        <div
          className="w-full relative overflow-hidden"
          style={{ height: `${studHeight}px`, borderRadius: "50% / 20%", background: t.wall }}
        >
          <div
            className="absolute top-0 h-full w-[25%] left-[20%]"
            style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.25), transparent)" }}
          />
        </div>
        
        <div
          className="absolute left-0 w-full rounded-[50%] flex items-center justify-center overflow-hidden"
          style={{
            top: `-${studCapHeight / 2}px`, 
            height: `${studCapHeight}px`, 
            background: t.cap,
            boxShadow: `inset 0px 2px 4px rgba(255,255,255,0.6), inset 0px -2px 4px rgba(0,0,0,0.2), 0px 1px 1px rgba(0,0,0,0.4)`,
            borderTop: `1px solid ${t.rim}`,
          }}
        >
          <span className="text-[10px] font-black tracking-widest select-none pointer-events-none opacity-80" style={{
            color: "rgba(0,0,0,0.15)",
            textShadow: "0px 1px 0px rgba(255,255,255,0.6)",
            transform: "scaleY(0.55) translateY(-1px)", 
          }}>
            UI
          </span>
        </div>
      </div>
    </div>
  );
};

interface LegoBlockProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  topColor: string;
  faceGradient: string;
  bottomColor: string;
  topHeight?: number;
  bottomHeight?: number;
  roundedTop?: boolean;
  roundedBottom?: boolean;
  className?: string;
  children: React.ReactNode;
  studs?: number;
  studColor?: StudColor;
  hideStuds?: boolean | number[];
  studYOffset?: number;
}

const LegoBlock = ({
  mouseX, mouseY,
  topColor, faceGradient, bottomColor,
  topHeight = 19, bottomHeight = 15,
  roundedTop = false, roundedBottom = false,
  className = "",
  children, studs = 0, studColor = "green", hideStuds = false,
  studYOffset = 12,
}: LegoBlockProps) => {
  const topDarkenEnd = 100;
  const topShadow = "inset 0px 0px 4px rgba(0,0,0,0.28)";
  const faceShadow = "inset 0px 2px 6px rgba(255,255,255,0.47)";

  const highlightBg = useMotionTemplate`radial-gradient(circle 120px at ${mouseX}% ${mouseY}%, rgba(255,255,255,0.25), transparent)`;

  return (
    <div className={`relative w-full ${className}`}>
      <div
        className="relative w-full"
        style={{
          height: `${topHeight}px`,
          background: `linear-gradient(to bottom, ${topColor}, color-mix(in srgb, ${topColor} ${topDarkenEnd}%, black))`,
          boxShadow: topShadow,
          borderRadius: roundedTop ? "4px 4px 0 0" : "0",
        }}
      >
        {studs > 0 && (
          <div className="absolute bottom-full left-0 w-full flex">
            {[...Array(studs)].map((_, i) => {
              const isHidden = Array.isArray(hideStuds) ? hideStuds.includes(i) : hideStuds;
              return isHidden ? (
                <div key={i} className="flex-1" />
              ) : (
                <LegoStud key={i} color={studColor} yOffset={studYOffset} />
              );
            })}
          </div>
        )}
      </div>
      <div
        className="relative w-full border-x border-black/5 overflow-hidden"
        style={{
          background: faceGradient,
          boxShadow: faceShadow,
        }}
      >
        <motion.div 
          className="absolute inset-0 z-20 pointer-events-none opacity-60"
          style={{
            background: highlightBg
          }}
        />
        <div className="relative z-30">{children}</div>
      </div>
      <div
        className="relative w-full"
        style={{
          height: `${bottomHeight}px`,
          background: bottomColor,
          boxShadow: "inset 0px 2px 4px rgba(0,0,0,0.15)",
          borderRadius: roundedBottom ? "0 0 4px 4px" : "0",
        }}
      />
    </div>
  );
};

const MODULES = [
  {
    id: "typescript",
    name: "Typescript",
    desc: "Technology",
    icon: ((props: any) => <IconGeneric letter="TY" {...props} />),
    studs: 4,
    colors: {
      topColor: "#38bdf8",
      faceGradient: "linear-gradient(180deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)",
      bottomColor: "#075985",
      studColor: "blue" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-sky-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "javascript",
    name: "Javascript",
    desc: "Technology",
    icon: IconJava,
    studs: 4,
    colors: {
      topColor: "#facc15",
      faceGradient: "linear-gradient(180deg, #eab308 0%, #ca8a04 50%, #a16207 100%)",
      bottomColor: "#713f12",
      studColor: "yellow" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-yellow-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "nextjs",
    name: "Next.js",
    desc: "Technology",
    icon: IconNext,
    studs: 4,
    colors: {
      topColor: "#27272a",
      faceGradient: "linear-gradient(180deg, #3f3f46 0%, #27272a 50%, #18181b 100%)",
      bottomColor: "#09090b",
      studColor: "dark" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-zinc-300",
      iconBg: "bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "react",
    name: "React",
    desc: "Technology",
    icon: IconReact,
    studs: 3,
    colors: {
      topColor: "#38bdf8",
      faceGradient: "linear-gradient(180deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)",
      bottomColor: "#075985",
      studColor: "blue" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-sky-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "nodejs",
    name: "Node.js",
    desc: "Technology",
    icon: ((props: any) => <IconGeneric letter="NO" {...props} />),
    studs: 3,
    colors: {
      topColor: "#4ade80",
      faceGradient: "linear-gradient(180deg, #22c55e 0%, #16a34a 50%, #15803d 100%)",
      bottomColor: "#14532d",
      studColor: "green" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-green-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "mongodb",
    name: "MongoDB",
    desc: "Technology",
    icon: ((props: any) => <IconGeneric letter="MO" {...props} />),
    studs: 3,
    colors: {
      topColor: "#4ade80",
      faceGradient: "linear-gradient(180deg, #22c55e 0%, #16a34a 50%, #15803d 100%)",
      bottomColor: "#14532d",
      studColor: "green" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-green-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "python",
    name: "Python",
    desc: "Technology",
    icon: ((props: any) => <IconGeneric letter="PY" {...props} />),
    studs: 3,
    colors: {
      topColor: "#38bdf8",
      faceGradient: "linear-gradient(180deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)",
      bottomColor: "#075985",
      studColor: "blue" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-sky-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "html5",
    name: "HTML5",
    desc: "Technology",
    icon: ((props: any) => <IconGeneric letter="HT" {...props} />),
    studs: 2,
    colors: {
      topColor: "#f87171",
      faceGradient: "linear-gradient(180deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)",
      bottomColor: "#7f1d1d",
      studColor: "red" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-red-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "css3",
    name: "CSS3",
    desc: "Technology",
    icon: IconCss,
    studs: 2,
    colors: {
      topColor: "#38bdf8",
      faceGradient: "linear-gradient(180deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)",
      bottomColor: "#075985",
      studColor: "blue" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-sky-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "tailwind-css",
    name: "Tailwind CSS",
    desc: "Technology",
    icon: ((props: any) => <IconGeneric letter="TA" {...props} />),
    studs: 4,
    colors: {
      topColor: "#38bdf8",
      faceGradient: "linear-gradient(180deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)",
      bottomColor: "#075985",
      studColor: "blue" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-sky-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "vercel",
    name: "Vercel",
    desc: "Technology",
    icon: ((props: any) => <IconGeneric letter="VE" {...props} />),
    studs: 3,
    colors: {
      topColor: "#27272a",
      faceGradient: "linear-gradient(180deg, #3f3f46 0%, #27272a 50%, #18181b 100%)",
      bottomColor: "#09090b",
      studColor: "dark" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-zinc-300",
      iconBg: "bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "aws",
    name: "AWS",
    desc: "Technology",
    icon: ((props: any) => <IconGeneric letter="AW" {...props} />),
    studs: 3,
    colors: {
      topColor: "#facc15",
      faceGradient: "linear-gradient(180deg, #eab308 0%, #ca8a04 50%, #a16207 100%)",
      bottomColor: "#713f12",
      studColor: "yellow" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-yellow-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "firebase",
    name: "Firebase",
    desc: "Technology",
    icon: ((props: any) => <IconGeneric letter="FI" {...props} />),
    studs: 3,
    colors: {
      topColor: "#facc15",
      faceGradient: "linear-gradient(180deg, #eab308 0%, #ca8a04 50%, #a16207 100%)",
      bottomColor: "#713f12",
      studColor: "yellow" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-yellow-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "google-cloud",
    name: "Google Cloud",
    desc: "Technology",
    icon: ((props: any) => <IconGeneric letter="GO" {...props} />),
    studs: 4,
    colors: {
      topColor: "#38bdf8",
      faceGradient: "linear-gradient(180deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)",
      bottomColor: "#075985",
      studColor: "blue" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-sky-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "expressjs",
    name: "Express.js",
    desc: "Technology",
    icon: IconExpress,
    studs: 4,
    colors: {
      topColor: "#27272a",
      faceGradient: "linear-gradient(180deg, #3f3f46 0%, #27272a 50%, #18181b 100%)",
      bottomColor: "#09090b",
      studColor: "dark" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-zinc-300",
      iconBg: "bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "wordpress",
    name: "Wordpress",
    desc: "Technology",
    icon: ((props: any) => <IconGeneric letter="WO" {...props} />),
    studs: 4,
    colors: {
      topColor: "#38bdf8",
      faceGradient: "linear-gradient(180deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)",
      bottomColor: "#075985",
      studColor: "blue" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-sky-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "figma",
    name: "Figma",
    desc: "Technology",
    icon: IconFigma,
    studs: 3,
    colors: {
      topColor: "#f87171",
      faceGradient: "linear-gradient(180deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)",
      bottomColor: "#7f1d1d",
      studColor: "red" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-red-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "framer",
    name: "Framer",
    desc: "Technology",
    icon: IconFramer,
    studs: 3,
    colors: {
      topColor: "#f87171",
      faceGradient: "linear-gradient(180deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)",
      bottomColor: "#7f1d1d",
      studColor: "red" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-red-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "github",
    name: "Github",
    desc: "Technology",
    icon: ((props: any) => <IconGeneric letter="GI" {...props} />),
    studs: 3,
    colors: {
      topColor: "#27272a",
      faceGradient: "linear-gradient(180deg, #3f3f46 0%, #27272a 50%, #18181b 100%)",
      bottomColor: "#09090b",
      studColor: "dark" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-zinc-300",
      iconBg: "bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "git",
    name: "Git",
    desc: "Technology",
    icon: ((props: any) => <IconGeneric letter="GI" {...props} />),
    studs: 2,
    colors: {
      topColor: "#f87171",
      faceGradient: "linear-gradient(180deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)",
      bottomColor: "#7f1d1d",
      studColor: "red" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-red-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "n8n",
    name: "N8N",
    desc: "Technology",
    icon: ((props: any) => <IconGeneric letter="N8" {...props} />),
    studs: 2,
    colors: {
      topColor: "#f87171",
      faceGradient: "linear-gradient(180deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)",
      bottomColor: "#7f1d1d",
      studColor: "red" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-red-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "openai",
    name: "OpenAI",
    desc: "Technology",
    icon: ((props: any) => <IconGeneric letter="OP" {...props} />),
    studs: 3,
    colors: {
      topColor: "#27272a",
      faceGradient: "linear-gradient(180deg, #3f3f46 0%, #27272a 50%, #18181b 100%)",
      bottomColor: "#09090b",
      studColor: "dark" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-zinc-300",
      iconBg: "bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "whatsapp-api",
    name: "Whatsapp API",
    desc: "Technology",
    icon: ((props: any) => <IconGeneric letter="WH" {...props} />),
    studs: 4,
    colors: {
      topColor: "#4ade80",
      faceGradient: "linear-gradient(180deg, #22c55e 0%, #16a34a 50%, #15803d 100%)",
      bottomColor: "#14532d",
      studColor: "green" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-green-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "postgres",
    name: "Postgres",
    desc: "Technology",
    icon: ((props: any) => <IconGeneric letter="PO" {...props} />),
    studs: 3,
    colors: {
      topColor: "#38bdf8",
      faceGradient: "linear-gradient(180deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)",
      bottomColor: "#075985",
      studColor: "blue" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-sky-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "supabase",
    name: "Supabase",
    desc: "Technology",
    icon: ((props: any) => <IconGeneric letter="SU" {...props} />),
    studs: 3,
    colors: {
      topColor: "#4ade80",
      faceGradient: "linear-gradient(180deg, #22c55e 0%, #16a34a 50%, #15803d 100%)",
      bottomColor: "#14532d",
      studColor: "green" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-green-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "docker",
    name: "Docker",
    desc: "Technology",
    icon: ((props: any) => <IconGeneric letter="DO" {...props} />),
    studs: 3,
    colors: {
      topColor: "#38bdf8",
      faceGradient: "linear-gradient(180deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)",
      bottomColor: "#075985",
      studColor: "blue" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-sky-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "redis",
    name: "Redis",
    desc: "Technology",
    icon: ((props: any) => <IconGeneric letter="RE" {...props} />),
    studs: 2,
    colors: {
      topColor: "#f87171",
      faceGradient: "linear-gradient(180deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)",
      bottomColor: "#7f1d1d",
      studColor: "red" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-red-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "notion",
    name: "Notion",
    desc: "Technology",
    icon: ((props: any) => <IconGeneric letter="NO" {...props} />),
    studs: 3,
    colors: {
      topColor: "#27272a",
      faceGradient: "linear-gradient(180deg, #3f3f46 0%, #27272a 50%, #18181b 100%)",
      bottomColor: "#09090b",
      studColor: "dark" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-zinc-300",
      iconBg: "bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "slack",
    name: "Slack",
    desc: "Technology",
    icon: ((props: any) => <IconGeneric letter="SL" {...props} />),
    studs: 3,
    colors: {
      topColor: "#f87171",
      faceGradient: "linear-gradient(180deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)",
      bottomColor: "#7f1d1d",
      studColor: "red" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-red-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "stripe",
    name: "Stripe",
    desc: "Technology",
    icon: ((props: any) => <IconGeneric letter="ST" {...props} />),
    studs: 3,
    colors: {
      topColor: "#38bdf8",
      faceGradient: "linear-gradient(180deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)",
      bottomColor: "#075985",
      studColor: "blue" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-sky-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "postman",
    name: "Postman",
    desc: "Technology",
    icon: ((props: any) => <IconGeneric letter="PO" {...props} />),
    studs: 3,
    colors: {
      topColor: "#f87171",
      faceGradient: "linear-gradient(180deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)",
      bottomColor: "#7f1d1d",
      studColor: "red" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-red-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "canva",
    name: "Canva",
    desc: "Technology",
    icon: ((props: any) => <IconGeneric letter="CA" {...props} />),
    studs: 3,
    colors: {
      topColor: "#38bdf8",
      faceGradient: "linear-gradient(180deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)",
      bottomColor: "#075985",
      studColor: "blue" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-sky-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "threejs",
    name: "Threejs",
    desc: "Technology",
    icon: IconThree,
    studs: 3,
    colors: {
      topColor: "#27272a",
      faceGradient: "linear-gradient(180deg, #3f3f46 0%, #27272a 50%, #18181b 100%)",
      bottomColor: "#09090b",
      studColor: "dark" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-zinc-300",
      iconBg: "bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "vuejs",
    name: "Vue.js",
    desc: "Technology",
    icon: ((props: any) => <IconGeneric letter="VU" {...props} />),
    studs: 3,
    colors: {
      topColor: "#4ade80",
      faceGradient: "linear-gradient(180deg, #22c55e 0%, #16a34a 50%, #15803d 100%)",
      bottomColor: "#14532d",
      studColor: "green" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-green-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "flutter",
    name: "Flutter",
    desc: "Technology",
    icon: ((props: any) => <IconGeneric letter="FL" {...props} />),
    studs: 3,
    colors: {
      topColor: "#38bdf8",
      faceGradient: "linear-gradient(180deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)",
      bottomColor: "#075985",
      studColor: "blue" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-sky-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "render",
    name: "Render",
    desc: "Technology",
    icon: ((props: any) => <IconGeneric letter="RE" {...props} />),
    studs: 3,
    colors: {
      topColor: "#4ade80",
      faceGradient: "linear-gradient(180deg, #22c55e 0%, #16a34a 50%, #15803d 100%)",
      bottomColor: "#14532d",
      studColor: "green" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-green-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "azure",
    name: "Azure",
    desc: "Technology",
    icon: ((props: any) => <IconGeneric letter="AZ" {...props} />),
    studs: 3,
    colors: {
      topColor: "#38bdf8",
      faceGradient: "linear-gradient(180deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)",
      bottomColor: "#075985",
      studColor: "blue" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-sky-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "portfolio",
    name: "Portfolio",
    desc: "Technology",
    icon: ((props: any) => <IconGeneric letter="PO" {...props} />),
    studs: 4,
    colors: {
      topColor: "#f87171",
      faceGradient: "linear-gradient(180deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)",
      bottomColor: "#7f1d1d",
      studColor: "red" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-red-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "prettier",
    name: "Prettier",
    desc: "Technology",
    icon: ((props: any) => <IconGeneric letter="PR" {...props} />),
    studs: 3,
    colors: {
      topColor: "#facc15",
      faceGradient: "linear-gradient(180deg, #eab308 0%, #ca8a04 50%, #a16207 100%)",
      bottomColor: "#713f12",
      studColor: "yellow" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-yellow-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "adobe",
    name: "Adobe",
    desc: "Technology",
    icon: IconAdobe,
    studs: 2,
    colors: {
      topColor: "#f87171",
      faceGradient: "linear-gradient(180deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)",
      bottomColor: "#7f1d1d",
      studColor: "red" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-red-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "babel",
    name: "Babel",
    desc: "Technology",
    icon: ((props: any) => <IconGeneric letter="BA" {...props} />),
    studs: 2,
    colors: {
      topColor: "#facc15",
      faceGradient: "linear-gradient(180deg, #eab308 0%, #ca8a04 50%, #a16207 100%)",
      bottomColor: "#713f12",
      studColor: "yellow" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-yellow-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "webpack",
    name: "Webpack",
    desc: "Technology",
    icon: ((props: any) => <IconGeneric letter="WE" {...props} />),
    studs: 3,
    colors: {
      topColor: "#38bdf8",
      faceGradient: "linear-gradient(180deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)",
      bottomColor: "#075985",
      studColor: "blue" as StudColor,
      text: "text-white drop-shadow-md",
      subtext: "text-sky-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
];

const ModuleBlock = ({ 
  module, 
  hiddenStuds = [], 
  onClick, 
  isAnimating,
  startRect,
  mouseX,
  mouseY,
  onAnimationComplete
}: { 
  module: typeof MODULES[0], 
  hiddenStuds?: number[], 
  onClick: (e: React.MouseEvent) => void,
  isAnimating?: boolean,
  startRect?: DOMRect | null,
  mouseX: MotionValue<number>,
  mouseY: MotionValue<number>,
  onAnimationComplete?: () => void
}) => {
  const widthPx = module.studs * GRID_CONSTANTS.STUD_WIDTH;
  const isCompact = module.studs <= 2;
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAnimating && startRect && wrapperRef.current) {
      const endRect = wrapperRef.current.getBoundingClientRect();
      const dx = startRect.left - endRect.left;
      const dy = startRect.top - endRect.top;

      // Arc apex: guarantees the block jumps higher than both its start and end point
      const apexY = Math.min(dy, 0) - GRID_CONSTANTS.APEX_HEIGHT;

      const animation = wrapperRef.current.animate([
        { transform: `translate(${dx}px, ${dy}px) scale(1, 1)`, filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.2))', offset: 0 },
        { transform: `translate(${dx}px, ${dy}px) scale(1.1, 0.85)`, filter: 'drop-shadow(0px 5px 5px rgba(0,0,0,0.3))', offset: 0.15 },
        { transform: `translate(${dx * 0.75}px, ${dy + (apexY - dy) * 0.5}px) scale(0.9, 1.15)`, filter: 'drop-shadow(0px 30px 20px rgba(0,0,0,0.05))', offset: 0.35 },
        { transform: `translate(${dx * 0.5}px, ${apexY}px) scale(1, 1)`, filter: 'drop-shadow(0px 40px 20px rgba(0,0,0,0))', offset: 0.55 },
        { transform: `translate(${dx * 0.25}px, ${apexY * 0.5}px) scale(0.9, 1.15)`, filter: 'drop-shadow(0px 30px 20px rgba(0,0,0,0.05))', offset: 0.75 },
        { transform: `translate(0px, 0px) scale(1.15, 0.85)`, filter: 'drop-shadow(0px 5px 5px rgba(0,0,0,0.3))', offset: 0.9 },
        { transform: `translate(0px, 0px) scale(1, 1)`, filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.2))', offset: 1 }
      ], {
        duration: 1200,
        easing: "cubic-bezier(0.25, 1, 0.5, 1)", 
        fill: "both"
      });

      animation.onfinish = () => onAnimationComplete?.();
      
      return () => animation.cancel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAnimating, startRect]);

  return (
    <div ref={wrapperRef} className="z-50 relative lego-block-wrapper" style={{ width: widthPx }}>
      <button
        type="button"
        onClick={onClick}
        aria-label={`Equip ${module.name}`}
        className="cursor-pointer w-full shrink-0 touch-none group relative focus:outline-none focus-visible:ring-4 focus-visible:ring-[#ccff00] rounded-lg hover:-translate-y-1.5 active:scale-95 transition-all duration-200 text-left"
      >
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors z-30 rounded-lg pointer-events-none" />
        <LegoBlock
          mouseX={mouseX}
          mouseY={mouseY}
          topColor={module.colors.topColor}
          faceGradient={module.colors.faceGradient}
          bottomColor={module.colors.bottomColor}
          roundedTop roundedBottom
          studs={module.studs}
          studColor={module.colors.studColor}
          hideStuds={hiddenStuds}
        >
          <div className={`flex items-center w-full h-[60px] ${isCompact ? 'px-3 gap-2.5' : 'px-4 gap-3'}`}>
            {isCompact ? (
              <>
                <div className={`w-7 h-7 rounded-md ${module.colors.iconBg} flex items-center justify-center shrink-0`}>
                  <module.icon className={module.colors.iconColor} size={18} />
                </div>
                <h4 className="font-sans font-bold text-white text-[15px] tracking-wide truncate drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
                  {module.name}
                </h4>
              </>
            ) : (
              <>
                <div className={`w-9 h-9 rounded-lg ${module.colors.iconBg} flex items-center justify-center shrink-0`}>
                  <module.icon className={module.colors.iconColor} size={24} />
                </div>
                <h4 className="font-sans font-bold text-white text-[17px] tracking-wide truncate drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
                  {module.name}
                </h4>
              </>
            )}
          </div>
        </LegoBlock>
      </button>
    </div>
  );
};

export interface LegoOnboardingProps {
  modules?: typeof MODULES;
  onComplete?: (stack: typeof MODULES) => void;
  onSkip?: () => void;
  className?: string;
}

export default function LegoOnboarding({ 
  modules = MODULES,
  onComplete,
  onSkip,
  className = ""
}: LegoOnboardingProps = {}) {
  const [equippedIds, setEquippedIds] = useState<string[]>([]);
  const [animatingBlocks, setAnimatingBlocks] = useState<Record<string, DOMRect>>({});
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  
  const controls = useAnimation();
  const rawMouseX = useMotionValue(50);
  const rawMouseY = useMotionValue(50);
  
  const mouseX = useSpring(rawMouseX, { stiffness: 100, damping: 25 });
  const mouseY = useSpring(rawMouseY, { stiffness: 100, damping: 25 });

  const handlePointerMove = (e: React.PointerEvent) => {
    rawMouseX.set((e.clientX / window.innerWidth) * 100);
    rawMouseY.set((e.clientY / window.innerHeight) * 100);
  };

  const handleToggleEquip = (id: string, e: React.MouseEvent) => {
    // Prevent interrupting an ongoing animation
    if (animatingBlocks[id]) return;

    const el = (e.currentTarget as HTMLElement).closest('.lego-block-wrapper');
    if (!el) return;
    const startRect = el.getBoundingClientRect();
    
    setAnimatingBlocks(prev => ({ ...prev, [id]: startRect }));
    
    setEquippedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(x => x !== id);
      }
      return [...prev, id];
    });

    // Simulate heavy impact when the block lands (at 90% of 1200ms = 1080ms)
    setTimeout(() => {
      controls.start({ y: [0, 10, -3, 0], transition: { duration: 0.4, times: [0, 0.4, 0.7, 1], ease: "easeInOut" } });
    }, 1080);
  };

  const equippedModules = equippedIds.map(id => modules.find(m => m.id === id)!);
  const unequippedModules = modules.filter(m => !equippedIds.includes(m.id));

  // Compute 2D Grid inside useMemo for performance
  const { grid, positionedModules } = useMemo(() => {
    const calculatedGrid: (string | null)[][] = [];
    const positioned = equippedModules.map(m => {
      let placedRow = -1;
      let placedCol = -1;
      for (let r = 0; r < GRID_CONSTANTS.MAX_ROWS; r++) {
        if (!calculatedGrid[r]) calculatedGrid[r] = Array(GRID_CONSTANTS.COLS).fill(null);
        let contiguous = 0;
        for (let c = 0; c < GRID_CONSTANTS.COLS; c++) {
          if (!calculatedGrid[r][c]) {
            contiguous++;
            if (contiguous === m.studs) {
              placedRow = r;
              placedCol = c - m.studs + 1;
              break;
            }
          } else {
            contiguous = 0;
          }
        }
        if (placedRow !== -1) break;
      }
      if (placedRow !== -1) {
        for (let i = 0; i < m.studs; i++) {
          calculatedGrid[placedRow][placedCol + i] = m.id;
        }
      } else {
        placedRow = 0;
        placedCol = 0;
      }
      return { module: m, rowIndex: placedRow, colIndex: placedCol };
    });
    return { grid: calculatedGrid, positionedModules: positioned };
  }, [equippedModules]);

  const hiddenServerStuds: number[] = [];
  if (grid[0]) {
    grid[0].forEach((occupantId, idx) => {
      if (occupantId && !animatingBlocks[occupantId]) hiddenServerStuds.push(idx);
    });
  }

  const towerHeight = equippedModules.length > 0 
    ? (Math.max(...positionedModules.map(m => m.rowIndex)) + 1) * GRID_CONSTANTS.ROW_HEIGHT 
    : 0;

  const calculateScore = () => {
    let score = equippedIds.length * 100;
    const combos = [
      { name: "FULL PRODUCTION!", req: ["react", "java", "aws"], bonus: 1000 },
      { name: "BACKEND MASTERY!", req: ["nodejs", "expressjs", "render"], bonus: 500 },
      { name: "MODERN FRONTEND!", req: ["react", "nextjs", "vercel"], bonus: 500 },
      { name: "DESIGN SUITE!", req: ["figma", "framer", "adobe"], bonus: 500 },
      { name: "DATABASE STACK!", req: ["postgres", "redis", "supabase"], bonus: 500 },
      { name: "DEVOPS!", req: ["github", "git", "docker"], bonus: 500 }
    ];
    let activeComboName = null;
    combos.forEach(c => {
      if (c.req.every(id => equippedIds.includes(id))) {
        score += c.bonus;
        activeComboName = c.name;
      }
    });
    return { score, activeComboName };
  };

  const { score, activeComboName } = calculateScore();

  return (
    <div 
      onPointerMove={handlePointerMove}
      className={`w-full min-h-screen relative overflow-hidden select-none font-sans flex flex-col ${className}`}
    >
      {/* Retro Score Box */}
      <div className="absolute top-4 right-4 lg:top-8 lg:right-8 bg-black border-[3px] border-white p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.7)] z-50 transform -rotate-2 flex flex-col items-center scale-[0.5] sm:scale-[0.7] lg:scale-[0.8] origin-top-right">
        <h2 className="text-white font-mono font-bold text-lg lg:text-xl tracking-widest uppercase text-center" style={{ textShadow: "2px 2px 0px #e52521" }}>
          SCORE
          <br/>
          <span className="text-[#facc15]">{score.toString().padStart(6, '0')}</span>
        </h2>
        {activeComboName && (
          <div className="mt-2 bg-red-600 px-2 py-1 border-2 border-white animate-pulse">
            <span className="text-white font-mono text-xs font-black tracking-widest">{activeComboName}</span>
          </div>
        )}
      </div>

      {/* Disclaimer Popup */}
      <AnimatePresence>
        {showDisclaimer && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: -2 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
              className="bg-black border-[4px] border-white p-8 shadow-[12px_12px_0px_0px_#eab308] max-w-md w-full text-center"
            >
              <h2 className="text-white font-mono font-bold text-3xl tracking-widest uppercase mb-6" style={{ textShadow: "3px 3px 0px #e52521" }}>
                ATTENTION
              </h2>
              <p className="text-white font-mono text-lg uppercase tracking-widest mb-8 leading-relaxed">
                This is a game! <br/><br/>
                Stack the technologies to build your profile and discover hidden combos.
              </p>
              <button 
                onClick={() => setShowDisclaimer(false)}
                className="bg-[#facc15] hover:bg-yellow-300 text-black border-2 border-white font-mono font-bold text-xl px-8 py-3 uppercase tracking-widest transition-colors shadow-[4px_4px_0px_0px_#fff] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_#fff] active:shadow-none active:translate-y-[4px] active:translate-x-[4px]"
              >
                PLAY
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex-1 w-full relative z-10 pt-24 lg:pt-32 pb-8 px-4 lg:px-12 flex flex-col lg:flex-row gap-8 lg:gap-0 h-full overflow-hidden">
        
        {/* LEFT: The Profile Structure */}
        <div className="flex flex-col items-center justify-end pb-12 lg:pb-32 w-full lg:w-1/2 h-[50vh] lg:h-full relative shrink-0">
          <div className="scale-[0.2] sm:scale-[0.25] lg:scale-[0.3] origin-bottom flex flex-col items-center">
            <motion.div 
              animate={controls}
              className="relative w-[1560px] shadow-[0_15px_35px_rgba(0,0,0,0.25)] rounded-xl transition-all duration-700 ease-out"
              style={{ marginTop: `${towerHeight}px` }}
            >
            
            {/* Stacked Equipped Modules */}
            <div className="absolute left-0 w-full h-0 z-20" style={{ bottom: "calc(100% - 14px)" }}>
                {positionedModules.map(({ module, rowIndex, colIndex }) => {
                  const hiddenLocalStuds: number[] = [];
                  if (grid[rowIndex + 1]) {
                    for (let i = 0; i < module.studs; i++) {
                      const occupantId = grid[rowIndex + 1][colIndex + i];
                      if (occupantId && !animatingBlocks[occupantId]) {
                        hiddenLocalStuds.push(i);
                      }
                    }
                  }

                  const startRect = animatingBlocks[module.id];

                  return (
                    <div 
                      key={module.id}
                      className="absolute"
                      style={{ 
                        bottom: rowIndex * GRID_CONSTANTS.ROW_HEIGHT, 
                        left: colIndex * GRID_CONSTANTS.STUD_WIDTH,
                        zIndex: rowIndex * 10
                      }}
                    >
                      <ModuleBlock 
                        module={module} 
                        hiddenStuds={hiddenLocalStuds}
                        mouseX={mouseX}
                        mouseY={mouseY}
                        isAnimating={!!startRect}
                        startRect={startRect || null}
                        onAnimationComplete={() => {
                          setAnimatingBlocks(prev => {
                            const next = { ...prev };
                            delete next[module.id];
                            return next;
                          });
                        }}
                        onClick={(e) => handleToggleEquip(module.id, e)} 
                      />
                    </div>
                  );
                })}
            </div>

            {/* Base Profile Block */}
            <LegoBlock
              mouseX={mouseX}
              mouseY={mouseY}
              topColor="#eab308"
              faceGradient="linear-gradient(180deg, #facc15 0%, #eab308 50%, #ca8a04 100%)"
              bottomColor="#a16207"
              roundedTop roundedBottom
              studs={24} studColor="yellow"
              hideStuds={hiddenServerStuds}
              className="relative z-10"
            >
              <div className="px-5 py-4 pt-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center shadow-inner shrink-0">
                    <IconUser className="w-6 h-6 text-white drop-shadow-md" size={24} />
                  </div>
                  <div className="text-white drop-shadow-md">
                    <h3 className="font-sans font-bold text-[17px] tracking-wide truncate drop-shadow-md">My Profile</h3>
                    <p className="font-mono text-[10px] font-bold text-yellow-100/90 tracking-[0.2em] uppercase mt-1.5 drop-shadow-sm">
                      {equippedModules.length === 0 ? "Select technologies" : `Level: ${equippedModules.length * 10}XP`}
                    </p>
                  </div>
                </div>
              </div>
            </LegoBlock>
            </motion.div>
          </div>

          {/* Call To Action Buttons */}
          <div className="absolute bottom-0 w-full flex flex-col items-center justify-start pb-8 gap-3 z-30">
            <AnimatePresence>
              {equippedModules.length > 0 && (
                <motion.button
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3.5 bg-zinc-900 text-white font-medium tracking-wide rounded-xl shadow-lg hover:bg-zinc-800 transition-colors duration-200"
                  onClick={() => onComplete ? onComplete(equippedModules) : alert(`Onboarding complete!\nStack: ${equippedModules.map(m => m.name).join(' + ')}`)}
                >
                  Continue →
                </motion.button>
              )}
            </AnimatePresence>
            
            {onSkip && (
               <button 
                 onClick={onSkip}
                 className="text-xs font-medium text-zinc-800 hover:text-black transition-colors uppercase tracking-widest mt-2"
               >
                 Skip for now
               </button>
            )}
          </div>
        </div>

        {/* RIGHT: Components Library */}
        <div className="flex-1 w-full lg:w-1/2 flex flex-col items-center justify-start pt-4 lg:pt-12 h-full pb-8">
          <div className="w-full max-w-[800px] h-full max-h-[80vh] flex flex-col overflow-y-auto pr-4 border-[3px] border-white p-8 bg-[#111] shadow-[16px_16px_0px_0px_#eab308] scrollbar-hide scale-[0.45] sm:scale-[0.55] lg:scale-[0.6] origin-top">
            
            <div className="flex items-center gap-4 mb-8">
              <div className="border-[3px] border-white p-2">
                <IconGeneric letter="LB" size={32} className="text-white" />
              </div>
              <div className="font-mono text-zinc-400 font-bold tracking-[0.2em] uppercase text-sm">LIBRARY_01</div>
            </div>
            <h2 className="text-[#facc15] font-black text-4xl font-sans tracking-tight mb-4 uppercase drop-shadow-md">COMPONENTS</h2>
            <p className="text-zinc-300 font-mono text-sm uppercase tracking-wide leading-relaxed mb-8">
              Select and drag components from the library to construct your optimal tech stack profile.
            </p>

            <div className="flex flex-wrap justify-center gap-5 relative z-20">
              {unequippedModules.map((module) => {
                const startRect = animatingBlocks[module.id];
                return (
                  <ModuleBlock 
                    key={module.id}
                    module={module}
                    mouseX={mouseX}
                    mouseY={mouseY}
                    isAnimating={!!startRect}
                    startRect={startRect || null}
                    onAnimationComplete={() => {
                      setAnimatingBlocks(prev => {
                        const next = { ...prev };
                        delete next[module.id];
                        return next;
                      });
                    }}
                    onClick={(e) => handleToggleEquip(module.id, e)} 
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export { LegoOnboarding as Component };
