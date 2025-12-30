/**
 * Authentication helpers for hashing and verifying passwords.
 *
 * Tip: install BCrypt type declarations for better TypeScript support:
 *   npm install --save-dev @types/bcrypt
 */

import * as bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
