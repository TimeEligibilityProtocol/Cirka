import { Listing } from "@wearto-you/domain";
import { Router } from "express";
import { getListingById, getListings, insertListing, patchListing } from "../store/listings.js";

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
  router.post("/api/listings", (req, res) => {
    const listing = req.body as Listing;
    if (!listing?.id || !listing.categoryId || !listing.price) {
      return res.status(400).json({ error: "invalid_listing" });
    }
    insertListing(listing);
    res.status(201).json({ listing });
  });

  router.patch("/api/listings/:id", (req, res) => {
    const updated = patchListing(req.params.id, req.body as Partial<Listing>);
    if (!updated) return res.status(404).json({ error: "listing_not_found" });
    res.json({ listing: updated });
  });

  return router;
}
