import { Listing } from "@wearto-you/domain";
import { buildSeedListings } from "./seedData.js";

/**
 * In-memory only — resets when the process restarts. This is a real
 * shared server (every client hitting this process sees the same data),
 * not a database. A real DB is the natural next step, not done here.
 */
let listings: Listing[] = buildSeedListings();

export function getListings(): Listing[] {
  return listings;
}

export function getListingById(id: string): Listing | undefined {
  return listings.find((l) => l.id === id);
}

export function insertListing(listing: Listing): Listing {
  listings = [listing, ...listings];
  return listing;
}

export function patchListing(id: string, patch: Partial<Listing>): Listing | undefined {
  const index = listings.findIndex((l) => l.id === id);
  if (index === -1) return undefined;
  listings[index] = { ...listings[index], ...patch };
  return listings[index];
}
