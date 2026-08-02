import {
  ClaimStatus,
  RequestPayoutClaimParams,
  RequestPayoutClaimResult,
  SecurityCheckParams,
  SecurityCheckResult,
  WayToYouRoutingProvider,
} from "./types.js";

/** Always allows and always returns a stable claim status — for local dev / tests only. */
export class MockWayToYouRoutingProvider implements WayToYouRoutingProvider {
  async checkTransactionSecurity(_params: SecurityCheckParams): Promise<SecurityCheckResult> {
    return { verdict: "allow", reason: null };
  }

  async requestPayoutClaim(params: RequestPayoutClaimParams): Promise<RequestPayoutClaimResult> {
    return { claimId: `mock_claim_${params.orderId}`, status: "claim_sent" };
  }

  async getClaimStatus(_claimId: string): Promise<ClaimStatus> {
    return "claim_sent";
  }
}
