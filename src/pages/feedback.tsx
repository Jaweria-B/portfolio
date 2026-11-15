import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ChevronLeft, ChevronRight, CornerDownLeft } from "lucide-react";
import Container from "@/components/Container";
import Gradient from "@/components/Gradient";
import CosmicTransition, {
  SWALLOW_DURATION,
} from "@/components/feedback/CosmicTransition";
import OrbitProgress from "@/components/feedback/OrbitProgress";
import StarRating from "@/components/feedback/StarRating";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FEEDBACK_ENDPOINT, SESSION_TYPES } from "@/lib/feedback";

type StepId = "name" | "role" | "type" | "rating" | "message";
const STEPS: StepId[] = ["name", "role", "type", "rating", "message"];

/**
 * Space-themed question transitions. Every question leaves by spiralling into
 * a black hole; the next one is born from the supernova that follows, each
 * with its own entrance.
 */
type Entrance = "supernova" | "orbit" | "gravity" | "meteor" | "warp";
const ENTRANCE: Record<StepId, Entrance> = {
  name: "supernova",
  role: "orbit",
  type: "gravity",
  rating: "meteor",
  message: "warp",
};

const swallow = (dir: number) => ({
  opacity: 0,
  scale: 0.04,
  rotate: dir * -160,
  originX: 0.5,
  originY: 0.5,
  filter: "blur(6px) brightness(1.5)",
  transition: { duration: SWALLOW_DURATION, ease: [0.55, 0, 0.9, 0.35] },
});

const arrived = (originX = 0.5) => ({
  opacity: 1,
  x: 0,
  y: 0,
  scale: 1,
  scaleX: 1,
  rotate: 0,
  originX,
  filter: "blur(0px) brightness(1)",
  transition: {
    type: "spring",
    stiffness: 90,
    damping: 15,
    staggerChildren: 0.09,
    delayChildren: 0.12,
  },
});

const ENTRANCES: Record<Entrance, Variants> = {
  // bursts out of the flash
  supernova: {
    enter: {
      opacity: 0,
      scale: 0.15,
      filter: "blur(18px) brightness(3)",
      originX: 0.5,
    },
    center: arrived(),
    exit: swallow,
  },
  // swings in along an orbit around a point far to the left
  orbit: {
    enter: {
      opacity: 0,
      rotate: 32,
      originX: -0.8,
      originY: 0.5,
      filter: "blur(8px) brightness(1.6)",
    },
    center: arrived(-0.8),
    exit: swallow,
  },
  // pulled down by gravity from above, slightly oversized
  gravity: {
    enter: {
      opacity: 0,
      y: -120,
      scale: 1.25,
      filter: "blur(10px) brightness(1.6)",
      originX: 0.5,
    },
    center: arrived(),
    exit: swallow,
  },
  // streaks in diagonally from the top right
  meteor: {
    enter: {
      opacity: 0,
      x: 220,
      y: -140,
      rotate: -8,
      filter: "blur(10px) brightness(2)",
      originX: 0.5,
    },
    center: arrived(),
    exit: swallow,
  },
  // drops out of light speed, stretched then snapping into shape
  warp: {
    enter: {
      opacity: 0,
      x: 380,
      scaleX: 3,
      originX: 1,
      filter: "blur(14px) brightness(2)",
    },
    center: arrived(1),
    exit: swallow,
  },
};

const calm: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

// Answer options arrive like moons settling into orbit from different sides.
const moonIn: Variants = {
  enter: (i: number) => {
    const a = [-2.4, -0.7, 2.4, 0.7][i % 4]!;
    return {
      opacity: 0,
      x: Math.cos(a) * 260,
      y: Math.sin(a) * 160,
      scale: 0.3,
      rotate: i % 2 ? 40 : -40,
    };
  },
  center: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 80, damping: 13 },
  },
  exit: { opacity: 0 },
};

const MOON_COLORS = [
  "radial-gradient(circle at 30% 30%, #e0e1ff, #8486ff)",
  "radial-gradient(circle at 30% 30%, #e9d5ff, #9a70ff)",
  "radial-gradient(circle at 30% 30%, #c4d4ff, #5d83ff)",
  "radial-gradient(circle at 30% 30%, #cffafe, #38bdf8)",
];

const child: Variants = {
  enter: { opacity: 0, y: 16 },
  center: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 160, damping: 18 },
  },
  exit: { opacity: 0 },
};

const inputClass =
  "w-full border-0 border-b-2 border-muted bg-transparent pb-3 text-2xl font-light text-foreground caret-primary transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none sm:text-3xl";

export default function FeedbackPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [sessionType, setSessionType] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [visits, setVisits] = useState(0);
  const advanceTimer = useRef<ReturnType<typeof setTimeout>>();
  const reduceMotion = useReducedMotion();
  const fieldRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  // Wait for the site's "Hello" preloader to finish so the first big bang is seen.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 2300);
    return () => clearTimeout(t);
  }, []);

  // Pre-fill from the link, e.g. /feedback?name=Ali&type=Mentoring&rating=5
  useEffect(() => {
    if (!router.isReady) return;
    const q = router.query;
    if (typeof q.name === "string") setName(q.name);
    if (typeof q.role === "string") setRole(q.role);
    if (typeof q.type === "string") setSessionType(q.type);
    const r = Number(q.rating);
    if (Number.isInteger(r) && r >= 1 && r <= 5) setRating(r);
  }, [router.isReady, router.query]);

  useEffect(() => () => clearTimeout(advanceTimer.current), []);

  const current = STEPS[step]!;

  // Focus the text box once a question has landed, without scrolling the
  // page while it is still flying in.
  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(
      () => fieldRef.current?.focus({ preventScroll: true }),
      900,
    );
    return () => clearTimeout(t);
  }, [current, ready]);
  const isLast = step === STEPS.length - 1;

  function validate(id: StepId) {
    if (id === "name" && !name.trim()) return "Please tell me your name.";
    if (id === "rating" && rating === 0) return "Please pick a rating.";
    if (id === "message" && !message.trim())
      return "A few words would mean a lot.";
    return "";
  }

  function go(delta: number) {
    clearTimeout(advanceTimer.current);
    if (delta > 0) {
      const err = validate(current);
      if (err) return setError(err);
    }
    const next = Math.min(STEPS.length - 1, Math.max(0, step + delta));
    if (next === step) return;
    setError("");
    setDir(delta);
    setVisits((v) => v + 1);
    setStep(next);
  }

  function autoAdvance() {
    clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(() => {
      setError("");
      setDir(1);
      setVisits((v) => v + 1);
      setStep((s) => Math.min(STEPS.length - 1, s + 1));
    }, 650);
  }

  async function submit() {
    const err = STEPS.map(validate).find(Boolean);
    if (err) return setError(err);
    if (!FEEDBACK_ENDPOINT) {
      return setError(
        "The feedback form isn't connected yet. Please try again later.",
      );
    }
    setSending(true);
    setError("");
    try {
      const body = new URLSearchParams({
        name: name.trim(),
        role: role.trim(),
        rating: String(rating),
        message: message.trim(),
        sessionType,
      });
      // Apps Script doesn't send CORS headers for POST, so the response is
      // opaque; a network failure still throws and is handled below.
      await fetch(FEEDBACK_ENDPOINT, { method: "POST", mode: "no-cors", body });
      setSent(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Something went wrong sending your feedback. Please try again.");
    } finally {
      setSending(false);
    }
  }

  // Enter moves to the next question from anywhere on the page.
  const keyHandler = useRef<(e: globalThis.KeyboardEvent) => void>();
  keyHandler.current = (e) => {
    if (e.key !== "Enter" || !ready || sent || sending) return;
    const target = e.target as HTMLElement | null;
    // let buttons and links handle their own Enter
    if (target && ["BUTTON", "A"].includes(target.tagName)) return;
    // In the message box, Enter adds a new line; Ctrl/Cmd + Enter sends.
    if (current === "message" && !(e.metaKey || e.ctrlKey)) return;
    e.preventDefault();
    if (isLast) void submit();
    else go(1);
  };
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => keyHandler.current?.(e);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <Container title="Session Feedback | Jaweria">
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <Gradient />

      {/* clip the flying effects so they never cause sideways scrolling */}
      <div className="w-full overflow-x-clip">
        <section className="mx-auto mb-24 mt-40 flex min-h-[60vh] w-full max-w-2xl flex-col">
          <AnimatePresence mode="wait">
            {!ready ? null : sent ? (
              <ThankYou key="thanks" name={name} />
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
                  ✨ Session feedback
                </span>

                {/* progress as a little planetary system */}
                <div className="mt-6">
                  <OrbitProgress step={step} />
                </div>

                <div className="relative mt-10 min-h-[320px]">
                  {!reduceMotion && (
                    <CosmicTransition key={visits} first={visits === 0} />
                  )}
                  <AnimatePresence mode="wait" custom={dir}>
                    <motion.div
                      key={current}
                      custom={dir}
                      className="relative z-10"
                      variants={
                        reduceMotion ? calm : ENTRANCES[ENTRANCE[current]]
                      }
                      initial="enter"
                      animate="center"
                      exit="exit"
                    >
                      {current === "name" && (
                        <Question
                          title={
                            <>
                              Hi there! What&apos;s your <Accent>name?</Accent>
                            </>
                          }
                          hint="This is how your review will be signed."
                        >
                          <input
                            ref={fieldRef as never}
                            className={inputClass}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Ayesha Khan"
                            autoComplete="name"
                          />
                        </Question>
                      )}

                      {current === "role" && (
                        <Question
                          title={
                            <>
                              What do you <Accent>do?</Accent>
                            </>
                          }
                          hint="Your role or company. Optional, feel free to skip."
                        >
                          <input
                            ref={fieldRef as never}
                            className={inputClass}
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            placeholder="e.g. Founder at Acme"
                            autoComplete="organization-title"
                          />
                        </Question>
                      )}

                      {current === "type" && (
                        <Question
                          title={
                            <>
                              What was the session <Accent>about?</Accent>
                            </>
                          }
                          hint="Pick one. Optional."
                        >
                          <div className="grid gap-3 sm:grid-cols-2">
                            {SESSION_TYPES.map((t, i) => {
                              const selected = sessionType === t;
                              return (
                                <motion.button
                                  key={t}
                                  type="button"
                                  variants={reduceMotion ? child : moonIn}
                                  custom={i}
                                  whileHover={{ x: 4 }}
                                  whileTap={{ scale: 0.97 }}
                                  onClick={() => {
                                    setSessionType(selected ? "" : t);
                                    if (!selected) autoAdvance();
                                  }}
                                  aria-pressed={selected}
                                  className={cn(
                                    "flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-base transition-colors",
                                    selected
                                      ? "border-primary bg-primary/10 text-foreground"
                                      : "border-muted text-muted-foreground hover:border-primary/60 hover:text-foreground",
                                  )}
                                >
                                  <span className="relative flex h-7 w-7 items-center justify-center">
                                    {selected && (
                                      <motion.span
                                        className="absolute inset-0 rounded-full border border-primary/60"
                                        animate={{ rotate: 360 }}
                                        transition={{
                                          duration: 3,
                                          repeat: Infinity,
                                          ease: "linear",
                                        }}
                                      >
                                        <span className="absolute -top-[2px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white" />
                                      </motion.span>
                                    )}
                                    <span
                                      className="h-4 w-4 rounded-full"
                                      style={{
                                        background:
                                          MOON_COLORS[i % MOON_COLORS.length],
                                        boxShadow: selected
                                          ? "0 0 12px rgba(132,134,255,.9), inset -2px -2px 4px rgba(0,0,0,.4)"
                                          : "inset -2px -2px 4px rgba(0,0,0,.4)",
                                      }}
                                    />
                                  </span>
                                  {t}
                                </motion.button>
                              );
                            })}
                          </div>
                        </Question>
                      )}

                      {current === "rating" && (
                        <Question
                          title={
                            <>
                              How would you rate the <Accent>session?</Accent>
                            </>
                          }
                          hint="Tap a star."
                        >
                          <StarRating
                            value={rating}
                            onChange={(v) => {
                              setRating(v);
                              setError("");
                              autoAdvance();
                            }}
                          />
                        </Question>
                      )}

                      {current === "message" && (
                        <Question
                          title={
                            <>
                              What did you find most <Accent>helpful?</Accent>
                            </>
                          }
                          hint="A sentence or two is perfect."
                        >
                          <textarea
                            ref={fieldRef as never}
                            className={cn(
                              inputClass,
                              "min-h-[120px] resize-none text-xl sm:text-2xl",
                            )}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="What you learned, or what helped most"
                            maxLength={2000}
                          />
                        </Question>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="h-6">
                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: [0, -6, 6, -3, 0] }}
                        exit={{ opacity: 0 }}
                        className="text-sm text-rose-300"
                        role="alert"
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* navigation */}
                <div className="mt-6 flex items-center justify-between gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => go(-1)}
                    className={cn(
                      step === 0 && "pointer-events-none opacity-0",
                    )}
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" /> Back
                  </Button>

                  <div className="flex items-center gap-4">
                    {!isLast && (
                      <span className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
                        press Enter <CornerDownLeft className="h-3 w-3" />
                      </span>
                    )}
                    {isLast ? (
                      <Button
                        type="button"
                        onClick={() => void submit()}
                        disabled={sending}
                      >
                        {sending ? "Sending..." : "Send feedback"}
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button type="button" onClick={() => go(1)}>
                        {current === "role" || current === "type"
                          ? (current === "role" ? role : sessionType)
                            ? "Next"
                            : "Skip"
                          : "Next"}
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </Container>
  );
}

function Accent({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-gradient clash-grotesk tracking-normal">
      {children}
    </span>
  );
}

function Question({
  title,
  hint,
  children,
}: {
  title: React.ReactNode;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <motion.h1
        variants={child}
        className="text-4xl font-medium tracking-tight sm:text-5xl"
      >
        {title}
      </motion.h1>
      <motion.p
        variants={child}
        className="mt-3 text-base text-muted-foreground sm:text-lg"
      >
        {hint}
      </motion.p>
      <motion.div variants={child} className="mt-10">
        {children}
      </motion.div>
    </div>
  );
}

function ThankYou({ name }: { name: string }) {
  const first = name.trim().split(" ")[0];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ type: "spring", stiffness: 90, damping: 16 }}
      className="flex flex-col items-center py-10 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 160, damping: 12, delay: 0.2 }}
        className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary shadow-[0_0_60px_-10px_rgba(132,134,255,.8)]"
      >
        <motion.span
          className="absolute -inset-6 rounded-full border border-primary/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-white shadow-[0_0_12px_3px_rgba(255,255,255,.7)]" />
        </motion.span>
        <svg
          viewBox="0 0 24 24"
          className="h-10 w-10 text-black"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            d="M5 12.5l4.5 4.5L19 7.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
          />
        </svg>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-4xl font-medium tracking-tight xl:text-6xl"
      >
        Thank you{first ? `, ${first}` : ""}.{" "}
        <span className="text-gradient clash-grotesk tracking-normal">
          Truly.
        </span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
        className="mt-3 text-base text-muted-foreground xl:text-lg"
      >
        Your feedback has been received. I really appreciate you taking the
        time.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Link href="/" passHref>
          <Button className="mt-8">
            Back to my work <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
