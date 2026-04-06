import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, description, budget, timeline } = data;

    // 1. Save to Supabase (Optional for now if credentials aren't set, but we try)
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const { error } = await supabase
        .from('contacts')
        .insert([{ name, email, description, budget, timeline }]);

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

    const logoUrl = "https://ahmad-sadiq-pf.vercel.app/second%20logo.svg";

    // 3. Email to User (Confirmation)
    const userMailOptions = {
      from: `"Ahmad Sadiq" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for reaching out! Let's build something together.",
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #0f0f11; color: #ffffff; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="${logoUrl}" alt="Ahmad Sadiq Logo" style="height: 60px; object-fit: contain; filter: drop-shadow(0 0 10px rgba(59,130,246,0.3));" />
          </div>
          <h2 style="color: #ffffff; font-size: 24px; font-weight: bold; margin-bottom: 20px; text-align: center;">Hello ${name},</h2>
          <div style="background-color: #1e1e24; border-left: 4px solid #3b82f6; padding: 20px; border-radius: 0 8px 8px 0; margin-bottom: 30px;">
            <p style="font-size: 16px; line-height: 1.6; color: #d1d5db; margin: 0;">
              Thank you for considering me for your project! I've received your inquiry regarding your project (Budget: ${budget}, Timeline: ${timeline}).
            </p>
          </div>
          <p style="font-size: 16px; line-height: 1.6; color: #d1d5db;">
            I will review your project description and get back to you shortly to discuss how we can bring your vision to life.
          </p>
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #333333; text-align: center;">
            <p style="font-size: 14px; color: #9ca3af;">Best regards,</p>
            <p style="font-size: 18px; font-weight: bold; color: #ffffff; margin-top: 5px;">Ahmad Sadiq</p>
            <p style="font-size: 14px; color: #3b82f6;">Next.js Developer</p>
            <div style="margin-top: 20px;">
              <a href="https://ahmad-sadiq-pf.vercel.app" style="color: #ffffff; text-decoration: none; padding: 10px 20px; background-color: #3b82f6; border-radius: 6px; font-weight: bold; display: inline-block;">Visit Portfolio</a>
            </div>
          </div>
        </div>
      `,
    };

    // 4. Email to You (Internal Alert)
    const adminMailOptions = {
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `New Project Lead: ${name}`,
      html: `
        <h2>New Lead from Portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Timeline:</strong> ${timeline}</p>
        <h3>Project Description:</h3>
        <p style="white-space: pre-wrap; background: #f4f4f4; padding: 15px; border-radius: 5px;">${description}</p>
      `,
    };

    // Send both emails
    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);

    return NextResponse.json({ success: true, message: 'Message sent successfully' });

  } catch (error: any) {
    console.error("Backend Error:", error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to process request' }, { status: 500 });
  }
}
