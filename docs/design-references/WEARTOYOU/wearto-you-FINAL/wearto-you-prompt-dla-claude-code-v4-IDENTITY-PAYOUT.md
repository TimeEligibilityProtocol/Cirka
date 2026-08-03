# Polecenie startowe dla Claude Code — wearto.you

Pracujesz w istniejącym prywatnym repozytorium GitHub `TEP`. Utwórz w nim technicznie odizolowany, samodzielny katalog:

`wearto-you-marketplace/`

Nie zakładaj teraz nowego repozytorium i nie wykonuj transferu. Projekt ma być przygotowany tak, aby później można było wyodrębnić go wraz z własną historią do nowego prywatnego repozytorium na koncie GitHub klienta. Quanthio może zachować wyłącznie prawnie dozwoloną, oczyszczoną kopię ogólnego frameworku B2B/B2B2C.

## Dokumenty obowiązkowe

Przed rozpoczęciem przeczytaj w całości:

1. `wearto-you-WORD-v10-IDENTITY-PAYOUT.docx`;
2. `wearto-you-CLAUDE-v12-IDENTITY-PAYOUT.md`;
3. `wearto-you-logika-licencjonowania-v3-IDENTITY-PAYOUT.md`;
4. `deck_waytoyou.pdf`;
5. `wayto-you-architektura-PL.pdf`;
6. `PRP_Patent_PL.docx`.

Jeżeli dokumenty są sprzeczne, zatrzymaj daną decyzję, opisz sprzeczność prostym językiem i poproś o rozstrzygnięcie. Nie zmieniaj zatwierdzonego modelu produktu na podstawie własnej preferencji technicznej.

## Zatwierdzona decyzja produktowa

wearto.you nie ma portfela użytkownika.

Zatwierdzony komunikat i zachowanie produktu:

> Po zatwierdzeniu sprzedaży wypłata jest adresowana do zweryfikowanej osoby przez jej e-mail lub numer telefonu. Sprzedawczyni otrzymuje bezpieczny claim link wybranym kanałem — e-mailem albo przez WhatsApp — i wskazuje obsługiwane miejsce odbioru. Tap albo Lean wykonuje transfer. Marketplace nie prowadzi salda użytkowniczki, nie wykonuje ręcznego przelewu i nie przechowuje pełnych danych finansowych.

Hasło logiczne: **pieniądze podążają za tożsamością, a nie za zapisanym rachunkiem**.

Operator finansowy może prowadzić wymagany techniczny ledger w tle. Nie wolno jednak tworzyć w UI salda ani portfela wearto.you, możliwości doładowania lub przechowywania środków na przyszłe zakupy.

## Granica własności intelektualnej

- Nie kopiuj ani nie importuj kodu TEP, Quantum, PRP ani rdzenia wayto.you.
- Nie umieszczaj w marketplace wzorów, parametrów, kalibracji ani komentarzy ujawniających protokół.
- wayto.you pozostaje osobną usługą wywoływaną przez cienki adapter API.
- Marketplace konsumuje wyłącznie neutralny wynik bezpieczeństwa, np. allow, step_up lub manual_review.
- Nie używaj sekretów innych projektów.
- Nie implementuj krypto ani PayPal. PayPal jest w materiałach wyłącznie porównaniem architektury.

## Zakres pierwszego zadania

Wykonaj Krok 0 oraz część audytową Kroku 1 z sekcji 29. Nie buduj jeszcze wszystkich ekranów.

### Struktura

Wewnątrz `wearto-you-marketplace/` przygotuj samodzielne monorepo:

- `apps/marketplace` — Expo/React Native Web, PWA na start, później iOS/Android z tego samego kodu;
- `apps/admin` — panel właścicielki na web;
- `apps/api` — backend Node.js;
- `packages/domain`;
- `packages/api-client`;
- `packages/ui`;
- `packages/platform`;
- `packages/integrations`;
- `docs`.

Projekt ma mieć własne manifesty, lockfile, konfigurację, testy, CI i instrukcję uruchomienia. Skonfiguruj środowiska local, preview/sandbox i production bez prawdziwych sekretów. Dodaj test build PWA, nieprodukcyjny test kompilacji iOS/Android oraz skanowanie sekretów.

Utwórz `docs/handoff/repository-extraction.md` opisujący bezpieczne wyodrębnienie wyłącznie wearto.you do repozytorium klienta bez historii innych projektów z TEP.

## Zatwierdzony przepływ pieniężny

1. Kupująca płaci przez Tap kartą, Apple Pay lub Google Pay albo przez produkcyjnie zatwierdzone Lean Pay by Bank.
2. Regulowany operator potwierdza płatność i prowadzi wymagany stan rozliczenia. Marketplace nie przechowuje środków.
3. Po dostawie kupująca akceptuje rzecz albo mija czas na problem bez otwartego sporu.
4. Backend tworzy podpisaną instrukcję payoutu z tożsamością sprzedawczyni i niezmiennym podziałem 90/10.
5. Dwustronna bramka wayto.you sprawdza stronę płacącą i odbierającą.
6. wayto.you wysyła claim link wybranym przez sprzedawczynię kanałem: e-mail albo WhatsApp.
7. Sprzedawczyni uwierzytelnia się i wybiera lub potwierdza obsługiwane miejsce odbioru.
8. Tap albo Lean automatycznie wykonuje payout 90% oraz rozlicza 10% prowizji platformy.
9. Status wraca przez bezpieczny webhook i jest widoczny w zamówieniu.

Administrator ręcznie uczestniczy wyłącznie przy sporze, niezgodności, chargebacku lub kontroli bezpieczeństwa.

## Adaptery

Rozdziel role:

- `PaymentCollectionProvider` — checkout kupującej;
- `SettlementProvider` — regulowany hold/delayed split, payout i refund;
- `WayToYouRoutingProvider` — adresowanie do osoby, claim, kanał e-mail/WhatsApp i wynik dwustronnego bezpieczeństwa;
- `CourierProvider` — zamówienie oraz statusy dostawy;
- `NotificationProvider` — in-app, web push i e-mail marketplace’u;
- `WayToYouClaimNotifier` — claim e-mail albo WhatsApp.

Planowane implementacje:

- `TapCollectionProvider`;
- `TapMarketplaceSettlementProvider`;
- `LeanPayByBankProvider`;
- `LeanPayoutProvider`;
- `WayToYouRoutingProvider`;
- mock/sandbox dla każdej roli.

Lean Pay by Bank oraz Lean Payout są oddzielnymi capabilities. Dostęp do jednej nie potwierdza drugiej.

## Obowiązkowe pytanie do Tap

Dodaj bez skracania do `docs/payments/tap-c2c-question.md`:

> Czy Tap Marketplace w UAE pozwala onboardować jako odbiorców splitu i payoutu osoby prywatne, które okazjonalnie sprzedają własne używane ubrania, buty i torebki, bez trade license? Jeżeli tak, jakie KYC, dokumenty, dane bankowe i limity obowiązują każdą sprzedawczynię; czy otrzymuje ona destination/retailer ID; czy split 90/10 i payout mogą zostać wykonane dopiero po potwierdzonej dostawie oraz zakończeniu czasu na spór; i jak Tap obsługuje refund oraz chargeback po payoutcie?

Kontakt roboczy:

- Belal Mohamad;
- `b.aboalqumsan@tap.company`.

Nie wysyłaj wiadomości ani dokumentów bez osobnej zgody właścicielki.

## Claim e-mail albo WhatsApp

Sprzedawczyni wybiera preferowany kanał claim w ustawieniach payoutu:

- zweryfikowany e-mail; albo
- zweryfikowany numer telefonu z WhatsApp.

Zapisz wybór, wersję zgody, czas weryfikacji, status dostarczenia i otwarcie linku. Zmiana kanału wymaga ponownego potwierdzenia. Claim ma deep link prowadzący do konkretnej wypłaty i nigdy nie zawiera pełnych danych finansowych.

Oferta, kontroferta, zakup i inne bieżące zdarzenia marketplace’u przychodzą przede wszystkim jako in-app oraz web push po zgodzie. E-mail pozostaje kanałem potwierdzeń transakcyjnych i prawnych.

Powiadomienia o terminie, przyjeździe i trasie kuriera wysyła zintegrowany operator kurierski. Marketplace aktualizuje status w aplikacji, ale nie dubluje automatycznie jego wiadomości WhatsApp.

## Odbiór osobisty — QR w MVP

Zaimplementuj:

1. obie osoby otwierają konkretne zamówienie;
2. kupująca ogląda rzecz i naciska `Odebrałam i akceptuję`;
3. aplikacja pokazuje na telefonie kupującej jednorazowy QR oraz sześciocyfrowy kod awaryjny;
4. sprzedawczyni skanuje QR swoim telefonem albo wpisuje kod;
5. backend sprawdza zamówienie, użytkowników, ważność tokenu i brak wcześniejszego użycia;
6. system zapisuje potwierdzenie obu stron i uruchamia instrukcję payoutu.

QR jest zatwierdzonym elementem MVP. Kod cyfrowy jest obowiązkowym fallbackiem, gdy aparat lub skanowanie nie działa. Token nie może zawierać jawnych danych osobowych ani finansowych. QR/kod nie potwierdza autentyczności produktu.

## Dwustronne bezpieczeństwo

Marketplace nie implementuje algorytmu TEP/PRP. Wywołuje wayto.you i obsługuje neutralny wynik:

- `allow` — można kontynuować;
- `step_up` — potrzebne dodatkowe potwierdzenie/KYC;
- `manual_review` — payout pozostaje wstrzymany do decyzji administratora.

Sprawdzenie obejmuje stronę płacącą i odbierającą. Może reagować m.in. na nietypowe tempo, nagłą zmianę miejsca payoutu albo wiele wypłat kierowanych do tej samej tożsamości. Szczegóły obliczeń pozostają poza repozytorium marketplace’u.

## Raport po Kroku 0 i audycie

Przedstaw:

1. drzewo katalogów i identyfikator commita;
2. status CI i testów build;
3. opis izolacji od TEP, Quantum i rdzenia wayto.you;
4. plan późniejszego wyodrębnienia repozytorium klienta;
5. macierz capabilities Tap, Lean i wayto.you;
6. diagram zatwierdzonego przepływu bez portfela użytkownika;
7. sposób realizacji zasady pieniądze podążają za tożsamością;
8. projekt claimu e-mail/WhatsApp;
9. projekt QR i kodu awaryjnego;
10. listę brakujących dostępów, zgód i decyzji produkcyjnych.

Zatrzymaj się po raporcie. Nie uruchamiaj produkcyjnych płatności, nie kontaktuj się z operatorami i nie buduj wszystkich modułów bez zatwierdzenia.
