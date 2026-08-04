import { randomUUID } from "node:crypto";

/** In-memory only — logs everyone out on process restart, same as listings/users. */
const userIdByToken = new Map<string, string>();

export function createSession(userId: string): string {
  const token = randomUUID();
  userIdByToken.set(token, userId);
  return token;
}

export function getUserIdForToken(token: string): string | undefined {
  return userIdByToken.get(token);
}

export function deleteSession(token: string): void {
  userIdByToken.delete(token);
}
