# wayto.you audit — preliminary findings

Status: **preliminary architecture audit**, based on a review of the `TimeEligibilityProtocol/WAYTO.YOU` repository (read-only, via `gh api`, no cloning and no code copied). Does not replace a written confirmation from wayto.you/Quanthio on production scope. Environment: **sandbox only** — wayto.you has no production deployment today (it is a prototype).

## What wayto.you actually does today

A single Node/Express service (`server.js`), no database — persistence via JSON files (`/data`), ephemeral on Render redeploy (hence `SEED_WALLETS` to reseed test data). Dependencies: `express`, `@sendgrid/mail` (email), `twilio` (WhatsApp), `dotenv`.

Implemented flows:
- **Send/claim** — a sender initiates a payment to an email or phone number (`POST /api/send`, `/api/whatsapp/send`); the service sends a secure claim link (email/WhatsApp); the recipient claims the funds (`POST /api/claim`) into `bank | card | crypto | wallet`.
- **Bank/card rails** — Lean (`/api/lean/initiate-payment`, `/api/lean/webhook`) and Tap (`/api/tap/initiate`, `/api/tap/webhook`), with signed webhooks (HMAC, `crypto.timingSafeEqual`) and idempotency based on the state stored on the payment record.
- **Payment requests** — generating a payment-request link and settling it via Lean or Tap.
- **Wallet/@waytag** — public payment profile; login via WhatsApp OTP (6 digits, `Math.random()`, 5-minute TTL, in-memory — lost on restart), email magic link (HMAC, 15-minute TTL), WebAuthn/passkey.
- **QR** — generated externally via `api.qrserver.com` (not locally, despite the `canvas` dev dependency).

## Two-sided security gate — current state

`tep.js` (the TEP/PRP engine) and `behavioralGuard.js` are today called **in-process, synchronously**, with no network boundary anywhere in the wayto.you repo. The only existing endpoint resembling a "neutral API" is `GET /api/security/preview` — but it returns a two-value verdict, `pass`/`paused`, not the three-tier `allow/step_up/manual_review` described in the marketplace spec, and it is tightly coupled to wayto.you's wallet concepts (`self`/`counterparty`/`role` parameters).

**Conclusion:** before `packages/integrations/src/wayto-you-adapter` can call a production-ready API, a dedicated partner endpoint needs to be formalized on the wayto.you side: a three-tier verdict, a stable request/response contract, and a separate API key for the caller (not `HMAC_SECRET` or wayto.you's own Tap/Lean keys). That work belongs in the wayto.you repo, not this one.

The gate is currently designed as **fail-open with logging** (an error is logged and the flow continues) and a global `GUARD_MODE`/`TEP_GUARD_MODE` switch (`enforce`/`challenge`/observe-only). The adapter in this repo should keep an analogous fail-open posture on error/timeout when calling wayto.you — see `packages/integrations/src/wayto-you-adapter/NOTICE.md`.

## Claim channels — email / WhatsApp

Confirmed: wayto.you genuinely sends claims via SendGrid (email) and Twilio (WhatsApp), with HMAC-signed, opaque, single-use tokens. This is exactly the mechanism described in the marketplace spec ("email or WhatsApp claim") — so demoing the end-to-end flow doesn't require building anything extra on the wayto.you side for claim delivery itself, just a formalized call from outside (see above).

## Open questions / gaps to close before Step 2

- [ ] A separate API key for wearto.you on the wayto.you side (never reuse wayto.you's internal secrets).
- [ ] Formalizing the three-tier `allow/step_up/manual_review` verdict (today: `pass/paused`).
- [ ] Confirming that wayto.you's existing Tap/Lean sandbox account can be used exclusively to demo **claim/payout routing**, while the marketplace's buyer checkout gets its own, separate Tap sandbox account (architectural recommendation — owner's decision, per working discussion).
- [ ] Written Tap answer to the question in `docs/payments/tap-c2c-question.md` (concerns the marketplace's checkout/split, not wayto.you itself).
- [ ] Production status of Lean Pay by Bank and Lean Payout as two separate capabilities (today: unknown beyond wayto.you's sandbox).

## What this audit does NOT cover

How `tep.js`/`behavioralGuard.js` compute their verdict — that is Quanthio's protected IP and is not reproduced or described here beyond the general statement that it evaluates time/behavior-based transaction eligibility. See `packages/integrations/src/wayto-you-adapter/NOTICE.md`.

---

# Audyt wayto.you — ustalenia wstępne (PL)

Status: **wstępny audyt architektury**, oparty na przeglądzie repozytorium `TimeEligibilityProtocol/WAYTO.YOU` (read-only, przez `gh api`, bez klonowania i bez kopiowania kodu). Nie zastępuje pisemnego potwierdzenia od wayto.you/Quanthio co do zakresu produkcyjnego. Środowisko: **wyłącznie sandbox** — wayto.you nie ma dziś wdrożenia produkcyjnego (prototyp).

## Co wayto.you faktycznie dziś robi

Pojedynczy serwis Node/Express (`server.js`), bez bazy danych — trwałość na plikach JSON (`/data`), efemeryczna przy redeployu na Render (stąd `SEED_WALLETS` do ponownego zasiania danych testowych). Zależności: `express`, `@sendgrid/mail` (e-mail), `twilio` (WhatsApp), `dotenv`.

Zaimplementowane przepływy:
- **Send/claim** — nadawca inicjuje płatność na e-mail lub numer telefonu (`POST /api/send`, `/api/whatsapp/send`); serwis wysyła bezpieczny link claim (e-mail/WhatsApp); odbiorca odbiera środki (`POST /api/claim`) do `bank | card | crypto | wallet`.
- **Szyny bankowe/kartowe** — Lean (`/api/lean/initiate-payment`, `/api/lean/webhook`) i Tap (`/api/tap/initiate`, `/api/tap/webhook`) z podpisanymi webhookami (HMAC, `crypto.timingSafeEqual`) i idempotencją po stanie zapisanym w rekordzie płatności.
- **Payment requests** — generowanie linku żądania zapłaty i jego rozliczenie przez Lean lub Tap.
- **Portfel/@waytag** — publiczny profil płatniczy, logowanie: WhatsApp OTP (6 cyfr, `Math.random()`, TTL 5 min, w pamięci — ginie przy restarcie), magic link e-mail (HMAC, TTL 15 min), WebAuthn/passkey.
- **QR** — generowany zewnętrznie przez `api.qrserver.com` (nie lokalnie, mimo `canvas` w zależnościach deweloperskich).

## Dwustronna bramka bezpieczeństwa — stan dziś

`tep.js` (silnik TEP/PRP) i `behavioralGuard.js` są dziś wołane **in-process, synchronicznie**, bez żadnej granicy sieciowej w obrębie repo wayto.you. Jedyny istniejący endpoint zbliżony do "neutralnego API" to `GET /api/security/preview` — ale zwraca dwuwartościowy werdykt `pass`/`paused`, nie trójstopniowy `allow/step_up/manual_review` opisany w specyfikacji marketplace'u, i jest mocno zrośnięty z pojęciami portfela wayto.you (parametry `self`/`counterparty`/`role`).

**Wniosek:** zanim adapter `packages/integrations/src/wayto-you-adapter` będzie mógł wołać produkcyjnie gotowe API, po stronie wayto.you trzeba sformalizować dedykowany endpoint partnerski: trójstopniowy werdykt, stabilny kontrakt request/response, osobny klucz API dla wywołującego (nie `HMAC_SECRET` ani klucze Tap/Lean wayto.you). To zadanie leży w repo wayto.you, nie w tym repo.

Bramka jest dziś zaprojektowana jako **fail-open z logowaniem** (błąd loguje się i przepływ kontynuuje) oraz globalnym przełącznikiem `GUARD_MODE`/`TEP_GUARD_MODE` (`enforce`/`challenge`/observe-only). Adapter w tym repo powinien zachować analogiczną postawę fail-open przy błędzie/timeout wołania do wayto.you — patrz `packages/integrations/src/wayto-you-adapter/NOTICE.md`.

## Kanały claim — e-mail / WhatsApp

Potwierdzone: wayto.you realnie wysyła claim przez SendGrid (e-mail) i Twilio (WhatsApp), z tokenami HMAC-podpisanymi, opaque, jednorazowymi. To jest dokładnie mechanizm opisany w specyfikacji marketplace'u ("Claim e-mail albo WhatsApp") — więc do demo end-to-end nie trzeba niczego dodatkowo budować po stronie wayto.you dla samego dostarczenia claimu, wystarczy sformalizowane wywołanie z zewnątrz (patrz wyżej).

## Otwarte pytania / braki do zamknięcia przed Krokiem 2

- [ ] Osobny klucz API dla wearto.you po stronie wayto.you (nie reużywać sekretów wewnętrznych wayto.you).
- [ ] Formalizacja trójstopniowego werdyktu `allow/step_up/manual_review` (dziś: `pass/paused`).
- [ ] Potwierdzenie, czy istniejące sandboxowe konto Tap/Lean wayto.you może być użyte wyłącznie do zademonstrowania **claim/payout-routing**, a checkout kupującej w marketplace dostaje własne, osobne konto sandbox Tap (rekomendacja architektoniczna — decyzja właścicielki, patrz rozmowa robocza).
- [ ] Pisemna odpowiedź Tap na pytanie w `docs/payments/tap-c2c-question.md` (dotyczy checkoutu/splitu marketplace'u, nie samego wayto.you).
- [ ] Status produkcyjny Lean Pay by Bank i Lean Payout jako dwóch osobnych capability (dziś: nieznany poza sandboxem wayto.you).

## Co NIE jest przedmiotem tego audytu

Sposób obliczania werdyktu przez `tep.js`/`behavioralGuard.js` — to chronione IP Quanthio i nie jest odtwarzane ani opisywane tutaj poza ogólnym stwierdzeniem, że dokonuje oceny czasowej/behawioralnej dopuszczalności transakcji. Patrz `packages/integrations/src/wayto-you-adapter/NOTICE.md`.
