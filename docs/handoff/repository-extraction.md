# Repository extraction to the client's account

Status: preparatory plan. **Do not execute the transfer without the owner's separate, explicit approval** — see `wearto-you-logika-licencjonowania-v3-IDENTITY-PAYOUT.md` (outside this repo), sections 8–9.

## Starting point

This project is already its own standalone repository, `TimeEligibilityProtocol/wearto.you` (private) — not a directory nested inside another TEP repo — so there is no mixed history from other projects to split out. This simplifies the original plan ("isolated directory inside the TEP repo"), but the safety steps below (secret scanning, confirming no TEP/Quantum/wayto.you-core code, a signed handoff protocol) apply exactly the same.

## Handoff procedure

1. **Content audit.** Confirm the repo contains none of:
   - TEP, Quantum, or wayto.you core code (`tep.js`, `behavioralGuard.js`, or derivatives) — see `packages/integrations/src/wayto-you-adapter/NOTICE.md`;
   - secrets from any project (`.env`, API keys, tokens) — only `.env.example` files with variable names are committed;
   - test data identifying real users/the client.
2. **Scan history for secrets** — `gitleaks detect --source . --log-opts="--all"` (same scanner as CI, but over full history, not just the diff).
3. **Connect client infrastructure** — new GitHub account/organization, hosting (Render/Vercel/Cloudflare Pages for the PWA, Render Web Service for `apps/api`), database (Render/Supabase/Neon Postgres), storage (Cloudflare R2/S3), domain — all owned or billed by the client's company, or with a clear transfer path.
4. **Transfer the repository** — GitHub → Settings → Transfer ownership, to the client's account/organization. Full git history is preserved (this is not a `git filter-repo` split of a subdirectory, since the repo has been standalone from the start).
5. **Copy retained by Quanthio** — before transfer, Quanthio may keep a private copy for B2B/B2B2C use, only if the contract allows it, and only after removing:
   - production secrets and client data,
   - client-owned branding,
   - changes made by the client after handoff, unless the contract covers them.
6. **Handoff protocol** — a document with the date, version (git tag), and commit hash on the day of transfer, signed by both parties.

## Branch protection and PR process

To be configured in the repo settings (outside the scope of files in this directory): `main` branch protection (required PR + review, no force-push), required CI pass before merge, blocking commits with detected secrets.

## Environments

Three separated environments from Step 0: `local` (developer machine, local `.env`, never committed), `preview`/`sandbox` (operator sandbox keys), `production` (enabled only after `PRODUCTION_PAYMENTS_ENABLED=true` and formal approvals — see `apps/api/.env.example`).

---

# Wyodrębnienie repozytorium do konta klienta (PL)

Status: plan przygotowawczy. **Nie wykonywać transferu bez osobnej, wyraźnej zgody właścicielki** — patrz `wearto-you-logika-licencjonowania-v3-IDENTITY-PAYOUT.md` (poza tym repo), sekcje 8–9.

## Punkt wyjścia

Ten projekt jest już samodzielnym repozytorium `TimeEligibilityProtocol/wearto.you` (prywatne), a nie katalogiem wewnątrz innego repo TEP — więc nie ma tu wymieszanej historii innych projektów do oddzielenia. To upraszcza pierwotny plan ("izolowany katalog w repo TEP"), ale kroki bezpieczeństwa (skan sekretów, potwierdzenie braku kodu TEP/Quantum/wayto.you core, protokół przekazania) obowiązują identycznie.

## Procedura przekazania klientowi

1. **Audyt zawartości.** Potwierdzić, że repo nie zawiera:
   - kodu TEP, Quantum ani rdzenia wayto.you (`tep.js`, `behavioralGuard.js` i pochodnych) — patrz `packages/integrations/src/wayto-you-adapter/NOTICE.md`;
   - sekretów jakiegokolwiek projektu (`.env`, klucze API, tokeny) — commitowane są wyłącznie pliki `.env.example` z nazwami zmiennych;
   - danych testowych identyfikujących konkretnych użytkowników/klienta.
2. **Skan historii pod kątem sekretów** — `gitleaks detect --source . --log-opts="--all"` (ten sam skaner co w CI, ale na pełnej historii, nie tylko na diffie).
3. **Podłączenie infrastruktury klienta** — nowe konto GitHub/organizacja, hosting (Render/Vercel/Cloudflare Pages dla PWA, Render Web Service dla `apps/api`), baza (Render/Supabase/Neon Postgres), storage (Cloudflare R2/S3), domena — wszystkie założone i opłacane przez firmę klienta lub z jasną ścieżką transferu.
4. **Transfer repozytorium** — GitHub → Settings → Transfer ownership, na konto/organizację klienta. Historia git zostaje zachowana w całości (nie jest to `git filter-repo` na podzbiorze katalogów, bo repo od początku jest samodzielne).
5. **Zachowana kopia Quanthio** — przed transferem Quanthio może zachować prywatną kopię do wykorzystania w B2B/B2B2C, wyłącznie jeśli umowa na to pozwala, i wyłącznie po usunięciu:
   - produkcyjnych sekretów i danych klienta,
   - brandingu należącego do klienta,
   - zmian wprowadzonych przez klienta po handoffie, jeśli umowa tego nie obejmuje.
6. **Protokół przekazania** — dokument z datą, wersją (tagiem git) i identyfikatorem commita na dzień transferu, podpisany przez obie strony.

## Ochrona gałęzi i proces PR

Do skonfigurowania w ustawieniach repo (poza zakresem plików w tym katalogu): ochrona gałęzi `main` (wymagany PR + przegląd, zakaz force-push), wymagane przejście CI przed merge, blokada commitów z wykrytymi sekretami.

## Środowiska

Trzy oddzielone środowiska od Kroku 0: `local` (deweloperskie, `.env` lokalny, nigdy niecommitowany), `preview`/`sandbox` (klucze sandbox operatorów), `production` (włączane dopiero po `PRODUCTION_PAYMENTS_ENABLED=true` i formalnych zgodach — patrz `apps/api/.env.example`).
