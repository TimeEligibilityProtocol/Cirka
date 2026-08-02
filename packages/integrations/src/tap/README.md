# Tap Payments adapters (planned)

Not implemented in Step 0. Two adapters are planned here once the written
Tap answer (see `docs/payments/tap-c2c-question.md`) confirms C2C seller
onboarding is possible:

- `TapCollectionProvider` — implements `PaymentCollectionProvider`
  (`../payment-collection/types.ts`) using Tap card/Apple Pay/Google Pay
  checkout.
- `TapMarketplaceSettlementProvider` — implements `SettlementProvider`
  (`../settlement/types.ts`) using Tap Marketplace split/delayed
  payout/refund, if approved for this account.

Until then, `MockPaymentCollectionProvider` / `MockSettlementProvider`
are used in every environment, selected via `CHECKOUT_RAIL` /
`SETTLEMENT_PROVIDER` config in `apps/api`.
