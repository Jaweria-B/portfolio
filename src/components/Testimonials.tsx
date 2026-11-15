import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { FEEDBACK_ENDPOINT, type Review } from "@/lib/feedback";

/**
 * Shows reviews marked "Approved" in the feedback Google Sheet.
 * Renders nothing until there is at least one approved review.
 */
export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (!FEEDBACK_ENDPOINT) return;
    let cancelled = false;
    fetch(FEEDBACK_ENDPOINT)
      .then((r) => r.json() as Promise<{ reviews?: Review[] }>)
      .then((data) => {
        if (!cancelled && Array.isArray(data.reviews)) setReviews(data.reviews);
      })
      .catch(() => {
        /* keep section hidden on failure */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (reviews.length === 0) return null;

  return (
    <section id="reviews" data-scroll-section className="my-32">
      <div data-scroll data-scroll-speed=".4" data-scroll-position="top">
        <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
          ✨ Reviews
        </span>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
          What people say.
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((r, i) => (
            <figure
              key={i}
              className="flex flex-col rounded-lg border bg-card/10 p-6"
            >
              <div className="flex gap-0.5" aria-label={`${r.rating} out of 5`}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    className={
                      n <= r.rating
                        ? "h-4 w-4 fill-primary text-primary"
                        : "h-4 w-4 text-muted-foreground"
                    }
                  />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-base text-foreground/90">
                &ldquo;{r.message}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="font-semibold">{r.name}</span>
                {r.role && (
                  <span className="text-muted-foreground"> · {r.role}</span>
                )}
                {r.sessionType && (
                  <span className="mt-1 block text-xs text-primary">
                    {r.sessionType} session
                  </span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
