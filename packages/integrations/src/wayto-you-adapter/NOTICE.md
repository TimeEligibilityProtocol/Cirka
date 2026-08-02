# NOTICE — wayto.you integration boundary

This directory (`packages/integrations/src/wayto-you-adapter`) is a **thin
client adapter** for the external wayto.you service. It is not, and must
never become, a copy of wayto.you's core protocol.

## What this adapter may contain

- An HTTPS client for wayto.you's public API.
- Public request/response types (see `types.ts`).
- Status/verdict mapping (`SecurityVerdict`: `allow` / `step_up` /
  `manual_review`; `ClaimStatus`).
- Claim-channel selection (email/WhatsApp) and webhook handling.
- Mock/sandbox implementations for local development and tests.
- Configuration for the wayto.you API base URL and this project's own
  wayto.you API key.

## What this adapter must never contain

- Any part of the TEP (Time Eligibility Protocol) or PRP algorithm —
  scoring logic, eligibility-window computation, formulas, thresholds,
  or calibration parameters.
- Any part of wayto.you's behavioral-guard logic (velocity/anomaly
  detection rules or parameters).
- wayto.you's internal secrets (its own Tap/Lean/Twilio/SendGrid
  credentials, its `HMAC_SECRET`, or any code copied from the
  `TimeEligibilityProtocol/WAYTO.YOU` repository).
- Code that reverse-engineers or infers how wayto.you computes a verdict
  from its API responses.

## Ownership

wayto.you, TEP and PRP remain Quanthio's separate, protected IP. This
marketplace consumes wayto.you exclusively through its public API and
receives only neutral results (`allow` / `step_up` / `manual_review`,
claim/payout status). See `wearto-you-logika-licencjonowania-v3.md`
(outside this repo) for the full licensing rationale, and
`docs/payments/wayto-you-findings.md` for the audit of what wayto.you's
API currently exposes versus what a formal partner integration will
require.

## Failure handling

wayto.you must be treated as fail-open at the integration layer: an
error or timeout calling wayto.you is an **integration error**, to be
surfaced to admins and retried/logged — never silently interpreted as
`manual_review` or used to block an otherwise valid transaction.

---

# NOTICE — granica integracji z wayto.you (PL)

Ten katalog (`packages/integrations/src/wayto-you-adapter`) jest **cienkim
adapterem klienckim** dla zewnętrznego serwisu wayto.you. Nie jest, i nigdy
nie może się stać, kopią rdzennego protokołu wayto.you.

## Co ten adapter może zawierać

- Klienta HTTPS dla publicznego API wayto.you.
- Publiczne typy żądań/odpowiedzi (patrz `types.ts`).
- Mapowanie statusów/werdyktów (`SecurityVerdict`: `allow` / `step_up` /
  `manual_review`; `ClaimStatus`).
- Wybór kanału claim (e-mail/WhatsApp) i obsługę webhooków.
- Implementacje mock/sandbox do lokalnego developmentu i testów.
- Konfigurację adresu bazowego API wayto.you oraz własnego klucza API tego
  projektu do wayto.you.

## Czego ten adapter nigdy nie może zawierać

- Żadnej części algorytmu TEP (Time Eligibility Protocol) ani PRP —
  logiki scoringu, obliczania okna kwalifikowalności, wzorów, progów ani
  parametrów kalibracji.
- Żadnej części logiki behavioralGuard wayto.you (reguł/parametrów
  wykrywania anomalii/prędkości).
- Wewnętrznych sekretów wayto.you (jego własnych danych Tap/Lean/Twilio/
  SendGrid, jego `HMAC_SECRET`, ani żadnego kodu skopiowanego z
  repozytorium `TimeEligibilityProtocol/WAYTO.YOU`).
- Kodu odtwarzającego lub wnioskującego, w jaki sposób wayto.you oblicza
  werdykt na podstawie odpowiedzi API.

## Własność

wayto.you, TEP i PRP pozostają osobnym, chronionym IP Quanthio. Ten
marketplace konsumuje wayto.you wyłącznie przez jego publiczne API i
odbiera jedynie neutralne wyniki (`allow` / `step_up` / `manual_review`,
status claim/payout). Patrz `wearto-you-logika-licencjonowania-v3.md`
(poza tym repo) po pełne uzasadnienie licencyjne oraz
`docs/payments/wayto-you-findings.md` po audyt tego, co API wayto.you
udostępnia dziś względem tego, czego będzie wymagać formalna integracja
partnerska.

## Obsługa błędów

wayto.you musi być traktowane jako fail-open na poziomie integracji: błąd
lub timeout wywołania wayto.you to **błąd integracyjny**, który należy
zgłosić administratorom i ponowić/zalogować — nigdy nie interpretować go
po cichu jako `manual_review` ani nie używać do blokowania skądinąd
poprawnej transakcji.
