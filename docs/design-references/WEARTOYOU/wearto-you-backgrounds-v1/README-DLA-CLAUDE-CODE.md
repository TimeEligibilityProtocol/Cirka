# wearto.you — zatwierdzony pakiet teł produktowych

Ten katalog zawiera pięć spójnych teł przeznaczonych do zdjęć ubrań, butów i torebek w marketplace wearto.you.

## Wspólny standard

- Format: pionowy 4:5.
- Rozdzielczość plików głównych: 2400 × 3000 px.
- Bazowy kolor każdego tła: `#E9D8C2`.
- Kolor cieni: ciepły brąz `#8B6A55` o małej przezroczystości.
- Pliki PNG są wzorcami jakości. Aplikacja może tworzyć z nich lżejsze wersje WebP/AVIF do wyświetlania na telefonie.
- Tła zostały przygotowane specjalnie dla wearto.you. Nie pochodzą z biblioteki stockowej.

## Pliki i zastosowanie

1. `01-solid-beige.png` — domyślne, całkowicie jednolite tło. Stosować także do zdjęć metek, wad i detali.
2. `02-soft-halo.png` — bardzo delikatne studyjne przyciemnienie na obrzeżach, środek pozostaje czysty.
3. `03-studio-shadow.png` — miękki cień studyjny i delikatne zaznaczenie powierzchni pod produktem.
4. `04-architectural-arch.png` — subtelny łuk architektoniczny, przeznaczony głównie dla zdjęć głównych i produktów premium.
5. `05-palm-shadow.png` — delikatny cień palmy po lewej stronie, z wolnym środkiem na produkt.

Podgląd całego kompletu znajduje się w `00-preview-all-backgrounds.jpg`.

## Co ma zrobić Claude Code

1. Umieścić pliki w wydzielonym katalogu zasobów, np. `assets/product-backgrounds/`.
2. Wczytać konfigurację z `backgrounds.json`, zamiast wpisywać nazwy plików w wielu miejscach kodu.
3. Ustawić `01-solid-beige` jako wariant domyślny.
4. Pozwolić sprzedającej wybrać jedno z pięciu teł dla zdjęcia głównego.
5. Dla zdjęć metek, wad, numerów seryjnych i innych dowodów używać wyłącznie tła jednolitego albo pozostawić oryginał, jeśli wycięcie mogłoby zmniejszyć wiarygodność zdjęcia.
6. Zapisać przy zdjęciu `background_preset_id`, wersję modułu wycinającego oraz powiązanie z niezmienionym oryginałem.
7. Zachować osobno:
   - zdjęcie oryginalne;
   - maskę wycięcia;
   - wersję przygotowaną do publikacji.
8. Nigdy nie nadpisywać oryginału i nie usuwać wad produktu.
9. Nie generować nowego tła przez AI dla każdego ogłoszenia. AI służy do rozpoznania i wycięcia produktu; aplikacja podkłada jeden z gotowych presetów z tego katalogu.
10. Utworzyć zoptymalizowane wersje ekranowe przy budowaniu lub wysyłaniu zdjęcia, ale zachować pliki 2400 × 3000 px jako wzorce.

## Dwa tryby aparatu w PWA

### Tryb 1 — tło widoczne na żywo

Aplikacja analizuje podgląd z kamery, wycina produkt i pokazuje wybrany preset za produktem jeszcze przed wykonaniem zdjęcia. Po wykonaniu zdjęcia dokładniejszy etap przetwarzania poprawia maskę i pokazuje wynik do zatwierdzenia.

### Tryb 2 — zwykłe zdjęcie i obróbka po wykonaniu

Jeżeli telefon, aparat lub przeglądarka nie zapewniają stabilnego podglądu, aplikacja wyświetla komunikat: „Dla najlepszego efektu zrób zwykłe zdjęcie. Tło przygotujemy automatycznie.” Następnie system wycina przedmiot z gotowego zdjęcia i podkłada ten sam wybrany preset.

Oba tryby muszą prowadzić do takiego samego wyglądu końcowego. Użytkowniczka może również ręcznie przełączyć tryb.

## Automatyczny fallback

Podgląd na żywo należy wyłączyć dla konkretnej sesji, jeśli występuje co najmniej jeden z problemów:

- niestabilna lub migocząca maska;
- bardzo niska płynność podglądu;
- brak pewnego rozpoznania granic produktu;
- zbyt słabe światło;
- zbyt niska rozdzielczość obrazu;
- błąd dostępu do kamery albo brak obsługi wymaganej funkcji w przeglądarce.

Fallback nie jest błędem użytkowniczki. Powinien wyglądać jak naturalna pomoc aplikacji, a nie komunikat techniczny.

## Nienaruszalność produktu

Dozwolone są wyłącznie:

- usunięcie przypadkowego tła;
- podłożenie wybranego presetu;
- poprawa kadru;
- ostrożna korekta ekspozycji i balansu bieli;
- dodanie cienia znajdującego się wyłącznie na tle.

System nie może zmieniać koloru, kształtu, faktury, przeszyć, logo, okuć ani proporcji produktu. Nie może usuwać plam, zarysowań, przetarć, zmechaceń ani innych śladów użytkowania. Jeśli maska narusza produkt, aplikacja pokazuje oryginał i pozwala poprawić maskę albo opublikować oryginalne zdjęcie.

## Interfejs techniczny

Moduł powinien być wymienny i oddzielony od konkretnego dostawcy AI, np. przez interfejs `ProductImageProcessor`. Dzięki temu można zmienić usługę wycinania tła bez przebudowy wystawiania ogłoszeń.

Minimalne operacje modułu:

- sprawdzenie jakości obrazu;
- segmentacja produktu;
- ocena stabilności maski w trybie live;
- kompozycja produktu z presetem;
- zapis oryginału, maski i wersji wynikowej;
- zwrot przyczyny przełączenia na tryb obróbki po wykonaniu zdjęcia.

Przed wdrożeniem zewnętrznego API należy porównać jakość wycinania cienkich pasków torebek, obcasów, koronek i luźnych krawędzi tkanin, cenę pojedynczej operacji oraz zasady przetwarzania danych.
