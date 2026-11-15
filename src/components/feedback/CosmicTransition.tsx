import { useMemo } from "react";
import { motion } from "framer-motion";

/** How long the black hole takes to swallow the previous question. */
export const SWALLOW_DURATION = 0.45;

type Props = {
  /** Skip the black hole on the very first question (nothing to swallow). */
  first: boolean;
};

/**
 * Plays between questions: a black hole opens and swallows the old question,
 * collapses, then a supernova flash, a shockwave ring and a burst of stardust
 * give birth to the next one. Re-mount with a new `key` to replay.
 */
export default function CosmicTransition({ first }: Props) {
  const birth = first ? 0.1 : SWALLOW_DURATION;

  const dust = useMemo(
    () =>
      Array.from({ length: 34 }, () => {
        const angle = Math.random() * Math.PI * 2;
        const dist = 90 + Math.random() * 260;
        return {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist * 0.6,
          size: 1.5 + Math.random() * 2.5,
          duration: 0.8 + Math.random() * 0.8,
          color:
            Math.random() < 0.3
              ? "#c4b5fd"
              : Math.random() < 0.5
                ? "#a5b4fc"
                : "#ffffff",
        };
      }),
    [],
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-[45%] z-0 h-0 w-0"
    >
      {/* black hole with spinning accretion disk */}
      {!first && (
        <motion.div
          className="absolute -left-12 -top-12 h-24 w-24"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.15, 1, 0], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: SWALLOW_DURATION + 0.1,
            times: [0, 0.35, 0.75, 1],
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent, rgba(132,134,255,.9), rgba(192,132,252,.7), transparent 55%, rgba(93,131,255,.8), transparent)",
              filter: "blur(4px)",
            }}
            animate={{ rotate: 720 }}
            transition={{ duration: SWALLOW_DURATION + 0.1, ease: "linear" }}
          />
          <div className="absolute inset-[22%] rounded-full bg-background shadow-[0_0_25px_8px_rgba(0,0,0,.9)]" />
        </motion.div>
      )}

      {/* supernova flash */}
      <motion.div
        className="absolute -left-20 -top-20 h-40 w-40 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,.95), rgba(132,134,255,.55) 35%, transparent 70%)",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.6, 2.4], opacity: [0, 0.9, 0] }}
        transition={{ duration: 0.7, delay: birth, ease: "easeOut" }}
      />

      {/* shockwave ring */}
      <motion.div
        className="absolute -left-10 -top-10 h-20 w-20 rounded-full border-2 border-primary/80"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 7], opacity: [0.9, 0], borderWidth: [3, 0.5] }}
        transition={{ duration: 0.9, delay: birth, ease: "easeOut" }}
      />

      {/* stardust */}
      {dust.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            width: d.size,
            height: d.size,
            background: d.color,
            boxShadow: `0 0 ${d.size * 3}px ${d.color}`,
          }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 1 }}
          animate={{ x: d.x, y: d.y, opacity: [0, 1, 0], scale: [1, 1, 0.3] }}
          transition={{
            duration: d.duration,
            delay: birth,
            ease: [0.1, 0.8, 0.3, 1],
          }}
        />
      ))}
    </div>
  );
}
