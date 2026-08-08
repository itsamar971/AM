'use client';

import { cn } from '@/lib/utils';
import { motion, Transition, Variants } from 'framer-motion';
import React, { CSSProperties } from 'react';


type SpinningTextProps = {
  children: string;
  style?: CSSProperties;
  duration?: number;
  className?: string;
  color?: string;
  fontFamily?: string;
  reverse?: boolean;
  fontSize?: number;
  radius?: number;
  transition?: Transition;
  variants?: {
    container?: Variants;
  };
  centerIcon?: React.ReactNode;
};

const BASE_TRANSITION: Transition = {
  repeat: Infinity,
  ease: 'linear',
};

export function SpinningText({
  children,
  duration = 10,
  style,
  className,
  color = '#df5f3e',
  fontFamily = 'monospace',
  reverse = false,
  fontSize = 1,
  radius = 5,
  transition,
  variants,
  centerIcon,
}: SpinningTextProps) {
  const letters = children.split('');
  const totalLetters = letters.length;

  const finalTransition = {
    ...BASE_TRANSITION,
    ...transition,
    duration: (transition as { duration?: number })?.duration ?? duration,
  };

  const containerVariants = {
    hidden: { rotate: 0 },
    visible: { rotate: reverse ? -360 : 360 },
    ...variants?.container,
  };

  const viewBoxSize = 200;
  const cx = viewBoxSize / 2;
  const cy = viewBoxSize / 2;
  const svgRadius = radius * (viewBoxSize / 20); 
  const fontSizePx = fontSize * (viewBoxSize / 20);

  return (
    <div
      className={cn('relative flex items-center justify-center shrink-0', className)}
      style={style}
    >
      {/* Spinning Text Layer */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        transition={finalTransition}
      >
        <svg
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
        >
          {letters.map((letter, index) => {
            const angleDeg = (360 / totalLetters) * index - 90;
            const angleRad = (angleDeg * Math.PI) / 180;
            const x = cx + svgRadius * Math.cos(angleRad);
            const y = cy + svgRadius * Math.sin(angleRad);
            const glyphRotation = angleDeg + 90;

            return (
              <text
                key={`${index}-${letter}`}
                x={x}
                y={y}
                fontSize={fontSizePx}
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily={fontFamily}
                fontWeight="700"
                letterSpacing="0.05em"
                textRendering="geometricPrecision"
                fill={color}
                transform={`rotate(${glyphRotation}, ${x}, ${y})`}
              >
                {letter}
              </text>
            );
          })}
        </svg>
      </motion.div>

      {centerIcon && (
        <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
          {centerIcon}
        </div>
      )}

      <span className="sr-only">{children}</span>
    </div>
  );
}
