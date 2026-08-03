**wearto.you**

**OPIS PRODUKTU  
I SPECYFIKACJA WYKONAWCZA**

Marketplace mody używanej, vintage i premium dla Dubaju/UAE

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>MVP<br />
C2C</strong></th>
<th><strong>PROWIZJA<br />
10%</strong></th>
<th><strong>PRÓG KYC+<br />
500 USD</strong></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Dokument dla właścicielki biznesu oraz zespołu tworzącego aplikację

<img src="media/image1.png" style="width:6.55in;height:4.36667in"
alt="Trzy ekrany aplikacji wearto.you: feed produktów, karta produktu oraz Magic Listing." />

*Zatwierdzony kierunek wizualny: nowoczesna typografia i ciepła paleta
burgundowo-brązowa*

# Dokument dla właścicielki biznesu i zespołu tworzącego aplikację

wearto.you będzie mobilnym marketplace’em z modą używaną, vintage i
premium, stworzonym dla Dubaju i rynku UAE. Użytkowniczki będą mogły
łatwo wystawiać pojedyncze rzeczy, poprawiać zdjęcia i opisy za pomocą
AI, negocjować cenę, płacić kartą, Apple Pay lub Google Pay przez Tap
Payments, a po potwierdzeniu produkcyjnej integracji także bezpośrednio
z konta bankowego przez Lean Technologies. Dostępna będzie dostawa
kurierska oraz odbiór osobisty.

Pierwsza wersja ma przeprowadzić jedną rzecz przez cały proces: od
zdjęcia zrobionego przez sprzedawczynię, przez publikację i zakup, aż do
dostawy, akceptacji oraz wypłaty pieniędzy.

## Trzy główne kategorie pilota

1.  **Ubrania** — m.in. sukienki, topy, spodnie, spódnice, marynarki i
    okrycia.

2.  **Buty** — m.in. sandały, szpilki, sneakersy, mokasyny, botki i
    kozaki.

3.  **Torebki** — m.in. torebki na ramię, kopertówki, shopperki, plecaki
    i portfele.

Każda z tych kategorii ma własny obowiązkowy zestaw zdjęć, właściwe
pomiary, pytania o historię użytkowania, pola dotyczące elementów
zestawu i reguły Condition Check. System kategorii jest rozszerzalny,
ale pierwsze testy end-to-end muszą obejmować co najmniej po jednym
produkcie z każdej z trzech kategorii.

Dokument ma dwie warstwy:

- **Jak działa to dla użytkowniczki** — opis produktu prostym językiem.

- **Jak realizuje to system** — informacja dla osoby tworzącej
  aplikację.

# Kierunek wizualny

Zatwierdzony kierunek łączy nowoczesny, bardzo czytelny interfejs z
ciepłym charakterem marki modowej. Zdjęcie produktu pozostaje
najważniejszym elementem ekranu. Całość ma być elegancka i kobieca, ale
nie klasyczna, ciężka ani stylizowana na dawny butik luksusowy.

## Zatwierdzona typografia

- Podstawowa czcionka: **Manrope** — [<u>Google Fonts:
  Manrope</u>](https://fonts.google.com/specimen/Manrope).

- Jedna rodzina fontu w aplikacji i panelu administratora.

- Logo tekstowe wearto.you: Manrope SemiBold, małe litery, delikatnie
  zmniejszony odstęp między znakami.

- Nagłówki: Manrope 700.

- Tekst interfejsu: Manrope 400 lub 500.

- Przyciski i ceny: Manrope 600.

- Minimalny rozmiar zwykłego tekstu na telefonie: 14 px; preferowany 16
  px.

- Nie używać czcionki szeryfowej w interfejsie.

W Expo font można wdrożyć przez @expo-google-fonts/manrope. Do czasu
załadowania użyć systemowej czcionki sans-serif, aby układ ekranu nie
przeskakiwał.

## Zatwierdzona paleta

| **Zastosowanie**                 | **Nazwa**                 | **Kod**  |
|----------------------------------|---------------------------|----------|
| Główne tło                       | ciepła kość słoniowa      | \#F8F4EE |
| Karty i pola                     | miękka biel               | \#FFFDFC |
| Tekst i ikony                    | głębokie espresso         | \#211B18 |
| Główna akcja i aktywny stan      | burgundowo-brązowy        | \#713F3A |
| Stan wciśnięty                   | ciemny burgundowo-brązowy | \#57302D |
| Neutralne powierzchnie           | jasny piasek              | \#E9DED2 |
| Delikatny status lub wyróżnienie | przygaszony różowo-beżowy | \#E7D3CF |
| Linie i obramowania              | ciepły kamień             | \#DED5CC |

Burgundowo-brązowy jest używany oszczędnie: dla najważniejszego
przycisku, aktywnej zakładki, zaznaczonego filtra i wybranych cen.
Interfejs nie używa jaskrawej czerwieni, pomarańczu, zieleni, śliwkowego
fioletu, złotych gradientów ani dominujących brązowych powierzchni.

## Zasady interfejsu dla Claude Code

- odstępy oparte na wielokrotnościach 4 i 8 px;

- promień kart 14–16 px;

- filtry w formie prostych kapsułek;

- cienkie neutralne linie zamiast ciężkich cieni;

- główny przycisk na pełną szerokość, wysokość minimum 52 px;

- minimalny obszar dotyku 44 × 44 px;

- dolna nawigacja: Odkrywaj, Zapisane, Dodaj, Wiadomości, Profil;

- cena i główna akcja zawsze widoczne na karcie produktu;

- status zamówienia pokazany jako zrozumiała oś czasu;

- komunikaty bez skrótów technicznych;

- krótkie, funkcjonalne animacje;

- kontrast i wielkość tekstu zgodne z WCAG AA;

- przygotowanie układu LTR oraz późniejszego RTL dla języka arabskiego.

Claude Code ma stworzyć jeden wspólny plik tokenów designu dla kolorów,
typografii, odstępów, promieni i cieni. Ekrany nie mogą wprowadzać
przypadkowych odcieni ani rozmiarów poza tym systemem.

## Referencje projektowe dla Claude Code

Referencje określają zachowanie i poziom wykonania. Nie kopiować ich
logo, kolorów ani całych ekranów.

1.  **\[Vestiaire Collective\](https://www.vestiairecollective.com/)** —
    duże zdjęcia produktu, ekspozycja stanu i informacji budujących
    zaufanie. Nie kopiować modelu fizycznej autentykacji.

2.  **\[Depop\](https://www.depop.com/)** — prostota mobilnego feedu,
    szybkie przejście do profilu sprzedającej i społecznościowy
    charakter. wearto.you ma pozostać spokojniejsze i bardziej premium.

3.  **\[SSENSE\](https://www.ssense.com/)** — nowoczesna typografia
    sans-serif, dużo przestrzeni, czytelna cena i pierwszeństwo zdjęcia.

4.  **\[COS\](https://www.cos.com/)** — współczesny minimalizm modowy,
    proporcje zdjęć i spokojna hierarchia treści. Nie przenosić układu
    zwykłego sklepu detalicznego jeden do jednego.

5.  **\[Shopify Polaris\](https://polaris.shopify.com/)** — wzorzec
    panelu właścicielki: tabele, filtry, statusy, formularze i
    dostępność. Dotyczy panelu administracyjnego, nie części
    konsumenckiej.

Zatwierdzona ilustracja pokazuje trzy przykładowe ekrany: przeglądanie
produktów, kartę produktu oraz Magic Listing. Jest kierunkiem wizualnym,
a nie pikselowo wiążącym projektem.

# 0. Pełny początek doświadczenia użytkowniczki

## Pierwsze uruchomienie

Użytkowniczka może bez logowania przeglądać feed, otwierać produkty i
zobaczyć, jak działa marketplace. Logowanie jest wymagane przed:

- zapisaniem produktu do ulubionych;

- wysłaniem oferty albo wiadomości;

- rozpoczęciem płatności;

- rozpoczęciem robienia zdjęć do nowego ogłoszenia;

- zapisaniem szkicu ogłoszenia w chmurze;

- publikacją produktu;

- dostępem do zamówień, sprzedaży i profilu wymiarów.

Na ekranie głównym najważniejsze są dwa działania: Odkrywaj oraz
centralny przycisk Dodaj.

## Rozpoczęcie sprzedaży

Po naciśnięciu Dodaj aplikacja prowadzi sprzedającą w krótkiej
kolejności:

1.  Zaloguj się lub utwórz konto oraz zaakceptuj aktualny regulamin i
    wymagane potwierdzenia.

2.  Wybierz kategorię albo zrób pierwsze zdjęcie, aby AI ją
    zaproponowało.

3.  Wykonaj zdjęcia zgodnie z przewodnikiem danej kategorii.

4.  Opcjonalnie nagraj głosową historię rzeczy zamiast wpisywać opis.

5.  Sprawdź opis, stan, wymiary, historię użytkowania i wynik wyszukania
    modelu.

6.  Ustal cenę i możliwość negocjacji.

7.  Zobacz, ile otrzymasz po prowizji.

8.  Potwierdź oświadczenia i opublikuj.

Użytkowniczka może w każdym kroku wrócić, poprawić dane, dopisać własny
tekst albo zapisać szkic. AI nigdy nie odbiera jej kontroli nad
ogłoszeniem.

## Zapis szkicu w PWA

Kliknięcie Dodaj najpierw uruchamia logowanie. Dopiero zalogowana
użytkowniczka rozpoczyna robienie zdjęć i tworzenie ogłoszenia. Od
pierwszego zdjęcia aplikacja automatycznie zapisuje szkic na koncie, a
pomocniczo także lokalnie na urządzeniu, aby ograniczyć ryzyko utraty
pracy przy słabym internecie.

# 1. Najważniejsza zasada: jedna rzecz może zostać sprzedana tylko raz

## Jak działa to dla użytkowniczki

Każde ogłoszenie osoby prywatnej dotyczy jednej konkretnej rzeczy. Kiedy
kupująca rozpoczyna płatność, produkt zostaje na krótko zarezerwowany.
Inna osoba nie może w tym samym czasie kupić tej samej rzeczy.

Po skutecznej płatności ogłoszenie otrzymuje status „sprzedane”. Jeżeli
płatność nie zostanie ukończona w wyznaczonym czasie, rezerwacja wygasa
i rzecz ponownie staje się dostępna.

## Jak realizuje to system

- Każde ogłoszenie C2C ma ilość równą 1.

- Status ogłoszenia: draft, active, reserved, sold, expired, hidden,
  removed.

- Rezerwacja musi być wykonana w jednej transakcji bazodanowej.

- Baza musi uniemożliwić utworzenie dwóch opłaconych zamówień dla tego
  samego listing_id.

- Każde żądanie płatnicze i każdy webhook muszą być idempotentne, czyli
  ich ponowne wysłanie nie może utworzyć drugiej płatności lub wypłaty.

- Należy przetestować dwie osoby naciskające „Kup teraz” w tej samej
  sekundzie.

## Wygasanie nieaktywnych ogłoszeń

Aby ograniczyć sprzedaż rzeczy, które zostały już oddane lub sprzedane
poza platformą, system prosi sprzedawczynię po konfigurowalnym okresie,
domyślnie 30 dni, o potwierdzenie Rzecz jest nadal dostępna. Brak
potwierdzenia po kolejnym okresie, domyślnie do 60. dnia, zmienia status
na expired i ukrywa ogłoszenie z feedu. Sprzedawczyni może przywrócić je
jednym kliknięciem po ponownym potwierdzeniu dostępności. Ogłoszenie z
aktywną rezerwacją, opłaconym zamówieniem lub otwartym sporem nie wygasa
automatycznie.

# 2. Konta użytkowników i weryfikacja

## Jak działa to dla użytkowniczki

Kupująca może szybko zalogować się przez konto Google albo Apple.
wearto.you nie tworzy dla niej portfela. Pełna weryfikacja dokumentu
jest wymagana dopiero wtedy, gdy wynika to z roli sprzedawczyni,
wartości transakcji albo zasad operatora.

## Akceptacja regulaminu przy utworzeniu konta

Po pierwszym skutecznym logowaniu przez Google lub Apple, zanim konto
zacznie korzystać z funkcji wymagających logowania, aplikacja pokazuje
krótki ekran utworzenia konta. Samo zalogowanie u zewnętrznego dostawcy
nie oznacza akceptacji dokumentów wearto.you.

Ekran zawiera:

- obowiązkowy, niezaznaczony checkbox: Akceptuję Regulamin wearto.you z
  klikalnym linkiem do pełnego dokumentu;

- osobną informację i klikalny link: Zapoznałam się z Polityką
  prywatności, w formie zatwierdzonej przez prawnika;

- obowiązkowe potwierdzenie minimalnego wieku, roboczo Mam ukończone 18
  lat;

- oddzielną, dobrowolną i domyślnie niezaznaczoną zgodę marketingową,
  jeżeli platforma chce wysyłać promocje. Brak tej zgody nie może
  blokować konta, zakupu ani sprzedaży.

Przycisk Utwórz konto pozostaje nieaktywny do spełnienia wymaganych
warunków. Każdy link otwiera czytelny dokument bez utraty formularza.
Aplikacja zapisuje identyfikator użytkowniczki, rodzaj dokumentu, numer
wersji, czas i źródło akceptacji. Nie zapisuje nadmiernych danych
urządzenia wyłącznie dla samego checkboxa.

Po istotnej zmianie regulaminu aplikacja pokazuje nową wersję i wymaga
ponownej akceptacji przed następną czynnością chronioną. Zmiana polityki
prywatności jest komunikowana zgodnie z instrukcją prawnika; system nie
może automatycznie traktować milczenia jako nowej zgody, jeżeli prawo
wymaga aktywnego działania.

Przed pierwszym wystawieniem produktu sprzedawczyni dodatkowo akceptuje
aktualne Seller Terms. Przed pierwszą płatnością kupująca otrzymuje
podsumowanie najważniejszych zasad zakupu, dostawy, trzydniowego okna na
problem i chargebacku oraz link do aktualnych dokumentów. System
przechowuje wersje tych potwierdzeń.

Przy zakupie podaje:

- imię i nazwisko;

- zweryfikowany numer telefonu;

- e-mail;

- adres dostawy;

- dane wymagane przez operatora płatności.

Sprzedawczyni przechodzi weryfikację tożsamości przed pierwszą wypłatą.
Dzięki temu platforma wie, komu przekazuje pieniądze, a dane odbiorcy
wypłaty są zgodne z danymi zweryfikowanej osoby.

Jeśli wartość rzeczy przekracza **500 USD, czyli około 1 835 AED**,
dodatkową weryfikację tożsamości przechodzą zarówno kupująca, jak i
sprzedawczyni. Próg będzie można zmienić później w panelu
administracyjnym.

Weryfikacja ma dotyczyć tożsamości i realnego ryzyka transakcji. Te same
zasady obowiązują wszystkich użytkowników.

## Jak realizuje to system

- Podstawowe logowanie: Google i Apple. Jeżeli wdrożenie Apple na webie
  wymaga dodatkowej konfiguracji domeny i kluczy, należy ją wykonać
  przed pilotem.

- Pierwsze logowanie tworzy konto w stanie terms_pending; dopiero
  wymagane akceptacje zmieniają je na active.

- Backend, a nie sam frontend, sprawdza przed chronioną operacją, czy
  użytkowniczka zaakceptowała wymaganą wersję dokumentu.

- policy_documents przechowuje typ, wersję, język, datę publikacji,
  status i treść lub bezpieczną referencję; opublikowanej wersji nie
  nadpisujemy.

- policy_acceptances przechowuje użytkowniczkę, dokument, wersję, czas,
  kontekst akceptacji oraz minimalne dane audytowe. Cofnięcie
  dobrowolnej zgody marketingowej nie usuwa obowiązkowej historii
  transakcyjnej.

- Przeglądanie publicznego feedu pozostaje dostępne bez tworzenia konta;
  zgody cookies/analityczne są obsługiwane osobno, jeżeli wymagają tego
  użyte technologie i prawo.

- Konto aplikacji jest niezależne od operatora płatności i pozostaje
  stabilne nawet po zmianie gatewaya.

- Gdy użytkowniczka zaczyna sprzedawać, jej konto marketplace’u zostaje
  powiązane z tożsamością wayto.you opartą na zweryfikowanym e-mailu lub
  numerze telefonu. Jest to adres osoby dla instrukcji payoutu, nie
  portfel i nie rachunek finansowy.

- Opcję Zaloguj przez wayto.you można dodać wyłącznie wtedy, gdy
  repozytorium udostępnia produkcyjny, udokumentowany standard OAuth
  2.0/OIDC, magic link lub passkey oraz bezpieczne odłączanie konta. Nie
  budować własnego mechanizmu logowania na podstawie surowych danych
  telemetrycznych.

- Biometria może później działać przez passkey urządzenia. Marketplace
  nie przechowuje odcisku palca ani wzoru twarzy.

- Dla awaryjnego odzyskania konta należy przewidzieć bezpieczny proces
  oparty na zweryfikowanym e-mailu i/lub telefonie.

- Poziom weryfikacji: basic albo enhanced.

- Status weryfikacji: not_started, pending, verified, rejected, expired.

- Powyżej ustalonego progu checkout jest zatrzymany do czasu
  zatwierdzenia obu osób.

- Dokumenty powinien przechowywać wyspecjalizowany dostawca KYC. W bazie
  marketplace’u zapisujemy głównie wynik i identyfikator sprawy, a nie
  kopie dokumentów.

- Konto sprzedawczyni, jej zweryfikowana tożsamość wayto.you oraz
  token/referencja wybranego miejsca wypłaty muszą być bezpiecznie
  powiązane. Marketplace nie zapisuje pełnego IBAN-u ani danych karty;
  przechowuje tylko niezbędne identyfikatory operatora i czytelny dla
  użytkowniczki opis, np. nazwa banku oraz zamaskowana końcówka
  rachunku.

- Administrator może skierować transakcję do ręcznej kontroli przy
  obiektywnych niezgodnościach, np. wielu kontach z tym samym miejscem
  wypłaty, nagłej zmianie danych lub serii nieudanych płatności.

# 3. Wystawianie produktu — Magic Listing

## Jak działa to dla użytkowniczki

Sprzedawczyni robi kilka zdjęć rzeczy telefonem. Aplikacja sama
przygotowuje pierwszą wersję ogłoszenia. Użytkowniczka nie musi od
początku wpisywać wszystkich pól ręcznie.

AI może zaproponować:

- tytuł ogłoszenia;

- kategorię, np. sukienka, marynarka, buty albo torebka;

- markę;

- kolor;

- rozmiar;

- skład odczytany z metki;

- opis produktu;

- stan rzeczy;

- zauważone ślady użycia;

- brakujące informacje lub potrzebne dodatkowe zdjęcia;

- proponowany przedział cenowy.

Sprzedawczyni widzi wszystko przed publikacją, może poprawić każdą
informację i dopiero potem zatwierdza ogłoszenie.

Każde pole ma trzy elementy: propozycję AI, prostą akcję zatwierdź/zmień
oraz pole dodaj własną informację. Dotyczy to m.in. marki, materiału,
stanu, koloru, rozmiaru, wad, historii użytkowania i kompletu dodatków.
Użytkowniczka nie może zostać zamknięta wyłącznie w gotowej liście
odpowiedzi.

Może również nacisnąć przycisk mikrofonu i opowiedzieć własnymi słowami,
np. gdzie kupiła rzecz, ile razy ją założyła i co warto o niej wiedzieć.
Aplikacja zamienia nagranie na tekst, porządkuje je i proponuje opis.
Przed zapisem pokazuje transkrypcję oraz zredagowaną wersję.
Sprzedawczyni może zachować własne sformułowania, dopisać informacje lub
odrzucić propozycję AI.

Brak metki jest normalnym przypadkiem. Aplikacja nie blokuje ogłoszenia,
tylko zapisuje metka niedostępna, pozwala wprowadzić dane ręcznie i
obniża pewność automatycznego rozpoznania składu, rozmiaru lub marki.

## Jak realizuje to system

- Zdjęcia są wysyłane z telefonu przez standardowy wybór pliku/aparat.

- Oryginalne zdjęcie jest przechowywane jako materiał dowodowy.

- AI analizujące obraz tworzy propozycje danych w ustrukturyzowanym
  formacie.

- OCR odczytuje tekst z metek.

- Model językowy układa tytuł i opis z danych rozpoznanych na zdjęciach
  oraz informacji użytkowniczki.

- Web Speech API lub zewnętrzna usługa speech-to-text zamienia nagranie
  głosowe na tekst. Implementacja musi wyświetlić zgodę na użycie
  mikrofonu, stan nagrywania, możliwość odsłuchu/usunięcia oraz błąd
  przy odmowie dostępu.

- Nagranie nie jest przechowywane dłużej niż potrzeba bez wyraźnej
  zgody. Docelowo wystarczy zatwierdzony tekst i informacja o źródle
  voice.

- Każda propozycja AI jest edytowalna i wymaga potwierdzenia.

- Dla pól takich jak stan i materiał system przechowuje ai_suggestion,
  seller_selected_value oraz opcjonalne seller_note. Publiczne
  ogłoszenie pokazuje zatwierdzoną wartość i adnotację sprzedającej, nie
  surowy wynik modelu.

- System zapisuje oddzielnie dane zaproponowane przez AI oraz wersję
  zatwierdzoną przez sprzedawczynię.

# 4. Automatyczna obróbka zdjęć

## Jak działa to dla użytkowniczki

Po dodaniu zdjęcia aplikacja automatycznie:

- usunąć przypadkowe tło;

- ustawia zatwierdzone, spójne tło;

- poprawić kadr i proporcje;

- dopasować zdjęcia do wspólnego formatu platformy;

- poprawić światło, ale bez ukrywania prawdziwego stanu rzeczy.

Rezultat ma wyglądać estetycznie i profesjonalnie, nawet jeśli zdjęcie
zostało zrobione w domu. Aplikacja oferuje dwa zatwierdzone warianty tła
dla zdjęcia głównego:

- jednolite ciepłe kremowe tło;

- kremowe tło studyjne z bardzo delikatnym, nowoczesnym cieniem pod
  przedmiotem.

Wszystkie zdjęcia w feedzie mają ten sam format i podobną temperaturę
tła. Użytkowniczka wybiera wariant, ale nie ustawia dowolnych kolorów
ani efektów. Zdjęcia detali, metek i wad mogą pozostać na neutralnym,
płaskim tle, aby niczego nie zasłaniać.

Aplikacja zawsze pokazuje podgląd oryginał i wersja przygotowana. Jeżeli
automatyczne wycięcie zmieni krawędź, kolor, fakturę, proporcje lub
zakryje fragment produktu, użytkowniczka może poprawić maskę albo użyć
oryginału.

## Jak realizuje to system

- Moduł ImageProcessor tworzy nową wersję zdjęcia i nie nadpisuje
  oryginału.

- Oryginał i wersja poprawiona mają osobne adresy pliku oraz sumę
  kontrolną.

- Retusz nie może usuwać plam, zarysowań, przetarć ani innych wad.

- Moduł nie może zmieniać kształtu, koloru, materiału, logo, przeszyć,
  okuć ani proporcji produktu. Generatywne odtwarzanie fragmentów
  przedmiotu jest wyłączone.

- Cień jest generowany wyłącznie na tle i nie może nachodzić na produkt.
  Parametry tła są stałymi presetami platformy.

- Backend zapisuje wersję modelu/usługi, parametry przetwarzania i
  powiązanie z oryginałem.

- W przypadku sporu administrator otrzymuje dostęp do oryginalnych
  zdjęć.

- W MVP należy wykorzystać gotowe API lub sprawdzoną bibliotekę do
  segmentacji/usuwania tła oraz osobny, deterministyczny etap
  kadrowania. Wykonawca porównuje co najmniej dwa rozwiązania pod kątem
  jakości krawędzi odzieży, kosztu, lokalizacji przetwarzania i
  prywatności. Własny model ma sens dopiero przy dużej skali.

- Przetwarzanie może następować po wykonaniu zdjęcia. Podgląd tła w
  czasie rzeczywistym jest opcjonalny, ponieważ na mobilnym webie może
  obciążać urządzenie; nie może blokować MVP.

# 5. Kontrola kompletności ogłoszenia

## Jak działa to dla użytkowniczki

Przed publikacją aplikacja informuje, czego brakuje. Zamiast
technicznego błędu pokazuje krótkie komunikaty, np.:

- „Dodaj zdjęcie tyłu sukienki”.

- „Pokaż metkę z rozmiarem”.

- „Dodaj zbliżenie zarysowania”.

- „Zdjęcie jest zbyt ciemne — zrób je ponownie przy oknie”.

- „Przy tej torebce potrzebujemy zdjęcia wnętrza i zamknięcia”.

## Jak realizuje to system

AI ocenia ostrość, światło, komplet wymaganych ujęć oraz zgodność opisu
ze zdjęciami. Wymagane ujęcia zależą od kategorii produktu. Reguły
powinny być zapisane w konfiguracji, aby można je było później zmieniać
bez przebudowy aplikacji.

## Obowiązkowy przewodnik zdjęć według kategorii

Przy każdym ujęciu aplikacja pokazuje prostą sylwetkę/ramkę, krótki
przykład i status wykonania. Nie pozwala opublikować produktu, dopóki
nie ma minimalnego kompletu zdjęć albo użytkowniczka nie oznaczy, że
dany element nie istnieje lub nie jest dostępny.

**Ubrania:**

- cała rzecz z przodu — na wieszaku, manekinie albo ułożona płasko;

- cała rzecz z tyłu;

- zbliżenie materiału i faktury;

- zapięcia, guziki, zamki lub istotne detale;

- metka marki i rozmiaru, jeśli istnieje;

- metka składu/pielęgnacji, jeśli istnieje;

- każda wada w zbliżeniu;

- przy produkcie premium co najmniej trzy detale wykonania, np. logo,
  szwy, grawer lub elementy metalowe.

**Buty:**

- para z góry;

- zewnętrzny i wewnętrzny bok;

- przód oraz tył;

- podeszwy obu butów;

- wnętrze i wkładka;

- oznaczenie rozmiaru, jeśli istnieje;

- obcas/platforma i miejsca największego zużycia;

- pudełko, worek lub dowód zakupu, jeśli są częścią oferty;

- każda wada w zbliżeniu.

**Torebki, plecaki i portfele:**

- przód, tył oraz oba boki;

- spód;

- całe wnętrze i kieszenie;

- rączki, pasek i punkty mocowania;

- zamknięcie, zamki, okucia i narożniki;

- logo, tłoczenie, metka wewnętrzna oraz numer seryjny, jeśli istnieją;

- ślady zużycia wewnątrz i na zewnątrz;

- elementy zestawu: pasek, dust bag, pudełko, karta lub dowód zakupu.

**Biżuteria, paski i dodatki:**

- całość z przodu i z tyłu;

- zapięcie lub klamra;

- grawer, próba, numer lub metka, jeśli istnieją;

- zbliżenie materiału i każdego uszkodzenia;

- opakowanie i dowód zakupu, jeśli są częścią oferty.

Jeśli nie ma metki, numeru, pudełka, dowodu zakupu albo wyjmowanej
wkładki, użytkowniczka wybiera nie ma / niedostępne. System zapisuje ten
fakt i nie wymyśla brakującej informacji.

Wymagania kategorii są konfigurowalne w panelu, a nie wpisane na stałe w
wielu ekranach. Wykonawca może oprzeć szczegółową listę na sprawdzonych
standardach marketplace’ów, np. [<u>wymaganiach zdjęć produktów
markowych Vinted</u>](https://www.vinted.com/help/601), zachowując
własny język i flow wearto.you.

# 6. Condition Check — ocena stanu rzeczy

## Jak działa to dla użytkowniczki

AI przygląda się zdjęciom i zaznacza miejsca, w których mogą być
widoczne:

- plamy;

- zarysowania;

- przetarcia;

- odbarwienia;

- zmechacenia;

- pęknięcia;

- uszkodzone szwy lub okucia.

Aplikacja pyta sprzedawczynię, czy rozpoznana wada rzeczywiście
występuje. Potwierdzona informacja trafia do opisu i jest widoczna dla
kupującej.

## Jak realizuje to system

- Model analizy obrazu wskazuje możliwą wadę i zdjęcie, na którym ją
  wykrył.

- Wynik AI jest sugestią, nie ostatecznym werdyktem.

- System zapisuje stan zadeklarowany przez sprzedawczynię, sugestię AI i
  wersję ostatecznie zatwierdzoną.

- Potwierdzona wada jest automatycznie dodawana do sekcji Stan i wady
  prostym, neutralnym językiem oraz powiązana ze zdjęciem.

- Jeżeli AI wykryło możliwą wadę, sprzedawczyni musi ją potwierdzić albo
  wybrać to nie jest wada przed publikacją.

- Moduł obróbki zdjęć nigdy nie usuwa, nie wygładza ani nie zasłania
  rozpoznanych wad.

- Oryginały pozostają dostępne na potrzeby sporu.

# 7. Metka, skład i informacje o produkcie

## Jak działa to dla użytkowniczki

Sprzedawczyni fotografuje metkę. Aplikacja odczytuje i uzupełnia możliwe
dane:

- nazwę marki;

- rozmiar;

- skład materiału;

- kraj produkcji;

- instrukcję pielęgnacji;

- kod produktu lub numer modelu, jeśli jest widoczny.

Jeżeli metki nie ma, jest wycięta albo nieczytelna, sprzedawczyni
zaznacza to wprost i uzupełnia tylko dane, które zna. Ogłoszenie nadal
może zostać opublikowane.

Aplikacja pyta również o historię rzeczy:

- przybliżony rok lub datę zakupu;

- miejsce zakupu, jeśli użytkowniczka pamięta;

- czy jest pierwszą właścicielką;

- jak często rzecz była używana: nigdy, raz, kilka razy, regularnie;

- kiedy ostatnio była używana;

- sposób przechowywania;

- pranie, czyszczenie, naprawy lub modyfikacje;

- elementy zestawu i dowód zakupu;

- dodatkowe informacje podane głosem lub tekstem.

Użytkowniczka sprawdza wynik i zatwierdza go przed publikacją. Dane
takie jak rok, miejsce zakupu i częstotliwość używania są deklaracją
sprzedawczyni, chyba że potwierdza je dokument.

Jeżeli metka jest w innym języku, aplikacja pokazuje obok siebie:

- zdjęcie metki;

- tekst odczytany w języku oryginalnym;

- tłumaczenie na język interfejsu;

- rozpoznane pola, np. skład i pielęgnację;

- pole na ręczną korektę lub własną adnotację.

## Jak realizuje to system

OCR odczytuje tekst, a AI przypisuje go do właściwych pól. System
powinien przechowywać zdjęcie metki oraz stopień pewności odczytu.
Niepewna wartość jest wyraźnie oznaczona do ręcznego potwierdzenia. Gdy
metki nie ma, system zapisuje label_status: missing \| cut_off \|
unreadable \| available i nie generuje składu ani kraju produkcji na
podstawie samego wyglądu.

Tłumaczenie jest osobną warstwą i nie nadpisuje oryginalnego OCR. System
zapisuje język źródłowy, tekst źródłowy, tłumaczenie, poziom pewności
oraz poprawki użytkowniczki. Przy symbolach pielęgnacji może pokazać ich
prostą interpretację, ale nie wymyśla instrukcji, których nie ma na
metce.

Historia użytkowania jest przechowywana w ustrukturyzowanych polach oraz
w zatwierdzonym opisie. Przy torbach i butach aplikacja używa tych
samych pytań oraz dodatkowo pyta o sposób przechowywania, konserwację
skóry, naprawy, wymianę fleków/podeszwy i stan elementów zestawu.

# 8. Szukanie modelu i podobnych produktów

## Jak działa to dla użytkowniczki

Na podstawie zdjęcia, tekstu z metki, kodu produktu i szczegółów
wykonania AI może poszukać podobnego modelu w internecie lub w
katalogach produktów. Może znaleźć:

- prawdopodobną nazwę modelu;

- podobne zdjęcia;

- orientacyjny rok lub kolekcję;

- wcześniejsze ceny sklepowe i ceny podobnych rzeczy;

- cechy zgodne i różniące się od znalezionego produktu.

Wynik pojawia się automatycznie jako jeden z trzech stanów:

- znaleziono prawdopodobne dopasowanie;

- znaleziono kilka możliwości — wybierz;

- brak wiarygodnego dopasowania.

Sprzedawczyni może zatwierdzić propozycję przyciskiem Tak, to ten model,
wybrać inną możliwość albo odrzucić wszystkie wyniki. Odrzucone
dopasowanie nie trafia do publicznego ogłoszenia.

Funkcja pomaga przygotować dokładniejsze ogłoszenie i lepiej ustalić
cenę. Nie jest dowodem, że konkretna rzecz jest oryginalna. Ostateczną
odpowiedzialność za prawdziwość ogłoszenia ponosi sprzedająca.

## Jak realizuje to system

- AI tworzy wizualne podobieństwo produktu.

- OCR wykorzystuje nazwę marki, kod, numer seryjny lub tekst z metki.

- Wyszukiwanie łączy te sygnały z publicznymi źródłami lub legalnie
  dostępnymi katalogami.

- Wynik zawiera poziom pewności i jest opisany jako „prawdopodobne
  dopasowanie”.

- Dopasowanie pozostaje statusem roboczym do czasu świadomego
  zatwierdzenia przez sprzedawczynię. System zapisuje źródło, datę,
  poziom pewności i decyzję użytkowniczki.

- System nie używa słów „potwierdzona autentyczność”, jeśli produkt nie
  przeszedł niezależnej kontroli eksperta.

# 9. Pomiar ubrania ze zdjęcia

## Jak działa to dla użytkowniczki

Aplikacja prowadzi sprzedawczynię krok po kroku:

1.  Połóż ubranie płasko.

2.  Umieść obok wydrukowany znacznik pomiarowy aplikacji albo zwykłą,
    pustą kartę plastikową o standardowym rozmiarze — bez widocznych
    danych osobowych lub płatniczych.

3.  Ustaw telefon zgodnie z ramką na ekranie.

4.  Zrób zdjęcie.

5.  Sprawdź zaproponowane pomiary i popraw je, jeśli trzeba.

W zależności od rodzaju ubrania aplikacja może zaproponować:

- szerokość pod pachami;

- talię;

- biodra;

- długość całkowitą;

- długość rękawa;

- szerokość ramion;

- długość nogawki;

- stan spodni.

## Jak realizuje to system

AI rozpoznaje krawędzie ubrania i punkty pomiaru. Znacznik to prosty
wzór przygotowany przez aplikację do wydrukowania na kartce A4; zawiera
kwadrat o dokładnie znanym wymiarze i wzór rozpoznawany przez kamerę.
Nie jest częścią tła ani produktu. Daje skalę, dzięki której piksele
można przeliczyć na centymetry i skorygować perspektywę. Jeśli
użytkowniczka nie ma drukarki, może użyć pustej karty w standardzie ID-1
(85,60 × 53,98 mm), ale aplikacja ostrzega, aby nie fotografować
prawdziwej karty bankowej z danymi.

Aplikacja pokazuje na ekranie dokładne miejsce ułożenia znacznika,
sprawdza jego widoczność i dopiero wtedy pozwala wykonać zdjęcie
pomiarowe. Tło studyjne jest tworzone dla zdjęcia prezentacyjnego;
zdjęcie pomiarowe z markerem pozostaje osobnym zdjęciem technicznym i
nie trafia jako główne zdjęcie feedu.

Każdy pomiar zapisuje źródło: manual albo image_estimate. Pomiar AI
zawsze wymaga potwierdzenia użytkowniczki.

## Pomiar butów

Buty wymagają osobnego procesu, ponieważ sam numer na pudełku nie mówi
wystarczająco dużo o rzeczywistym dopasowaniu.

Sprzedawczyni dodaje:

- zdjęcie oznaczenia rozmiaru;

- długość wyjmowanej wkładki, jeśli można ją bezpiecznie wyjąć;

- szerokość wkładki w najszerszym miejscu;

- długość podeszwy zewnętrznej jako informację pomocniczą;

- szerokość cholewki i obwód łydki przy kozakach;

- wysokość obcasa i platformy;

- informację, czy fason jest wąski, regularny czy szeroki według jej
  doświadczenia.

Do pomiaru ze zdjęcia wkładkę lub but należy położyć obok znacznika o
znanym rozmiarze. AI proponuje punkty pomiaru, ale użytkowniczka
zatwierdza wynik. Długość zewnętrznej podeszwy nie może być
przedstawiana jako długość miejsca dla stopy.

Kupująca może zapisać długość i szerokość własnej stopy oraz zwykle
noszone rozmiary. Fit Confidence porównuje je przede wszystkim z
długością wkładki, szerokością, fasonem i rozmiarem marki. Wynik nadal
jest wskazówką, ponieważ konstrukcja buta, podbicie i kształt palców
wpływają na wygodę.

## Pomiary i komplet torebki

Przy torebce aplikacja prowadzi pomiar:

- szerokości, wysokości i głębokości;

- długości i regulowanego zakresu paska;

- wysokości uchwytu/drop;

- wymiarów głównego otworu, jeśli wpływają na użytkowanie;

- przybliżonej masy, jeśli sprzedająca ją poda.

AI może zaproponować punkty pomiaru ze zdjęcia z markerem, a sprzedająca
zatwierdza wartości. Osobno zaznacza elementy zestawu: pasek, zawieszka,
kluczyk/kłódka, dust bag, pudełko, karta, paragon lub inne dodatki. Brak
elementu jest widoczny w ogłoszeniu.

# 10. Fit Confidence — czy rzecz prawdopodobnie będzie pasować

## Jak działa to dla użytkowniczki

Kupująca może dobrowolnie zapisać swoje wymiary i określić, czy woli
ubrania dopasowane, regularne czy luźne. Aplikacja porównuje je z
wymiarami konkretnej rzeczy i pokazuje prostą wskazówkę:

- „prawdopodobnie będzie pasować”;

- „może być luźna”;

- „może być ciasna”;

- „potrzebujemy więcej pomiarów”.

To pomoc przy wyborze, a nie gwarancja idealnego dopasowania.

## Jak realizuje to system

Pierwsza wersja wykorzystuje proste reguły porównujące wymiary ubrania,
wymiary kupującej, kategorię i wybraną preferencję. Nie wymaga
trenowania własnego modelu. Po zebraniu danych o zwrotach reguły można
poprawiać. Wymiary ciała są prywatne, nie są widoczne dla sprzedawczyni
i użytkowniczka może je usunąć.

## 10.1 AI Personal Shopper — wyszukiwanie dla konkretnej osoby i okazji

### Jak działa to dla użytkowniczki

Kupująca może napisać własnymi słowami, czego potrzebuje, np.:

- „Szukam sukienki na wesele w Dubaju, do 800 AED, nie zielonej,
  odpowiedniej do moich wymiarów”.

- „Potrzebuję lekkiej marynarki do pracy, która będzie luźna w
  ramionach”.

- „Znajdź mi mokasyny podobne do tych ze zdjęcia, długość mojej stopy to
  25 cm”.

- „Chcę torebkę w takim stylu jak na zdjęciu, ale do 1 500 AED”.

Może podać:

- własne wymiary lub wybrać zapisany prywatny profil dopasowania;

- rodzaj okazji;

- budżet;

- preferowane i wykluczone kolory;

- markę, materiał, stan i styl;

- zdjęcie, zrzut ekranu albo link do rzeczy będącej inspiracją;

- konkretny produkt, do którego chce znaleźć podobną alternatywę.

Aplikacja pokazuje wyłącznie rzeczy rzeczywiście dostępne w
marketplace’ie i wyjaśnia krótko, dlaczego każda z nich pasuje do
zapytania, np. „zgodne z budżetem”, „podobny fason”, „prawdopodobnie
odpowiedni wymiar w biuście”. Wynik można zawęzić jednym zdaniem bez
ponownego ustawiania wszystkich filtrów.

### Jak realizuje to system

Pierwsza wersja łączy trzy mechanizmy:

1.  Model językowy zamienia opis okazji i preferencji na zwykłe filtry:
    kategorię, cenę, kolor, materiał, rozmiar i stan.

2.  Wyszukiwanie podobieństwa obrazu porównuje zdjęcie referencyjne z
    obrazami aktywnych ogłoszeń.

3.  Fit Confidence porównuje wymiary użytkowniczki z pomiarami rzeczy
    lub butów.

Ranking uwzględnia wyłącznie aktywne ogłoszenia i nigdy nie omija
twardych ograniczeń, np. maksymalnego budżetu lub wykluczonego koloru.
Wynik AI musi wskazywać brakujące dane i poziom pewności. Historia
zapytań oraz profil wymiarów są prywatne.

W MVP moduł działa jako wersja beta na ofertach wearto.you.
Przeszukiwanie zewnętrznych sklepów lub marketplace’ów nie jest wymagane
do pierwszego uruchomienia.

# 11. Smart Price — pomoc w ustaleniu ceny

## Jak działa to dla użytkowniczki

Po rozpoznaniu produktu aplikacja proponuje realistyczny przedział ceny,
np. „650–800 AED”. Wyjaśnia również, co wpłynęło na wynik: marka, stan,
materiał, podobne produkty i aktualne zainteresowanie daną kategorią.

Sprzedawczyni zawsze sama wybiera cenę końcową.

## Jak realizuje to system

Na początku algorytm korzysta z danych ogłoszenia i cen podobnych
produktów. Przy małej ilości danych pokazuje szerszy przedział oraz
niższą pewność. Z czasem największą wartość będą miały własne dane o
produktach faktycznie sprzedanych, a nie tylko wystawionych.

# 12. Przeglądanie i wyszukiwanie

## Jak działa to dla użytkowniczki

Kupująca może przeglądać duże zdjęcia produktów oraz filtrować je
według:

- kategorii;

- marki;

- rozmiaru;

- ceny;

- stanu;

- koloru;

- materiału;

- możliwości negocjacji;

- dostawy lub odbioru osobistego.

Może zapisać rzecz jako ulubioną i wrócić do niej później.

## Jak realizuje to system

W MVP wystarczy szybkie wyszukiwanie tekstowe i filtry w bazie
PostgreSQL. Wyszukiwanie konwersacyjne AI, np. „znajdź jedwabną sukienkę
na kolację do 700 AED”, może zostać dodane po uruchomieniu podstawowej
sprzedaży.

# 13. Cena i negocjacja

## Jak działa to dla użytkowniczki

Sprzedawczyni ustala:

- cenę widoczną dla kupującej;

- czy dopuszcza negocjację;

- opcjonalną minimalną kwotę, której kupująca nie widzi.

Jeżeli oferta kupującej jest równa lub wyższa od ukrytego minimum,
aplikacja może automatycznie ją zaakceptować. Niższą ofertę
sprzedawczyni może zaakceptować, odrzucić albo odpowiedzieć własną ceną.

Po zaakceptowaniu oferty produkt jest rezerwowany na czas dokonania
płatności.

Zatwierdzony model MVP: kwota wpisana przez sprzedawczynię jest ceną
produktu widoczną kupującej. Przy cenie 100 AED kupująca widzi 100 AED,
prowizja platformy wynosi 10 AED, a sprzedawczyni otrzyma 90 AED.
Bezpośrednio pod polem ceny aplikacja pokazuje kalkulator Kupująca
zapłaci za produkt: 100 AED oraz Otrzymasz po prowizji: 90 AED.

Jeżeli klientka biznesowa zdecyduje później, że sprzedająca ma wpisywać
oczekiwaną kwotę netto, będzie to osobny tryb cenowy wymagający zmiany
komunikacji i regulaminu. Nie mieszać obu modeli w pilocie.

## Jak realizuje to system

- minimum_offer_minor nie może być zwracane przez publiczne API.

- Oferta ma status: pending, accepted, rejected, countered, expired.

- Zaakceptowanie oferty uruchamia czasową rezerwację.

- Cena zaakceptowana przez obie strony jest zapisywana w zamówieniu i
  nie zmienia się po późniejszej zmianie ogłoszenia.

- Prowizja jest przechowywana jako konfigurowalna liczba punktów
  bazowych, domyślnie 1000 bps = 10%. Zmiana stawki działa dla nowych
  zamówień; istniejące zachowują snapshot.

- Kalkulator ceny i prowizji musi używać dokładnie tej samej funkcji
  backendowej co zamówienie, aby ekran nie pokazywał innej kwoty niż
  późniejsze rozliczenie.

# 14. Pełny system płatności: Tap Payments + Lean Technologies + warunkowa rola wayto.you

Ta część jest centralnym elementem produktu. Tap i Lean są rzeczywistymi
szynami finansowymi. wayto.you jest warstwą adresowania, routingu i
bezpieczeństwa, którą wykorzystujemy tylko wtedy, gdy wnosi potwierdzoną
wartość i nie dubluje prostszego przepływu operatora.

## 14.1 Rola Tap Payments

Tap Payments jest operatorem, który przyjmuje płatność kupującej kartą,
Apple Pay lub Google Pay. Jeżeli Tap zatwierdzi dla tego projektu model
Marketplace w UAE, może także onboardować sprzedawców, wykonać split
90/10, prowadzić regulowane saldo/rozliczenie, opóźnić przekazanie
części sprzedawczyni oraz wypłacić środki zgodnie z umową i
możliwościami konta.

Konto merchant Tap Payments musi należeć od początku do firmy
prowadzącej marketplace. Rejestrację i proces akceptacji należy
rozpocząć równolegle z budową aplikacji.

Apple Pay i Google Pay nie mogą być uznane za automatycznie aktywne
tylko dlatego, że są opisane w API. Właścicielka potwierdza z Tap ich
dostępność dla konta marketplace w UAE, waluty AED oraz kanałów web, iOS
i Android. Claude Code zapisuje wynik w
docs/payments/tap-wallets-findings.md, implementuje metody za PaymentUI
i ukrywa przycisk, gdy dana metoda nie jest dostępna na urządzeniu lub
koncie. Google Pay musi zostać przetestowane na Androidzie oraz we
wspieranej przeglądarce, a Apple Pay na zgodnym urządzeniu Apple; karta
pozostaje metodą zapasową.

Najważniejsze pytanie do Tap przed wyborem architektury produkcyjnej:
czy Tap Marketplace w UAE pozwala onboardować jako odbiorców splitu
osoby prywatne sprzedające okazjonalnie używane rzeczy, bez trade
license? Tap ma pisemnie potwierdzić wymagane KYC, dane bankowe,
możliwość delayed split/payout po czasie na spór oraz odpowiedzialność
za chargeback. Bez tej odpowiedzi nie zakładamy, że standardowy
onboarding Business/Retailer pasuje do C2C.

## 14.2 Zatwierdzona rola wayto.you — pieniądze podążają za tożsamością

wayto.you jest zatwierdzoną warstwą adresowania, claim flow i
bezpieczeństwa. Nie jest bankiem, portfelem ani procesorem. Po
zatwierdzeniu sprzedaży instrukcja wypłaty zostaje skierowana do
zweryfikowanej osoby przez jej e-mail lub numer telefonu. Sprzedawczyni
otwiera bezpieczny link i wybiera obsługiwane miejsce odbioru, a Tap
albo Lean wykonuje właściwy transfer.

Kupująca nadal widzi prosty checkout Tap albo Lean. Różnica pojawia się
po stronie sprzedawczyni: wypłata nie jest kierowana najpierw do
portfela wearto.you ani na rachunek wpisany w marketplace. Jest
adresowana do osoby. Jeżeli sprzedawczyni zmieni bank lub miejsce
odbioru, jej zweryfikowana tożsamość pozostaje ta sama — pieniądze
podążają za tożsamością, a nie za zapisanym na stałe numerem konta.

Zatwierdzony model produktu wykorzystuje wayto.you jako niewidoczną dla
kupującej warstwę pomiędzy zdarzeniem Sprzedaż zatwierdzona a bankowym
payoutem. Operator finansowy może prowadzić wymagany techniczny ledger w
tle, ale użytkowniczka nie otrzymuje salda ani portfela wearto.you. Nie
może doładowywać salda ani trzymać na nim środków. Dostaje claim do
konkretnej wypłaty i wybiera obsługiwane miejsce odbioru.

Zakres MVP nie obejmuje krypto ani PayPal. PayPal występuje w
materiałach wayto.you wyłącznie jako porównanie: PayPal kieruje środki
do konta we własnym zamkniętym systemie, natomiast wayto.you adresuje
instrukcję do osoby i wykorzystuje zatwierdzone szyny Tap/Lean.
Interfejs pokazuje wyłącznie miejsca odbioru potwierdzone produkcyjnie.

## 14.2A Różnica między Vinted a wearto.you

Vinted korzysta z regulowanego operatora, który prowadzi Vinted Wallet.
Po sprzedaży środki przechodzą ze statusu oczekującego do dostępnego
salda, a sprzedawczyni wypłaca je później na zapisane konto bankowe.

wearto.you nie pokazuje użytkowniczce portfela ani salda. Po
zatwierdzeniu sprzedaży powstaje osobny claim payoutu skierowany do
zweryfikowanej tożsamości sprzedawczyni.

Najważniejsze różnice:

- Vinted: środki trafiają najpierw do salda Vinted Wallet; wearto.you:
  instrukcja wypłaty trafia do osoby przez e-mail lub telefon;

- Vinted: użytkowniczka wypłaca dostępne saldo; wearto.you: odbiera
  konkretną zatwierdzoną wypłatę bez tworzenia portfela użytkownika;

- wearto.you: sprzedawczyni wybiera e-mail albo WhatsApp jako kanał
  otrzymania bezpiecznego linku claim;

- wearto.you: zmiana rachunku nie zmienia adresata payoutu, ponieważ
  stałym adresem jest zweryfikowana tożsamość;

- wearto.you: przed uruchomieniem wypłaty dwustronna bramka sprawdza
  zarówno stronę płacącą, jak i odbierającą oraz może zażądać
  dodatkowego potwierdzenia przy nietypowym zachowaniu.

Marketplace nie wykonuje ręcznych przelewów. Backend automatycznie
reaguje na potwierdzoną dostawę i akceptację, wysyła podpisaną
instrukcję wayto.you, a regulowany operator wykonuje split 90/10 i
payout. Administrator działa ręcznie tylko przy sporze, niezgodności lub
kontroli bezpieczeństwa.

## 14.3 Co widzi kupująca

Przed płatnością kupująca widzi pełne podsumowanie:

- cena produktu;

- koszt dostawy, jeśli wybrano kuriera;

- ewentualne podatki lub jawne opłaty;

- pełna kwota do zapłaty.

Prowizja 10% jest potrącana z kwoty należnej sprzedawczyni. Nie jest
dopisywana kupującej jako niespodziewana opłata na ostatnim ekranie.

Kupująca płaci kartą, Apple Pay lub Google Pay przez Tap Payments. Po
potwierdzeniu produkcyjnego Pay by Bank może również wybrać zapłatę
bezpośrednio z konta przez Lean Technologies. Aplikacja pokazuje tylko
metody aktywowane dla konta, kraju, waluty i urządzenia. Płatność jest
zakończona dopiero po zweryfikowanym webhooku właściwego operatora.

## 14.4 Co widzi sprzedawczyni

Przy cenie 1 000 AED sprzedawczyni przed zatwierdzeniem ogłoszenia
widzi:

- cena dla kupującej: 1 000 AED;

- prowizja platformy 10%: 100 AED;

- przewidywana wypłata dla sprzedawczyni: 900 AED.

Po sprzedaży widzi kolejne etapy:

1.  Płatność otrzymana.

2.  Oczekiwanie na odbiór przez kuriera.

3.  Rzecz w dostawie.

4.  Dostarczono — trwa czas na akceptację lub zgłoszenie problemu.

5.  Sprzedaż zatwierdzona.

6.  Otrzymałam link claim e-mailem albo przez WhatsApp — wybieram
    obsługiwane miejsce odbioru 900 AED.

7.  Wypłata 900 AED uruchomiona i zakończona przez Tap albo Lean.

8.  Sprzedawczyni wybiera preferowany kanał claim: zweryfikowany e-mail
    albo zweryfikowany WhatsApp. Może później zmienić ten wybór w
    ustawieniach. Zmiana kanału wymaga ponownego potwierdzenia i nie
    zmienia statusu już rozpoczętej wypłaty.

## 14.5 Moment zatwierdzenia sprzedaży

Pieniądze dla sprzedawczyni nie są uruchamiane natychmiast po zapłacie
kupującej.

Sprzedaż staje się zatwierdzona, gdy nastąpi jeden z dwóch momentów:

- kupująca po dostawie naciska „Akceptuję rzecz”; albo

- upływa określone okno na zgłoszenie problemu, np. 3 dni od
  potwierdzonej dostawy, i nie został otwarty spór.

Przy odbiorze osobistym kupująca po obejrzeniu rzeczy naciska Akceptuję
i otrzymuje jednorazowy kod. Sprzedawczyni wpisuje kod w swoim
zamówieniu przed przekazaniem rzeczy. Jest to proste potwierdzenie
obecności i zgodnej decyzji obu stron; QR może później jedynie
przyspieszyć przekazanie tego samego kodu.

Jeżeli kupująca zgłosi problem w wyznaczonym czasie, wypłata pozostaje
wstrzymana do decyzji administratora.

## 14.6 Podział 90/10

Dla sprzedaży C2C:

- 90% ceny produktu należy się sprzedawczyni;

- 10% ceny produktu stanowi prowizję platformy;

- koszt dostawy jest rozliczany osobno i nie powinien automatycznie
  podlegać prowizji;

- wartości są obliczane i zapisywane w momencie utworzenia zamówienia.

Regulowany operator powinien wykonać podział i wypłatę po zatwierdzeniu
sprzedaży. Marketplace zapisuje księgowy stan zamówienia, ale sam nie
przechowuje środków i nie tworzy pozornego escrow wyłącznie jako liczby
w swojej bazie. wayto.you może przekazać instrukcję i status, lecz
również nie zastępuje licencjonowanego przechowywania lub rozliczenia
środków.

## 14.7 Zatwierdzony przepływ: checkout → akceptacja → claim → payout

Tap, Lean i wayto.you mają różne role. Właścicielka zatwierdziła
doświadczenie bez portfela użytkownika; wykonawca ma potwierdzić, jak
odwzorować je produkcyjnie i zgodnie z prawem na dostępnych API.

**Zatwierdzony przebieg:**

1.  Kupująca płaci przez Tap kartą, Apple Pay lub Google Pay albo przez
    zatwierdzone Lean Pay by Bank.

2.  Regulowany operator potwierdza płatność i utrzymuje wymagany stan
    rozliczenia. Marketplace nie przechowuje środków.

3.  Po dostawie kupująca akceptuje rzecz albo mija czas na zgłoszenie
    problemu bez otwartego sporu.

**Backend tworzy podpisaną instrukcję payoutu zawierającą zweryfikowaną
tożsamość sprzedawczyni oraz niezmienny podział 90/10.**

1.  Dwustronna bramka wayto.you sprawdza stronę płacącą i odbierającą.
    Wynik może dopuścić payout, poprosić o dodatkowe potwierdzenie albo
    skierować sprawę do ręcznej kontroli zgodnie z zatwierdzoną
    konfiguracją.

2.  wayto.you wysyła sprzedawczyni bezpieczny claim link wybranym przez
    nią kanałem: e-mail albo WhatsApp.

3.  Sprzedawczyni otwiera link, uwierzytelnia się i wybiera lub
    potwierdza dostępne miejsce odbioru obsługiwane przez Tap albo Lean.
    Marketplace otrzymuje token/referencję, a nie pełne dane finansowe.

4.  Regulowany operator automatycznie wykonuje payout 90% do wybranego
    miejsca oraz rozlicza 10% prowizji platformy. Status wraca przez
    bezpieczny webhook.

Interfejs użytkowniczki nie pokazuje technicznego salda operatora.
Pokazuje jedynie status konkretnej sprzedaży: oczekuje na akceptację,
claim wysłany, miejsce odbioru potwierdzone, payout w trakcie,
wypłacono.

## 14.8 Zwrot pieniędzy

Jeśli spór zostanie rozstrzygnięty na korzyść kupującej:

1.  Administrator wybiera decyzję: pełny refund, częściowy refund albo
    brak refundu.

2.  Jeżeli rzecz ma wrócić do sprzedającej, administrator naciska Zamów
    zwrot rzeczy.

3.  Aplikacja pokazuje dostępne metody: odbiór kurierski z adresu
    kupującej albo nadanie w punkcie drop-off, jeśli wspiera je wybrany
    operator.

4.  System generuje zlecenie/etykietę, instrukcję pakowania i tracking
    przesyłki zwrotnej.

5.  Kupująca przekazuje paczkę i obie strony widzą status.

6.  Po potwierdzonym doręczeniu do sprzedającej administrator sprawdza
    wymagane dowody i naciska Wykonaj refund.

7.  Backend wysyła refund przez operatora, który przyjął pierwotną
    płatność, zgodnie z zasadami danej szyny. wayto.you może przekazać
    instrukcję i status wyłącznie wtedy, gdy jest to obsługiwane
    produkcyjnie.

8.  Status refundu jest aktualizowany na podstawie webhooka dostawcy.

9.  Kupująca widzi kwotę oraz status zwrotu pieniędzy.

Przycisk Wykonaj refund jest domyślnie zablokowany, dopóki wymagany
zwrot rzeczy nie ma potwierdzonego doręczenia. Administrator może
wyjątkowo wybrać Refund bez zwrotu rzeczy, ale musi podać powód;
operacja zostaje zapisana w audycie.

System nie może uzależniać refundu wyłącznie od ręcznej deklaracji
jednej strony. Używa trackingu, dowodu nadania/doręczenia, zdjęć i
decyzji administratora.

Refund kartowy co do zasady wraca przez operatora do pierwotnej metody
zgodnie z regułami Tap i organizacji kartowych. Zwrot do tożsamości
wayto.you można zastosować tylko jako jawnie zatwierdzony rodzaj
transferu, jeżeli operator i prawnik potwierdzą jego zgodność; nie wolno
obiecywać go w MVP na podstawie samej koncepcji.

## 14.9 Co dokładnie sprawdzić w repozytorium wayto.you

Wykonawca przygotowuje plik docs/payments/wayto-you-findings.md i
odpowiada w nim na pytania:

1.  Jakie są endpointy płatności, wypłaty, claim i refundu?

2.  Jak wygląda autoryzacja i podpisywanie żądań?

3.  Jak weryfikowane są webhooki?

4.  Czy wayto.you ma natywny split payment 90/10?

5.  Czy split należy wykonać przez Tap Payments Connect?

6.  Czy instrukcję wypłaty można uruchomić dopiero po zatwierdzeniu
    sprzedaży?

7.  Jak długo odbiorca ma czas na odebranie przekierowanej płatności?

8.  Co dzieje się po wygaśnięciu tego czasu?

9.  Czy odbiorca może raz ustawić domyślne miejsce wypłaty?

10. Czy zwrot może trafić do tożsamości kupującej po zmianie karty?

11. Czy repo zawiera SDK lub gotowe przykłady integracji?

12. Które funkcje działają w sandboxie, a które mają aktualną zgodę
    produkcyjną?

13. Czy Tap Marketplace w UAE onboarduje osoby prywatne C2C bez trade
    license, czy wyłącznie podmioty Business/Retailer?

14. Jakie KYC, dane bankowe i dokumenty musi przekazać prywatna
    sprzedawczyni oraz czy przekazuje je bezpośrednio Tap/Lean?

15. Czy Tap pozwala opóźnić split i payout do akceptacji rzeczy lub
    końca trzydniowego okna na spór?

16. Czy Lean jest produkcyjnie dostępny zarówno jako Pay by Bank dla
    kupującej, jak i jako bankowa szyna payoutu dla sprzedawczyni?

17. Czy wayto.you w tym przepływie rzeczywiście zmniejsza liczbę kroków
    lub zakres danych finansowych w marketplace, czy dubluje funkcje
    Tap?

18. Które miejsca odbioru są faktycznie podłączone i zatwierdzone? MVP
    nie obejmuje krypto ani PayPal.

## 14.10 Wymagania bezpieczeństwa płatności

- Kwoty przechowujemy jako pełne liczby w najmniejszej jednostce waluty,
  np. fils.

- Zamówienie zapisuje niezmienną kopię ceny, prowizji, kwoty
  sprzedawczyni, dostawy i waluty.

- Frontend nie może sam potwierdzić, że płatność się udała. Decyduje
  zweryfikowany webhook Tap.

- Każde żądanie płatności, wypłaty i refundu ma unikalny klucz
  idempotencji.

- Powtórzony webhook nie może wykonać drugiej operacji pieniężnej.

- Codzienny proces porównuje dane lokalne ze stanem w Tap i wayto.you
  oraz wskazuje różnice administratorowi.

- Pełne dane karty nie są przechowywane przez marketplace.

## 14.11 Alternatywy, gdy Tap nie spełni warunków

Pierwszym wyborem pozostaje Tap Payments ze względu na rynek UAE i
obsługę regionu. Jeżeli wymagany model split/delayed payout nie zostanie
zatwierdzony, do oceny biznesowej i technicznej można włączyć:

- PayTabs;

- HyperPay;

- Checkout.com przy większej skali.

Zmiana operatora nie powinna wymagać przebudowy całej aplikacji, dlatego
płatności mają być ukryte za wspólnym interfejsem PaymentProvider.

## 14.12 Wymienne role Tap, Lean i wayto.you

Kod rozdziela trzy role: PaymentCollectionProvider przyjmuje płatność
kupującej; SettlementProvider odpowiada za regulowany hold/delayed
split, payout i refund; WayToYouRoutingProvider obsługuje adresowanie do
osoby, claim, preferowany kanał e-mail/WhatsApp oraz status instrukcji.
Ekrany, zamówienia, spory, dostawa i panel nie znają własnych obiektów
ani statusów dostawców.

Neutralne interfejsy mają obejmować co najmniej:

- createPayment — rozpoczęcie płatności przez wybraną szynę Tap albo
  Lean;

- getPaymentStatus — sprawdzenie statusu;

- verifyWebhook — bezpieczne potwierdzenie zdarzenia;

- onboardSeller oraz getSellerVerificationStatus — onboarding i KYC
  odbiorcy, jeśli wymaga go operator;

- holdOrDelaySettlement — wstrzymanie lub odroczenie rozliczenia
  wyłącznie, gdy operator prawnie i technicznie to obsługuje;

- splitPayment — podział kwoty między sprzedawczynię i platformę;

- releasePayout — uruchomienie wypłaty;

- refundPayment — pełny albo częściowy refund;

- getCapabilities — informację, które funkcje są faktycznie dostępne na
  danym koncie i rynku.

System przechowuje własne neutralne statusy, np. created, pending, paid,
failed, settlement_held, ready_for_split, payout_pending, paid_out,
refund_pending, refunded i disputed. Status Tap jest zachowany osobno
jako dane dostawcy i tłumaczony przez adapter. Kod poza adapterem nie
może porównywać wartości takich jak nazwy statusów, identyfikatory
destination ani typy webhooków Tap.

Każda transakcja zapisuje payment_provider, neutralny identyfikator
operacji, zaszyfrowaną lub bezpiecznie przechowywaną referencję dostawcy
oraz historię zdarzeń. Nie wolno zapisywać prawdziwych kluczy API w
kodzie ani bazie produktu.

Konfiguracja wybiera osobno szynę checkoutu i rozliczenia, np.
CHECKOUT_RAIL=tap oraz SETTLEMENT_PROVIDER=tap_marketplace. wayto.you
jest zatwierdzonym routingiem produktu, ale pozostaje za odizolowanym
adapterem i ma własny mock/sandbox. Zmiana Tap/Lean ani aktualizacja
adaptera wayto.you nie może wymagać zmiany tabel ofert, produktów,
dostaw i sporów.

Przed uruchomieniem produkcji aplikacja sprawdza wymagane capabilities.
Jeżeli aktywny operator nie potwierdza opóźnionego rozliczenia, splitu,
payoutu albo refundu, system blokuje produkcyjny checkout i pokazuje
administratorowi czytelny błąd konfiguracji. Nie wolno po cichu
zastępować brakującej funkcji ręcznym przelewem platformy.

Test automatyczny ma uruchamiać pełny scenariusz zamówienia na
MockPaymentProvider bez Tap. Jest to dowód, że główna logika
marketplace’u naprawdę nie zależy od konkretnego operatora. Osobne testy
kontraktowe sprawdzają zgodność adaptera Tap ze wspólnym interfejsem.

## 14.13 Lean Technologies — Pay by Bank i bankowa szyna wypłat

Lean pełni dwie możliwe role bankowe. Po pierwsze, kupująca może użyć
Pay by Bank i zapłacić bezpośrednio ze swojego konta zamiast kartą. Po
drugie, Lean Payouts może przesłać zatwierdzoną wypłatę z podłączonego
konta źródłowego na rachunek sprzedawczyni. Każda rola wymaga osobnego
potwierdzenia produkcyjnego, umowy, modelu regulacyjnego i dokładnego
wskazania, kto jest właścicielem konta źródłowego.

W aktualnych materiałach wayto.you Lean i Tap działają w sandboxie.
Claude Code ma sprawdzić endpointy, webhooki, wersję API oraz oba
kierunki: pobranie płatności bankowej i wypłatę bankową. Nie wolno uznać
sandboxu za zgodę produkcyjną.

Kontakt techniczny do Lean, przekazany przez właścicielkę: Lean
Developer Support — devsupport@leantech.me. Wykonawca może użyć tego
kontaktu wyłącznie do pytań technicznych o status integracji, nie do
podawania danych klienta czy kluczy produkcyjnych bez zgody
właścicielki.

Realizacja: LeanPayByBankProvider implementuje bankową metodę checkoutu,
a LeanPayoutProvider wyłącznie potwierdzone funkcje wypłaty. Nie łączymy
tych ról w jednym nieczytelnym adapterze. Brak produkcyjnego Lean nie
blokuje MVP na Tap, lecz przycisk Zapłać z konta oraz wypłata przez Lean
pozostają wtedy wyłączone feature flagą.

## 14.14 Bramka bezpieczeństwa TEP + strażnik behawioralny — protokół Quanthio, nie kod marketplace’u

wayto.you zawiera własną, dwustronną bramkę bezpieczeństwa
przed-transakcyjną (nadawca sprawdzany przy wysyłce, odbiorca przy
odbiorze, zwolnienie płatności tylko gdy obie strony są bezpieczne w tym
samym momencie). To jest opatentowany/licencjonowany protokół Quanthio
(TEP + PRP), a nie funkcja, którą marketplace buduje, kopiuje albo
utrzymuje samodzielnie.

Dla wykonawcy oznacza to:

- Marketplace korzysta z efektu tej bramki (np. odrzucenie lub
  wstrzymanie podejrzanej płatności) wyłącznie przez odpowiedź API
  wayto.you — nigdy nie odtwarza ani nie próbuje wywnioskować logiki
  liczącej ryzyko.

- Parametry, wzory i kalibracja bramki są poufne i nie mają prawa trafić
  do repozytorium marketplace’u w żadnej formie, nawet jako komentarz
  czy przykład.

- Bramka działa w trybie fail-open — błąd po stronie wayto.you nie może
  samoczynnie blokować uczciwej płatności; marketplace ma obsłużyć taki
  przypadek jak zwykły błąd integracji, nie jak decyzję biznesową.

- packages/integrations/wayto-you-adapter/NOTICE.md ma wprost wymieniać
  tę bramkę jako część chronionego protokołu Quanthio, objętą osobną
  licencją użytkowania — zgodnie z zasadami z
  wearto-you-logika-licencjonowania.md.

# 15. Dostawa kurierska w Dubaju

## Jak działa to dla użytkowniczki

Kupująca wybiera dostawę kurierską i płaci jej koszt razem z zakupem.
Marketplace zamawia odbiór z adresu sprzedawczyni i dostawę pod adres
kupującej.

Odbiór i dostawa mogą być wykonane przez różnych kierowców tej samej
sieci logistycznej. Przesyłka może przejść przez sortownię.
Użytkowniczki widzą jeden ciągły status zamówienia.

Przykładowy przebieg:

1.  Płatność została przyjęta.

2.  Kurier otrzymał zlecenie odbioru.

3.  Kurier odebrał paczkę od sprzedawczyni.

4.  Paczka jest w sortowni lub w transporcie.

5.  Kurier dostarcza ją kupującej.

6.  Operator przesyła potwierdzenie dostawy.

7.  Rozpoczyna się czas na akceptację albo zgłoszenie problemu.

## Jak realizuje to system

Powstaje wspólny interfejs CourierProvider, który obsługuje:

- wycenę;

- utworzenie zlecenia;

- wybór terminu odbioru;

- anulowanie przed odbiorem;

- numer trackingowy;

- potwierdzenie odbioru od sprzedawczyni;

- potwierdzenie dostawy;

- nieudaną próbę dostawy;

- ponowną próbę;

- przesyłkę zwrotną.

Statusy konkretnej firmy kurierskiej są tłumaczone na wspólne statusy
marketplace’u.

Żaden ekran ani moduł zamówień nie może korzystać bezpośrednio z nazw
usług, statusów lub pól jednego kuriera. Aktywny adapter wybiera
konfiguracja, np. COURIER_PROVIDER=aramex. Pełny test dostawy działa
również na MockCourierProvider, aby późniejsza wymiana operatora nie
wymagała przebudowy marketplace’u.

## Zagubienie lub uszkodzenie w pierwszej dostawie

To jest osobny przypadek od niezgodności produktu i od zwrotu po sporze.
Jeżeli przesyłka zostanie zagubiona albo uszkodzona pomiędzy odbiorem od
sprzedawczyni a doręczeniem kupującej:

- wypłata dla sprzedawczyni pozostaje wstrzymana;

- zamówienie otrzymuje status shipping_claim_open;

- platforma zbiera proof of pickup, tracking, proof of delivery lub
  informację o braku doręczenia, zdjęcia paczki przed odbiorem i po
  dostawie oraz deklarowaną wartość;

- administrator rozpoczyna reklamację u kuriera i widzi jej termin oraz
  numer;

- kupująca otrzymuje czytelną informację, czy oczekuje na wynik
  reklamacji, czy przyznano refund;

- decyzja finansowa zapisuje osobno refund dla kupującej, odszkodowanie
  kuriera, koszt poniesiony przez platformę i ewentualną wypłatę
  sprzedawczyni.

Przed podpisaniem umowy z kurierem właścicielka potwierdza: limit
odpowiedzialności, koszt i zakres ubezpieczenia, sposób deklarowania
wartości, wyłączenia dla produktów luksusowych, wymagania dotyczące
pakowania, termin reklamacji oraz to, kto formalnie składa roszczenie.
Dla rzeczy powyżej 500 USD aplikacja rekomenduje ubezpieczoną przesyłkę
z zadeklarowaną wartością albo odbiór osobisty. Nie wolno obiecywać
pełnej ochrony przesyłki, dopóki nie potwierdza jej umowa z operatorem.

Regulamin dostawy ma wyjaśniać odpowiedzialność sprzedawczyni za
prawidłowe zapakowanie, odpowiedzialność operatora po potwierdzonym
odbiorze paczki oraz sposób i termin rozpatrywania roszczenia. Claude
Code nie ustala prawnej odpowiedzialności; tworzy statusy, dowody, panel
i konfigurowalne reguły zgodne z tekstem zatwierdzonym przez prawnika i
kuriera.

## Firmy do rozmów i sprawdzenia API

- Aramex;

- Jeebly;

- Shipa Delivery;

- iMile;

- Quiqup.

Przed wyborem należy potwierdzić, że firma:

- odbiera pojedyncze przesyłki z różnych prywatnych adresów w UAE;

- udostępnia API i webhooki;

- obsługuje proof of pickup i proof of delivery;

- oferuje zwroty/reverse logistics;

- pozwala platformie zamawiać usługę w imieniu użytkowników.

Do MVP integrowany jest jeden operator. Pozostali są alternatywami.

# 16. Odbiór osobisty

## Jak działa to dla użytkowniczki

Kupująca może wybrać odbiór osobisty i obejrzeć rzecz przed jej
przyjęciem. Strony uzgadniają termin i publiczne miejsce przez
aplikację.

Dla produktu powyżej 500 USD aplikacja wyświetla odbiór osobisty jako
rekomendowaną opcję, ponieważ kupująca może obejrzeć rzecz przed
akceptacją. Dostawa kurierska nadal może pozostać dostępna po enhanced
KYC obu stron i ewentualnej ręcznej kontroli administratora.

Przy spotkaniu obie osoby otwierają konkretne zamówienie. Kupująca
ogląda rzecz i naciska Akceptuję. Aplikacja pokazuje na jej telefonie
jednorazowy QR oraz odpowiadający mu sześciocyfrowy kod awaryjny.
Sprzedawczyni skanuje QR swoim telefonem albo wpisuje kod przed
fizycznym przekazaniem rzeczy. Kupująca potwierdza:

„Obejrzałam rzecz, odebrałam ją i akceptuję zakup”.

Po potwierdzeniu sprzedaż zostaje zatwierdzona i można uruchomić
wypłatę.

QR i kod potwierdzają, że obie zalogowane osoby uczestniczyły w
zamknięciu właściwego zamówienia. Nie potwierdzają autentyczności ani
jakości produktu. QR jest zatwierdzonym elementem MVP; sześciocyfrowy
kod jest obowiązkowym fallbackiem przy braku zgody na aparat,
uszkodzonej kamerze lub problemie ze skanowaniem.

## Jak realizuje to system

- QR i kod działają tylko dla jednego zamówienia, jednej próby
  przekazania i przez krótki, konfigurowalny czas. Token nie zawiera
  jawnych danych osobowych ani finansowych.

- Potwierdzenie zapisuje użytkowników, czas oraz podstawowy ślad
  urządzenia.

- Dla zakupu powyżej 500 USD kod staje się dostępny dopiero po
  rozszerzonej weryfikacji obu osób.

- Bez potwierdzenia obu stron administrator może skierować sprawę do
  ręcznego wyjaśnienia.

# 17. Produkty markowe i odpowiedzialność

## Jak działa to dla użytkowniczki

Przy wystawianiu rzeczy markowej sprzedawczyni potwierdza, że:

- jest właścicielką produktu;

- ma prawo go sprzedać;

- opisuje go zgodnie z prawdą;

- zgodnie ze swoją wiedzą produkt jest oryginalny;

- pokazane zdjęcia przedstawiają konkretną sprzedawaną rzecz.

Jeżeli ma dowód zakupu, kartę autentyczności, pudełko, worek
przeciwkurzowy lub inne elementy zestawu, może dodać ich zdjęcia. Brak
dowodu zakupu nie blokuje automatycznie zwykłego ogłoszenia, ale
kupująca widzi, jakie dokumenty i dodatki zostały zadeklarowane.

AI może znaleźć podobny model i zauważyć niezgodności, ale platforma nie
przedstawia tego jako potwierdzenia oryginalności.

Dla drogich rzeczy platforma ma prawo wymagać dodatkowych zdjęć,
dodatkowej weryfikacji albo ręcznie zatwierdzić ogłoszenie przed
publikacją.

## Jak realizuje to system

- Ogłoszenie przechowuje deklarację sprzedawczyni i listę elementów
  zestawu.

- Przy odbiorze od sprzedawczyni aplikacja może poprosić o aktualne
  zdjęcie zapakowanej rzeczy jako dodatkowy dowód.

- Historia zdjęć i zmian opisu jest zachowana.

- Administrator może ustawić maksymalną cenę dla pilota lub ręczną
  moderację wybranych kategorii.

- Regulamin i treść deklaracji wymagają weryfikacji przez prawnika
  znającego prawo UAE.

# 17A. Zakazane przedmioty i zgłaszanie nadużyć

## Co trafia do regulaminu i polityki platformy

Przed uruchomieniem właścicielka publikuje prostą politykę zakazanych
przedmiotów i zachowań, zatwierdzoną przez prawnika UAE. Co najmniej
zabronione są: świadomie oferowane podróbki, rzeczy skradzione, towary,
których sprzedaż jest nielegalna lub ograniczona, ogłoszenia
wprowadzające w błąd, cudze zdjęcia przedstawiane jako własne, próby
oszustwa, nękanie oraz obchodzenie płatności i zabezpieczeń platformy.
Szczegółowa lista kategorii ma być edytowalna, ponieważ może zmieniać
się wraz z prawem, regulaminem operatora płatności i zasadami kuriera.

Polityka opisuje możliwe konsekwencje: prośbę o uzupełnienie informacji,
ukrycie lub usunięcie ogłoszenia, anulowanie transakcji, wstrzymanie
wypłaty, ograniczenie konta, blokadę użytkowniczki oraz przekazanie
informacji właściwym organom, jeżeli wymaga tego prawo. Musi także
opisać możliwość odwołania od decyzji platformy.

## Co buduje Claude Code

- Widoczne akcje Zgłoś ogłoszenie, Zgłoś użytkownika oraz Zgłoś
  wiadomość w odpowiednich miejscach.

- Formularz powodów: podejrzenie podróbki, rzecz skradziona,
  niedozwolony produkt, nieprawdziwy opis, cudze zdjęcia, oszustwo,
  nękanie, próba płatności poza platformą i inny powód.

- Możliwość dołączenia opisu oraz dowodów bez ujawniania zgłaszającej
  drugiej stronie.

- Tabelę reports powiązaną z tenantem, zgłaszającą, zgłaszanym obiektem,
  kategorią, priorytetem, statusem, decyzją, administratorem i historią
  zmian.

- Kolejkę moderacji w panelu z filtrami nowe, pilne, w toku, oczekuje na
  informacje, zamknięte i odwołanie.

- Akcje: ukryj ogłoszenie, wstrzymaj sprzedaż lub wypłatę, poproś o
  dowody, przywróć, usuń, ostrzeż, ogranicz konto i zablokuj konto.

- Dziennik audytowy i zachowanie dowodów przez okres określony w
  polityce retencji.

- Regułę, że zgłoszenie dotyczące opłaconego zamówienia może
  automatycznie oznaczyć je do kontroli i wstrzymać wypłatę, ale nie
  może automatycznie uznać winy.

- Edytowalną w panelu listę zakazanych kategorii i komunikatów dla
  użytkowniczek.

Pierwsza wersja nie potrzebuje automatycznego AI podejmującego decyzję o
winie. AI może później grupować i priorytetyzować zgłoszenia, ale
usunięcie drogiego ogłoszenia, blokada konta i decyzja finansowa
pozostają działaniem człowieka.

# 18. Spory i zwroty

## Jak działa to dla użytkowniczki

Po dostawie kupująca ma określony czas, domyślnie 3 dni, aby
zaakceptować rzecz albo zgłosić problem.

Zakup rzeczy używanej nie obejmuje zwykłego zwrotu z powodu zmiany
zdania, niewłaściwie wybranego koloru albo niedopasowania, jeżeli
wymiary i opis były prawidłowe. Okno 3 dni służy sprawdzeniu, czy
dostarczono właściwą rzecz i czy jest zgodna z ogłoszeniem. Robocza
polityka wymaga zatwierdzenia przez prawnika klientki pod kątem prawa
UAE i faktycznej roli platformy.

Możliwe powody zgłoszenia:

- rzecz nie dotarła;

- otrzymano inną rzecz;

- rzecz istotnie różni się od opisu;

- ma nieujawnione uszkodzenie;

- istnieje podejrzenie, że produkt nie jest oryginalny;

- wystąpił problem z dostawą.

Kupująca dodaje opis i zdjęcia. Sprzedawczyni może odpowiedzieć.
Administrator porównuje ogłoszenie, oryginalne zdjęcia, historię zmian i
dane kuriera, a następnie podejmuje decyzję.

W czasie sporu wypłata dla sprzedawczyni pozostaje wstrzymana.

## Robocza polityka do wpisania do regulaminu

Poniższe zasady są decyzją produktową pilota i mają zostać zapisane
prostym językiem w regulaminie oraz na ekranie zakupu. Przed
uruchomieniem prawnik klientki w UAE potwierdza ich zgodność z prawem i
właściwą rolą platformy.

- Nie ma zwykłego zwrotu używanej rzeczy z powodu zmiany zdania lub
  niedopasowania, jeżeli opis i wymiary były prawidłowe.

- Kupująca ma 3 dni od potwierdzonego doręczenia na zgłoszenie istotnego
  problemu.

- Zgłoszenie wymaga wskazania powodu oraz, gdy to możliwe, zdjęć lub
  nagrania.

- Otwarcie sporu wstrzymuje wypłatę do czasu decyzji administratora.

- Administrator może odrzucić zgłoszenie, przyznać częściowy refund,
  pełny refund albo nakazać najpierw odesłanie rzeczy.

- Ekran decyzji jednoznacznie wskazuje, kto płaci za przesyłkę zwrotną i
  czy koszt zostanie potrącony z refundu.

- Refund po wymaganym zwrocie uruchamia się dopiero po potwierdzeniu
  powrotu rzeczy, chyba że administrator wybierze udokumentowany wyjątek
  refund bez zwrotu.

- Ostateczny termin, wyjątki oraz obowiązkowe prawa konsumenta
  zatwierdza prawnik UAE; aplikacja nie może obiecywać szerszego
  wyłączenia odpowiedzialności niż pozwala prawo.

## Jak realizuje to system

- Proof of delivery uruchamia licznik czasu.

- Otwarty spór automatycznie ustawia wypłatę jako held.

- Administrator może poprosić obie strony o dodatkowe dowody.

- Decyzja może oznaczać wypłatę sprzedawczyni, pełny lub częściowy
  refund albo zwrot rzeczy przed refundem.

- Panel ma osobne akcje Zamów zwrot rzeczy i Wykonaj refund, z
  potwierdzeniem kwoty oraz nieodwracalności operacji.

- Metoda zwrotu: home_pickup \| dropoff_point \| no_return_required.

- Koszt zwrotu jest wyceniany przed potwierdzeniem i zapisany w
  zamówieniu.

- Konfiguracja określa, kto pokrywa koszt w zależności od
  rozstrzygnięcia. Rekomendacja robocza: przy uznanej istotnej
  niezgodności koszt ponosi strona odpowiedzialna albo platforma zgodnie
  z regulaminem; przy nieuznanym roszczeniu nie powstaje bezpłatna
  przesyłka zwrotna.

- Regulamin i ekran decyzji muszą jasno pokazywać, czy zwrot logistyczny
  jest bezpłatny, potrącany z refundu czy obciąża sprzedającą/platformę.

- Integracja kurierska ma obsługiwać reverse logistics, etykietę/QR,
  odbiór domowy, punkt drop-off, tracking oraz proof of return delivery,
  jeśli zapewnia je operator.

- Aramex ma w UAE sieć punktów Pick & Drop używanych m.in. do zwrotów;
  przed wyborem należy potwierdzić w umowie dostępność, cennik i API dla
  modelu C2C: [<u>Aramex Pick &
  Drop</u>](https://www.aramex.com/ae/en/services-solutions/pick-and-drop).

- Każda decyzja wymaga uzasadnienia i pozostawia ślad audytowy.

# 18A. Chargeback kartowy — osobny proces

## Co trafia do regulaminu

Chargeback nie jest zwykłym sporem zgłoszonym w aplikacji. Jest
formalnym zakwestionowaniem transakcji przez posiadaczkę karty w jej
banku i może rozpocząć się długo po dostawie oraz po wypłacie
sprzedawczyni. Regulamin płatności i regulamin sprzedających,
zatwierdzone przez prawnika, mają wyjaśniać:

- obowiązek współpracy i przekazania dowodów w określonym terminie;

- możliwość czasowego wstrzymania kolejnych wypłat przy otwartym
  chargebacku lub podwyższonym ryzyku;

- zasady rezerwy finansowej platformy;

- czy i na jakiej podstawie przegrany chargeback może utworzyć ujemne
  saldo sprzedawczyni albo zostać potrącony z przyszłych wypłat;

- odpowiedzialność za opłaty operatora i różnice kursowe;

- możliwość ograniczenia konta przy powtarzających się chargebackach lub
  oszustwie.

Platforma nie może obiecywać, że zawsze odzyska pieniądze od
sprzedawczyni. Zasady obciążenia, potrącenia i rezerwy muszą być zgodne
z umową Tap lub innego operatora oraz prawem UAE.

## Co buduje Claude Code

- Oddzielną maszynę stanów: card_dispute_opened, evidence_required,
  evidence_submitted, under_review, won, lost, dispute_released i
  chargeback_debited.

- Odbiór i weryfikację właściwych webhooków lub plików rozliczeniowych
  operatora. Zdarzenie chargebacku nie może być obsługiwane jako zwykły
  refund.

- Powiązanie chargebacku z płatnością, zamówieniem, kupującą,
  sprzedawczynią, payoutem i tenantem.

- Automatyczne oznaczenie transakcji do kontroli oraz regułę
  wstrzymującą kolejne wypłaty, gdy konfiguracja ryzyka tego wymaga.

- Pakiet dowodowy zawierający snapshot ogłoszenia, oryginalne zdjęcia,
  tracking, proof of pickup/delivery, akceptację, wiadomości, historię
  refundów oraz dziennik zdarzeń.

- Termin na dostarczenie dowodów, przypomnienia i eskalację do
  administratora.

- Osobną kolejkę Chargebacki w panelu, z kwotą ryzyka, terminem, etapem,
  wymaganymi dowodami i decyzją operatora.

- Rejestr finansowy pokazujący: pierwotną płatność, prowizję, wypłatę
  sprzedawczyni, kwotę wstrzymaną, opłatę dispute/chargeback, odzyskaną
  kwotę i stratę platformy.

- Idempotentną obsługę ponowionych zdarzeń i codzienną rekonsyliację.

Dokumentacja Tap wskazuje, że disputes pomniejszają payout, a późniejszy
wynik może pojawić się jako dispute_release albo chargeback po dniach
lub miesiącach. Claude Code ma potwierdzić dokładne zdarzenia, formaty i
terminy dla konta marketplace klientki, a ustalenia zapisać w
docs/payments/tap-disputes-findings.md.

Przed prawdziwymi płatnościami test obejmuje także chargeback utworzony
po wcześniejszej wypłacie sprzedawczyni. System ma pokazać powstałą
ekspozycję finansową i uruchomić właściwy proces, bez kasowania historii
pierwotnej transakcji.

# 19. Panel właścicielki platformy

## Jak działa to dla właścicielki biznesu

Panel webowy pozwala prowadzić codzienną działalność bez proszenia
dewelopera o każdą zmianę.

Na stronie głównej pokazuje:

- liczbę i wartość sprzedaży;

- prowizję platformy dziennie, tygodniowo i miesięcznie;

- płatności nieudane lub oczekujące;

- wypłaty oczekujące i wstrzymane;

- przesyłki w drodze i problemy kurierskie;

- otwarte spory;

- transakcje wymagające kontroli.

Właścicielka może:

- otworzyć pełną historię zamówienia;

- zobaczyć oryginalne zdjęcia;

- przeglądać kolejkę zgłoszeń ogłoszeń, użytkowników i wiadomości;

- ukryć ogłoszenie, poprosić o dowody, przywrócić je albo ograniczyć
  konto;

- obsłużyć spór;

- obsłużyć chargeback kartowy i termin dostarczenia dowodów;

- obsłużyć reklamację zagubionej lub uszkodzonej przesyłki;

- poprosić o dodatkowe informacje;

- zablokować lub odblokować konto;

- wstrzymać wypłatę z podaniem przyczyny;

- zamówić odbiór zwracanej rzeczy albo wygenerować zwrot przez punkt
  drop-off;

- po potwierdzeniu powrotu rzeczy wykonać pełny lub częściowy refund;

- zmienić wysokość prowizji;

- zmienić próg dodatkowej weryfikacji;

- zmienić długość okna na spór;

- włączyć lub wyłączyć kategorię;

- ustawić maksymalną cenę produktu w pilocie;

- włączyć lub wyłączyć odbiór osobisty;

- pobrać podstawowy raport CSV.

## Jak realizuje to system

Panel ma role i dodatkowe zabezpieczenie logowania. Każda operacja
administratora zapisuje: kto wykonał zmianę, kiedy, czego dotyczyła,
jaka była poprzednia wartość i jaka jest nowa.

# 20. Powiadomienia i komunikacja

## Jak działa to dla użytkowniczki

System wysyła krótkie powiadomienia przy ważnych zdarzeniach:

- ktoś zapisał produkt lub jest nim zainteresowany — tylko jako zbiorcza
  informacja, bez ujawniania tożsamości przed ofertą;

- nowa oferta;

- oferta zaakceptowana lub odrzucona;

- oczekiwanie na płatność;

- płatność potwierdzona;

- termin odbioru przez kuriera;

- przesyłka odebrana;

- przesyłka dostarczona;

- koniec czasu na zgłoszenie problemu;

- otwarcie sporu;

- decyzja w sporze;

- wypłata uruchomiona i zakończona.

Najważniejsze zdarzenia pojawiają się jednocześnie:

- jako widoczny banner/toast na ekranie, jeżeli PWA jest otwarta;

- w centrum powiadomień oznaczonym ikoną dzwonka;

- jako web push, jeżeli użytkowniczka wyraziła zgodę i urządzenie je
  obsługuje;

- e-mailem przy nowej ofercie, sprzedaży, potwierdzeniu płatności,
  zmianie dostawy, sporze, refundzie i wypłacie.

- wybranym kanałem claim — e-mailem albo przez WhatsApp — gdy po
  zatwierdzeniu sprzedaży trzeba otworzyć bezpieczny link, potwierdzić
  miejsce odbioru lub zareagować na problem z payoutem;

- Oferty, kontroferty, zakup i inne bieżące zdarzenia marketplace’u
  przychodzą przede wszystkim jako in-app oraz web push po zgodzie.
  Claim payoutu jest wysyłany e-mailem albo przez WhatsApp według wyboru
  sprzedawczyni. Powiadomienia o przyjeździe kuriera i jego trasie
  wysyła zintegrowany operator kurierski; marketplace pokazuje status w
  aplikacji, ale nie dubluje automatycznie jego wiadomości WhatsApp.

Po zakupie obie strony otrzymują e-mailowe potwierdzenie z numerem
zamówienia, kwotami, metodą dostawy i dalszym krokiem. Sprzedawczyni
otrzymuje wyraźny komunikat Produkt został kupiony i opłacony —
przygotuj go do odbioru.

Wiadomości między kupującą i sprzedawczynią pozostają w aplikacji. Dane
kontaktowe nie są domyślnie ujawniane.

## Jak realizuje to system

Powiadomienia są uruchamiane przez zdarzenia domenowe.
NotificationProvider ma implementacje InApp, WebPush i Email.
WayToYouClaimNotifier wysyła claim przez wybrany kanał Email albo
WhatsApp i zapisuje zgodę, zweryfikowany adres, dostarczenie oraz
otwarcie linku. CourierProvider dostarcza statusy do aplikacji i może
sam komunikować się z użytkowniczką. Awaria kanału nie może cofnąć
płatności; wysyłki są idempotentne i ponawiane bez duplikatów.

# 21. AI Social Selling Kit

## Jak działa to dla użytkowniczki

Po publikacji sprzedawczyni może jednym przyciskiem przygotować zestaw
do udostępnienia:

- estetyczną planszę na Instagram Stories;

- krótki opis do Instagrama lub TikToka;

- wiadomość i link do WhatsApp;

- kilka wersji tekstu: prosta, elegancka i bardziej sprzedażowa.

## Jak realizuje to system

Generator korzysta wyłącznie z zatwierdzonych danych ogłoszenia i
przygotowanych zdjęć. Nie tworzy nowych cech produktu ani obietnic,
których nie podała sprzedawczyni. Funkcja może zostać dodana po
stabilnym zakupie end-to-end, jeśli nie opóźnia uruchomienia.

# 22. Architektura przygotowana do późniejszego B2B/B2B2C

## Jak działa to biznesowo

Pierwsza wersja jest marketplace’em **C2C**: osoba prywatna sprzedaje
osobie prywatnej. W przyszłości ten sam silnik może obsługiwać
dystrybutorów lub wersje white-label.

Dla osoby prywatnej:

- platforma pobiera 10% prowizji;

- sprzedawczyni otrzymuje 90%.

Dla dystrybutora w przyszłości:

- 100% wartości produktu może trafić do dystrybutora;

- platforma zarabia na osobnej opłacie wdrożeniowej i miesięcznej
  licencji;

- produkty mogą być importowane zbiorczo.

Umowa licencyjna pomiędzy wearto.you a dystrybutorem jest relacją
**B2B**. Jeżeli dystrybutor sprzedaje następnie swój stock klientce
końcowej przez ten sam silnik, sprzedaż detaliczna jest **B2C**, a cały
model można opisać jako **B2B2C**. Dokument nie zakłada późniejszej
zmiany C2C na zwykły sklep należący do platformy; przygotowuje silnik do
równoległej obsługi C2C oraz licencjonowanych kanałów B2B/B2B2C.

## Jak realizuje to system

- Od początku istnieje tabela tenants.

- Domyślnym tenantem dla C2C jest wearto_you.

- Produkty, użytkownicy, transakcje, płatności, przesyłki i spory mają
  tenant_id.

- Konfiguracja prowizji należy do tenanta.

- W pierwszej wersji interfejs pokazuje wyłącznie C2C.

- Rozdzielenie danych i uprawnień musi działać od początku, żeby
  późniejsze B2B/B2B2C nie wymagało przebudowy bazy.

# 23. Technologia

## Jak działa to biznesowo

Pierwsza wersja będzie **Progressive Web App (PWA)** zaprojektowaną
przede wszystkim na telefon. Można ją otworzyć z linku i dodać do ekranu
głównego jak aplikację. Po instalacji otrzymuje własną ikonę i otwiera
się w samodzielnym oknie bez typowego paska przeglądarki. Pozwala to
wystartować szybciej bez oczekiwania na publikację w sklepach Apple i
Google.

Ten sam kod ma umożliwić późniejsze przygotowanie aplikacji natywnej.

PWA wystarcza do wykonania i przesyłania zdjęć, użycia mikrofonu,
dodania aplikacji do ekranu głównego i obsługi pełnego pilota. Aplikacja
natywna ma później przewagę przy bardziej zaawansowanym aparacie
działającym w czasie rzeczywistym, obróbce obrazu na urządzeniu,
stabilniejszych powiadomieniach i integracjach systemowych. Nie jest
jednak potrzebna do sprawdzenia modelu biznesowego.

## Jak realizuje to system

- frontend: React Native + Expo, web/PWA;

- backend: Node.js + TypeScript;

- baza danych: PostgreSQL;

- storage zdjęć: rozwiązanie zgodne z S3;

- API: standardowe REST API;

- płatności i dostawa za adapterami, aby można było wymienić dostawcę;

- monitoring błędów oraz logi bez danych wrażliwych;

- testy automatyczne dla płatności, rezerwacji, statusów i prowizji.

Stos ma być popularny i czytelny dla kolejnego dewelopera.

## Wymagania PWA dla Claude Code

PWA nie oznacza wyłącznie strony dopasowanej do małego ekranu. Wersja
MVP musi zawierać:

- poprawny manifest aplikacji z nazwą, ikonami, kolorem tła i trybem
  standalone;

- bezpieczne działanie przez HTTPS;

- możliwość dodania aplikacji do ekranu głównego na iOS i Androidzie;

- ekran lub krótką instrukcję instalacji dopasowaną do urządzenia;

- service worker i kontrolowane buforowanie statycznych elementów
  interfejsu;

- czytelny ekran offline zamiast pustej strony;

- zachowanie rozpoczętego szkicu ogłoszenia przy chwilowej utracie
  internetu;

- możliwość wykonania lub wybrania zdjęcia przez mobilną przeglądarkę;

- responsywne obrazy i kompresję, aby aplikacja działała dobrze w sieci
  mobilnej;

- web push tam, gdzie pozwala na to system i przeglądarka, oraz e-mail
  jako niezawodny kanał zapasowy;

- poprawne deep linki prowadzące z wiadomości bezpośrednio do produktu,
  zamówienia lub sporu;

- aktualizację nowej wersji bez pozostawiania użytkowniczki na
  uszkodzonym, starym cache’u.

Płatność, finalne potwierdzenie zamówienia i operacje pieniężne zawsze
wymagają połączenia z backendem. Tryb offline nie może udawać, że zakup
został zakończony.

## Obowiązkowe przygotowanie do aplikacji natywnej iOS i Android

PWA jest pierwszym kanałem publikacji, ale kod konsumenckiego
marketplace’u ma od początku powstawać jako uniwersalna aplikacja
**Expo + React Native + React Native Web**. Późniejsze wydanie w App
Store i Google Play nie może wymagać stworzenia drugiego frontendu ani
skopiowania logiki biznesowej.

Wspólne dla web, iOS i Android pozostają:

- ekrany feedu, produktu, profilu, wystawiania, ofert, zamówień i
  sporów;

- design tokens, typografia, kolory i większość komponentów interfejsu;

- modele danych, walidacja formularzy i kalkulacja ceny/prowizji;

- klient REST API i obsługa neutralnych statusów;

- logika sesji, uprawnień, błędów i analityki;

- integracje backendowe z AI, PaymentProvider, wayto.you i
  CourierProvider.

Funkcje zależne od platformy umieszcza się za małymi interfejsami, np.
CameraService, MediaPicker, VoiceRecorder, NotificationService,
SecureStorage, DeepLinkService i PaymentUI. W MVP mają implementację
webową; później otrzymają implementację iOS/Android. Komponenty oraz
ekrany nie mogą bezpośrednio używać window, document, DOM, service
workera ani webowego \<input type="file"\> bez warstwy platformowej.

Webowa implementacja zdjęć może używać \<input type="file"\>, natomiast
aplikacja natywna użyje aparatu i biblioteki zdjęć przez Expo. Web push
i service worker pozostają tylko w PWA; natywne powiadomienia użyją
APNs/FCM przez zatwierdzoną usługę. Sesja w aplikacji natywnej ma
korzystać z bezpiecznego storage urządzenia, a nie z webowego local
storage.

Płatność kartą, Apple Pay i Google Pay mogą mieć inny ekran lub SDK na
webie i w aplikacji natywnej, ale używają tego samego backendowego
PaymentProvider, tych samych zamówień i tych samych zasad splitu,
wypłaty oraz refundu. Kod nie może zakładać, że odpowiedź operatora
zawsze wraca przez przekierowanie przeglądarki.

Panel właścicielki pozostaje osobną aplikacją webową. Nie trzeba budować
jego wersji natywnej.

## Struktura kodu przygotowana do obu kanałów

Preferowana organizacja monorepo:

- apps/marketplace — uniwersalna aplikacja Expo uruchamiana jako
  web/PWA, a później iOS/Android;

- apps/admin — prosty panel właścicielki przeznaczony na web;

- apps/api — backend Node.js;

- packages/domain — wspólne modele, statusy i reguły biznesowe;

- packages/api-client — klient REST API;

- packages/ui — design tokens i współdzielone komponenty;

- packages/platform — interfejsy oraz implementacje web/iOS/Android;

- docs — dokumentacja i runbook.

W pipeline CI wersja webowa musi być budowana przy każdej zmianie.
Dodatkowo wykonywany jest okresowy test kompilacji Expo dla iOS i
Android, nawet jeśli aplikacje nie są jeszcze publikowane. Test ma
wcześnie wykryć zależność od przeglądarki, która uniemożliwiłaby
późniejsze wydanie natywne.

Przy przekazaniu projektu dokumentacja wskazuje:

- które elementy są już wspólne;

- które implementacje natywne trzeba jeszcze dodać;

- jak skonfigurować identyfikatory aplikacji, podpisywanie,
  powiadomienia i deep linki;

- jakie konta Apple Developer i Google Play Console musi założyć
  klientka;

- jakie dodatkowe testy i zgody sklepów są potrzebne przed publikacją.

# 23A. Koszt uruchomienia i miesięcznego działania

## Jak właścicielka ma czytać koszty

Koszty trzeba rozdzielić na cztery grupy. Dzięki temu właścicielka nie
pomyli rachunku za utrzymanie aplikacji z prowizją od sprzedaży ani z
dostawą opłacaną przez kupującą.

1.  **Stałe koszty platformy** — serwer, baza, domena i podstawowe
    wiadomości e-mail.

2.  **Koszty zależne od użycia** — AI do zdjęć, tekstu, głosu i
    wymiarów, dodatkowa przestrzeń na zdjęcia oraz weryfikacja
    tożsamości.

3.  **Koszty jednej transakcji** — opłata Tap Payments, ewentualna
    opłata wayto.you i refund/chargeback.

4.  **Koszty operacyjne** — kurier, prawnik, licencje oraz ewentualna
    pomoc dewelopera po przekazaniu projektu.

Wszystkie kwoty poniżej są budżetem roboczym dla małego pilota, a nie
ofertą handlową dostawców. Przed podpisaniem umowy właścicielka
otrzymuje arkusz z aktualną ofertą Tap, wybranego dostawcy AI, kuriera i
hostingu.

## Stałe rachunki techniczne

| **Pozycja**                              | **Budżet pilota**                                         | **Za co płacimy**                                                                                                                                                                                                                              |
|------------------------------------------|-----------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Render — API i baza PostgreSQL           | około 50–150 AED/mies.                                    | Działający całą dobę serwer aplikacji i baza. Aktualny mały zestaw Render może zaczynać się w okolicy 13 USD miesięcznie; większy plan zespołowy lub mocniejszy serwer podniesie koszt. Darmowego serwera nie używać do działającej sprzedaży. |
| Hosting PWA                              | 0 AED na początku                                         | Statyczna część PWA może działać bez osobnej opłaty w limicie Render, Vercel albo Cloudflare Pages.                                                                                                                                            |
| Zdjęcia — Cloudflare R2                  | zwykle 0–20 AED/mies. w pilocie                           | Oryginały i wersje po obróbce. Po wykorzystaniu darmowych limitów R2 standardowe przechowywanie kosztuje 0,015 USD za GB miesięcznie; liczba operacji jest rozliczana osobno.                                                                  |
| E-maile transakcyjne — Resend            | 0 AED do 3 000 wiadomości/mies.; potem około 74 AED/mies. | Potwierdzenia logowania, zakupu, sprzedaży, sporu i refundu. Plan Pro 50 000 wiadomości kosztuje obecnie 20 USD miesięcznie.                                                                                                                   |
| Monitoring błędów i podstawowa analityka | 0 AED na początku                                         | Sentry/PostHog w darmowym limicie; po wzroście ruchu przejście na płatny plan.                                                                                                                                                                 |
| Domena                                   | około 50–250 AED/rok                                      | Cena zależy od końcówki i rejestratora. Certyfikat HTTPS powinien być bezpłatny w hostingu.                                                                                                                                                    |

**Orientacyjny stały koszt techniczny małego pilota:** około **50–250
AED miesięcznie**, zanim doliczymy AI, płatności i ewentualne utrzymanie
przez dewelopera.

## AI i usługi naliczane według użycia

| **Pozycja**                                                               | **Jak liczyć**                                                                                                               | **Decyzja dla MVP**                                                                                                                                                                                                                                |
|---------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Jednolite tło i wycięcie przedmiotu                                       | Cena za każde przetworzone zdjęcie albo pakiet kredytów. Przy 100 ogłoszeniach po 8 zdjęć system przetwarza około 800 zdjęć. | Claude Code ma porównać remove.bg, Photoroom API, Cloudflare Images oraz własny model segmentacji i wpisać realną cenę za 1 zdjęcie przed wyborem. Ustawić miesięczny limit kosztu.                                                                |
| AI do opisu, condition check, odczytu metek i wyszukania podobnego modelu | Cena zależy od liczby zdjęć oraz zapytań do modelu.                                                                          | W pilocie przyjąć rezerwę około 100–500 AED/mies. i mierzyć koszt każdego ogłoszenia. Wyniki zapisywać w panelu właścicielki.                                                                                                                      |
| Nagrywanie głosowe i transkrypcja                                         | Cena za minutę nagrania.                                                                                                     | Krótkie nagrania; limit czasu i jedno ponowienie. Koszt pokazywać jako część kosztu ogłoszenia.                                                                                                                                                    |
| SizeAI / dostawca pomiaru i dopasowania                                   | Najczęściej abonament, cena za wywołanie API albo indywidualna oferta.                                                       | Nie wpisywać zmyślonej ceny. Najpierw potwierdzić dokładną nazwę produktu, możliwość pomiaru ubrań, butów i torebek, warunki API oraz ofertę. Jeśli cena jest wysoka, MVP korzysta z prowadzonego pomiaru ze znacznikiem i ręcznego zatwierdzenia. |
| Dodatkowa weryfikacja tożsamości powyżej 500 USD                          | Cena za każdą rozpoczętą lub zakończoną weryfikację, zależnie od dostawcy.                                                   | Wybrać dostawcę obsługującego UAE i uzyskać ofertę. Koszt nie może być ukryty w ogólnym hostingu.                                                                                                                                                  |

Panel właścicielki pokazuje co miesiąc: liczbę nowych ogłoszeń, liczbę
przetworzonych zdjęć, koszt AI łącznie, średni koszt AI jednego
ogłoszenia i wykorzystanie limitu budżetu. Po osiągnięciu limitu system
nie generuje niekontrolowanych kosztów: przełącza się na tańszy wariant
albo prosi administratora o zgodę.

## Tap Payments, wayto.you i koszt jednej sprzedaży

Tap Payments nie należy wpisywać jako stałej, niepotwierdzonej wartości
procentowej. Dla konkretnego podmiotu w UAE trzeba uzyskać pisemną
ofertę obejmującą:

- opłatę aktywacyjną i ewentualny abonament;

- procent oraz stałą opłatę dla lokalnej i zagranicznej karty;

- Apple Pay;

- Google Pay;

- Tap Connect i split payment;

- opłatę za refund, chargeback i wcześniejszą wypłatę;

- VAT od opłat operatora;

- harmonogram i minimalny próg wypłat.

W kalkulacji rentowności każdej transakcji system zapisuje osobno: cenę
rzeczy, prowizję platformy, opłatę Tap, opłatę wayto.you, koszt promocji
pokryty przez platformę, refund i faktyczny przychód netto platformy.
Nie zakładać, że całe 10% jest zyskiem — z tej kwoty mogą zostać
potrącone koszty operatorów.

**Przykład do rozmowy biznesowej, nie cennik Tap:** przy rzeczy za 100
AED kupująca płaci 100 AED plus dostawę. Z ceny rzeczy 10 AED jest
prowizją brutto platformy, a 90 AED kwotą sprzedawczyni. Jeżeli Tap
pobierze opłatę, rzeczywisty przychód platformy będzie niższy niż 10
AED. Dokładne miejsce potrącenia i podział netto ma wynikać z umowy Tap
Connect oraz sprawdzonego flow wayto.you.

Koszt wayto.you również ma osobną pozycję: 0 AED, jeśli użycie jest
wewnętrznie bezpłatne, albo rzeczywistą opłatę za instrukcję/odbiór,
jeśli taki model zostanie przyjęty. Claude Code najpierw sprawdza
repozytorium i konfigurację produkcyjną wayto.you; dokument finansowy
nie może zakładać kosztu ani bezpłatności bez potwierdzenia.

## Kurier, zwroty i utrzymanie przez człowieka

- **Dostawa zakupu:** płaci kupująca. Cena kuriera jest pokazana osobno
  przed płatnością i nie jest przychodem platformy. Platforma może
  pobrać ją technicznie i przekazać operatorowi, ale księgowo ma
  pozostać osobną pozycją.

- **Odbiór osobisty:** koszt dostawy wynosi 0 AED.

- **Zwrot po uznanym sporze:** regulamin wskazuje, czy koszt ponosi
  sprzedająca, platforma albo zostaje odjęty od refundu. Właścicielka
  powinna mieć małą rezerwę na wyjątkowe przesyłki zwrotne.

- **Bieżąca opieka techniczna po przekazaniu:** nie jest częścią
  rachunków Render. Nawet przy modelu build & handoff klientka powinna
  wskazać dewelopera dyżurnego i budżetować co najmniej kilka godzin
  miesięcznie na aktualizacje bezpieczeństwa, kontrolę logów, kopie
  zapasowe i awarie. Miesięczny koszt = liczba godzin × stawka
  przejmującego dewelopera.

- **Prawo, licencje i księgowość:** traktować jako osobny koszt
  założenia i działalności, nie koszt AI ani hostingu.

## Miesięczne podsumowanie dla właścicielki

Co miesiąc panel lub prosty raport ma pokazać pięć liczb:

1.  Stałe rachunki techniczne.

2.  Koszt AI i weryfikacji.

3.  Opłaty Tap i wayto.you.

4.  Koszty dostaw pokryte wyjątkowo przez platformę.

5.  Przychód z prowizji minus wszystkie powyższe koszty, czyli realny
    wynik platformy.

# 24. Najważniejsze dane w systemie

Minimalne obszary bazy:

- tenants — właściciel i konfiguracja danego marketplace’u;

- users — konta kupujących, sprzedających i administratorów;

- identity_verifications — poziom i status weryfikacji;

- seller_payout_profiles — bezpieczne powiązanie sprzedawcy z wypłatą;

- listings — ogłoszenia;

- listing_images — zdjęcia oryginalne i poprawione;

- listing_measurements — wymiary rzeczy;

- offers — negocjacje;

- orders — zamówienia i zapisane kwoty;

- payments — neutralne płatności z polem operatora i referencją
  dostawcy;

- payouts — wypłaty dla sprzedawców;

- shipments — odbiór, transport i dostawa;

- shipping_claims — zagubienie, uszkodzenie, reklamacja i odszkodowanie
  kuriera;

- disputes — spory;

- dispute_evidence — zdjęcia i dokumenty stron;

- chargebacks — spory kartowe, terminy, wynik i ekspozycja finansowa;

- chargeback_evidence — pakiety dowodowe dla operatora;

- reports — zgłoszenia ogłoszeń, kont i wiadomości;

- moderation_actions — decyzje, blokady, odwołania i audyt moderacji;

- policy_documents — opublikowane wersje regulaminów i polityk;

- policy_acceptances — kto, kiedy i którą wersję zaakceptował;

- privacy_requests — dostęp, eksport, poprawienie i usunięcie danych;

- messages — rozmowy dotyczące ogłoszenia lub zamówienia;

- reviews — oceny po zakończonej transakcji;

- webhook_events — komunikaty od Tap, wayto.you, KYC i kuriera;

- audit_events — historia ważnych zmian.

Kwoty pieniężne są zapisywane w najmniejszej jednostce waluty, bez
zaokrągleń zmiennoprzecinkowych.

# 25. Czytelne statusy zamówienia

Użytkowniczka widzi prosty opis, natomiast system przechowuje osobne
statusy płatności, dostawy, sporu i wypłaty.

Przykładowa oś użytkowniczki:

1.  Zarezerwowano.

2.  Płatność potwierdzona.

3.  Oczekiwanie na kuriera.

4.  Odebrano od sprzedawczyni.

5.  W drodze.

6.  Dostarczono.

7.  Oczekiwanie na akceptację.

8.  Sprzedaż zatwierdzona albo spór otwarty.

9.  Wypłata w trakcie.

10. Transakcja zakończona.

System nie powinien przechowywać całego procesu w jednym polu statusu.
Płatność może być udana, dostawa opóźniona, a wypłata wstrzymana — te
informacje muszą istnieć oddzielnie.

# 26. Bezpieczeństwo i prywatność

- Każde wejście do API jest sprawdzane po stronie serwera.

- Użytkowniczka widzi tylko dane, do których ma prawo.

- Każde zapytanie uwzględnia tenant_id.

- Sekrety i klucze API nie trafiają do kodu ani repozytorium.

- Webhooki mają weryfikowane podpisy.

- Zdjęcia prywatne i dowody sporu są dostępne przez czasowe,
  zabezpieczone linki.

- Panel administratora ma dodatkowe zabezpieczenie logowania.

- Dokumenty KYC pozostają u dostawcy weryfikacji, jeśli nie ma
  konieczności ich kopiowania.

- Pełne dane karty nie są przechowywane przez wearto.you.

- Użytkowniczka może uzyskać kopię swoich danych i poprosić o ich
  usunięcie w zakresie dozwolonym prawem.

## UAE Personal Data Protection Law — warunek produkcji

Przed uruchomieniem klientka i prawnik potwierdzają zgodność z UAE
Personal Data Protection Law, Federal Decree-Law No. 45 of 2021, oraz
innymi przepisami właściwymi dla miejsca rejestracji firmy. Sam fakt
użycia hostingu poza UAE nie jest automatycznie uznawany w tym
dokumencie za dozwolony ani zakazany. Trzeba udokumentować lokalizacje
danych, podstawę transferu transgranicznego i wymagane zabezpieczenia
umowne.

Claude Code przygotowuje docs/legal-ops/data-protection-checklist.md,
ale nie udaje prawnika i nie wpisuje samodzielnie ostatecznych podstaw
prawnych. Dokument zawiera:

- mapę danych: co zbieramy, od kogo, w jakim celu, gdzie przechowujemy i
  komu udostępniamy;

- listę administratorów, procesorów i podprocesorów, w tym Render, bazę,
  storage, e-mail, AI, KYC, Tap, wayto.you i kuriera;

- kraj lub region przetwarzania oraz planowany mechanizm transferu poza
  UAE do potwierdzenia przez prawnika;

- okres retencji dla konta, zdjęć, szkiców, zamówień, sporów, raportów
  nadużyć, chargebacków, logów i kopii zapasowych;

- procedurę dostępu, poprawienia, eksportu, ograniczenia i usunięcia
  danych;

- procedurę naruszenia danych, właściciela decyzji, kontakty i wymagane
  terminy do uzupełnienia przez prawnika;

- ocenę potrzeby DPIA i DPO;

- zasady zgód marketingowych oddzielonych od komunikacji transakcyjnej;

- listę umów przetwarzania i konfiguracji prywatności wymaganych u
  dostawców.

W kodzie mają istnieć: rejestr zgód z wersją tekstu, panel żądania
kopii/usunięcia danych, konfigurowalne okresy retencji, bezpieczne
usuwanie lub anonimizacja, filtrowanie danych w logach, kontrola dostępu
do dowodów oraz audyt operacji administratora. Usunięcie konta nie może
kasować danych, które muszą pozostać do rozliczenia transakcji, sporu,
chargebacku, obowiązku księgowego albo prawnego; takie dane są
ograniczane i usuwane po upływie właściwego okresu.

# 27. Zakres pierwszej wersji

Pierwsza wersja obejmuje:

1.  Logowanie Google/Apple oraz obowiązkową, wersjonowaną akceptację
    regulaminu przy utworzeniu konta.

2.  Profile kupującej i sprzedawczyni oraz osobne Seller Terms przed
    pierwszym ogłoszeniem.

3.  Wystawienie jednej rzeczy ze zdjęciami.

4.  Magic Listing, obróbkę zdjęć, metkę, kontrolę kompletności i
    Condition Check.

5.  Pomiary rzeczy ze zdjęcia z użyciem znacznika.

6.  Pomiary butów, wkładek i kozaków w odpowiednich kategoriach.

7.  Prosty Fit Confidence.

8.  AI Personal Shopper w wersji beta: wymiary + okazja + budżet +
    zdjęcie referencyjne.

9.  Smart Price w formie sugestii.

10. Feed, wyszukiwanie i filtry.

11. Oferty, automatyczne minimum i kontrpropozycje.

12. Atomowe zabezpieczenie jednej sztuki.

13. Płatność Tap Payments kartą, Apple Pay lub Google Pay oraz routing
    wayto.you. Wypłata bankowa przez Lean jako opcja, jeśli potwierdzona
    produkcyjnie — nie warunek uruchomienia MVP.

14. Podział 90/10 uruchamiany po zatwierdzeniu sprzedaży.

15. Dodatkową weryfikację obu stron powyżej 500 USD.

16. Integrację z jednym kurierem w UAE.

17. Odbiór osobisty z kodem.

18. Okno akceptacji, spory i refundy.

19. Zgłaszanie zakazanych przedmiotów i nadużyć oraz kolejkę moderacji.

20. Osobny proces chargebacku kartowego i podstawową rezerwę/ekspozycję
    finansową.

21. Proces zagubionej lub uszkodzonej przesyłki i reklamację kurierską.

22. Wygasanie niepotwierdzonych ogłoszeń.

23. Panel właścicielki.

24. Powiadomienia podstawowe.

# 28. Funkcje kolejnych etapów

## Po pierwszych realnych transakcjach

- płatne podbicia ogłoszeń;

- konta Pro i sklepiki;

- statystyki sprzedawcy;

- rozbudowany AI Social Selling Kit;

- wyszukiwanie konwersacyjne;

- agent wsparcia;

- opcjonalna rozszerzona ochrona;

- szybsza wypłata za dodatkową opłatą, jeśli pozwoli na to operator;

- ręczna usługa eksperckiej oceny produktów premium.

## Po pozyskaniu klienta B2B

- panel dystrybutora;

- import CSV/Excel;

- mapowanie kolumn zapamiętywane dla danego klienta;

- zdjęcia z ZIP dopasowywane po SKU lub pobierane z URL;

- ekran podglądu i poprawy przed publikacją;

- model płatniczy 100/0;

- opłata wdrożeniowa i miesięczna licencja;

- bezpośrednie integracje z wybranymi systemami magazynowymi;

- white-label.

# 29. Kolejność budowy

## Krok 0 — izolowany projekt w obecnym repozytorium TEP i przygotowanie do transferu

- Na etapie developmentu utwórz samodzielny katalog projektu
  wearto-you-marketplace w obecnym prywatnym repozytorium GitHub TEP,
  zgodnie z aktualną decyzją właścicielki.

- Projekt musi być technicznie odizolowany: nie może importować kodu
  TEP, Quantum ani rdzenia wayto.you, korzystać z ich sekretów ani
  wymagać ich struktury katalogów. wayto.you pozostaje osobną usługą
  wywoływaną przez adapter API.

- Wewnątrz katalogu wearto-you-marketplace zastosuj samodzielne monorepo
  z apps/marketplace, apps/admin, apps/api, packages/domain,
  packages/api-client, packages/ui, packages/platform,
  packages/integrations oraz docs. Projekt ma mieć własne manifesty,
  lockfile, CI i instrukcję uruchomienia.

- Przy przekazaniu klientowi katalog zostanie wyodrębniony wraz z własną
  historią do nowego prywatnego repozytorium na jego osobnym koncie
  GitHub. Nie wolno przenieść historii, plików, issue, sekretów ani
  własności intelektualnej innych projektów z repozytorium TEP.

- Przed transferem może pozostać prywatna, oczyszczona kopia bazowego
  frameworku przeznaczona wyłącznie do rozwoju Quanthio B2B/B2B2C,
  zgodnie z umową licencyjną. Kopia nie zawiera danych klienta, jego
  sekretów, produkcyjnej konfiguracji, brandingu ani kodu rdzenia
  wayto.you.

- Skonfiguruj środowiska local, preview/sandbox i production z
  oddzielnymi sekretami.

- Dodaj ochronę głównej gałęzi, przegląd pull requestów, automatyczne
  testy i blokadę przypadkowego commitowania sekretów.

- Claude Code tworzy docs/handoff/repository-extraction.md: opis
  bezpiecznego wyodrębnienia projektu do nowego repozytorium klienta,
  kontroli historii Git, skanowania sekretów i zachowania prawnie
  dozwolonej kopii B2B/B2B2C. Nie wykonuje transferu bez osobnej zgody
  właścicielki.

## Hosting pilota

Proponowany prosty wariant:

- frontend Expo Web/PWA jako statyczny serwis na Render, Vercel lub
  Cloudflare Pages;

- backend Node.js jako Web Service na Render;

- PostgreSQL na Render, Supabase albo Neon;

- zdjęcia w Cloudflare R2 lub S3;

- domena i HTTPS podłączone do środowiska produkcyjnego;

- preview deployment dla każdej ważnej zmiany.

Jeżeli wybieramy Render, należy utworzyć konto/projekt, połączyć go z
nowym repozytorium GitHub, dodać Web Service dla API i Static Site dla
PWA oraz ustawić sekrety poza kodem. Konto produkcyjne i billing powinny
należeć do firmy klientki albo mieć zaplanowany transfer.

## Krok 1 — sprawdzenie repozytorium wayto.you i integracji

Przed kodowaniem wykonawca opisuje:

- faktyczne możliwości wayto.you;

- status sandbox/produkcja;

- sposób splitu 90/10;

- claim flow i jego czas ważności;

- dostępne SDK lub przykłady;

- brakujące konta, zgody i klucze;

- możliwość delayed payout i refundu w Tap.

- możliwość bezpiecznego logowania przez wayto.you oraz standard,
  którego używa, bez zakładania że taka funkcja istnieje;

- możliwość użycia istniejącego konta i kluczy Tap sandbox z
  wcześniejszego pilota, bez kopiowania sekretów do kodu;

- aktualne testowe karty i zasady sandbox Tap z oficjalnej dokumentacji.

- pisemną odpowiedź Tap, czy Marketplace w UAE dopuszcza prywatnych
  sprzedawców C2C bez trade license, oraz pełną listę ich KYC;

- zakres Tap delayed split/payout po akceptacji dostawy i
  odpowiedzialność za chargeback;

- dwie role Lean: Pay by Bank kupującej i bankowy payout sprzedawczyni,
  wraz ze statusem sandbox/produkcja;

- mapę zatwierdzonego przepływu Tap/Lean + wayto.you bez portfela
  użytkownika, wraz z kosztami, zależnościami i potwierdzonymi
  capabilities;

- potwierdzone kanały claim flow wayto.you: wybrany e-mail albo
  WhatsApp; web push marketplace’u i komunikacja kurierska są osobnymi
  kanałami.

## Krok 2 — jeden pełny przepływ testowy

Najpierw powstaje najprostsza wersja:

- logowanie;

- ręczne ogłoszenie;

- rezerwacja jednej sztuki;

- płatność w sandboxie;

- zamówienie kuriera przez adapter;

- potwierdzenie dostawy;

- akceptacja;

- prawidłowe obliczenie 90/10;

- bezpieczna testowa instrukcja wypłaty;

- podstawowy podgląd w panelu.

Demo dla klientki działa wyłącznie na kluczach Tap sandbox i wyraźnie
pokazuje pasek TRYB TESTOWY — brak prawdziwej płatności. Testowe dane
karty pochodzą z aktualnej dokumentacji Tap, nie są wymyślane ani
używane w produkcji. Przykład testowej integracji Tap opisuje m.in.
kartę sandbox i rozdzielenie test/live keys: [<u>Tap — test
integration</u>](https://developers.tap.company/docs/magento). Claude
Code ma najpierw sprawdzić, czy można bezpiecznie użyć istniejącego
konta sandbox z pilota wayto.you; jeśli nie, konfiguruje osobne
środowisko testowe.

## Krok 3 — zabezpieczenia operacyjne

- weryfikacja powyżej 500 USD;

- negocjacje;

- odbiór osobisty;

- spory i refundy;

- zakazane przedmioty, zgłoszenia i kolejka moderacji;

- chargeback kartowy jako osobny proces wraz z testem przypadku po
  payoutcie;

- zagubienie/uszkodzenie paczki i reklamacja kurierska;

- wygasanie niepotwierdzonych ogłoszeń;

- checklista prawna, licencyjna, UAE PDPL i Tap onboarding;

- odporność na powtórzone webhooki;

- dziennik audytowy;

- kontrola rozbieżności płatności.

## Krok 4 — funkcje AI

- Magic Listing;

- zdjęcia;

- metka;

- kontrola kompletności;

- Condition Check;

- pomiary ubrań i butów;

- Fit Confidence;

- AI Personal Shopper w wersji beta;

- Smart Price;

- wyszukanie prawdopodobnego modelu.

Najpierw jedna testowa rzecz musi przejść bezpiecznie przez cały proces.
Dopiero potem rozszerzamy liczbę funkcji i dopracowujemy automatyzację.

# 30. Test akceptacyjny MVP

MVP jest gotowe do pilota, gdy:

1.  Sprzedawczyni może zalogować się, zweryfikować i opublikować
    produkt.

2.  AI przygotowuje propozycję ogłoszenia, którą użytkowniczka może
    poprawić.

3.  Oryginalne zdjęcia pozostają dostępne jako dowód.

4.  Tego samego produktu nie mogą kupić dwie osoby.

5.  Tap albo produkcyjnie zatwierdzony Lean Pay by Bank potwierdza
    płatność przez bezpieczny webhook; w MVP karta Tap pozostaje
    obowiązkową ścieżką bazową.

6.  Powyżej 500 USD obie osoby muszą przejść dodatkową weryfikację.

7.  Platforma może zamówić kuriera i otrzymać kolejne statusy dostawy.

8.  Odbiór osobisty wymaga akceptacji kupującej, wyświetlenia
    jednorazowego QR i zeskanowania go przez sprzedawczynię.
    Sześciocyfrowy kod umożliwia zakończenie procesu, gdy skanowanie nie
    działa.

9.  Wypłata nie rusza przed akceptacją lub końcem okna na spór.

10. Aktywny spór automatycznie wstrzymuje wypłatę.

11. Prowizja 10% i wypłata 90% są prawidłowo zapisane.

12. Powtórzony komunikat z Tap lub wayto.you nie wykonuje operacji drugi
    raz.

13. Administrator może rozstrzygnąć spór i uruchomić właściwy proces
    refundu lub wypłaty.

14. Właścicielka może zmienić prowizję, próg weryfikacji, kategorie i
    czas na spór bez zmiany kodu.

15. PWA można dodać do ekranu głównego, zachowuje szkic ogłoszenia przy
    utracie sieci i nie potwierdza operacji pieniężnej offline.

16. AI Personal Shopper potrafi połączyć okazję, budżet, wymiary i
    zdjęcie referencyjne z aktywnymi ofertami oraz wyjaśnić wynik.

17. Ubranie, buty i torebka mają odrębne checklisty zdjęć oraz nie mogą
    zostać opublikowane bez wymaganych ujęć lub jawnego oznaczenia braku
    elementu.

18. Użytkowniczka może nagrać opis, zobaczyć transkrypcję, poprawić
    tekst i dodać własną adnotację do każdego pola AI.

19. Obróbka tła nie zmienia produktu ani nie usuwa wad; oryginał i
    wersja przygotowana pozostają powiązane.

20. Przy uznanym sporze administrator może zamówić reverse logistics,
    śledzić powrót rzeczy i dopiero następnie wykonać idempotentny
    refund.

21. Sprzedawczyni otrzymuje nowe oferty i bieżące zdarzenia jako
    in-app/web push. Po zatwierdzeniu sprzedaży claim payoutu przychodzi
    wybranym przez nią kanałem: e-mailem albo przez WhatsApp. Status
    jest zawsze dostępny w aplikacji.

22. Demo Tap działa w wyraźnie oznaczonym sandboxie i nie może
    przypadkowo użyć kluczy produkcyjnych.

23. Pełny scenariusz zakupu, splitu, wypłaty i refundu przechodzi na
    MockPaymentProvider bez ładowania SDK Tap.

24. Wyłączenie wymaganej capability operatora blokuje checkout zamiast
    uruchamiać niezatwierdzony ręczny przepływ pieniędzy.

25. Pełny scenariusz dostawy przechodzi na MockCourierProvider, a kod
    zamówienia nie zna statusów konkretnego kuriera.

26. Konsumencki frontend powstaje w Expo/React Native Web, a webowy
    build PWA przechodzi automatycznie w CI.

27. Okresowy test kompilacji iOS i Android przechodzi bez przepisywania
    ekranów i reguł biznesowych; brak kont sklepów nie blokuje MVP
    webowego.

28. Bezpośrednie użycie API przeglądarki jest ograniczone do
    implementacji webowych w packages/platform, a panel administratora
    pozostaje osobnym frontendem webowym.

29. Użytkowniczka może zgłosić ogłoszenie, konto lub wiadomość, a
    administrator widzi zgłoszenie w kolejce i może udokumentować
    decyzję.

30. Symulowany chargeback po wcześniejszym payoutcie tworzy osobną
    sprawę, pokazuje ekspozycję platformy, zabezpiecza dowody i nie jest
    mylony z refundem.

31. Zagubiona albo uszkodzona przesyłka wstrzymuje payout, tworzy
    reklamację kurierską i zapisuje wynik finansowy.

32. Niepotwierdzone ogłoszenie wygasa według konfiguracji i może zostać
    bezpiecznie przywrócone.

33. Produkcyjny checkout pozostaje wyłączony, dopóki checklista go-live
    nie potwierdzi licencji, dokumentów prawnych, konta Tap/wayto.you i
    kuriera.

34. Po pierwszym logowaniu użytkowniczka nie może utworzyć aktywnego
    konta bez jawnej akceptacji aktualnego regulaminu i potwierdzenia
    wieku; zgoda marketingowa jest oddzielna, dobrowolna i domyślnie
    wyłączona.

35. System zapisuje zaakceptowaną wersję dokumentu i potrafi wymagać
    ponownej akceptacji po istotnej zmianie bez utraty konta lub
    historii transakcji.

36. Na kwalifikującym się urządzeniu i koncie testowym checkout pokazuje
    Google Pay; na urządzeniu lub koncie bez tej capability ukrywa
    metodę i pozostawia kartę. Analogiczny test obejmuje Apple Pay.

37. Przed produkcją istnieje pisemne potwierdzenie Tap, czy prywatna
    osoba bez trade license może zostać odbiorcą splitu i payoutu w
    modelu C2C UAE.

38. Lean Pay by Bank i Lean Payout są dwiema osobnymi capabilities;
    wyłączenie jednej nie ukrywa ani nie uruchamia automatycznie
    drugiej.

39. Pełny scenariusz potwierdza zatwierdzony model: brak portfela
    użytkownika, instrukcja payoutu adresowana do zweryfikowanej osoby,
    claim e-mail/WhatsApp, wybór obsługiwanego miejsca odbioru i
    automatyczny split 90/10 wykonywany przez operatora.

40. Interfejs nie pokazuje krypto, PayPal ani wypłaty na kartę jako
    miejsca odbioru, jeśli nie ma osobnej, produkcyjnie potwierdzonej
    integracji; krypto i PayPal pozostają poza zakresem produktu.

41. Użytkowniczka może zarządzać zgodą na web push i wybrać e-mail albo
    WhatsApp dla claimów. Zmiana kanału jest audytowana; komunikaty
    kurierskie pozostają po stronie kuriera.

# 30A. Dokumenty prawne i operacyjne przed uruchomieniem

## Co powinno znaleźć się w regulaminach i politykach

Claude Code tworzy w docs/legal-ops/ czytelne **szablony robocze** z
oznaczeniem DO WERYFIKACJI PRZEZ PRAWNIKA UAE. Nie tworzy ostatecznej
porady prawnej. Właścicielka i prawnik zatwierdzają treść, a aplikacja
przechowuje numer wersji dokumentu zaakceptowanego przez każdą
użytkowniczkę.

Wymagane dokumenty:

- terms-of-use-draft.md — zasady korzystania, role platformy, konta,
  wiek użytkowników, blokady i odpowiedzialność;

- seller-terms-draft.md — obowiązki sprzedawczyni, prawdziwość
  ogłoszenia, pakowanie, KYC, wypłaty, rezerwa i chargeback;

- buyer-terms-draft.md — płatność, trzydniowe okno na problem, brak
  zwykłego zwrotu z powodu zmiany zdania oraz sposób składania sporu;

- prohibited-items-policy-draft.md — zakazane przedmioty, zgłoszenia,
  moderacja i odwołania;

- shipping-and-returns-policy-draft.md — dostawa, odbiór osobisty,
  utrata/uszkodzenie, zwrot rzeczy, koszt przesyłki zwrotnej i refund;

- payments-payouts-chargebacks-policy-draft.md — prowizja,
  Tap/wayto.you, moment payoutu, refund i chargeback;

- privacy-policy-draft.md — UAE PDPL, dane, dostawcy, transfery,
  retencja i prawa osoby;

- community-guidelines-draft.md — komunikacja, zakaz nękania, oszustwa i
  obchodzenia platformy.

Jeżeli prawnik zmieni regułę biznesową, Claude Code aktualizuje
konfigurację i testy tak, aby zachowanie aplikacji było zgodne z
opublikowanym dokumentem. Tekst regulaminu i kod nie mogą opisywać dwóch
różnych terminów, progów lub zasad refundu.

## Licencja i zgody biznesowe

Przed produkcją klientka potwierdza z właściwym organem licencyjnym,
prawnikiem i Tap Payments, jaka działalność oraz licencja są wymagane
dla wielosprzedawcowego marketplace’u C2C w UAE. Nie zakładać, że zwykła
licencja e-commerce jest wystarczająca. Roboczo należy sprawdzić
właściwą aktywność typu portal/marketplace oraz ewentualne dodatkowe
wymagania wynikające z przepływu pieniędzy.

Claude Code tworzy docs/go-live-checklist.md z właścicielem, statusem,
datą i dowodem potwierdzenia dla: licencji, opinii prawnej, regulaminów,
UAE PDPL, konta bankowego, Tap produkcyjnego, wayto.you produkcyjnego,
kuriera, domeny, e-maili, monitoringu, kopii zapasowych i kontaktów
awaryjnych. Produkcyjny checkout ma feature flagę
PRODUCTION_PAYMENTS_ENABLED=false i nie może zostać włączony, dopóki
upoważniona osoba nie potwierdzi gotowości. Sama flaga nie zastępuje
formalnych zgód.

## Dokumenty i informacje wymagane przez Tap Payments

Poniższą listę klientka przygotowuje dla Tap i przekazuje bezpośrednio
przez kanał wskazany przez Tap. Marketplace nie tworzy ekranu do
gromadzenia paszportów, Emirates ID, MOA ani wyciągów bankowych i nie
przechowuje ich we własnej bazie.

**Required Documents:**

- Emirates ID wszystkich udziałowców posiadających więcej niż 25%
  udziałów;

- strona paszportu i strona wizy właściciela oraz udziałowców;

- Trade License i MOA — Memorandum of Association;

- Power of Attorney, jeśli dotyczy;

- dane firmowego konta bankowego: welcome letter albo wyciąg bankowy z
  ostatnich 3 miesięcy;

- działająca strona internetowa lub konto w social media;

- ważny VAT Certificate, jeśli obowiązkowy; jeżeli firma go nie posiada,
  należy wyraźnie potwierdzić to w odpowiedzi do Tap;

- jasny i możliwy do zweryfikowania adres działalności potwierdzony
  jednym z dokumentów: Ejari/Tenancy Contract, utility bill, bank
  statement albo inny oficjalny dokument pokazujący pełny adres.

**Dane kontaktowe do potwierdzenia:**

- adres e-mail;

- numer telefonu komórkowego.

**Dane potrzebne Tap do przygotowania oferty handlowej:**

- przewidywany Monthly Sales Volume w AED;

- Average Transaction Value w AED;

- używana platforma: własna aplikacja Expo/React Native Web z backendem
  Node.js i integracją przez API;

- preferowany wariant: website integration, a nie payment links,
  ponieważ marketplace wymaga kontrolowanego checkoutu, webhooków,
  splitu, payoutu i refundów. Payment links mogą służyć wyłącznie do
  prostego testu, jeśli Tap je zaproponuje, ale nie zastępują docelowej
  integracji marketplace.

**Kontakt w Tap Payments:**

- Belal Mohamad;

- e-mail: b.aboalqumsan@tap.company;

- numer telefonu nie został przekazany — nie wolno go wymyślać; należy
  uzupełnić po otrzymaniu od Belala.

Claude Code ma przygotować docs/payments/tap-onboarding-checklist.md
zawierający powyższą listę, pola owner, status, date_confirmed i notes,
ale bez skanów dokumentów. Ma także przygotować stronę demonstracyjną
lub staging URL, opis modelu C2C, diagram przepływu 90/10 i listę
wymaganych capabilities do rozmowy z Tap. Nie wysyła dokumentów, nie
kontaktuje się z Tap i nie uruchamia produkcji samodzielnie.

W wiadomości do Belala/Tap należy obowiązkowo zapytać: Czy Tap
Marketplace w UAE obsługuje osoby prywatne sprzedające okazjonalnie
własne używane przedmioty bez trade license? Jeżeli tak: jakie KYC,
dokumenty, rachunek bankowy i limity obowiązują; czy każda osoba
otrzymuje destination/retailer ID; czy split można wykonać dopiero po
dostawie i akceptacji; oraz jak Tap obsługuje refund i chargeback po
payoutcie.

## Wiek i KYC użytkowników

Regulamin musi określić minimalny wiek użytkowniczki; rekomendacja
robocza dla pilota to 18+. Każda sprzedawczyni przechodzi KYC wymagane
przez operatora przed pierwszą wypłatą, niezależnie od dodatkowej
kontroli transakcji powyżej 500 USD. Claude Code zapisuje wyłącznie
wynik, poziom, datę i identyfikator sprawy KYC, jeżeli dokumenty mogą
pozostać u wyspecjalizowanego dostawcy. Nieudane KYC blokuje payout i
kieruje transakcję do kolejki administratora zgodnie z procedurą
uzgodnioną z Tap.

# 31. Dokumentacja i przekazanie klientowi

Przed oddaniem projektu należy przygotować:

- instrukcję uruchomienia projektu;

- opis architektury prostym językiem;

- dokument z ustaleniami API wayto.you;

- instrukcję postępowania przy nieudanej płatności, wypłacie i
  refundzie;

- instrukcję obsługi problemów kurierskich;

- instrukcję prowadzenia sporu;

- listę zmiennych środowiskowych bez prawdziwych sekretów;

- opis wdrożenia i migracji bazy;

- listę zewnętrznych kont, kosztów i właścicieli;

- potwierdzenie właściwej licencji dla marketplace’u/portalu C2C,
  zweryfikowane przez klientkę z organem licencyjnym i prawnikiem;

- checklistę UAE PDPL, dostawców danych i transferów transgranicznych;

- checklistę onboardingu Tap wraz ze statusem wymaganych dokumentów, bez
  kopiowania dokumentów tożsamości do repozytorium;

- listę znanych ograniczeń pierwszej wersji;

- procedurę przeniesienia repozytorium, hostingu, bazy, storage i
  domeny;

- procedurę wyodrębnienia kodu wearto.you z repozytorium TEP do czystego
  repozytorium klienta bez historii i plików innych projektów oraz
  procedurę pozostawienia prawnie dozwolonej kopii bazowego frameworku
  B2B/B2B2C;

- sesję przekazania panelu administratora i logów.

Tap Payments merchant account oraz tożsamość wayto.you powinny od
początku należeć do firmy klienta. Projekt ma być zbudowany w
popularnych technologiach i możliwy do przejęcia przez dowolnego
kompetentnego dewelopera.

# 32. Polecenie dla Claude Code

1.  Najpierw przeczytaj cały dokument oraz przejrzyj istniejące
    repozytorium.

2.  Nie rozpoczynaj od budowy wszystkich ekranów.

3.  Przygotuj raport z faktycznych możliwości Tap Payments, Lean
    Technologies i wayto.you. Rozdziel checkout, settlement/payout oraz
    routing tożsamości.

4.  Wyraźnie oznacz informacje potwierdzone w kodzie oraz brakujące
    zgody lub dane.

5.  Zaproponuj małe etapy prowadzące do jednego działającego przepływu
    end-to-end.

6.  Integracje umieść za prostymi adapterami. Tap i Lean implementują
    potwierdzone role PaymentCollectionProvider lub SettlementProvider;
    zatwierdzony WayToYouRoutingProvider implementuje adresowanie do
    osoby, claim i dwustronne bezpieczeństwo; pierwszy kurier
    implementuje CourierProvider. Nie używaj obiektów ani statusów
    dostawców poza adapterami.

7.  Jeżeli dostępna jest tylko wersja testowa integracji, użyj jawnie
    oznaczonego sandboxu i opisz warunek uruchomienia produkcji.

8.  Nie symuluj prawdziwego escrow zwykłym polem salda w bazie.

9.  Zachowaj czytelność kodu, dokumentację i testy najważniejszych
    operacji.

10. Przy każdej propozycji technicznej wyjaśnij jednym zdaniem jej
    znaczenie biznesowe dla właścicielki platformy.

11. Przed zaakceptowaniem modułu płatności uruchom ten sam test
    end-to-end na TapPaymentProvider w sandboxie i na
    MockPaymentProvider; przed zaakceptowaniem dostawy wykonaj
    analogiczny test na adapterze rzeczywistym i mocku.

12. Udokumentuj, które pliki należy dodać, aby w przyszłości zastąpić
    Tap albo kuriera, oraz potwierdź, że nie wymaga to zmian w modułach
    ogłoszeń, ofert, zamówień, sporów i panelu.

13. PWA buduj jako uniwersalną aplikację Expo/React Native Web. Logikę i
    komponenty współdziel z przyszłym iOS/Android, a funkcje aparatu,
    plików, powiadomień, secure storage, deep linków i payment UI ukryj
    za interfejsami platformowymi.

14. Dodaj do CI webowy build PWA oraz nieprodukcyjny test kompilacji
    iOS/Android. Nie publikuj aplikacji natywnej w MVP, ale nie akceptuj
    zależności webowej, która uniemożliwi jej późniejsze zbudowanie.

15. Zbuduj zgłaszanie ogłoszeń, użytkowników i wiadomości, kolejkę
    moderacji, audyt decyzji i konfigurowalną politykę zakazanych
    kategorii.

16. Zbuduj chargeback jako osobny proces od sporu i refundu. Obsłuż
    zdarzenia operatora, terminy dowodów, ekspozycję po payoutcie,
    blokady ryzyka i rekonsyliację.

17. Dodaj osobny proces zagubienia/uszkodzenia przesyłki z reklamacją
    kurierską, dowodami, wstrzymaniem payoutu i wynikiem finansowym.

18. Dodaj wygasanie niepotwierdzonych ogłoszeń oraz bezpieczne
    przywrócenie po potwierdzeniu dostępności.

19. Przygotuj szablony dokumentów w docs/legal-ops, checklistę Tap i
    checklistę go-live. Nie pisz finalnej porady prawnej, nie przechowuj
    skanów dokumentów właścicieli i nie włączaj produkcyjnych płatności
    bez zatwierdzenia upoważnionej osoby.

20. Po pierwszym logowaniu pokaż wersjonowany ekran utworzenia konta z
    wymaganym regulaminem, informacją o prywatności i potwierdzeniem
    wieku oraz osobną, dobrowolną zgodą marketingową. Zapisz akceptacje
    w policy_acceptances i obsłuż ponowną akceptację po istotnej
    zmianie.

21. Dodaj Google Pay obok karty i Apple Pay przez platformowy PaymentUI.
    Najpierw potwierdź jego aktywację w Tap dla UAE i danego kanału,
    stosuj capability detection, testuj Android/web i nie pokazuj
    niedziałającego przycisku.

22. Nie implementuj krypto ani PayPal. W materiałach wayto.you PayPal
    jest wyłącznie porównaniem modelu zamkniętego z routingiem do osoby.

23. Przed wyborem produkcyjnego splitu uzyskaj odpowiedź Tap o
    onboardingu prywatnych sprzedawców C2C bez trade license. Do tego
    czasu używaj wyłącznie sandboxu i MockSettlementProvider.

24. Dla Lean oddziel Pay by Bank kupującej od Payout sprzedawczyni. Nie
    zakładaj, że dostęp do jednego API oznacza dostęp do drugiego.

25. Zbuduj in-app/web push dla bieżących zdarzeń marketplace’u. Dla
    payout claim sprzedawczyni wybiera e-mail albo WhatsApp, a
    WayToYouClaimNotifier realizuje ten wybór. Nie dubluj wiadomości
    kurierskich — CourierProvider aktualizuje status, a własne
    potwierdzenia wysyła operator kurierski.

26. Projekt rozwijaj jako izolowany katalog wearto-you-marketplace w
    obecnym repozytorium TEP. Przygotuj bezpieczny plan późniejszego
    wyodrębnienia do nowego konta GitHub klienta i pozostawienia
    wyłącznie prawnie dozwolonej kopii B2B/B2B2C.

27. Po Kroku 1 pokaż, jak zatwierdzony model Tap/Lean + wayto.you
    realizuje: brak portfela użytkownika, pieniądze podążające za
    tożsamością, claim e-mail/WhatsApp, dwustronne bezpieczeństwo i
    automatyczny split 90/10. Wskaż każdą capability wymagającą jeszcze
    potwierdzenia produkcyjnego.
