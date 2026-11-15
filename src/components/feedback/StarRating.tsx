import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LABELS = ["", "Needs work", "Okay", "Good", "Great", "Excellent"];
const STAR_PATH =
  "M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z";
const SIZE = 44;
const GAP = 12;

type Props = { value: number; onChange: (v: number) => void };

/** Five stars that fall in like meteors, then sparkle when picked. */
export default function StarRating({ value, onChange }: Props) {
  const [hover, setHover] = useState(0);
  const [burst, setBurst] = useState<{ n: number; id: number } | null>(null);
  const active = hover || value;

  function pick(n: number) {
    onChange(n);
    setBurst({ n, id: Date.now() });
  }

  return (
    <div>
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <linearGradient id="starFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c7c9ff" />
            <stop offset="50%" stopColor="#8486ff" />
            <stop offset="100%" stopColor="#5d83ff" />
          </linearGradient>
        </defs>
      </svg>

      <div
        className="flex"
        style={{ gap: GAP }}
        onMouseLeave={() => setHover(0)}
        role="radiogroup"
        aria-label="Rating"
      >
        {[1, 2, 3, 4, 5].map((n) => {
          const on = n <= active;
          return (
            <motion.button
              key={n}
              type="button"
              role="radio"
              aria-checked={value === n}
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              onClick={() => pick(n)}
              onMouseEnter={() => setHover(n)}
              whileHover={{ scale: 1.15, rotate: 6 }}
              whileTap={{ scale: 0.85 }}
              // each star falls in like a meteor
              initial={{ opacity: 0, x: 140, y: -170, scale: 0.3, rotate: -40 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 13,
                delay: 0.25 + n * 0.11,
              }}
              className="relative rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              style={{ width: SIZE, height: SIZE }}
            >
              {/* meteor tail, fades once the star lands */}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 h-[2px] w-24 origin-left rounded-full bg-gradient-to-r from-white via-primary/70 to-transparent"
                style={{ rotate: -50 }}
                initial={{ opacity: 0, scaleX: 1 }}
                animate={{ opacity: [0, 1, 0], scaleX: [1, 1, 0] }}
                transition={{
                  duration: 0.75,
                  delay: 0.25 + n * 0.11,
                  times: [0, 0.2, 1],
                }}
              />
              <svg
                viewBox="0 0 24 24"
                width={SIZE}
                height={SIZE}
                className="relative overflow-visible"
              >
                <path
                  d={STAR_PATH}
                  fill={on ? "url(#starFill)" : "transparent"}
                  stroke={on ? "#a5a7ff" : "hsl(var(--muted-foreground))"}
                  strokeWidth={1.2}
                  strokeLinejoin="round"
                  style={{
                    filter: on
                      ? "drop-shadow(0 0 8px rgba(132,134,255,.65))"
                      : "none",
                    transition: "fill .2s, stroke .2s, filter .2s",
                  }}
                />
              </svg>

              <AnimatePresence>
                {burst && burst.n === n && (
                  <span
                    key={burst.id}
                    className="pointer-events-none absolute inset-0"
                  >
                    {Array.from({ length: 8 }).map((_, i) => {
                      const a = (i / 8) * Math.PI * 2;
                      return (
                        <motion.span
                          key={i}
                          className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-primary"
                          initial={{ x: -2, y: -2, opacity: 1 }}
                          animate={{
                            x: Math.cos(a) * 30 - 2,
                            y: Math.sin(a) * 30 - 2,
                            opacity: 0,
                          }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          onAnimationComplete={() => i === 0 && setBurst(null)}
                        />
                      );
                    })}
                  </span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-3 h-6">
        <AnimatePresence mode="wait">
          {active > 0 && (
            <motion.span
              key={active}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="text-gradient clash-grotesk text-lg font-medium"
            >
              {LABELS[active]}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
