export type VerificationLevel = "basic" | "enhanced";

export type VerificationStatus = "not_started" | "pending" | "verified" | "rejected" | "expired";

/** Above this threshold, both buyer and seller require enhanced verification. Configurable later via admin panel. */
export const ENHANCED_KYC_THRESHOLD_USD = 500;

export interface IdentityVerification {
  id: string;
  userId: string;
  level: VerificationLevel;
  status: VerificationStatus;
  providerCaseId: string | null; // reference only — documents live with the KYC provider, not here
  updatedAt: string;
}
