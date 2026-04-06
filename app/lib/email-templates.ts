// ─────────────────────────────────────────────────────────────────────────────
// Email Templates — Professional HTML email templates for the contact form
// ─────────────────────────────────────────────────────────────────────────────

interface TemplateData {
  safeName: string;
  safeEmail: string;
  safeDescription: string;
  safeBudget: string;
  safeTimeline: string;
  profileUrl: string;
  websiteUrl: string;
  replyEmail: string;
}

// ── Shared Components ────────────────────────────────────────────────────────

const BRAND = {
  name: 'Ahmad Sadiq',
  title: 'Full-Stack Developer',
  accent: '#6366f1',       // Indigo-500
  accentLight: '#818cf8',  // Indigo-400
  accentBg: '#eef2ff',     // Indigo-50
  dark: '#0f172a',         // Slate-900
  darkAlt: '#1e293b',      // Slate-800
  text: '#334155',         // Slate-700
  muted: '#64748b',        // Slate-500
  light: '#f8fafc',        // Slate-50
  border: '#e2e8f0',       // Slate-200
  white: '#ffffff',
};

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
          font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
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

function divider(): string {
  return `<tr><td style="padding: 0 32px;"><div style="height:1px; background:${BRAND.border}; margin:0;"></div></td></tr>`;
}

function footerSection(websiteUrl: string): string {
  return `
    ${divider()}
    <tr>
      <td style="padding: 24px 32px 28px 32px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td style="vertical-align: middle;">
              ${logoMark()}
            </td>
            <td style="vertical-align: middle; text-align: right; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
              <p style="margin:0; font-size:13px; font-weight:600; color:${BRAND.dark};">${BRAND.name}</p>
              <p style="margin:2px 0 0 0; font-size:12px; color:${BRAND.muted};">${BRAND.title}</p>
            </td>
          </tr>
        </table>
        <p style="margin:16px 0 0 0; font-size:11px; color:${BRAND.muted}; text-align:center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <a href="${websiteUrl}" style="color:${BRAND.accent}; text-decoration:none;">ahmadsadiq.dev</a> &nbsp;·&nbsp; Built with Next.js
        </p>
      </td>
    </tr>
  `;
}

// ── Client Confirmation Email ────────────────────────────────────────────────

export function clientConfirmationTemplate(data: TemplateData): string {
  const { safeName, safeBudget, safeTimeline, profileUrl, websiteUrl, replyEmail } = data;

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
                <p style="margin:0 0 4px 0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:12px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:${BRAND.accentLight};">Project Inquiry Confirmed</p>
                <h1 style="margin:8px 0 0 0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:26px; font-weight:700; line-height:1.3; color:${BRAND.white};">Hello ${safeName},</h1>
                <p style="margin:12px 0 0 0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:15px; line-height:1.7; color:#cbd5e1;">Thank you for reaching out. Your inquiry has been received and is now in my review queue.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Summary Card -->
      <tr>
        <td style="padding: 28px 32px 0 32px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${BRAND.light}; border:1px solid ${BRAND.border}; border-radius:12px; overflow:hidden;">
            <tr>
              <td style="padding: 16px 20px 10px 20px;">
                <p style="margin:0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:11px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:${BRAND.muted};">Your Submission</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 0 20px;">
                <div style="height:1px; background:${BRAND.border};"></div>
              </td>
            </tr>
            <tr>
              <td style="padding: 0 20px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:14px;">
                  <tr>
                    <td style="padding:12px 0; color:${BRAND.muted}; width:120px;">Budget</td>
                    <td style="padding:12px 0; color:${BRAND.dark}; font-weight:600; text-align:right;">${safeBudget}</td>
                  </tr>
                  <tr>
                    <td colspan="2"><div style="height:1px; background:${BRAND.border};"></div></td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0; color:${BRAND.muted}; width:120px;">Timeline</td>
                    <td style="padding:12px 0; color:${BRAND.dark}; font-weight:600; text-align:right;">${safeTimeline}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Response Time -->
      <tr>
        <td style="padding: 20px 32px 4px 32px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="width:8px; height:8px; background:${BRAND.accent}; border-radius:50;"></td>
              <td style="padding-left:10px; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:14px; color:${BRAND.text}; line-height:1.6;">
                I typically respond within <strong style="color:${BRAND.dark};">24 hours</strong> with a proposed approach and next steps.
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- CTA Buttons -->
      <tr>
        <td style="padding: 24px 32px 32px 32px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="border-radius:10px; background:${BRAND.accent};" bgcolor="${BRAND.accent}">
                <a href="${profileUrl}" target="_blank" style="display:inline-block; padding:13px 24px; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:14px; font-weight:600; color:${BRAND.white}; text-decoration:none; border-radius:10px;">View Portfolio</a>
              </td>
              <td style="width:10px;"></td>
              <td style="border-radius:10px; border:1px solid ${BRAND.border};">
                <a href="mailto:${replyEmail}" style="display:inline-block; padding:12px 24px; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:14px; font-weight:600; color:${BRAND.dark}; text-decoration:none; border-radius:10px;">Reply by Email</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Footer -->
      ${footerSection(websiteUrl)}
    </table>
  `;

  return emailWrapper(card);
}

// ── Admin Notification Email ─────────────────────────────────────────────────

export function adminNotificationTemplate(data: TemplateData): string {
  const { safeName, safeEmail, safeDescription, safeBudget, safeTimeline, websiteUrl } = data;

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
                      <span style="display:inline-block; padding:4px 12px; background:rgba(99,102,241,0.25); border-radius:20px; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:11px; font-weight:600; color:${BRAND.accentLight}; letter-spacing:0.04em;">NEW LEAD</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <h1 style="margin:0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:24px; font-weight:700; line-height:1.3; color:${BRAND.white};">New inquiry from ${safeName}</h1>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Lead Details -->
      <tr>
        <td style="padding: 28px 32px 0 32px;">
          <p style="margin:0 0 12px 0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:11px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:${BRAND.muted};">Contact Details</p>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${BRAND.light}; border:1px solid ${BRAND.border}; border-radius:12px; overflow:hidden;">
            <tr>
              <td style="padding: 0 20px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:14px;">
                  <tr>
                    <td style="padding:14px 0; color:${BRAND.muted}; width:100px;">Name</td>
                    <td style="padding:14px 0; color:${BRAND.dark}; font-weight:600; text-align:right;">${safeName}</td>
                  </tr>
                  <tr>
                    <td colspan="2"><div style="height:1px; background:${BRAND.border};"></div></td>
                  </tr>
                  <tr>
                    <td style="padding:14px 0; color:${BRAND.muted};">Email</td>
                    <td style="padding:14px 0; text-align:right;">
                      <a href="mailto:${safeEmail}" style="color:${BRAND.accent}; font-weight:600; text-decoration:none;">${safeEmail}</a>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2"><div style="height:1px; background:${BRAND.border};"></div></td>
                  </tr>
                  <tr>
                    <td style="padding:14px 0; color:${BRAND.muted};">Budget</td>
                    <td style="padding:14px 0; color:${BRAND.dark}; font-weight:600; text-align:right;">${safeBudget}</td>
                  </tr>
                  <tr>
                    <td colspan="2"><div style="height:1px; background:${BRAND.border};"></div></td>
                  </tr>
                  <tr>
                    <td style="padding:14px 0; color:${BRAND.muted};">Timeline</td>
                    <td style="padding:14px 0; color:${BRAND.dark}; font-weight:600; text-align:right;">${safeTimeline}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Project Description -->
      <tr>
        <td style="padding: 24px 32px 0 32px;">
          <p style="margin:0 0 12px 0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:11px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:${BRAND.muted};">Project Description</p>
          <div style="background:${BRAND.light}; border:1px solid ${BRAND.border}; border-radius:12px; padding:20px; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:14px; line-height:1.8; color:${BRAND.text}; white-space:pre-wrap;">${safeDescription}</div>
        </td>
      </tr>

      <!-- Quick Action -->
      <tr>
        <td style="padding: 28px 32px 32px 32px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="border-radius:10px; background:${BRAND.accent};" bgcolor="${BRAND.accent}">
                <a href="mailto:${safeEmail}" style="display:inline-block; padding:13px 24px; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:14px; font-weight:600; color:${BRAND.white}; text-decoration:none; border-radius:10px;">Reply to ${safeName}</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Footer -->
      ${footerSection(websiteUrl)}
    </table>
  `;

  return emailWrapper(card);
}
