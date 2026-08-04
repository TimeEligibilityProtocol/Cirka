import { Listing } from "@wearto-you/domain";
import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { deleteListing, getListingById, getListings, insertListing, patchListing } from "../store/listings.js";

export function listingsRouter(): Router {
  const router = Router();

  router.get("/api/listings", (_req, res) => {
    res.json({ listings: getListings() });
  });

  router.get("/api/listings/:id", (req, res) => {
    const listing = getListingById(req.params.id);
    if (!listing) return res.status(404).json({ error: "listing_not_found" });
    res.json({ listing });
  });

  // Used by Magic Listing's publish step. Client sends a fully-formed
  // Listing (already approved by the seller) rather than a partial —
  // there is no server-side AI step yet, that's still client-simulated.
  // Requires auth: sellerId is taken from the session, never trusted from
  // the client, so a listing can't be published under someone else's name.
  router.post("/api/listings", requireAuth, (req, res) => {
    const listing = req.body as Listing;
    if (!listing?.id || !listing.categoryId || !listing.price) {
      return res.status(400).json({ error: "invalid_listing" });
    }
    insertListing({ ...listing, sellerId: req.userId! });
    res.status(201).json({ listing });
  });

  router.patch("/api/listings/:id", requireAuth, (req, res) => {
    const existing = getListingById(req.params.id);
    if (!existing) return res.status(404).json({ error: "listing_not_found" });
    if (existing.sellerId !== req.userId) return res.status(403).json({ error: "not_owner" });
    const updated = patchListing(req.params.id, req.body as Partial<Listing>);
    res.json({ listing: updated });
  });

  router.delete("/api/listings/:id", requireAuth, (req, res) => {
    const existing = getListingById(req.params.id);
    if (!existing) return res.status(404).json({ error: "listing_not_found" });
    if (existing.sellerId !== req.userId) return res.status(403).json({ error: "not_owner" });
    deleteListing(req.params.id);
    res.status(204).send();
  });

  return router;
}
