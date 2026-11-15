import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Planet = { label: string; size: number; color: string; ring?: boolean };

const PLANETS: Planet[] = [
  {
    label: "Name",
    size: 12,
    color: "radial-gradient(circle at 30% 30%, #e0e1ff, #8486ff)",
  },
  {
    label: "Role",
    size: 15,
    color: "radial-gradient(circle at 30% 30%, #c4d4ff, #5d83ff)",
  },
  {
    label: "Session",
    size: 18,
    color: "radial-gradient(circle at 30% 30%, #e9d5ff, #9a70ff)",
  },
  {
    label: "Rating",
    size: 16,
    color: "radial-gradient(circle at 30% 30%, #f5e6c8, #c9a46b)",
    ring: true,
  },
  {
    label: "Review",
    size: 14,
    color: "radial-gradient(circle at 30% 30%, #cffafe, #38bdf8)",
  },
];

/**
 * Progress shown as a small planetary system: a comet travels along the
 * orbit line and each planet lights up as its question is reached.
 */
export default function OrbitProgress({ step }: { step: number }) {
  const pct = (step / (PLANETS.length - 1)) * 100;

  return (
    <div className="relative px-6 pb-6 pt-3">
      {/* orbit track */}
      <div className="absolute left-6 right-6 top-[21px] h-px border-t border-dashed border-muted-foreground/30" />
      <div className="absolute left-6 right-6 top-[20px] h-[3px]">
        <motion.div
          className="relative h-full rounded-full bg-gradient-to-r from-transparent via-primary/60 to-primary"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 70, damping: 16 }}
        >
          {/* comet head */}
          <span className="absolute -right-1.5 -top-[5px] h-3.5 w-3.5 rounded-full bg-white shadow-[0_0_12px_4px_rgba(132,134,255,.9),0_0_30px_8px_rgba(132,134,255,.4)]" />
        </motion.div>
      </div>

      <div className="relative flex items-start justify-between">
        {PLANETS.map((p, i) => {
          const reached = i <= step;
          const current = i === step;
          return (
            <div key={p.label} className="flex w-0 flex-col items-center">
              <div className="relative flex h-9 w-9 items-center justify-center">
                {current && (
                  <motion.div
                    className="absolute inset-0 rounded-full border border-primary/40"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <span className="absolute -top-[3px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white shadow-[0_0_6px_2px_rgba(255,255,255,.7)]" />
                  </motion.div>
                )}
                <motion.div
                  className="relative rounded-full"
                  style={{ width: p.size, height: p.size, background: p.color }}
                  initial={false}
                  animate={{
                    opacity: reached ? 1 : 0.25,
                    scale: current ? 1.25 : 1,
                    boxShadow: reached
                      ? "0 0 14px rgba(132,134,255,.7), inset -3px -2px 5px rgba(0,0,0,.45)"
                      : "0 0 0px rgba(0,0,0,0), inset -3px -2px 5px rgba(0,0,0,.45)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 14,
                    delay: reached ? 0.35 : 0,
                  }}
                >
                  {p.ring && (
                    <span className="absolute left-1/2 top-1/2 h-[45%] w-[220%] -translate-x-1/2 -translate-y-1/2 -rotate-[20deg] rounded-full border border-[#e8d3a8]/70" />
                  )}
                </motion.div>
              </div>
              <span
                className={cn(
                  "clash-grotesk mt-1 whitespace-nowrap text-[10px] uppercase tracking-widest transition-colors sm:text-xs",
                  current ? "text-foreground" : "text-muted-foreground/60",
                )}
              >
                {p.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
