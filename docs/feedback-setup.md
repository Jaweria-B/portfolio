# Feedback form setup

The site has a feedback page at `/feedback` and a "What people say" section on
the homepage. Answers are saved to a Google Sheet you own. Only rows you tick as
**Approved** appear on the website.

## 1. Create the sheet (5 minutes)

1. Go to sheets.google.com and create a blank sheet named **Portfolio feedback**.
2. Open **Extensions > Apps Script**.
3. Delete what's in the editor and paste the contents of
   `docs/feedback-apps-script.gs`. Click **Save**.
4. Click **Deploy > New deployment**. Click the gear icon and choose **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy**, allow the permissions Google asks for (choose your account,
   then "Advanced" > "Go to project" if Google shows a warning, since it's your own script).
6. Copy the **Web app URL** (it ends in `/exec`).

## 2. Connect the website

Add an environment variable on your hosting provider (and in a local `.env`):

```
NEXT_PUBLIC_FEEDBACK_ENDPOINT=<the /exec URL you copied>
```

Redeploy the site so the variable takes effect.

## 3. Use it

- After a session, send the person: `https://<your-site>/feedback`
- You can pre-fill details in the link:
  `https://<your-site>/feedback?name=Ali%20Khan&type=Mentoring`
- New answers appear in the **Feedback** tab of the sheet with the
  **Approved** box unticked. Tick it to show that review on the homepage.
  Untick it to hide it again. Changes show up on the next page load.

## 4. Automatic email after each meeting (optional)

The same script can email guests the feedback link when a meeting ends.

1. In the Apps Script editor, change `FEEDBACK_URL` at the top to your real
   feedback page link and `YOUR_NAME` to how you sign emails. Click **Save**.
2. In the function dropdown at the top, choose **setupTrigger** and click **Run**.
   Allow the Calendar and Gmail permissions Google asks for.
3. From now on, put **[Session]** in the title of any meeting that should get a
   feedback email, and add the person as a guest. For example:
   `[Session] Mentoring with Ali`
   If the title contains Mentoring, Collaboration or Consultation, the form
   opens with that session type already chosen.

The script checks every 15 minutes, so the email arrives up to 15 minutes after
the meeting's scheduled end time. Each guest is emailed once per meeting.
Meetings without the tag are ignored.

## Changing things

- Session types in the dropdown: `SESSION_TYPES` in `src/lib/feedback.ts`.
- If you edit the Apps Script later, use **Deploy > Manage deployments > Edit >
  New version** so the same URL keeps working.
