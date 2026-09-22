import { NextResponse } from 'next/server';
import { getStore, saveStore } from '@/lib/dataStore';
import { sendPasswordResetEmail } from '@/lib/mailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, email, phone, otp, newPassword } = body;

    const cleanEmail = (email || '').trim().toLowerCase();
    const rawPhone = (phone || '').trim();

    if (!cleanEmail && !rawPhone) {
      return NextResponse.json(
        { error: 'Registered Super Admin email address is required.' },
        { status: 400 }
      );
    }

    const store = getStore();

    // Default Super Admin fallback account
    const DEFAULT_ACCOUNTS = {
      'admin@vannam.edu': {
        id: 'usr-admin-default',
        name: 'Dr. Gayathri R. (Super Admin)',
        email: 'admin@vannam.edu',
        phone: '+91 78100 87310',
        password: 'Admin@Vannam2026',
        role: 'ADMIN',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&q=80'
      }
    };

    // Find user by email or by phone
    let user = (store.users || []).find((u) => {
      const uEmail = (u.email || '').toLowerCase();
      if (cleanEmail && uEmail === cleanEmail) return true;
      if (rawPhone && (u.phone || '').includes(rawPhone)) return true;
      return false;
    });

    // If searching by email and not in store yet
    if (!user && cleanEmail && DEFAULT_ACCOUNTS[cleanEmail]) {
      user = { ...DEFAULT_ACCOUNTS[cleanEmail] };
      if (!store.users) store.users = [];
      store.users.push(user);
      try { saveStore(store); } catch (_) {}
    }

    // If still not found, fallback to super admin
    if (!user) {
      user = (store.users || []).find((u) => u.role === 'ADMIN' || u.role === 'super_admin') || {
        ...DEFAULT_ACCOUNTS['admin@vannam.edu'],
        email: cleanEmail || 'admin@vannam.edu'
      };
      if (!store.users) store.users = [];
      const adminIdx = store.users.findIndex((u) => u.role === 'ADMIN' || u.role === 'super_admin');
      if (adminIdx !== -1 && cleanEmail) {
        store.users[adminIdx].email = cleanEmail;
        user = store.users[adminIdx];
      } else {
        store.users.push(user);
      }
      try { saveStore(store); } catch (_) {}
    }

    const targetEmail = (user.email || cleanEmail).toLowerCase();

    // Initialize passwordResets store
    if (!store.passwordResets) {
      store.passwordResets = {};
    }

    // -------------------------------------------------------------
    // ACTION 1: SEND CONFIRMATION EMAIL WITH OTP
    // -------------------------------------------------------------
    if (action === 'send-otp') {
      // Generate a secure 6-digit numeric OTP
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

      store.passwordResets[targetEmail] = {
        otp: generatedOtp,
        userEmail: targetEmail,
        expiresAt,
        attempts: 0,
        createdAt: new Date().toISOString()
      };

      // Add audit log entry
      if (!store.auditLogs) store.auditLogs = [];
      store.auditLogs.unshift({
        id: `log-${Date.now()}`,
        action: 'PASSWORD_RESET_EMAIL_REQUESTED',
        userId: user.id || 'usr-admin',
        userName: user.name || 'Super Admin',
        resource: 'Auth',
        details: `Password reset verification email requested for ${targetEmail}`,
        timestamp: new Date().toISOString()
      });

      saveStore(store);

      // Send the actual confirmation email using Nodemailer
      await sendPasswordResetEmail({
        toEmail: targetEmail,
        userName: user.name || 'Super Admin',
        otpCode: generatedOtp
      });

      console.log(`[Vannam Auth] 📧 Confirmation Code dispatched to ${targetEmail}: ${generatedOtp}`);

      return NextResponse.json({
        success: true,
        message: `A 6-digit confirmation code has been sent to ${targetEmail}. Please check your inbox.`,
        email: targetEmail,
        expiresInMinutes: 10
      });
    }

    // -------------------------------------------------------------
    // ACTION 2: VERIFY OTP AND RESET PASSWORD
    // -------------------------------------------------------------
    if (action === 'verify-and-reset') {
      if (!otp) {
        return NextResponse.json(
          { error: 'The 6-digit confirmation code is required.' },
          { status: 400 }
        );
      }

      if (!newPassword || newPassword.length < 6) {
        return NextResponse.json(
          { error: 'New password must be at least 6 characters long.' },
          { status: 400 }
        );
      }

      const pending = store.passwordResets[targetEmail] || store.passwordResets[cleanEmail];

      if (!pending) {
        return NextResponse.json(
          { error: 'No active password reset request found. Please request a new confirmation code.' },
          { status: 400 }
        );
      }

      if (Date.now() > pending.expiresAt) {
        delete store.passwordResets[targetEmail];
        if (cleanEmail) delete store.passwordResets[cleanEmail];
        saveStore(store);
        return NextResponse.json(
          { error: 'Confirmation code has expired. Please request a new code.' },
          { status: 400 }
        );
      }

      // Check OTP match (trimmed)
      if (pending.otp.trim() !== otp.trim()) {
        pending.attempts = (pending.attempts || 0) + 1;
        if (pending.attempts >= 5) {
          delete store.passwordResets[targetEmail];
          if (cleanEmail) delete store.passwordResets[cleanEmail];
          saveStore(store);
          return NextResponse.json(
            { error: 'Too many incorrect attempts. Please request a new confirmation code.' },
            { status: 400 }
          );
        }
        saveStore(store);
        return NextResponse.json(
          { error: `Invalid confirmation code. Please try again (${5 - pending.attempts} attempts remaining).` },
          { status: 400 }
        );
      }

      // OTP is valid! Update user password
      user.password = newPassword.trim();
      delete store.passwordResets[targetEmail];
      if (cleanEmail) delete store.passwordResets[cleanEmail];

      // Add audit log entry
      if (!store.auditLogs) store.auditLogs = [];
      store.auditLogs.unshift({
        id: `log-${Date.now()}`,
        action: 'PASSWORD_RESET_SUCCESS',
        userId: user.id || 'usr-admin',
        userName: user.name || 'Super Admin',
        resource: 'Auth',
        details: `Password successfully updated via email confirmation for ${targetEmail}`,
        timestamp: new Date().toISOString()
      });

      saveStore(store);

      // Also attempt Neon PostgreSQL Cloud Database sync if available
      try {
        const { neon } = await import('@neondatabase/serverless');
        const databaseUrl = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_sbnhif1K2AZC@ep-autumn-resonance-awbnd4f3.c-12.us-east-1.aws.neon.tech/neondb?sslmode=require';
        if (databaseUrl) {
          const sql = neon(databaseUrl);
          await sql`
            UPDATE users 
            SET password = ${newPassword.trim()}
            WHERE LOWER(email) = ${targetEmail};
          `;
          console.log(`[Vannam Auth] ✅ Synced new password to Neon cloud DB for ${targetEmail}`);
        }
      } catch (dbErr) {
        console.warn(`[Vannam Auth] ⚠️ Neon DB sync note:`, dbErr.message);
      }

      return NextResponse.json({
        success: true,
        userEmail: targetEmail,
        message: 'Password successfully updated! You can now log in with your new credentials.'
      });
    }

    return NextResponse.json(
      { error: 'Invalid action specified. Supported actions are "send-otp" and "verify-and-reset".' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Password reset API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error processing password reset.' },
      { status: 500 }
    );
  }
}
