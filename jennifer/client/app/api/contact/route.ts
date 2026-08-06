import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, service, message, locationText, coords } = body;

    if (!firstName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const recipientEmail = 'muhammedsyam.dev@gmail.com';

    // Retrieve and sanitize credentials from process.env
    const emailUser = (process.env.EMAIL_USER || process.env.SMTP_USER || 'muhammedsyam.dev@gmail.com').trim();
    const rawPass = process.env.EMAIL_PASS || process.env.SMTP_PASS || '';
    const emailPass = rawPass.replace(/\s+/g, '').trim();

    console.log(`[Nodemailer Route] Attempting email dispatch for ${emailUser}... Pass configured: ${Boolean(emailPass)}`);

    // Gmail Transporter configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const formattedLocation = locationText || 'Location not provided';
    const formattedPhone = phone || 'Phone not provided';

    // Construct Google Maps link if coordinates are present
    const googleMapsUrl = coords && coords.lat && coords.lng 
      ? `https://www.google.com/maps?q=${coords.lat},${coords.lng}`
      : null;

    const htmlContent = `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FAF9F6; border: 1px solid #1A1A1A1A; padding: 32px; color: #1A1A1A;">
        <div style="border-bottom: 2px solid #1A1A1A; padding-bottom: 16px; margin-bottom: 24px;">
          <span style="font-size: 10px; font-family: monospace; letter-spacing: 0.3em; text-transform: uppercase; color: #666;">✦ STYLE WITH J // ATELIER INQUIRY</span>
          <h2 style="font-family: Georgia, serif; font-size: 26px; font-weight: 300; margin: 8px 0 0 0; color: #1A1A1A;">
            New Client Consultation Request
          </h2>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 150px; color: #444;">Client Name:</td>
            <td style="padding: 8px 0; color: #1A1A1A; font-weight: 500;">${firstName} ${lastName || ''}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #444;">Phone Number:</td>
            <td style="padding: 8px 0; color: #1A1A1A; font-weight: bold;"><a href="tel:${formattedPhone}" style="color: #1A1A1A; text-decoration: underline;">${formattedPhone}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #444;">Email Address:</td>
            <td style="padding: 8px 0; color: #1A1A1A;"><a href="mailto:${email}" style="color: #1A1A1A; text-decoration: underline;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #444;">Selected Curation:</td>
            <td style="padding: 8px 0; font-weight: bold; color: #000; text-transform: uppercase; font-size: 12px; letter-spacing: 0.1em;">${service || 'General Inquiry'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #444;">Detected Location:</td>
            <td style="padding: 8px 0; color: #111; font-family: monospace; font-size: 12px;">${formattedLocation}</td>
          </tr>
          ${coords ? `
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #444;">GPS Coordinates:</td>
            <td style="padding: 8px 0; color: #111; font-family: monospace; font-size: 12px;">
              Latitude: ${coords.lat.toFixed(5)}°, Longitude: ${coords.lng.toFixed(5)}°
            </td>
          </tr>
          ` : ''}
          ${googleMapsUrl ? `
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #444;">Google Maps Link:</td>
            <td style="padding: 8px 0;">
              <a href="${googleMapsUrl}" target="_blank" style="display: inline-block; background-color: #1A1A1A; color: #FFFFFF; padding: 6px 12px; font-size: 11px; font-family: monospace; text-transform: uppercase; text-decoration: none; border-radius: 2px;">
                📍 View Exact Location on Google Maps →
              </a>
            </td>
          </tr>
          ` : ''}
        </table>

        <div style="background-color: #EFECE6; border-left: 3px solid #1A1A1A; padding: 16px; margin-bottom: 24px; border-radius: 2px;">
          <span style="font-size: 10px; font-family: monospace; letter-spacing: 0.25em; text-transform: uppercase; color: #555; display: block; margin-bottom: 8px;">CLIENT MESSAGE</span>
          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #1A1A1A; font-style: italic;">
            "${message.replace(/\n/g, '<br />')}"
          </p>
        </div>

        <div style="border-top: 1px solid #1A1A1A22; padding-top: 16px; font-size: 10px; font-family: monospace; color: #888; text-transform: uppercase; letter-spacing: 0.2em;">
          Transmitted via Style with J • Priority Response Requested
        </div>
      </div>
    `;

    if (emailPass) {
      const info = await transporter.sendMail({
        from: `"Style with J" <${emailUser}>`,
        to: recipientEmail,
        replyTo: email,
        subject: `✦ NEW STYLING INQUIRY: ${firstName} ${lastName || ''} (${formattedPhone})`,
        text: `New Client Consultation Request\n\nName: ${firstName} ${lastName}\nPhone: ${formattedPhone}\nEmail: ${email}\nService: ${service}\nLocation: ${formattedLocation}\nGPS: ${coords ? `${coords.lat}, ${coords.lng}` : 'N/A'}\nGoogle Maps: ${googleMapsUrl || 'N/A'}\n\nMessage:\n${message}`,
        html: htmlContent,
      });
      console.log(`[Nodemailer Success] Sent email to ${recipientEmail}, MessageId: ${info.messageId}`);
    } else {
      console.log(`[Nodemailer Simulation] No EMAIL_PASS set in environment. Simulated sending to ${recipientEmail}`);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Inquiry transmitted successfully to muhammedsyam.dev@gmail.com' 
    });

  } catch (error: any) {
    console.error('Nodemailer error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to transmit inquiry via Nodemailer' }, 
      { status: 500 }
    );
  }
}
