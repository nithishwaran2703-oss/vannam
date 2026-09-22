import nodemailer from 'nodemailer';

/**
 * Sends a branded password reset confirmation email
 */
export async function sendPasswordResetEmail({ toEmail, userName, otpCode }) {
  try {
    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER || process.env.GMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS || process.env.GMAIL_PASS || process.env.GMAIL_APP_PASSWORD;
    const smtpHost = process.env.SMTP_HOST || (smtpUser?.includes('@gmail.com') ? 'smtp.gmail.com' : undefined);
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 465;

    let transporter;

    if (smtpUser && smtpPass) {
      transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });
    } else {
      // Create an automatic Ethereal test inbox for development so emails are genuinely sent and viewable
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
    }

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 28px; background-color: #0A1B44; color: #FFFFFF; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #FFFFFF; font-size: 24px; margin: 0; font-weight: 800; letter-spacing: -0.5px;">Vannam Control Center</h1>
          <p style="color: #CBD8F6; font-size: 13px; margin-top: 4px;">Security Verification & Password Reset</p>
        </div>

        <div style="background-color: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 16px; padding: 24px; margin-bottom: 24px;">
          <p style="font-size: 14px; line-height: 1.6; color: #E2E8F0; margin-top: 0;">
            Hello <strong>${userName || 'Super Admin'}</strong>,
          </p>
          <p style="font-size: 14px; line-height: 1.6; color: #CBD8F6;">
            A password reset request was initiated for your administrator account (<code style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; color: #F59E0B;">${toEmail}</code>).
          </p>
          <p style="font-size: 14px; line-height: 1.6; color: #CBD8F6;">
            Use the 6-digit confirmation code below to verify your identity and set a new password:
          </p>

          <div style="text-align: center; margin: 28px 0;">
            <div style="display: inline-block; background: linear-gradient(135deg, #F59E0B, #FBBF24); color: #0F2963; font-family: monospace; font-size: 32px; font-weight: 900; letter-spacing: 8px; padding: 14px 28px; border-radius: 12px; box-shadow: 0 4px 15px rgba(245, 158, 11, 0.35);">
              ${otpCode}
            </div>
            <p style="font-size: 11px; color: #94A3B8; margin-top: 8px;">Valid for 10 minutes • Single-use security code</p>
          </div>

          <p style="font-size: 12px; line-height: 1.5; color: #94A3B8; margin-bottom: 0;">
            If you did not request this password reset, please ignore this email or contact the school IT department immediately.
          </p>
        </div>

        <div style="text-align: center; font-size: 11px; color: #64748B; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px;">
          Vannam Montessori Preschool & Daycare • Automated Security Service<br/>
          This is a system-generated notification. Please do not reply directly to this email.
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"Vannam Control Center" <${smtpUser || 'security@vannam.edu'}>`,
      to: toEmail,
      subject: `🔐 Your Security Confirmation Code: ${otpCode}`,
      text: `Hello ${userName || 'Super Admin'},\n\nYour 6-digit password reset confirmation code is: ${otpCode}\n\nThis code is valid for 10 minutes.\n\nIf you did not request this, please ignore this email.\n\nVannam Control Center`,
      html: htmlContent
    });

    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log(`[Vannam Email] 📬 Preview delivered test email: ${previewUrl}`);
    } else {
      console.log(`[Vannam Email] ✅ Confirmation email delivered to ${toEmail}`);
    }

    return { success: true, previewUrl };
  } catch (error) {
    console.error('[Vannam Email Error]:', error);
    return { success: false, error: error.message };
  }
}
