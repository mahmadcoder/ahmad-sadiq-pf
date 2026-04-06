import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';
import nodemailer from 'nodemailer';
import { clientConfirmationTemplate, adminNotificationTemplate } from '@/app/lib/email-templates';

// ── Helpers ──────────────────────────────────────────────────────────────────

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
    return fallback.startsWith('http://') || fallback.startsWith('https://')
      ? fallback
      : `https://${fallback}`;
  }

  return requestOrigin;
}

// ── POST Handler ─────────────────────────────────────────────────────────────

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

    // Sanitize inputs
    const cleanName = (name || '').trim();
    const cleanEmail = (email || '').trim();
    const cleanDescription = (description || '').trim();
    const cleanBudget = (budget || '').trim() || 'Not specified';
    const cleanTimeline = (timeline || '').trim() || 'Not specified';

    // Validate required fields
    if (!cleanName || !cleanEmail || !cleanDescription) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and project description are required.' },
        { status: 400 },
      );
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(cleanEmail)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 },
      );
    }

    // Check email config early
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return NextResponse.json(
        { success: false, error: 'Email service is not configured on the server.' },
        { status: 500 },
      );
    }

    // Format submission date
    const now = new Date();
    const submittedAt = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Karachi',
    });

    // Escape for HTML templates
    const templateData = {
      safeName: escapeHtml(cleanName),
      safeEmail: escapeHtml(cleanEmail),
      safeDescription: escapeHtml(cleanDescription),
      safeBudget: escapeHtml(cleanBudget),
      safeTimeline: escapeHtml(cleanTimeline),
      profileUrl: `${normalizeOrigin(request)}/#about`,
      websiteUrl: `${normalizeOrigin(request)}/`,
      replyEmail: process.env.EMAIL_USER,
      submittedAt,
    };

    // 1. Save to Supabase
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const { error } = await supabase
        .from('contacts')
        .insert([{
          name: cleanName,
          email: cleanEmail,
          description: cleanDescription,
          budget: cleanBudget,
          timeline: cleanTimeline,
        }]);

      if (error) {
        console.error('Supabase Error:', error);
        // Continue — email delivery is the priority
      }
    }

    // 2. Send emails
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await Promise.all([
      transporter.sendMail({
        from: `"Ahmad Sadiq" <${process.env.EMAIL_USER}>`,
        to: cleanEmail,
        subject: "Thank you for reaching out! Let's build something together.",
        html: clientConfirmationTemplate(templateData),
      }),
      transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `New Project Lead: ${cleanName}`,
        html: adminNotificationTemplate(templateData),
      }),
    ]);

    return NextResponse.json({ success: true, message: 'Message sent successfully' });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to process request';
    console.error('Backend Error:', error);
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
