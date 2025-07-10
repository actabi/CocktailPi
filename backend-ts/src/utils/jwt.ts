import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'secret';

export interface JwtPayload {
  id: number;
  username: string;
  role: string;
}

export function signToken(payload: JwtPayload, expiresIn: string | number = '1h'): string {
  return jwt.sign(payload, SECRET, { expiresIn });
}

export function verifyToken<T = JwtPayload>(token: string): T | null {
  try {
    return jwt.verify(token, SECRET) as T;
  } catch {
    return null;
  }
}
