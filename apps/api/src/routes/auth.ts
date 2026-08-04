import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { hashPassword, verifyPassword } from "../lib/passwords.js";
import { createSession, deleteSession } from "../store/sessions.js";
import { createUser, findUserByEmail, getUserById, toPublicUser } from "../store/users.js";

const MIN_PASSWORD_LENGTH = 8;

export function authRouter(): Router {
  const router = Router();

  router.post("/api/auth/register", (req, res) => {
    const { email, password, displayName } = req.body as { email?: string; password?: string; displayName?: string };
    if (!email || !email.includes("@")) return res.status(400).json({ error: "invalid_email" });
    if (!password || password.length < MIN_PASSWORD_LENGTH) {
      return res.status(400).json({ error: "weak_password" });
    }
    if (findUserByEmail(email)) return res.status(409).json({ error: "email_taken" });

    const user = createUser(email, hashPassword(password), displayName?.trim() || email.split("@")[0]);
    const token = createSession(user.id);
    res.status(201).json({ token, user: toPublicUser(user) });
  });

  router.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body as { email?: string; password?: string };
    const user = email ? findUserByEmail(email) : undefined;
    if (!user || !password || !verifyPassword(password, user.passwordHash)) {
      return res.status(401).json({ error: "invalid_credentials" });
    }
    const token = createSession(user.id);
    res.json({ token, user: toPublicUser(user) });
  });

  router.post("/api/auth/logout", requireAuth, (req, res) => {
    const header = req.header("authorization") ?? "";
    const token = header.slice("Bearer ".length);
    deleteSession(token);
    res.status(204).send();
  });

  router.get("/api/auth/me", requireAuth, (req, res) => {
    const user = getUserById(req.userId!);
    if (!user) return res.status(401).json({ error: "auth_required" });
    res.json({ user: toPublicUser(user) });
  });

  return router;
}
