"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Route transition wrapper. template.tsx re-mounts on every navigation, so a
 * mount animation here gives subtle page transitions. Opacity/transform only,
 * and disabled under reduced motion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
