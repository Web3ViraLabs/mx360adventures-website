"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "done";

const THUMB = 52; // px
const PAD = 4; // px inset

/** True for touch / coarse pointers (after mount, to avoid hydration mismatch). */
function useCoarsePointer() {
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setCoarse(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return coarse;
}

export function SlideToConfirm({
  label = "Slide to confirm",
  confirmedLabel = "Confirmed",
  onConfirm,
  disabled = false,
  autoReset = true,
  className,
}: {
  label?: string;
  confirmedLabel?: string;
  /** May be async; the control shows a loading state until it settles. */
  onConfirm: () => void | Promise<void>;
  disabled?: boolean;
  autoReset?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const coarse = useCoarsePointer();
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxX, setMaxX] = useState(0);
  const [status, setStatus] = useState<Status>("idle");

  const x = useMotionValue(0);
  const progress = useTransform(x, [0, Math.max(maxX, 1)], [0, 1]);
  const labelOpacity = useTransform(progress, [0, 0.55], [1, 0]);
  const fillWidth = useTransform(x, (v) => v + THUMB + PAD);

  // Measure travel distance.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => setMaxX(el.clientWidth - THUMB - PAD * 2);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const settle = useCallback(
    async (toEnd: boolean) => {
      if (!toEnd) {
        animate(x, 0, { type: "spring", stiffness: 500, damping: 40 });
        return;
      }
      animate(x, maxX, { type: "spring", stiffness: 500, damping: 42 });
      setStatus("loading");
      try {
        await onConfirm();
        setStatus("done");
      } catch {
        setStatus("idle");
        animate(x, 0, { type: "spring", stiffness: 500, damping: 40 });
        return;
      }
      if (autoReset) {
        window.setTimeout(() => {
          setStatus("idle");
          animate(x, 0, { duration: 0.3 });
        }, 1100);
      }
    },
    [x, maxX, onConfirm, autoReset]
  );

  const trigger = useCallback(() => {
    if (disabled || status !== "idle") return;
    settle(true);
  }, [disabled, status, settle]);

  // Desktop (fine pointer) or reduced-motion → plain accessible button.
  if (!coarse || reduce) {
    return (
      <button
        type="button"
        disabled={disabled || status === "loading"}
        onClick={trigger}
        className={cn(
          "relative flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-ember)] px-6 font-display text-base font-bold text-white shadow-[var(--shadow-glow)] transition-[transform,opacity] hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      >
        {status === "loading" ? (
          <Loader2 className="size-5 animate-spin" />
        ) : status === "done" ? (
          <>
            <Check className="size-5" /> {confirmedLabel}
          </>
        ) : (
          <>
            {label} <ArrowRight className="size-5" />
          </>
        )}
      </button>
    );
  }

  return (
    <div
      ref={trackRef}
      role="slider"
      tabIndex={disabled ? -1 : 0}
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={status === "done" ? 100 : 0}
      aria-disabled={disabled}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight") {
          e.preventDefault();
          trigger();
        }
      }}
      className={cn(
        "relative h-14 w-full select-none overflow-hidden rounded-full border border-border bg-secondary",
        disabled && "opacity-50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
    >
      {/* Ember fill that grows behind the thumb */}
      <motion.div
        style={{ width: fillWidth }}
        className="absolute inset-y-0 left-0 rounded-full bg-[image:var(--gradient-ember)]"
        aria-hidden
      />

      {/* Centered label / status */}
      <motion.span
        style={{ opacity: status === "idle" ? labelOpacity : 1 }}
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center gap-2 font-display text-sm font-bold text-foreground/70"
        aria-hidden
      >
        {status === "loading" ? (
          <Loader2 className="size-5 animate-spin text-white" />
        ) : status === "done" ? (
          <span className="flex items-center gap-2 text-white">
            <Check className="size-5" /> {confirmedLabel}
          </span>
        ) : (
          label
        )}
      </motion.span>

      {/* Draggable thumb */}
      <motion.button
        type="button"
        aria-hidden
        tabIndex={-1}
        drag={status === "idle" && !disabled ? "x" : false}
        dragConstraints={{ left: 0, right: maxX }}
        dragElastic={0.02}
        dragMomentum={false}
        style={{ x, width: THUMB, height: THUMB }}
        onDragEnd={() => settle(x.get() >= maxX * 0.85)}
        whileTap={{ scale: 0.96 }}
        className="absolute left-1 top-1 z-20 grid cursor-grab place-items-center rounded-full bg-white text-ember-600 shadow-md active:cursor-grabbing"
      >
        {status === "done" ? <Check className="size-5" /> : <ArrowRight className="size-5" />}
      </motion.button>
    </div>
  );
}
