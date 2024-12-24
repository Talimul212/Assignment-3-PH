/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_Access_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

interface TokenPayload {
  id: string;
  role: string;
}

/**
 * Generates a JWT token for a given payload.
 * @param payload - The data to be encoded in the token.
 * @returns A signed JWT token string.
 */
export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

/**
 * Verifies and decodes a JWT token.
 * @param token - The JWT token to be verified.
 * @returns The decoded token payload.
 */
export const verifyToken = (token: string): JwtPayload | TokenPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload | TokenPayload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};
