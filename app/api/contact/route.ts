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
    const roundedLogo = `
      <div style="position:absolute;top:24px;right:24px;width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,#1f2937,#111827);display:flex;align-items:center;justify-content:center;color:#ffffff;font-weight:700;font-size:16px;letter-spacing:0.04em;">
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
        <div style="font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 28px 14px; color: #111827; background-color: #f3f4f6;">
          <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px; padding: 28px; position: relative;">
            ${roundedLogo}

            <p style="margin: 0 0 10px 0; color: #4b5563; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase;">Project Inquiry Confirmation</p>
            <h1 style="margin: 0; font-size: 26px; font-weight: 800; color: #111827; letter-spacing: -0.02em;">Hello ${safeName},</h1>
            <p style="font-size: 15px; line-height: 1.75; color: #374151; margin: 18px 0 0 0;">
              Thank you for your message. Your inquiry has been received successfully and is now in my review queue.
            </p>

            <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; margin: 22px 0;">
              <p style="margin: 0 0 10px 0; font-size: 13px; color: #6b7280; font-weight: 600;">Submission Summary</p>
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-size: 14px; color: #111827;">
                <tr>
                  <td style="padding: 6px 0; color: #6b7280;">Budget</td>
                  <td style="padding: 6px 0; text-align: right; font-weight: 600;">${safeBudget}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #6b7280;">Timeline</td>
                  <td style="padding: 6px 0; text-align: right; font-weight: 600;">${safeTimeline}</td>
                </tr>
              </table>
            </div>

            <p style="font-size: 15px; line-height: 1.75; color: #374151; margin: 0;">
              I usually respond within 24 hours with suggested next steps and delivery approach.
            </p>

            <div style="margin-top: 24px;">
              <a href="${profileUrl}" style="display: inline-block; padding: 12px 18px; background-color: #111827; color: #ffffff; text-decoration: none; border-radius: 10px; font-size: 14px; font-weight: 600;">View Portfolio</a>
              <a href="mailto:${process.env.EMAIL_USER}" style="display: inline-block; margin-left: 10px; padding: 12px 18px; border: 1px solid #d1d5db; color: #111827; text-decoration: none; border-radius: 10px; font-size: 14px; font-weight: 600;">Reply by Email</a>
            </div>

            <div style="border-top: 1px solid #e5e7eb; margin-top: 24px; padding-top: 16px; color: #6b7280; font-size: 12px;">
              Sent from <a href="${websiteUrl}" style="color: #374151; text-decoration: underline;">${websiteUrl}</a>
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
        <div style="font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 680px; margin: 0 auto; padding: 16px; background: #f3f4f6;">
          <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px; padding: 24px; position: relative;">
            ${roundedLogo}
            <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em;">New Lead Notification</p>
            <h2 style="margin: 0 0 16px 0; color: #111827;">New project inquiry received</h2>

            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; width: 140px;">Name</td>
                <td style="padding: 8px 0; color: #111827; font-weight: 600;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Email</td>
                <td style="padding: 8px 0; color: #111827; font-weight: 600;"><a href="mailto:${cleanEmail}" style="color:#111827;text-decoration:underline;">${safeEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Budget</td>
                <td style="padding: 8px 0; color: #111827; font-weight: 600;">${safeBudget}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Timeline</td>
                <td style="padding: 8px 0; color: #111827; font-weight: 600;">${safeTimeline}</td>
              </tr>
            </table>

            <div style="margin-top: 18px; padding: 16px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px;">
              <p style="margin: 0 0 8px 0; font-size: 13px; color: #6b7280; font-weight: 600;">Project Description</p>
              <p style="margin: 0; white-space: pre-wrap; color: #111827; line-height: 1.7;">${safeDescription}</p>
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
