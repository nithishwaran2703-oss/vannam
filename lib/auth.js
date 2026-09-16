import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'vannam-preschool-ultra-secure-jwt-secret-key-2026';

/**
 * Hash a plain text password using bcrypt
 */
export async function hashPassword(plainPassword) {
  if (!plainPassword) throw new Error('Password is required');
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plainPassword, salt);
}

/**
 * Verify a plain text password against a bcrypt hash
 */
export async function verifyPassword(plainPassword, passwordHash) {
  if (!plainPassword || !passwordHash) return false;
  return bcrypt.compare(plainPassword, passwordHash);
}

/**
 * Generate a signed JWT session token
 */
export function signSessionToken(payload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d'
  });
}

/**
 * Verify and decode a JWT session token
 */
export function verifySessionToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}
