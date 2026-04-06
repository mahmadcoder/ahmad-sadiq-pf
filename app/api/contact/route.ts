import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';
import nodemailer from 'nodemailer';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function normalizeOrigin(request: Request): string {
  const fallback = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL;
  const requestOrigin = new URL(request.url).origin;

  if (fallback) {
    if (fallback.startsWith('http://') || fallback.startsWith('https://')) {
      return fallback;
    }
    return `https://${fallback}`;
  }

  return requestOrigin;
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, description, budget, timeline } = data as {
      name?: string;
      email?: string;
      description?: string;
      budget?: string;
      timeline?: string;
    };

    const cleanName = (name || '').trim();
    const cleanEmail = (email || '').trim();
    const cleanDescription = (description || '').trim();
    const cleanBudget = (budget || '').trim() || 'Not specified';
    const cleanTimeline = (timeline || '').trim() || 'Not specified';

    if (!cleanName || !cleanEmail || !cleanDescription) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and project description are required.' },
        { status: 400 },
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(cleanEmail)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 },
      );
    }

    const safeName = escapeHtml(cleanName);
    const safeEmail = escapeHtml(cleanEmail);
    const safeDescription = escapeHtml(cleanDescription);
    const safeBudget = escapeHtml(cleanBudget);
    const safeTimeline = escapeHtml(cleanTimeline);
    const siteOrigin = normalizeOrigin(request);
    const profileUrl = `${siteOrigin}/#about`;
    const websiteUrl = `${siteOrigin}/`;
    const brandLabel = 'Ahmad Sadiq';
    const roundedLogo = `
      <div style="position:absolute;top:20px;right:20px;width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,#111827,#374151);display:flex;align-items:center;justify-content:center;color:#ffffff;font-weight:700;font-size:15px;letter-spacing:0.08em;box-shadow:0 8px 18px rgba(17,24,39,.25);">
        AS
      </div>
    `;

    // 1. Save to Supabase (Optional for now if credentials aren't set, but we try)
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const { error } = await supabase
        .from('contacts')
        .insert([{ name: cleanName, email: cleanEmail, description: cleanDescription, budget: cleanBudget, timeline: cleanTimeline }]);

      if (error) {
        console.error("Supabase Error:", error);
        // We continue even if DB fails, to ensure email is sent
      }
    }

    // 2. Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return NextResponse.json(
        { success: false, error: 'Email service is not configured on the server.' },
        { status: 500 },
      );
    }

    // 3. Email to User (Confirmation)
    const userMailOptions = {
      from: `"Ahmad Sadiq" <${process.env.EMAIL_USER}>`,
      to: cleanEmail,
      subject: "Thank you for reaching out! Let's build something together.",
      html: `
        <div style="font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color:#eef1f5; padding:30px 12px; color:#111827;">
          <div style="max-width:640px; margin:0 auto; background:#ffffff; border:1px solid #dde3ea; border-radius:20px; overflow:hidden; box-shadow:0 10px 30px rgba(15,23,42,.08); position:relative;">
            ${roundedLogo}
            <div style="background:linear-gradient(120deg,#0f172a,#1f2937); padding:28px 28px 32px 28px;">
              <p style="margin:0; color:#cbd5e1; font-size:12px; letter-spacing:.09em; text-transform:uppercase;">Inquiry Received</p>
              <h1 style="margin:12px 0 0 0; color:#ffffff; font-size:28px; line-height:1.3; letter-spacing:-.02em;">Thanks ${safeName}, your request is confirmed.</h1>
              <p style="margin:14px 0 0 0; color:#e2e8f0; font-size:14px; line-height:1.7;">I appreciate your interest in working together. I have your project details and will follow up shortly with the next steps.</p>
            </div>

            <div style="padding:26px 28px 18px 28px;">
              <div style="background-color:#f8fafc; border:1px solid #e2e8f0; border-radius:14px; padding:16px 16px;">
                <p style="margin:0 0 10px 0; font-size:12px; color:#64748b; font-weight:700; letter-spacing:.05em; text-transform:uppercase;">Submission Summary</p>
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-size:14px; color:#0f172a;">
                  <tr>
                    <td style="padding:7px 0; color:#64748b;">Client Name</td>
                    <td style="padding:7px 0; text-align:right; font-weight:600;">${safeName}</td>
                  </tr>
                  <tr>
                    <td style="padding:7px 0; color:#64748b;">Budget</td>
                    <td style="padding:7px 0; text-align:right; font-weight:600;">${safeBudget}</td>
                  </tr>
                  <tr>
                    <td style="padding:7px 0; color:#64748b;">Timeline</td>
                    <td style="padding:7px 0; text-align:right; font-weight:600;">${safeTimeline}</td>
                  </tr>
                </table>
              </div>

              <p style="font-size:14px; line-height:1.8; color:#334155; margin:18px 0 0 0;">Response time: usually within 24 hours.</p>
            </div>

            <div style="padding:0 28px 28px 28px;">
              <a href="${profileUrl}" style="display:inline-block; padding:12px 20px; background-color:#111827; color:#ffffff; text-decoration:none; border-radius:10px; font-size:14px; font-weight:600;">View Portfolio</a>
              <a href="mailto:${process.env.EMAIL_USER}" style="display:inline-block; margin-left:8px; padding:12px 20px; border:1px solid #cbd5e1; color:#0f172a; text-decoration:none; border-radius:10px; font-size:14px; font-weight:600;">Reply by Email</a>
            </div>

            <div style="border-top:1px solid #e2e8f0; padding:16px 28px 20px 28px; color:#64748b; font-size:12px;">
              <strong style="color:#334155;">${brandLabel}</strong> · Full-Stack Web Developer<br />
              <a href="${websiteUrl}" style="color:#334155; text-decoration:underline;">Visit Website</a>
            </div>
          </div>
        </div>
      `,
    };

    // 4. Email to You (Internal Alert)
    const adminMailOptions = {
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `New Project Lead: ${cleanName}`,
      html: `
        <div style="font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background:#eef1f5; padding:24px 10px;">
          <div style="max-width:680px; margin:0 auto; background:#ffffff; border:1px solid #dde3ea; border-radius:20px; overflow:hidden; box-shadow:0 10px 30px rgba(15,23,42,.08); position:relative;">
            ${roundedLogo}
            <div style="background:linear-gradient(120deg,#0f172a,#1f2937); padding:24px 24px 26px 24px;">
              <p style="margin:0; color:#cbd5e1; font-size:12px; letter-spacing:.09em; text-transform:uppercase;">New Lead Alert</p>
              <h2 style="margin:10px 0 0 0; color:#ffffff; font-size:24px; letter-spacing:-.02em;">New project inquiry from ${safeName}</h2>
            </div>

            <div style="padding:24px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse; font-size:14px;">
                <tr>
                  <td style="padding:9px 0; color:#64748b; width:150px;">Name</td>
                  <td style="padding:9px 0; color:#0f172a; font-weight:600;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding:9px 0; color:#64748b;">Email</td>
                  <td style="padding:9px 0; color:#0f172a; font-weight:600;"><a href="mailto:${cleanEmail}" style="color:#0f172a; text-decoration:underline;">${safeEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding:9px 0; color:#64748b;">Budget</td>
                  <td style="padding:9px 0; color:#0f172a; font-weight:600;">${safeBudget}</td>
                </tr>
                <tr>
                  <td style="padding:9px 0; color:#64748b;">Timeline</td>
                  <td style="padding:9px 0; color:#0f172a; font-weight:600;">${safeTimeline}</td>
                </tr>
              </table>

              <div style="margin-top:16px; padding:16px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px;">
                <p style="margin:0 0 8px 0; font-size:12px; color:#64748b; font-weight:700; letter-spacing:.05em; text-transform:uppercase;">Project Description</p>
                <p style="margin:0; white-space:pre-wrap; color:#0f172a; line-height:1.75;">${safeDescription}</p>
              </div>

              <div style="margin-top:16px;">
                <a href="mailto:${cleanEmail}" style="display:inline-block; padding:10px 14px; background:#111827; color:#ffffff; text-decoration:none; border-radius:9px; font-size:13px; font-weight:600;">Reply to Lead</a>
              </div>
            </div>
          </div>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);

    return NextResponse.json({ success: true, message: 'Message sent successfully' });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to process request';
    console.error("Backend Error:", error);
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
