# Lean Technologies adapters (planned)

Not implemented in Step 0. Lean Pay by Bank and Lean Payout are separate
capabilities and must stay separate adapters — access to one does not
confirm access to the other (spec section 14).

- `LeanPayByBankProvider` — implements `PaymentCollectionProvider`
  (`../payment-collection/types.ts`) for buyer bank-account checkout.
- `LeanPayoutProvider` — implements `SettlementProvider`'s payout
  surface for seller bank payout, once production-approved.

Until then, mocks are used, selected via config in `apps/api`.
