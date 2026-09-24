import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

export async function GET() {
  try {
    const email = (process.env.TITAN_EMAIL || 'jennifer@stylewithj.in').trim();
    const hasPassword = Boolean(process.env.TITAN_EMAIL_PASSWORD && process.env.TITAN_EMAIL_PASSWORD.trim().length > 0);
    const host = 'smtpout.secureserver.net';
    const port = 465;

    return NextResponse.json({
      success: true,
      email,
      hasPassword,
      host,
      port,
      secure: true,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || 'Failed to read email config' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, titanEmail, titanPassword, action } = body;

    const targetEmail = (email || titanEmail || process.env.TITAN_EMAIL || 'jennifer@stylewithj.in').trim();
    const rawPass = password !== undefined ? password : titanPassword;
    const targetPassword = rawPass !== undefined ? String(rawPass).trim() : (process.env.TITAN_EMAIL_PASSWORD || '').trim();

    // 1. If action is 'test', verify connection with Nodemailer
    if (action === 'test') {
      if (!targetPassword) {
        return NextResponse.json({ success: false, error: 'Password is empty. Please enter your mailbox password.' }, { status: 400 });
      }

      const transporter = nodemailer.createTransport({
        host: 'smtpout.secureserver.net',
        port: 465,
        secure: true,
        auth: {
          user: targetEmail,
          pass: targetPassword,
        },
        connectionTimeout: 10000,
        greetingTimeout: 5000,
      });

      try {
        await transporter.verify();
        return NextResponse.json({
          success: true,
          message: `SMTP Connection verified successfully for ${targetEmail}! Nodemailer is ready to send emails.`,
        });
      } catch (verifyError: any) {
        return NextResponse.json({
          success: false,
          error: `SMTP authentication failed: ${verifyError?.message || 'Invalid credentials or host unreachable'}.`,
        }, { status: 400 });
      }
    }

    // 2. Otherwise update .env.local and .env
    if (!targetPassword) {
      return NextResponse.json({ success: false, error: 'Password cannot be empty.' }, { status: 400 });
    }

    // Update in-memory environment variables immediately
    process.env.TITAN_EMAIL = targetEmail;
    process.env.TITAN_EMAIL_PASSWORD = targetPassword;

    // Helper to safely update or append keys in an env file
    const updateEnvFile = (filePath: string) => {
      let content = '';
      if (fs.existsSync(filePath)) {
        content = fs.readFileSync(filePath, 'utf-8');
      }

      const emailRegex = /^TITAN_EMAIL=.*$/m;
      const passRegex = /^TITAN_EMAIL_PASSWORD=.*$/m;

      if (emailRegex.test(content)) {
        content = content.replace(emailRegex, `TITAN_EMAIL=${targetEmail}`);
      } else {
        content += `\nTITAN_EMAIL=${targetEmail}`;
      }

      if (passRegex.test(content)) {
        content = content.replace(passRegex, `TITAN_EMAIL_PASSWORD=${targetPassword}`);
      } else {
        content += `\nTITAN_EMAIL_PASSWORD=${targetPassword}`;
      }

      fs.writeFileSync(filePath, content.trim() + '\n', 'utf-8');
    };

    const rootDir = process.cwd();
    const envLocalPath = path.join(rootDir, '.env.local');
    const envPath = path.join(rootDir, '.env');

    updateEnvFile(envLocalPath);
    updateEnvFile(envPath);

    return NextResponse.json({
      success: true,
      message: 'Mailbox credentials updated successfully in .env and .env.local! Nodemailer will use this new password immediately.',
      email: targetEmail,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || 'Failed to update email config' }, { status: 500 });
  }
}
