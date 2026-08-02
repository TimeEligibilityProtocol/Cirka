# Photo background processing — live preview with automatic fallback

Status: approved product decision, not yet implemented. Extends spec section 4 ("Automatyczna obróbka zdjęć") with an explicit fallback mechanism.

## The decision

There is **one background-processing module**, not two separate features. It runs in two modes:

1. **Live mode.** While framing the shot, the app recognizes the item and shows the approved cream background in real time. After capture, it refines edges and adds the shadow.
2. **Capture-then-process mode.** If live preview is slow, flickers, or misreads the item, the app suggests: *"For the best result, take a plain photo. We'll prepare the background automatically."* The same module then, on the already-captured photo:
   - cuts out the item;
   - applies the identical cream background preset;
   - adjusts the crop;
   - adds the same soft shadow;
   - shows the result for approval before it's used.

Both modes must converge on the **same final listing look** — the feed must never reveal which mode a given photo went through. This is the point: one shared processing module with two entry points (a faster real-time path and a more thorough post-capture path), not two independently maintained systems.

## Automatic mode selection

The app selects a mode automatically based on runtime signals, and offers a manual override (a woman may prefer to just take a plain photo even if her phone supports live preview).

Signals that should trigger falling back to capture-then-process mode:
- too low a live preview frame rate;
- mask flicker / instability frame to frame;
- unclear/low-confidence item edges;
- poor lighting;
- too-low camera resolution;
- insufficient device processing power.

## Implementation notes for Claude Code

- Model this as **one** `ImageProcessor`-style module (see spec section 4's `ImageProcessor`) with two call paths: `processLive(frame) -> preview` (cheap, called per-frame during framing) and `processCaptured(photo) -> finalResult` (thorough, called once after shutter or once a plain photo is chosen). Both paths must produce output compatible with the same downstream approval screen and the same stored "original vs. processed" pair.
- Mode selection is a small `capabilityCheck()`-style function evaluated at framing start (and re-evaluated on signal degradation while framing): checks live FPS, mask stability, edge confidence, light level, capture resolution, and a device-tier heuristic. If any threshold isn't met, it silently proposes the plain-photo path instead of failing.
- Manual override: a visible toggle/link ("Take a plain photo instead") must be available even when live mode is running normally.
- This belongs in `apps/marketplace` (the camera/listing-creation flow) and, if the actual segmentation/background call is a third-party API or library (per spec section 4's guidance to compare at least two vendor options), the vendor call itself should sit behind a small interface in `packages/platform` so swapping providers later doesn't touch screen code.
- Not yet built — this file records the approved mechanism ahead of implementation, per the "documented before coded" pattern used for other product decisions in this repo.

---

# Przetwarzanie tła zdjęcia — podgląd na żywo z automatycznym fallbackiem (PL)

Status: zatwierdzona decyzja produktowa, jeszcze niezaimplementowana. Rozszerza sekcję 4 specyfikacji ("Automatyczna obróbka zdjęć") o jawny mechanizm fallbacku.

## Decyzja

Istnieje **jeden moduł obróbki tła**, nie dwie osobne funkcje. Działa w dwóch trybach:

1. **Tryb na żywo.** Podczas kadrowania aplikacja rozpoznaje przedmiot i od razu pokazuje zatwierdzone kremowe tło. Po wykonaniu zdjęcia dopracowuje krawędzie i dodaje cień.
2. **Zwykłe zdjęcie + automatyczna obróbka.** Jeżeli podgląd na żywo działa wolno, migocze albo źle rozpoznaje przedmiot, aplikacja proponuje: *"Dla najlepszego efektu zrób zwykłe zdjęcie. Tło przygotujemy automatycznie."* Ten sam moduł, na już wykonanym zdjęciu:
   - wycina przedmiot;
   - podkłada identyczny kremowy preset tła;
   - dopasowuje kadr;
   - dodaje ten sam delikatny cień;
   - pokazuje wynik do zatwierdzenia przed użyciem.

Oba tryby muszą prowadzić do **identycznego końcowego wyglądu ogłoszenia** — feed nigdy nie może zdradzać, przez który tryb przeszło dane zdjęcie. O to chodzi: jeden współdzielony moduł obróbki z dwoma punktami wejścia (szybsza ścieżka w czasie rzeczywistym i dokładniejsza ścieżka po wykonaniu zdjęcia), a nie dwa niezależnie utrzymywane systemy.

## Automatyczny dobór trybu

Aplikacja dobiera tryb automatycznie na podstawie sygnałów działania, z możliwością ręcznego przełączenia (kobieta może wolić zrobić zwykłe zdjęcie, nawet jeśli jej telefon obsługuje tło na żywo).

Sygnały, które powinny wywołać przejście do trybu zwykłe zdjęcie + obróbka:
- zbyt mała liczba klatek na sekundę podglądu na żywo;
- migotanie / niestabilność maski między klatkami;
- niewyraźne / niepewne krawędzie przedmiotu;
- słabe światło;
- zbyt niska rozdzielczość przechwytywania;
- niewystarczająca moc obliczeniowa urządzenia.

## Uwagi implementacyjne dla Claude Code

- Zamodelować to jako **jeden** moduł typu `ImageProcessor` (patrz `ImageProcessor` z sekcji 4 specyfikacji) z dwiema ścieżkami wywołania: `processLive(frame) -> preview` (tania, wywoływana per klatka podczas kadrowania) oraz `processCaptured(photo) -> finalResult` (dokładna, wywoływana raz po zdjęciu albo po wybraniu zwykłego zdjęcia). Obie ścieżki muszą dawać wynik zgodny z tym samym ekranem zatwierdzenia i tą samą zapisaną parą "oryginał vs. przetworzone".
- Dobór trybu to niewielka funkcja typu `capabilityCheck()` oceniana na starcie kadrowania (i ponownie przy degradacji sygnału w trakcie kadrowania): sprawdza FPS na żywo, stabilność maski, pewność krawędzi, poziom światła, rozdzielczość przechwytywania i heurystykę klasy urządzenia. Jeśli którykolwiek próg nie jest spełniony, po cichu proponuje ścieżkę zwykłego zdjęcia zamiast się wywalać.
- Ręczne przełączenie: widoczny przełącznik/link ("Zrób zwykłe zdjęcie zamiast tego") musi być dostępny nawet gdy tryb na żywo działa poprawnie.
- To należy do `apps/marketplace` (przepływ kamery/tworzenia ogłoszenia), a jeśli faktyczne wywołanie segmentacji/tła to zewnętrzne API lub biblioteka (zgodnie z sekcją 4 specyfikacji, porównać co najmniej dwie opcje dostawców), samo wywołanie dostawcy powinno siedzieć za małym interfejsem w `packages/platform`, żeby późniejsza zmiana dostawcy nie dotykała kodu ekranów.
- Jeszcze niezbudowane — ten plik zapisuje zatwierdzony mechanizm przed implementacją, zgodnie ze wzorcem "udokumentowane przed napisaniem kodu" stosowanym dla innych decyzji produktowych w tym repo.
