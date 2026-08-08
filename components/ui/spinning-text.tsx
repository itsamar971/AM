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

  // SVG viewBox is 200×200 units.
  // radius prop (in "rem-like" units) is scaled: radius=6 → svgRadius=60
  const viewBoxSize = 200;
  const cx = viewBoxSize / 2;
  const cy = viewBoxSize / 2;
  const svgRadius = radius * (viewBoxSize / 20); // radius=6 → 60px in 200-unit viewBox
  const fontSizePx = fontSize * (viewBoxSize / 20); // fontSize=1 → 10px in viewBox

  return (
    <motion.div
      className={cn('relative', className)}
      style={{ ...style }}
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
          // Start from 12 o'clock (-90°) and go clockwise
          const angleDeg = (360 / totalLetters) * index - 90;
          const angleRad = (angleDeg * Math.PI) / 180;
          const x = cx + svgRadius * Math.cos(angleRad);
          const y = cy + svgRadius * Math.sin(angleRad);
          // Rotate each glyph so it reads outward along the circle
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
      <span
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        {children}
      </span>
    </motion.div>
  );
}
