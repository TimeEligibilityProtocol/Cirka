# wearto.you — zatwierdzone zdjęcia demonstracyjne produktów

Ten pakiet zastępuje przypadkowe zdjęcia używane wcześniej w prototypie. Zawiera osiem oddzielnych, spójnych zdjęć demonstracyjnych: sukienkę, marynarkę, bluzkę, dwie pary butów i trzy torebki.

## Najważniejsze polecenie

Claude Code ma używać zdjęć z tego pakietu we wszystkich ekranach demonstracyjnych wearto.you. Nie wolno pobierać losowych zdjęć z internetu, Unsplash, placeholderów ani generować nowych produktów bez osobnego polecenia.

Zdjęcia są fikcyjnymi produktami demonstracyjnymi. Nie przedstawiają rzeczywistych ofert, marek ani zapasów magazynowych.

## Struktura plików

- `images/masters/` — pliki PNG 2400 × 3000 px, przeznaczone jako wzorce wysokiej jakości.
- `images/web/` — zoptymalizowane pliki WebP 1200 × 1500 px, przeznaczone do prototypu PWA.
- `demo-products.json` — dane demonstracyjnych ogłoszeń i ścieżki do zdjęć.
- `00-preview-all-products.jpg` — podgląd całego zestawu.

## Lista produktów

1. Kremowa plisowana sukienka.
2. Karmelowa dopasowana marynarka.
3. Kremowe czółenka slingback z brązowym noskiem.
4. Bordowo-brązowe skórzane mokasyny.
5. Karmelowa skórzana torebka z uchwytem.
6. Kremowa pikowana torebka na łańcuszku.
7. Bordowo-brązowa zamszowa torebka na ramię.
8. Kremowa bluzka o jedwabistym wykończeniu.

## Zasady wdrożenia

1. Skopiować katalog `images/web/` do publicznych zasobów aplikacji, np. `public/demo-products/`.
2. Wczytywać produkty z `demo-products.json` w seedzie bazy lub lokalnym trybie demonstracyjnym.
3. Zachować proporcje 4:5 i stosować `object-fit: cover` bez rozciągania obrazu.
4. Na karcie feedu pokazywać pełny produkt; nie kadrować uchwytów torebek, obcasów, rękawów ani dołu sukienki.
5. Te same pliki wykorzystywać konsekwentnie na feedzie, stronie produktu, liście zapisanych ofert i w przykładowym procesie zakupu.
6. Nie dodawać do zdjęć tekstów, cen, logo ani znaków wodnych. Informacje mają znajdować się w warstwie interfejsu.
7. Nie przedstawiać tych produktów jako markowych. Nazwa marki w danych demonstracyjnych ma wartość `Unbranded`.
8. Ceny i opisy w `demo-products.json` są wyłącznie przykładowe i można je zmienić w panelu lub seedzie bez zmiany plików graficznych.
9. W środowisku produkcyjnym zdjęcia demonstracyjne nie mogą mieszać się z prawdziwymi ogłoszeniami użytkowniczek.

## Spójność z modułem zdjęć

Zdjęcia pokazują oczekiwany wygląd końcowy po wycięciu przedmiotu i podłożeniu zatwierdzonego ciepłego tła. Są referencją wizualną dla modułu `ProductImageProcessor`:

- jeden produkt na zdjęciu;
- cały produkt widoczny;
- ciepłe, neutralne tło;
- miękkie światło i naturalny cień;
- brak dekoracji rozpraszających uwagę;
- prawdziwa faktura materiału;
- brak zmiany wyglądu, konstrukcji lub stanu przedmiotu.

Claude Code nie ma odtwarzać produktu generatywnie. Przy prawdziwych ogłoszeniach system wycina i komponuje rzeczywiste zdjęcie sprzedającej, zachowując oryginał jako materiał dowodowy.
