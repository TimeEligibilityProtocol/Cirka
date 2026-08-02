# wearto.you

C2C marketplace for used, vintage and premium fashion — Dubai/UAE. Standalone monorepo, technically isolated from TEP, Quantum and the wayto.you core.

## Status

Step 0 — project skeleton. See `docs/handoff/repository-extraction.md` for the eventual client-transfer plan and `docs/payments/` for the state of payment integrations.

## Structure

```
apps/
  marketplace/   — Expo + React Native + React Native Web (PWA first, iOS/Android from the same codebase)
  admin/         — owner's panel, web-only
  api/           — Node.js + TypeScript backend
packages/
  domain/        — entity types, status enums, business rules shared across apps/*
  api-client/    — typed marketplace API client for apps/marketplace and apps/admin
  ui/            — design tokens (colors, typography, spacing) and shared components
  platform/      — platform interfaces (CameraService, MediaPicker, SecureStorage, PaymentUI, ...)
  integrations/  — external operator adapters (Tap, Lean, wayto.you, courier, notifications) + mocks
docs/
  handoff/       — plan for extracting the repository to the client's account
  payments/      — Tap/Lean/wayto.you audit, open questions
  legal-ops/     — drafts pending UAE lawyer review
```

## Isolation rules

- This repo does not import TEP, Quantum, or wayto.you core code.
- It does not use secrets from any other project.
- wayto.you is consumed only through a thin adapter (`packages/integrations/src/wayto-you-adapter`) calling its public API and receiving a neutral result (`allow` / `step_up` / `manual_review`).
- Crypto and PayPal are not part of the product.

Full product-decision context lives in the planning documents the owner provided (outside this repo).

## Local development

```bash
npm install
npm run dev:api          # backend on localhost
npm run web:marketplace  # marketplace as a PWA in the browser
npm run dev:admin        # admin panel
```

Requires Node.js 20+ (see `.nvmrc`).

---

# wearto.you (PL)

Marketplace C2C mody używanej, vintage i premium — Dubaj/UAE. Samodzielne monorepo, technicznie odizolowane od TEP, Quantum i rdzenia wayto.you.

## Status

Krok 0 — szkielet projektu. Zobacz `docs/handoff/repository-extraction.md` dla planu docelowego transferu do klienta oraz `docs/payments/` dla stanu integracji płatniczych.

## Struktura

```
apps/
  marketplace/   — Expo + React Native + React Native Web (PWA na start, iOS/Android z tego samego kodu)
  admin/         — panel właścicielki, web-only
  api/           — backend Node.js + TypeScript
packages/
  domain/        — typy encji, enumy statusów, zasady biznesowe współdzielone przez apps/*
  api-client/    — typowany klient API marketplace'u dla apps/marketplace i apps/admin
  ui/            — design tokens (kolory, typografia, odstępy) i współdzielone komponenty
  platform/      — interfejsy platformowe (CameraService, MediaPicker, SecureStorage, PaymentUI, ...)
  integrations/  — adaptery zewnętrznych operatorów (Tap, Lean, wayto.you, kurier, powiadomienia) + mocki
docs/
  handoff/       — plan wyodrębnienia repozytorium do konta klienta
  payments/      — audyt Tap/Lean/wayto.you, otwarte pytania
  legal-ops/     — szkice do weryfikacji przez prawnika UAE
```

## Zasady izolacji

- Ten katalog/repo nie importuje kodu TEP, Quantum ani rdzenia wayto.you.
- Nie używa sekretów innych projektów.
- wayto.you jest konsumowane wyłącznie przez cienki adapter (`packages/integrations/src/wayto-you-adapter`) wywołujący publiczne API i odbierający neutralny wynik (`allow` / `step_up` / `manual_review`).
- Krypto i PayPal nie są częścią produktu.

Pełny kontekst decyzji produktowych: patrz dokumenty planistyczne przekazane przez właścicielkę (poza tym repo).

## Uruchomienie lokalne

```bash
npm install
npm run dev:api          # backend na localhost
npm run web:marketplace  # marketplace jako PWA w przeglądarce
npm run dev:admin        # panel administracyjny
```

Wymagany Node.js 20+ (patrz `.nvmrc`).
