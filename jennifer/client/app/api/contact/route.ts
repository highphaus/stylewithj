import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Simple in-memory rate limiter for serverless environment
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = ipRequestCounts.get(ip);

  if (!record || now > record.resetTime) {
    ipRequestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

// Sanitize string to prevent email-header injection (strip CRLF characters)
function sanitizeHeader(str: string): string {
  return str.replace(/[\r\n]+/g, ' ').trim();
}

// HTML escape user inputs for safe inclusion in email HTML body
function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Basic email validation regex
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(req: Request) {
  try {
    // Extract IP address from request headers
    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';

    if (clientIp !== 'unknown' && isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: 'Too many submission requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { firstName, lastName, email, phone, service, message, locationText, coords } = body;

    // Validate required fields
    if (!firstName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const cleanEmail = sanitizeHeader(String(email));
    if (!isValidEmail(cleanEmail)) {
      return NextResponse.json(
        { error: 'Invalid email address format.' },
        { status: 400 }
      );
    }

    const cleanFirstName = sanitizeHeader(String(firstName));
    const cleanLastName = lastName ? sanitizeHeader(String(lastName)) : '';
    const cleanPhone = phone ? sanitizeHeader(String(phone)) : 'Not provided';
    const cleanService = service ? sanitizeHeader(String(service)) : 'General Inquiry';
    const cleanMessage = String(message).trim();
    const cleanLocationText = locationText ? sanitizeHeader(String(locationText)) : 'Not provided';

    const customerFullName = cleanLastName
      ? `${cleanFirstName} ${cleanLastName}`
      : cleanFirstName;

    // Email credentials from environment variables
    const recipientEmail = (process.env.TITAN_EMAIL || 'jennifer@stylewithj.in').trim();
    const emailUser = recipientEmail;
    const emailPass = (process.env.TITAN_EMAIL_PASSWORD || '').trim();

    if (!emailPass) {
      console.warn('[Nodemailer Contact API] Missing TITAN_EMAIL_PASSWORD in server environment variables.');
      return NextResponse.json(
        { error: 'Email service configuration issue. Please contact support directly.' },
        { status: 500 }
      );
    }

    // SMTP Transporter configuration for GoDaddy Professional Email (Titan)
    const transporter = nodemailer.createTransport({
      host: 'smtpout.secureserver.net',
      port: 465,
      secure: true, // SSL/TLS
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      connectionTimeout: 10000,
      greetingTimeout: 5000,
      socketTimeout: 15000,
    });

    const submissionDate = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    // Construct Google Maps link if valid coordinates exist
    const googleMapsUrl =
      coords && typeof coords.lat === 'number' && typeof coords.lng === 'number'
        ? `https://www.google.com/maps?q=${coords.lat},${coords.lng}`
        : null;

    // Escaped HTML fields for safe template rendering
    const safeName = escapeHtml(customerFullName);
    const safePhone = escapeHtml(cleanPhone);
    const safeEmail = escapeHtml(cleanEmail);
    const safeService = escapeHtml(cleanService);
    const safeLocation = escapeHtml(cleanLocationText);
    const safeMessage = escapeHtml(cleanMessage).replace(/\n/g, '<br />');
    const safeTimestamp = escapeHtml(submissionDate);

    const htmlContent = `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FAF9F6; border: 1px solid #1A1A1A1A; padding: 32px; color: #1A1A1A;">
        <div style="border-bottom: 2px solid #1A1A1A; padding-bottom: 16px; margin-bottom: 24px;">
          <span style="font-size: 10px; font-family: monospace; letter-spacing: 0.3em; text-transform: uppercase; color: #666;">✦ STYLE WITH J // ATELIER ENQUIRY</span>
          <h2 style="font-family: Georgia, serif; font-size: 26px; font-weight: 300; margin: 8px 0 0 0; color: #1A1A1A;">
            New Website Enquiry – ${safeName}
          </h2>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 150px; color: #444;">Customer Name:</td>
            <td style="padding: 8px 0; color: #1A1A1A; font-weight: 500;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #444;">Email Address:</td>
            <td style="padding: 8px 0; color: #1A1A1A;"><a href="mailto:${safeEmail}" style="color: #1A1A1A; text-decoration: underline;">${safeEmail}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #444;">Phone Number:</td>
            <td style="padding: 8px 0; color: #1A1A1A; font-weight: bold;"><a href="tel:${safePhone}" style="color: #1A1A1A; text-decoration: underline;">${safePhone}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #444;">Selected Service:</td>
            <td style="padding: 8px 0; font-weight: bold; color: #000; text-transform: uppercase; font-size: 12px; letter-spacing: 0.1em;">${safeService}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #444;">Submission Time:</td>
            <td style="padding: 8px 0; color: #555; font-family: monospace; font-size: 12px;">${safeTimestamp} IST</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #444;">Location Info:</td>
            <td style="padding: 8px 0; color: #111; font-family: monospace; font-size: 12px;">${safeLocation}</td>
          </tr>
          ${
            coords && typeof coords.lat === 'number' && typeof coords.lng === 'number'
              ? `
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #444;">GPS Coordinates:</td>
            <td style="padding: 8px 0; color: #111; font-family: monospace; font-size: 12px;">
              Lat: ${coords.lat.toFixed(5)}°, Lng: ${coords.lng.toFixed(5)}°
            </td>
          </tr>
          `
              : ''
          }
          ${
            googleMapsUrl
              ? `
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #444;">Google Maps Link:</td>
            <td style="padding: 8px 0;">
              <a href="${googleMapsUrl}" target="_blank" style="display: inline-block; background-color: #1A1A1A; color: #FFFFFF; padding: 6px 12px; font-size: 11px; font-family: monospace; text-transform: uppercase; text-decoration: none; border-radius: 2px;">
                📍 View Location on Google Maps →
              </a>
            </td>
          </tr>
          `
              : ''
          }
        </table>

        <div style="background-color: #EFECE6; border-left: 3px solid #1A1A1A; padding: 16px; margin-bottom: 24px; border-radius: 2px;">
          <span style="font-size: 10px; font-family: monospace; letter-spacing: 0.25em; text-transform: uppercase; color: #555; display: block; margin-bottom: 8px;">CUSTOMER MESSAGE</span>
          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #1A1A1A; font-style: italic;">
            "${safeMessage}"
          </p>
        </div>

        <div style="border-top: 1px solid #1A1A1A22; padding-top: 16px; font-size: 10px; font-family: monospace; color: #888; text-transform: uppercase; letter-spacing: 0.2em;">
          Transmitted via Style with J • Website Contact Form
        </div>
      </div>
    `;

    const plainTextContent = `New Website Enquiry – ${customerFullName}

Customer Name: ${customerFullName}
Email Address: ${cleanEmail}
Phone Number: ${cleanPhone}
Selected Service: ${cleanService}
Submission Date & Time: ${submissionDate} IST
Location Info: ${cleanLocationText}
${coords && typeof coords.lat === 'number' ? `GPS: ${coords.lat}, ${coords.lng}\n` : ''}${googleMapsUrl ? `Google Maps: ${googleMapsUrl}\n` : ''}
Customer Message:
${cleanMessage}
`;

    const mailOptions = {
      from: `Style With J Website <${emailUser}>`,
      to: recipientEmail,
      replyTo: cleanEmail,
      subject: `New Website Enquiry – ${customerFullName}`,
      text: plainTextContent,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Nodemailer Success] Email sent to ${recipientEmail}, Message ID: ${info.messageId}`);

    return NextResponse.json({
      success: true,
      message: 'Enquiry sent successfully.',
    });
  } catch (error: unknown) {
    console.error('[Nodemailer Contact API Error]', error);
    return NextResponse.json(
      { error: 'Failed to send enquiry. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}
