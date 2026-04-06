// ─────────────────────────────────────────────────────────────────────────────
// Email Templates — Professional HTML email templates for the contact form
// ─────────────────────────────────────────────────────────────────────────────

export interface TemplateData {
  safeName: string;
  safeEmail: string;
  safeDescription: string;
  safeBudget: string;
  safeTimeline: string;
  profileUrl: string;
  websiteUrl: string;
  replyEmail: string;
  submittedAt: string; // formatted date string
}

// ── Shared Constants ─────────────────────────────────────────────────────────

const BRAND = {
  name: 'Ahmad Sadiq',
  title: 'Full-Stack Developer',
  accent: '#6366f1',
  accentLight: '#818cf8',
  accentDark: '#4f46e5',
  dark: '#0f172a',
  darkAlt: '#1e293b',
  text: '#334155',
  muted: '#64748b',
  light: '#f8fafc',
  border: '#e2e8f0',
  white: '#ffffff',
  green: '#22c55e',
};

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

// ── Shared Components ────────────────────────────────────────────────────────

function logoMark(): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, ${BRAND.accent}, ${BRAND.accentLight});
          text-align: center;
          vertical-align: middle;
          font-family: ${FONT};
          font-size: 16px;
          font-weight: 700;
          color: ${BRAND.white};
          letter-spacing: 0.05em;
        ">AS</td>
      </tr>
    </table>
  `;
}

function emailWrapper(content: string): string {
  return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>Ahmad Sadiq</title>
  <!--[if mso]>
  <style>table,td {font-family: Arial, sans-serif !important;}</style>
  <![endif]-->
</head>
<body style="margin:0; padding:0; background-color:#f1f5f9; -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f1f5f9;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        ${content}
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function tableRow(label: string, value: string, isLast = false): string {
  return `
    <tr>
      <td style="padding:13px 0; color:${BRAND.muted}; font-family:${FONT}; font-size:14px; width:120px;">${label}</td>
      <td style="padding:13px 0; color:${BRAND.dark}; font-weight:600; text-align:right; font-family:${FONT}; font-size:14px;">${value}</td>
    </tr>
    ${!isLast ? `<tr><td colspan="2"><div style="height:1px; background:${BRAND.border};"></div></td></tr>` : ''}
  `;
}

function summaryCard(title: string, rows: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${BRAND.light}; border:1px solid ${BRAND.border}; border-radius:12px; overflow:hidden;">
      <tr>
        <td style="padding: 14px 20px 8px 20px;">
          <p style="margin:0; font-family:${FONT}; font-size:11px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:${BRAND.muted};">${title}</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 0 20px;"><div style="height:1px; background:${BRAND.border};"></div></td>
      </tr>
      <tr>
        <td style="padding: 0 20px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            ${rows}
          </table>
        </td>
      </tr>
    </table>
  `;
}

function footerSection(): string {
  return `
    <tr><td style="padding: 0 32px;"><div style="height:1px; background:${BRAND.border}; margin:0;"></div></td></tr>
    <tr>
      <td style="padding: 24px 32px 28px 32px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td style="vertical-align: middle;">
              ${logoMark()}
            </td>
            <td style="vertical-align: middle; text-align: right; font-family: ${FONT};">
              <p style="margin:0; font-size:13px; font-weight:600; color:${BRAND.dark};">${BRAND.name}</p>
              <p style="margin:2px 0 0 0; font-size:12px; color:${BRAND.muted};">${BRAND.title}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;
}

// ── Client Confirmation Email ────────────────────────────────────────────────

export function clientConfirmationTemplate(data: TemplateData): string {
  const { safeName, safeDescription, safeBudget, safeTimeline, profileUrl, replyEmail, submittedAt } = data;

  const card = `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px; background:${BRAND.white}; border-radius:16px; overflow:hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 8px 30px rgba(0,0,0,0.04);">

      <!-- Header -->
      <tr>
        <td style="padding: 36px 32px 28px 32px; background: linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.darkAlt} 100%);">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td style="padding-bottom: 24px;">
                ${logoMark()}
              </td>
            </tr>
            <tr>
              <td>
                <p style="margin:0 0 4px 0; font-family:${FONT}; font-size:12px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:${BRAND.accentLight};">Project Inquiry Confirmed</p>
                <h1 style="margin:8px 0 0 0; font-family:${FONT}; font-size:26px; font-weight:700; line-height:1.3; color:${BRAND.white};">Hello ${safeName},</h1>
                <p style="margin:12px 0 0 0; font-family:${FONT}; font-size:15px; line-height:1.7; color:#cbd5e1;">Thank you for reaching out. Your inquiry has been received and is now in my review queue. Here's a summary of what you submitted.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Submission Date -->
      <tr>
        <td style="padding: 24px 32px 0 32px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="width:8px; height:8px; border-radius:50%; background:${BRAND.green};"></td>
              <td style="padding-left:10px; font-family:${FONT}; font-size:13px; color:${BRAND.muted};">
                Submitted on <strong style="color:${BRAND.dark};">${submittedAt}</strong>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Summary Card -->
      <tr>
        <td style="padding: 20px 32px 0 32px;">
          ${summaryCard('Your Submission', `
            ${tableRow('Budget', safeBudget)}
            ${tableRow('Timeline', safeTimeline, true)}
          `)}
        </td>
      </tr>

      <!-- Project Description -->
      <tr>
        <td style="padding: 20px 32px 0 32px;">
          <p style="margin:0 0 10px 0; font-family:${FONT}; font-size:11px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:${BRAND.muted};">Your Message</p>
          <div style="background:${BRAND.light}; border:1px solid ${BRAND.border}; border-radius:12px; padding:18px 20px; font-family:${FONT}; font-size:14px; line-height:1.8; color:${BRAND.text}; white-space:pre-wrap;">${safeDescription}</div>
        </td>
      </tr>

      <!-- What Happens Next -->
      <tr>
        <td style="padding: 24px 32px 0 32px;">
          <p style="margin:0 0 14px 0; font-family:${FONT}; font-size:11px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:${BRAND.muted};">What Happens Next</p>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td style="padding: 0 0 14px 0;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="width:28px; height:28px; border-radius:50%; background:${BRAND.accent}; text-align:center; vertical-align:middle; font-family:${FONT}; font-size:12px; font-weight:700; color:${BRAND.white};">1</td>
                    <td style="padding-left:12px; font-family:${FONT}; font-size:14px; color:${BRAND.text}; line-height:1.5;">
                      <strong style="color:${BRAND.dark};">Review</strong> — I'll review your project details carefully
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 0 0 14px 0;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="width:28px; height:28px; border-radius:50%; background:${BRAND.accent}; text-align:center; vertical-align:middle; font-family:${FONT}; font-size:12px; font-weight:700; color:${BRAND.white};">2</td>
                    <td style="padding-left:12px; font-family:${FONT}; font-size:14px; color:${BRAND.text}; line-height:1.5;">
                      <strong style="color:${BRAND.dark};">Respond</strong> — You'll hear back within <strong>24 hours</strong>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 0;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="width:28px; height:28px; border-radius:50%; background:${BRAND.accent}; text-align:center; vertical-align:middle; font-family:${FONT}; font-size:12px; font-weight:700; color:${BRAND.white};">3</td>
                    <td style="padding-left:12px; font-family:${FONT}; font-size:14px; color:${BRAND.text}; line-height:1.5;">
                      <strong style="color:${BRAND.dark};">Kickoff</strong> — We'll schedule a call to discuss your vision
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- CTA Buttons -->
      <tr>
        <td style="padding: 28px 32px 32px 32px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="border-radius:10px; background:${BRAND.accent};" bgcolor="${BRAND.accent}">
                <a href="${profileUrl}" target="_blank" style="display:inline-block; padding:13px 24px; font-family:${FONT}; font-size:14px; font-weight:600; color:${BRAND.white}; text-decoration:none; border-radius:10px;">View Portfolio</a>
              </td>
              <td style="width:10px;"></td>
              <td style="border-radius:10px; border:1px solid ${BRAND.border};">
                <a href="mailto:${replyEmail}" style="display:inline-block; padding:12px 24px; font-family:${FONT}; font-size:14px; font-weight:600; color:${BRAND.dark}; text-decoration:none; border-radius:10px;">Reply by Email</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Footer -->
      ${footerSection()}
    </table>
  `;

  return emailWrapper(card);
}

// ── Admin Notification Email ─────────────────────────────────────────────────

export function adminNotificationTemplate(data: TemplateData): string {
  const { safeName, safeEmail, safeDescription, safeBudget, safeTimeline, submittedAt } = data;

  const card = `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px; background:${BRAND.white}; border-radius:16px; overflow:hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 8px 30px rgba(0,0,0,0.04);">

      <!-- Header -->
      <tr>
        <td style="padding: 32px 32px 24px 32px; background: linear-gradient(135deg, ${BRAND.dark} 0%, #312e81 100%);">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td style="padding-bottom: 20px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td>${logoMark()}</td>
                    <td style="padding-left:14px; vertical-align:middle;">
                      <span style="display:inline-block; padding:4px 12px; background:rgba(99,102,241,0.25); border-radius:20px; font-family:${FONT}; font-size:11px; font-weight:600; color:${BRAND.accentLight}; letter-spacing:0.04em;">NEW LEAD</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <h1 style="margin:0; font-family:${FONT}; font-size:24px; font-weight:700; line-height:1.3; color:${BRAND.white};">New inquiry from ${safeName}</h1>
                <p style="margin:8px 0 0 0; font-family:${FONT}; font-size:13px; color:#94a3b8;">Received on ${submittedAt}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Lead Details -->
      <tr>
        <td style="padding: 28px 32px 0 32px;">
          ${summaryCard('Contact Details', `
            ${tableRow('Name', safeName)}
            ${tableRow('Email', `<a href="mailto:${safeEmail}" style="color:${BRAND.accent}; font-weight:600; text-decoration:none;">${safeEmail}</a>`)}
            ${tableRow('Budget', safeBudget)}
            ${tableRow('Timeline', safeTimeline)}
            ${tableRow('Date', submittedAt, true)}
          `)}
        </td>
      </tr>

      <!-- Project Description -->
      <tr>
        <td style="padding: 24px 32px 0 32px;">
          <p style="margin:0 0 12px 0; font-family:${FONT}; font-size:11px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:${BRAND.muted};">Project Description</p>
          <div style="background:${BRAND.light}; border:1px solid ${BRAND.border}; border-left:3px solid ${BRAND.accent}; border-radius:12px; padding:20px; font-family:${FONT}; font-size:14px; line-height:1.8; color:${BRAND.text}; white-space:pre-wrap;">${safeDescription}</div>
        </td>
      </tr>

      <!-- Quick Action -->
      <tr>
        <td style="padding: 28px 32px 32px 32px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="border-radius:10px; background:${BRAND.accent};" bgcolor="${BRAND.accent}">
                <a href="mailto:${safeEmail}" style="display:inline-block; padding:13px 24px; font-family:${FONT}; font-size:14px; font-weight:600; color:${BRAND.white}; text-decoration:none; border-radius:10px;">Reply to ${safeName}</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Footer -->
      ${footerSection()}
    </table>
  `;

  return emailWrapper(card);
}
