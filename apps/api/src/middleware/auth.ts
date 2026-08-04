import { NextFunction, Request, Response } from "express";
import { getUserIdForToken } from "../store/sessions.js";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

/** Publishing/removing a listing requires a valid session — anonymous browsing does not. */
export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const header = req.header("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice("Bearer ".length) : null;
  const userId = token ? getUserIdForToken(token) : undefined;
  if (!userId) {
    res.status(401).json({ error: "auth_required" });
    return;
  }
  req.userId = userId;
  next();
}
