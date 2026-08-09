"use client";

import { useEffect, useState } from "react";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { cn } from "@/lib/utils";

export function CustomCursor() {
  const position = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the target or its parents are clickable elements
      if (target.closest("a, button, input, select, textarea, [role='button']")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div
      style={{
        pointerEvents: "none",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 2147483647,
        width: isHovering ? "64px" : "24px",
        height: isHovering ? "64px" : "24px",
        backgroundColor: isHovering ? "rgba(223, 95, 62, 0.9)" : "#DF5F3E",
        border: isHovering ? "none" : "2px solid #000000",
        backdropFilter: "blur(4px)",
        borderRadius: "50%",
        transition: "width 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), height 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.2s, border 0.2s",
        transform: `translate(${position.x - (isHovering ? 32 : 12)}px, ${position.y - (isHovering ? 32 : 12)}px)`,
      }}
    />
  );
}
