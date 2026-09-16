import { NextResponse } from 'next/server';
import { verifySessionToken } from './auth';
import prisma from './prisma';

/**
 * Extract authenticated user session from Request cookies or Authorization header
 */
export async function getAuthenticatedUser(request) {
  try {
    // 1. Check HTTP-only cookie
    const tokenCookie = request.cookies.get('vannam_auth_token');
    let token = tokenCookie?.value;

    // 2. Check Authorization Header Bearer token if cookie is not found
    if (!token) {
      const authHeader = request.headers.get('authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      return null;
    }

    const payload = verifySessionToken(token);
    if (!payload || !payload.id) {
      return null;
    }

    // Verify user exists in database
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      include: {
        teacher: {
          include: {
            classes: true
          }
        }
      }
    });

    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      teacher: user.teacher
    };
  } catch (error) {
    console.error('RBAC Error verifying user:', error);
    return null;
  }
}

/**
 * Require specific Role (e.g. ['ADMIN'] or ['ADMIN', 'TEACHER'])
 */
export async function requireAuth(request, allowedRoles = ['ADMIN', 'TEACHER']) {
  const user = await getAuthenticatedUser(request);
  if (!user) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: 'Unauthorized: Authentication required' },
        { status: 401 }
      ),
      user: null
    };
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: 'Forbidden: Insufficient privileges' },
        { status: 403 }
      ),
      user
    };
  }

  return { authorized: true, user, response: null };
}

/**
 * Audit log helper
 */
export async function createAuditLog({ action, entity, entityId, details, user, ipAddress }) {
  try {
    await prisma.auditLog.create({
      data: {
        action,
        entity,
        entityId: entityId ? String(entityId) : null,
        details: details || null,
        userId: user?.id || null,
        userName: user?.name || 'System',
        ipAddress: ipAddress || null
      }
    });
  } catch (err) {
    console.error('Failed to create audit log:', err);
  }
}
