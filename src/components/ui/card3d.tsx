"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export function Card3D({ children, className = "", intensity = 7 }: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 280, damping: 28 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), spring);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), spring);
  const gloss  = useTransform(x, [-0.5, 0.5], ["-40%", "140%"]);
  const glossY = useTransform(y, [-0.5, 0.5], ["-40%", "140%"]);

  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top)  / r.height - 0.5);
  };
  const leave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={move}
      onMouseLeave={leave}
      className={cn("cursor-default", className)}
    >
      {/* Gloss overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(circle at ${gloss} ${glossY}, rgba(255,255,255,0.06) 0%, transparent 60%)`,
        }}
      />
      {children}
    </motion.div>
  );
}
