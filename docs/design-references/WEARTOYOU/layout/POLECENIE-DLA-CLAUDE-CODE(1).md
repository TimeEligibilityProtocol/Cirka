# wearto.you — obowiązkowy standard zdjęć na mobile i desktop

## Polecenie

Popraw wszystkie miejsca, w których aplikacja wyświetla zdjęcia produktów. Zastosuj dokładnie wartości z tego dokumentu i z pliku `image-layout-spec.json`. Nie dobieraj proporcji, liczby kolumn, wysokości ani sposobu kadrowania według własnego uznania.

Standard obowiązuje w:

- feedzie i wynikach wyszukiwania;
- zapisanych produktach;
- profilu sprzedającej;
- stronie produktu;
- panelu ofert i zamówień;
- panelu właścicielki;
- demonstracyjnych produktach oraz przyszłych prawdziwych ogłoszeniach.

# 1. Jeden obowiązkowy format produktu

- Proporcja wszystkich głównych zdjęć: **4:5**.
- Wzorzec wysokiej jakości: **2400 × 3000 px**.
- Minimalne akceptowane zdjęcie po obróbce: **1200 × 1500 px**.
- Tło kontenera zdjęcia: `#E9D8C2`.
- Nie rozciągać zdjęcia w żadnym kierunku.
- Nie używać kwadratowych lub poziomych kart produktów.
- Aplikacja tworzy wersję 4:5 po przesłaniu zdjęcia. Oryginał pozostaje zapisany oddzielnie.

Jeżeli oryginał nie ma proporcji 4:5, moduł obróbki ma wyciąć produkt, umieścić go na zatwierdzonym tle i utworzyć wersję 4:5. Nie wolno ucinać uchwytów torebki, obcasów, rękawów, dołu sukienki ani innych części produktu.

# 2. Wersje pliku generowane przez backend

Po przetworzeniu jednego zdjęcia backend tworzy:

| Nazwa wariantu | Rozmiar | Zastosowanie |
|---|---:|---|
| `thumb` | 320 × 400 | małe listy w panelu, wiadomości, miniatury |
| `card-sm` | 480 × 600 | małe telefony i ekrany o niskiej gęstości |
| `card-md` | 640 × 800 | główny wariant kart mobile |
| `card-lg` | 800 × 1000 | tablet i karty desktop |
| `detail` | 1200 × 1500 | strona produktu |
| `detail-hd` | 1600 × 2000 | duży ekran i powiększenie |
| `master` | 2400 × 3000 | wzorzec jakości; nie ładować domyślnie w feedzie |

Format dostarczany do aplikacji: WebP. AVIF można dodać jako opcję po potwierdzeniu pełnej obsługi, ale WebP pozostaje bezpiecznym fallbackiem. Oryginał dowodowy zachować w formacie źródłowym lub bezstratnym.

Orientacyjne limity wagi, traktowane jako cele optymalizacyjne:

- `thumb`: do 50 KB;
- karta: zwykle do 120 KB;
- `detail`: zwykle do 300 KB;
- `detail-hd`: zwykle do 500 KB.

Nie obniżać jakości poniżej poziomu, przy którym przestają być widoczne faktura materiału, przeszycia albo wady.

# 3. Feed — mobile

## Telefony 320–479 px

- 2 kolumny produktów.
- Padding strony: 12 px.
- Odstęp pomiędzy kolumnami: 12 px.
- Odstęp pionowy między kartami: 20 px.
- Zdjęcie zawsze 4:5.
- Promień narożników zdjęcia: 12 px.

Przykłady rzeczywistej szerokości zdjęcia:

- viewport 360 px → zdjęcie około 162 × 203 px;
- viewport 390 px → zdjęcie około 177 × 221 px.

## Telefony 480–767 px

- nadal 2 kolumny;
- padding strony: 16 px;
- odstęp pomiędzy kolumnami: 16 px;
- odstęp pionowy: 24 px.

Nie przełączać telefonu na jedną kolumnę, chyba że użytkowniczka korzysta z powiększenia dostępności powodującego brak miejsca.

# 4. Feed — tablet i desktop

## Tablet 768–1023 px

- 3 kolumny;
- padding strony: 24 px;
- odstęp pomiędzy kolumnami: 20 px;
- odstęp pionowy: 28 px.

## Desktop 1024–1439 px

- 4 kolumny;
- padding strony: 32 px;
- odstęp pomiędzy kolumnami: 24 px;
- odstęp pionowy: 32 px.

## Duży desktop od 1440 px

- maksymalna szerokość zawartości: 1440 px;
- 4 kolumny — nie zwiększać automatycznie do 6 małych kart;
- padding wewnętrzny: 48 px;
- odstęp pomiędzy kolumnami: 24 px;
- zawartość wyśrodkowana.

Zdjęcia mają pozostać duże i eleganckie. Nie należy próbować zmieścić jak największej liczby produktów w jednym rzędzie.

# 5. Karta produktu

Kolejność:

1. zdjęcie 4:5;
2. marka — jeśli podana;
3. krótki tytuł;
4. stan produktu;
5. cena w AED.

Zasady:

- Tekstu i ceny nie nakładać na zdjęcie.
- Na zdjęciu może znajdować się wyłącznie przycisk zapisania produktu.
- Przycisk serca: 36 × 36 px na mobile, 40 × 40 px na desktopie.
- Odsunięcie serca od prawego górnego rogu: 10–12 px.
- Cała karta jest klikalna; minimalny obszar dotykowy elementów interaktywnych: 44 × 44 px.
- Skeleton podczas ładowania ma również proporcję 4:5, aby strona nie przeskakiwała.

W feedzie używać `contentFit="cover"`/`object-fit: cover` wyłącznie dlatego, że przygotowane zdjęcie ma już proporcję 4:5. Jeśli plik nie jest 4:5, najpierw należy go przetworzyć — nie ukrywać problemu agresywnym kadrowaniem w CSS.

# 6. Strona produktu — mobile

Do 767 px:

- galeria zajmuje pełną szerokość treści;
- padding po bokach strony: 16 px;
- szerokość zdjęcia: `100%` dostępnej przestrzeni;
- proporcja zdjęcia: 4:5;
- przy viewport 390 px zdjęcie ma około 358 × 448 px;
- jedno zdjęcie widoczne naraz;
- kolejne zdjęcia zmienia się poziomym przesunięciem;
- zastosować `scroll-snap`/równoważne zachowanie natywne;
- pokazać numer, np. `1 / 6`, albo małe wskaźniki pozycji;
- dotknięcie zdjęcia otwiera pełnoekranowe powiększenie;
- w powiększeniu umożliwić gest pinch-to-zoom.

Na stronie produktu używać `contentFit="contain"`/`object-fit: contain`, aby zawsze pokazać cały produkt. Ponieważ tło zdjęcia i kontenera jest takie samo, ewentualna wolna przestrzeń nie wygląda jak obca ramka.

Pod galerią na mobile znajdują się kolejno: tytuł, marka, cena, stan, opis, wymiary, dostawa/odbiór i przyciski zakupu lub negocjacji.

# 7. Strona produktu — desktop

Od 1024 px:

- maksymalna szerokość całej strony produktu: 1360 px;
- układ dwóch kolumn;
- galeria: około 60% szerokości;
- panel informacji i zakupu: około 40%;
- odstęp między kolumnami: 48–64 px;
- panel informacji jest `sticky`, z odsunięciem odpowiadającym wysokości nagłówka;
- główne zdjęcie ma proporcję 4:5 i maksymalną szerokość około 720 px;
- miniatury: 88 × 110 px;
- odstęp pomiędzy miniaturami: 12 px;
- aktywna miniatura ma cienką ramkę w kolorze burgundowo-brązowym marki;
- kliknięcie głównego zdjęcia otwiera powiększenie; kursor `zoom-in`;
- pełnoekranowe powiększenie używa wersji `detail-hd`, nie pliku z feedu.

Nie budować w MVP skomplikowanej mozaiki kilku ogromnych zdjęć obok siebie. Jedno duże zdjęcie oraz czytelne miniatury są prostsze, szybsze i wystarczają dla procesu sprzedaży jednej rzeczy.

# 8. Ładowanie i wydajność

- Pierwsze główne zdjęcie strony produktu: ładowanie priorytetowe/eager.
- Pierwsze widoczne zdjęcia feedu: normalny lub wysoki priorytet zależnie od położenia.
- Zdjęcia poza pierwszym ekranem: lazy loading.
- Stosować zestaw źródeł responsywnych, aby telefon nie pobierał pliku 2400 × 3000 px.
- W `expo-image` stosować `responsivePolicy="static"` na webie, listę źródeł o różnych szerokościach, `cachePolicy="memory-disk"`, `contentPosition="center"` oraz właściwy `contentFit`.
- Placeholder BlurHash/ThumbHash ma ten sam `contentFit` co zdjęcie docelowe, aby obraz nie przeskakiwał.
- Wirtualizowana lista nie może przez chwilę pokazywać zdjęcia poprzedniego produktu; ustawić stabilny klucz/recycling key.

# 9. Kadrowanie i integralność produktu

Automatyczne kadrowanie musi pozostawić bezpieczny margines:

- produkt nie powinien dotykać brzegu zdjęcia;
- zalecany margines: 6–10% szerokości lub wysokości kadru;
- torebka: cały uchwyt i pasek widoczne;
- buty: obydwa buty w całości, bez ucięcia czubka lub obcasa;
- sukienka/ubranie: cały wieszak i cały dół widoczne;
- zdjęcia detali oraz wad mogą być bliższe, ale nie są zdjęciem głównym.

AI nie może rozszerzać lub odtwarzać brakującego fragmentu produktu. Jeśli produkt nie mieści się w kadrze, aplikacja prosi o ponowne zdjęcie.

# 10. Dostępność

- Każde zdjęcie ma prawdziwy tekst alternatywny, np. `Burgundy suede shoulder bag, front view`.
- Nie używać nazw pliku jako `alt`.
- Przycisk serca i sterowanie galerią mają etykiety dla czytników ekranu.
- Nawigacja miniatur i powiększenia działa również z klawiatury.

# 11. Jedna współdzielona implementacja

Utworzyć współdzielone komponenty, np.:

- `ProductImage` — samo responsywne zdjęcie;
- `ProductCardImage` — zdjęcie feedu 4:5;
- `ProductGallery` — galeria strony produktu;
- `ProductImageZoom` — powiększenie.

Nie implementować innych zasad obrazu oddzielnie na każdej stronie. Wszystkie komponenty pobierają proporcje i breakpointy z jednego pliku/tokenu.

# 12. Minimalne testy

Claude Code ma wykonać testy wizualne co najmniej dla szerokości:

- 360 px;
- 390 px;
- 768 px;
- 1024 px;
- 1440 px.

Na każdej szerokości sprawdzić:

- poprawną liczbę kolumn;
- zachowanie proporcji 4:5;
- brak ucięcia produktu;
- brak rozciągnięcia zdjęcia;
- brak przesuwania layoutu podczas ładowania;
- działanie galerii i powiększenia;
- poprawne zdjęcie przy każdym produkcie — bez powtórzenia obrazu z poprzedniej karty.

# 13. Kryteria ukończenia

Zadanie nie jest zakończone, dopóki:

- feed nie działa zgodnie ze wszystkimi breakpointami;
- strona produktu nie ma właściwego układu mobile i desktop;
- każdy produkt używa właściwego wariantu obrazu;
- oryginały 2400 × 3000 px nie są ładowane w feedzie;
- Lighthouse lub równoważny pomiar nie wykazuje dużych przesunięć układu powodowanych przez zdjęcia;
- zrzuty ekranów z pięciu zatwierdzonych szerokości zostały pokazane do akceptacji.

## Referencje techniczne

- Expo Image: https://docs.expo.dev/versions/latest/sdk/image/
- Responsive images: https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/sizes

Przed implementacją sprawdzić wersję Expo używaną w repozytorium i dobrać zgodną wersję `expo-image`. Nie aktualizować całego Expo wyłącznie z powodu tego zadania.
