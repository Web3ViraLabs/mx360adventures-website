"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Scroll-linked vertical parallax. As the element travels through the viewport
 * its children drift by ±`distance`px. Transform-only; disabled under reduced
 * motion. Wrap a slightly over-sized image so the drift never reveals an edge.
 */
export function Parallax({
  children,
  className,
  distance = 60,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y: reduce ? 0 : y }} className="relative h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
