import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Using the provided API key (or environment variable if set)
const resend = new Resend(process.env.RESEND_API_KEY || 're_Sm2NnPhE_NT1zQcs85SsRp538LewJjpvG');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    const ownerEmail = 'mohamedasif7799@gmail.com';
    
    // Send email to site owner
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ownerEmail,
      subject: `Portfolio Contact: ${subject} from ${name}`,
      html: `
        <h3>New Message from Portfolio</h3>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Reply-To Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email
    });

    if (error) {
      console.error('Resend error to owner:', error);
      return NextResponse.json(
        { error: 'Failed to send signal. Resend API error.' },
        { status: 400 }
      );
    }

    // Send confirmation email to the viewer/submitter
    const confirmationData = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Message Received - Thank You!',
      html: `
        <h3>Thank You for Reaching Out!</h3>
        <p>Hi ${name},</p>
        <p>I received your message and will get back to you as soon as possible.</p>
        <hr>
        <p><strong>Your Message:</strong></p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p>Best regards,<br>Asif</p>
      `
    });

    if (confirmationData.error) {
      console.warn('Failed to send confirmation email:', confirmationData.error);
      // Don't fail the whole request if confirmation email fails
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Contact form error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to send signal: ${errorMessage}` },
      { status: 500 }
    );
  }
}
