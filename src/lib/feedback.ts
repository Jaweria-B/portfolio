/**
 * Feedback + reviews config.
 *
 * Submissions are saved to a Google Sheet through a Google Apps Script web app
 * (see docs/feedback-setup.md). Put the web app URL in the
 * NEXT_PUBLIC_FEEDBACK_ENDPOINT environment variable.
 */
export const FEEDBACK_ENDPOINT = process.env.NEXT_PUBLIC_FEEDBACK_ENDPOINT ?? "";

/** Session types offered on the form. Keep in sync with booking types. */
export const SESSION_TYPES = [
  "Mentoring",
  "Collaboration",
  "Consultation",
  "Other",
] as const;

export type Review = {
  name: string;
  role: string;
  rating: number;
  message: string;
  sessionType: string;
};
