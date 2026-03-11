import { NextRequest, NextResponse } from 'next/server';
import { getAdminFirestore } from '@/lib/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';

const RATE_LIMIT_MS = 60 * 60 * 1000; // 1 Stunde

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Pflichtfelder fehlen: name, email, message' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Ungültige E-Mail-Adresse' },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: 'Nachricht zu lang (max. 5000 Zeichen)' },
        { status: 400 }
      );
    }

    const db = getAdminFirestore();

    // Rate Limiting per Email
    const rateLimitKey = email.toLowerCase().trim().replace(/[^a-z0-9@.]/g, '_');
    const rateLimitRef = db.collection('jvs_rate_limits').doc(`contact_${rateLimitKey}`);
    const rateLimitDoc = await rateLimitRef.get();

    if (rateLimitDoc.exists) {
      const lastSubmit = rateLimitDoc.data()?.timestamp?.toMillis?.();
      if (lastSubmit && Date.now() - lastSubmit < RATE_LIMIT_MS) {
        return NextResponse.json(
          { error: 'Bitte warte eine Stunde zwischen Anfragen.' },
          { status: 429 }
        );
      }
    }

    await rateLimitRef.set({ timestamp: FieldValue.serverTimestamp() });

    // Kontaktanfrage in Firestore speichern
    const contactRef = db.collection('jvs_contacts').doc();
    await contactRef.set({
      id: contactRef.id,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      subject: subject?.trim() || '',
      message: message.trim(),
      status: 'new',
      createdAt: FieldValue.serverTimestamp(),
    });

    // Email senden via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
          from: process.env.EMAIL_FROM || 'Jassverband Schweiz <noreply@jassverband.ch>',
          to: process.env.CONTACT_EMAIL || 'info@jassverband.ch',
          replyTo: email,
          subject: `[Kontakt] ${subject || 'Neue Anfrage'} — ${name}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px;">
              <h2 style="color: #000; margin-bottom: 16px;">Neue Kontaktanfrage</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6b6b6b; width: 100px;">Name:</td>
                  <td style="padding: 8px 0; font-weight: 600;">${escapeHtml(name)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b6b6b;">E-Mail:</td>
                  <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
                </tr>
                ${subject ? `
                <tr>
                  <td style="padding: 8px 0; color: #6b6b6b;">Betreff:</td>
                  <td style="padding: 8px 0;">${escapeHtml(subject)}</td>
                </tr>` : ''}
              </table>
              <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 16px 0;" />
              <div style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message)}</div>
              <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 16px 0;" />
              <p style="color: #9ca3af; font-size: 12px;">
                Gesendet via jassverband.ch/kontakt | ${new Date().toLocaleDateString('de-CH')}
              </p>
            </div>
          `,
        });

        // Bestätigung an Absender
        await resend.emails.send({
          from: process.env.EMAIL_FROM || 'Jassverband Schweiz <noreply@jassverband.ch>',
          to: email,
          subject: 'Deine Nachricht an den Jassverband Schweiz',
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px;">
              <h2 style="color: #000;">Vielen Dank für deine Nachricht!</h2>
              <p>Hallo ${escapeHtml(name)},</p>
              <p>Wir haben deine Nachricht erhalten und melden uns so schnell wie möglich bei dir.</p>
              <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;" />
              <p style="color: #9ca3af; font-size: 12px;">
                Jassverband Schweiz | Hirslanderstrasse 34, 8032 Zürich<br/>
                <a href="mailto:info@jassverband.ch">info@jassverband.ch</a>
              </p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('[Contact] Email sending failed:', emailError);
      }
    } else {
      console.log('[Contact] RESEND_API_KEY not set, skipping email');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Contact] Error:', error);
    return NextResponse.json(
      { error: 'Anfrage konnte nicht verarbeitet werden' },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
