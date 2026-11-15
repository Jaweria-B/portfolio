/**
 * Feedback form backend (Google Apps Script).
 * Paste this into Extensions > Apps Script of your feedback Google Sheet.
 * See docs/feedback-setup.md for the full steps.
 *
 * Sheet columns (row 1):
 * Timestamp | Name | Role | Rating | Message | Session type | Approved
 */
const SHEET_NAME = "Feedback";

// ---- Automatic feedback emails (optional) ----
// Your website's feedback page:
const FEEDBACK_URL = "https://YOUR-SITE.com/feedback";
// Only calendar events whose title contains this tag get a feedback email.
const SESSION_TAG = "[Session]";
// Session types recognised in the event title, e.g. "[Session] Mentoring with Ali".
const SESSION_TYPES = ["Mentoring", "Collaboration", "Consultation"];
const YOUR_NAME = "Jaweria";

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(["Timestamp", "Name", "Role", "Rating", "Message", "Session type", "Approved"]);
    sheet.getRange("G2:G").insertCheckboxes();
  }
  return sheet;
}

// Saves a new feedback submission. New rows start unapproved.
function doPost(e) {
  const p = (e && e.parameter) || {};
  const clean = (v, max) => String(v || "").trim().slice(0, max);
  const rating = Math.max(1, Math.min(5, parseInt(p.rating, 10) || 0));
  const sheet = getSheet_();
  sheet.appendRow([
    new Date(),
    clean(p.name, 100),
    clean(p.role, 150),
    rating,
    clean(p.message, 2000),
    clean(p.sessionType, 50),
    false,
  ]);
  sheet.getRange(sheet.getLastRow(), 7).insertCheckboxes();
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Returns only the approved reviews, newest first, for the website.
function doGet() {
  const rows = getSheet_().getDataRange().getValues().slice(1);
  const reviews = rows
    .filter((r) => r[6] === true)
    .reverse()
    .map((r) => ({
      name: String(r[1]),
      role: String(r[2]),
      rating: Number(r[3]) || 5,
      message: String(r[4]),
      sessionType: String(r[5]),
    }));
  return ContentService.createTextOutput(JSON.stringify({ reviews }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Runs every 15 minutes (after you run setupTrigger once). Finds tagged
// meetings that ended in the last 24 hours and emails each guest the
// feedback link once.
function sendFeedbackEmails() {
  const now = new Date();
  const since = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const props = PropertiesService.getScriptProperties();
  const me = Session.getEffectiveUser().getEmail().toLowerCase();
  const events = CalendarApp.getDefaultCalendar().getEvents(since, now);

  events.forEach((event) => {
    const title = event.getTitle();
    if (title.indexOf(SESSION_TAG) === -1) return;
    if (event.getEndTime() > now) return; // not finished yet
    const key = "sent_" + event.getId() + "_" + event.getEndTime().getTime();
    if (props.getProperty(key)) return; // already emailed

    const type = SESSION_TYPES.find((t) => title.toLowerCase().indexOf(t.toLowerCase()) !== -1) || "";
    event.getGuestList().forEach((guest) => {
      const email = guest.getEmail();
      if (!email || email.toLowerCase() === me) return;
      const name = guest.getName() && guest.getName() !== email ? guest.getName() : "";
      let link = FEEDBACK_URL + "?";
      if (name) link += "name=" + encodeURIComponent(name) + "&";
      if (type) link += "type=" + encodeURIComponent(type);
      link = link.replace(/[?&]$/, "");
      const greeting = name ? "Hi " + name.split(" ")[0] + "," : "Hi,";
      MailApp.sendEmail({
        to: email,
        subject: "Thanks for the session! Could you share quick feedback?",
        htmlBody:
          "<p>" + greeting + "</p>" +
          "<p>Thank you for your time today. How would you rate the session? Tap a star:</p>" +
          starsHtml_(link) +
          '<p style="color:#666;font-size:13px">Or <a href="' + link + '">open the feedback form</a> on my website.</p>' +
          "<p>Thanks,<br>" + YOUR_NAME + "</p>",
        name: YOUR_NAME,
      });
    });
    props.setProperty(key, String(now.getTime()));
  });
}

// Five clickable stars; each opens the website form with that rating chosen.
function starsHtml_(link) {
  let html = '<p style="font-size:0">';
  for (let n = 1; n <= 5; n++) {
    html +=
      '<a href="' + link + (link.indexOf("?") === -1 ? "?" : "&") + "rating=" + n +
      '" style="text-decoration:none;font-size:34px;color:#8486ff;padding:0 4px" title="' +
      n + ' star' + (n > 1 ? "s" : "") + '">&#9733;</a>';
  }
  return html + "</p>";
}

// Run this once from the Apps Script editor to start the automatic emails.
function setupTrigger() {
  ScriptApp.getProjectTriggers()
    .filter((t) => t.getHandlerFunction() === "sendFeedbackEmails")
    .forEach((t) => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger("sendFeedbackEmails").timeBased().everyMinutes(15).create();
}
