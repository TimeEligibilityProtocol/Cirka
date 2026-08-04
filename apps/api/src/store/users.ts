import { User } from "@wearto-you/domain";
import { randomUUID } from "node:crypto";

interface UserRecord extends User {
  passwordHash: string;
}

/** In-memory only — resets when the process restarts, same as listings.ts. */
const usersById = new Map<string, UserRecord>();
const userIdByEmail = new Map<string, string>();

export function findUserByEmail(email: string): UserRecord | undefined {
  const id = userIdByEmail.get(email.trim().toLowerCase());
  return id ? usersById.get(id) : undefined;
}

export function getUserById(id: string): UserRecord | undefined {
  return usersById.get(id);
}

export function createUser(email: string, passwordHash: string, displayName: string): UserRecord {
  const normalizedEmail = email.trim().toLowerCase();
  const record: UserRecord = {
    id: `u_${randomUUID()}`,
    email: normalizedEmail,
    displayName,
    createdAt: new Date().toISOString(),
    passwordHash,
  };
  usersById.set(record.id, record);
  userIdByEmail.set(normalizedEmail, record.id);
  return record;
}

export function toPublicUser(record: UserRecord): User {
  const { passwordHash: _passwordHash, ...publicUser } = record;
  return publicUser;
}
