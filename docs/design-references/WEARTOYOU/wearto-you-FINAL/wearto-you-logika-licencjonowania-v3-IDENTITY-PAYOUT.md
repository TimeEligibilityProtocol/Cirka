# Logika licencjonowania i przekazania kodu — wearto.you

Notatka robocza do rozmowy z prawnikiem. Nie jest poradą prawną. Opisuje zatwierdzony model produktu, podział praw, granice repozytoriów oraz sposób późniejszego przekazania projektu klientowi.

## 1. Zatwierdzony model produktu

wearto.you jest marketplace’em C2C bez portfela użytkownika.

- Kupująca płaci przez Tap Payments albo zatwierdzone Lean Pay by Bank.
- Po dostawie i akceptacji backend uruchamia automatyczny proces splitu 90/10.
- wayto.you adresuje instrukcję payoutu do zweryfikowanej osoby przez jej e-mail lub numer telefonu.
- Sprzedawczyni wybiera e-mail albo WhatsApp jako kanał otrzymania bezpiecznego claim linku.
- Sprzedawczyni otwiera claim i wybiera obsługiwane miejsce odbioru.
- Tap albo Lean wykonuje transfer. Marketplace nie wykonuje ręcznego przelewu.
- Użytkowniczka nie otrzymuje salda ani portfela wearto.you i nie przechowuje na nim środków.
- Marketplace nie przechowuje pełnego IBAN-u ani danych karty; zapisuje bezpieczne identyfikatory/tokeny operatora oraz minimalny zamaskowany opis.
- Krypto i PayPal nie należą do zakresu produktu. PayPal występuje w materiałach wyłącznie jako porównanie architektury zamkniętego konta.

Zatwierdzona różnica produktowa: **pieniądze podążają za tożsamością, a nie za zapisanym na stałe rachunkiem**. Zmiana miejsca odbioru nie zmienia zweryfikowanej osoby będącej adresatem payoutu.

## 2. Cel biznesowy licencjonowania

- Klient otrzymuje prawo do samodzielnego prowadzenia i rozwijania marketplace’u C2C wearto.you w uzgodnionym regionie i polu zastosowania.
- Quanthio zachowuje prawo do wykorzystania ogólnego frameworku w odrębnym modelu B2B/B2B2C dla dystrybutorów i white-label.
- Zachowana kopia nie może służyć do uruchomienia konkurencyjnej kopii tego samego marketplace’u C2C objętego wyłącznością klienta.
- Rdzeń wayto.you, TEP, PRP oraz dwustronna bramka bezpieczeństwa pozostają osobnym IP Quanthio.
- Klient może po przekazaniu zatrudnić własnego dewelopera. Quanthio nie odpowiada za późniejsze zmiany klienta, jeżeli nie zostanie podpisana odrębna umowa utrzymaniowa.

## 3. Dlaczego nie stosować prostej cesji całego kodu

Pełna cesja mogłaby odebrać Quanthio prawo do wykorzystania ogólnego frameworku w B2B/B2B2C. Umowa powinna rozdzielić:

1. aplikację C2C klienta;
2. ogólne komponenty frameworku możliwe do wykorzystania w innym polu zastosowania;
3. cienkie adaptery Tap, Lean i wayto.you;
4. dostęp do zewnętrznej usługi wayto.you;
5. chroniony rdzeń TEP/PRP, który nie trafia do repozytorium klienta.

## 4. Warstwa 1 — aplikacja C2C klienta

Planowany model to licencja wyłączna ograniczona do uzgodnionego pola zastosowania, np. C2C fashion resale w UAE/Middle East.

Klient powinien móc:

- prowadzić marketplace;
- wdrażać aplikację na własnych kontach;
- modyfikować kod;
- zatrudniać własnych deweloperów;
- rozwijać funkcje w przyznanym polu zastosowania;
- przenieść repozytorium, hosting, bazę, storage i domenę na własne konta.

Quanthio zachowuje możliwość wykorzystania ogólnego frameworku w B2B/B2B2C. Dokładna granica wymaga redakcji prawnika, aby nie powstały dwie konkurujące wersje tego samego produktu C2C.

## 5. Warstwa 2 — adapter wayto.you, nie rdzeń protokołu

W kodzie marketplace’u może znajdować się wyłącznie cienki adapter, np.:

`packages/integrations/wayto-you-adapter`

Adapter może zawierać:

- klienta HTTPS;
- publiczne typy żądań i odpowiedzi;
- mapowanie statusów;
- obsługę claim linków i webhooków;
- wybór zweryfikowanego kanału e-mail/WhatsApp;
- mock/sandbox;
- dokumentację konfiguracji.

Adapter nie może zawierać:

- kodu TEP lub PRP;
- wzorów, parametrów ani kalibracji;
- strażnika behawioralnego;
- sekretów i wewnętrznej logiki wayto.you;
- kodu skopiowanego z prywatnego repozytorium wayto.you bez wyraźnej podstawy prawnej.

Dwustronne bezpieczeństwo jest konsumowane wyłącznie przez bezpieczne API i neutralny wynik, np. allow, step_up albo manual_review. Marketplace nie odtwarza sposobu obliczania wyniku.

## 6. Dostęp do usługi wayto.you

Zatwierdzony model produktu korzysta z wayto.you jako warstwy identity payout, claim flow i dwustronnego bezpieczeństwa. Kod aplikacji i dostęp do usługi są jednak dwiema różnymi rzeczami.

Osobna umowa API/service powinna określać:

- właściciela i licencjodawcę usługi;
- dozwolone użycie wyłącznie w tej aplikacji C2C;
- czas dostępu i ewentualne opłaty;
- SLA, wsparcie i środowiska sandbox/production;
- zasady claimów e-mail/WhatsApp;
- ochronę danych i retencję;
- zachowanie aplikacji przy awarii;
- procedurę zakończenia dostępu;
- odpowiedzialność za zewnętrzne szyny Tap/Lean.

Ponieważ „pieniądze podążają za tożsamością” jest zatwierdzonym elementem produktu, trwałe wyłączenie wayto.you wymaga decyzji właścicielki i zmiany komunikacji produktu. Deweloper nie może po cichu ominąć usługi i uznać zadania za wykonane.

## 7. Tap i Lean jako zewnętrzne szyny

Tap i Lean nie są własnością Quanthio.

- Tap obsługuje checkout kartowy/wallety oraz — jeśli zatwierdzi projekt — marketplace settlement, split i payout.
- Lean Pay by Bank pozwala kupującej zapłacić z konta.
- Lean Payout jest osobną capability służącą do bankowego payoutu.
- Dostęp do jednej funkcji Lean nie oznacza automatycznie dostępu do drugiej.
- Wypłaty, KYC, hold, split, refund i chargeback muszą działać zgodnie z umowami operatorów oraz prawem UAE.
- Pytanie, czy Tap Marketplace onboarduje osoby prywatne C2C bez trade license, musi zostać potwierdzone pisemnie przed produkcją.

Adaptery Tap/Lean pozostają wymienne technicznie. Nie zmienia to zatwierdzonej warstwy identity payout wayto.you.

## 8. Repozytorium podczas developmentu

Projekt powstaje jako odizolowany katalog `wearto-you-marketplace` w istniejącym prywatnym repozytorium GitHub TEP.

- Ma własne manifesty, lockfile, konfigurację, testy, CI i dokumentację.
- Nie importuje kodu TEP, Quantum ani rdzenia wayto.you.
- Nie używa wspólnych sekretów.
- Wszystkie pliki produktu znajdują się w samodzielnym katalogu.
- Od początku istnieje procedura wyodrębnienia historii projektu.

Umieszczenie w repozytorium TEP jest rozwiązaniem developmentowym. Klient nie otrzymuje całego repozytorium TEP.

## 9. Transfer na konto GitHub klienta

Przed przekazaniem należy:

1. wyodrębnić wyłącznie katalog i historię wearto.you do nowego czystego repozytorium;
2. przeskanować historię pod kątem sekretów i plików innych projektów;
3. potwierdzić brak kodu TEP, Quantum i rdzenia wayto.you;
4. usunąć dane testowe identyfikujące klienta lub użytkowników;
5. podłączyć infrastrukturę i konta należące do klienta;
6. przenieść repozytorium na jego konto lub organizację GitHub;
7. podpisać protokół przekazania z datą, wersją i identyfikatorem commita.

## 10. Kopia zachowana przez Quanthio

Quanthio może zachować prywatną, oczyszczoną kopię ogólnego frameworku wyłącznie do B2B/B2B2C, jeśli umowa na to pozwala.

Kopia nie może zawierać:

- produkcyjnych sekretów klienta;
- danych użytkowników i transakcji;
- kont i dokumentów Tap/Lean należących do klienta;
- klientowskiej konfiguracji produkcyjnej;
- brandingu objętego prawami klienta;
- późniejszych zmian klienta, jeśli umowa nie pozwala na ich wykorzystanie.

## 11. Odpowiedzialność

- Kod jest przekazywany wraz z testami i znanymi ograniczeniami.
- Klient przejmuje odpowiedzialność operacyjną po formalnym handoffie.
- Quanthio nie odpowiada za późniejsze modyfikacje klienta lub jego wykonawców.
- Ograniczenie odpowiedzialności za płatności, payout, dane i zewnętrznych operatorów wymaga redakcji prawnika.
- Tap, Lean, kurier, hosting, e-mail i WhatsApp działają na własnych warunkach.

## 12. Pytania do prawnika

- Kto jest formalnym właścicielem i licencjodawcą wayto.you, TEP i PRP?
- Jak precyzyjnie opisać wyłączne pole zastosowania klienta C2C?
- Jak zachować prawo Quanthio do B2B/B2B2C bez naruszenia wyłączności klienta?
- Jak opisać dostęp do wayto.you jako usługę odrębną od kodu aplikacji?
- Jak uregulować claim wysyłany e-mailem albo przez WhatsApp?
- Jak opisać techniczny ledger operatora, aby nie obiecywać prawnie nieistniejącego escrow ani portfela?
- Jak udokumentować zachowanie oczyszczonej kopii frameworku B2B/B2B2C?
- Jak ograniczyć odpowiedzialność za późniejsze modyfikacje i zewnętrznych operatorów?

## 13. Jedno zdanie dla prawnika

> Chcę przekazać klientowi aplikację C2C wearto.you działającą bez portfela użytkownika, w której po zatwierdzeniu sprzedaży wayto.you adresuje claim payoutu do zweryfikowanej osoby przez e-mail lub telefon, sprzedawczyni wybiera kanał e-mail/WhatsApp oraz obsługiwane miejsce odbioru, a regulowany operator Tap albo Lean automatycznie wykonuje split i payout; rdzeń wayto.you, TEP i PRP pozostaje IP Quanthio, a Quanthio zachowuje wyłącznie uzgodnione prawo do ogólnego frameworku B2B/B2B2C.
