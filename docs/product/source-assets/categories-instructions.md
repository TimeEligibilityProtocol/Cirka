# wearto.you — poprawa kategorii produktów

## Polecenie

Usuń przypadkową, obecną strukturę kategorii i zastąp ją strukturą z pliku `categories.json` dołączonego do tego dokumentu. Nie dopisuj nowych kategorii według własnego uznania i nie pobieraj ich automatycznie z zewnętrznych stron.

Struktura została opracowana na podstawie aktualnych kategorii Ounass UAE oraz uzupełniona o pozycje potrzebne lokalnemu marketplace’owi rzeczy używanych, przede wszystkim `Abayas & Modest Wear`. Nie kopiujemy całego katalogu Ounass, ponieważ zawiera działy niepotrzebne w wearto.you, takie jak długopisy, akcesoria narciarskie czy akcesoria lifestyle.

## Główne kategorie widoczne w aplikacji

W tej kolejności:

1. Clothing
2. Shoes
3. Bags
4. Accessories

Przycisk `All` jest filtrem interfejsu, a nie kategorią zapisywaną w bazie danych.

## 1. Clothing

- Dresses
- Tops
- Pants
- Swimwear
- Beachwear
- Activewear
- Coats & Jackets
- Skirts
- Loungewear
- Knitwear
- Co-ord Sets
- Abayas & Modest Wear
- Shorts
- Lingerie
- Jeans
- Sleepwear
- Jumpsuits

## 2. Shoes

- Sneakers
- Sandals
- Mules
- Pumps
- Ballerinas
- Loafers
- Slides
- Boots
- Espadrilles
- Slippers
- Flip Flops

`Heel height` oraz `heel style` są filtrami/atrybutami buta, a nie osobnymi kategoriami. Przykładowe wartości:

- Heel height: Flat, Low, Mid, High.
- Heel style: Block, Kitten, Stiletto, Platform, Flatform, Wedge.

## 3. Bags

- Shoulder Bags
- Tote Bags
- Top-Handle Bags
- Mini Bags
- Clutches
- Crossbody Bags
- Bucket Bags
- Satchel Bags
- Backpacks
- Belt Bags
- Luggage & Travel Bags

`Bag Accessories` należy do działu Accessories, a nie Bags.

## 4. Accessories

- Fashion Jewellery
- Sunglasses
- Eyeglasses
- Wallets & Cardholders
- Wallets on Chain
- Belts
- Scarves & Shawls
- Pouches
- Bag Accessories
- Hats
- Hair Accessories
- Watches
- Keychains
- Gloves
- Socks & Tights
- Travel Accessories
- Tech Accessories

## Jak ma to działać w kodzie

1. Kategorie muszą być danymi konfiguracyjnymi, a nie tekstami powtarzanymi i wpisanymi na sztywno w wielu komponentach.
2. Baza danych powinna obsługiwać hierarchię przez `parent_id` lub równoważną relację.
3. Każda kategoria musi mieć co najmniej:
   - stabilny `id`;
   - `slug` używany w kodzie i adresach URL;
   - angielską nazwę wyświetlaną;
   - `parent_id`;
   - `sort_order`;
   - `is_active`;
   - opcjonalne przyszłe pole `label_ar` na tłumaczenie arabskie.
4. Ogłoszenie zapisuje identyfikator najdokładniejszej podkategorii, nie samą nazwę tekstową.
5. API zwraca uporządkowane drzewo kategorii. Frontend nie tworzy własnej, odmiennej listy.
6. Panel właścicielki pozwala włączać i wyłączać podkategorie bez usuwania ich z bazy.
7. Seed kategorii ma być idempotentny: można uruchomić go ponownie bez duplikatów.
8. Kolejność kategorii i podkategorii pochodzi z `sortOrder` w `categories.json`.
9. Na ekranie wystawiania najpierw wybiera się jedną z czterech kategorii głównych, a następnie jedną podkategorię.
10. AI może zaproponować kategorię na podstawie zdjęcia, ale sprzedająca zawsze ją zatwierdza lub zmienia.
11. Nie dodawaj obecnie osobnych głównych działów `Women`, `Men`, `Kids`, `Beauty`, `Home` ani `Lifestyle`. MVP dotyczy damskiej mody i czterech zatwierdzonych działów.
12. Nie pokazuj pustej kategorii w głównym feedzie, chyba że właścicielka zdecyduje inaczej w panelu.

## Migracja istniejących danych

Nie usuwaj istniejących ogłoszeń. Przed zmianą wykonaj migrację:

- zapisz listę dotychczasowych kategorii i liczbę przypisanych ogłoszeń;
- przypisz stare, jednoznaczne kategorie do nowych identyfikatorów;
- dla niejednoznacznych rekordów ustaw status `category_review_required`, zamiast zgadywać;
- po migracji sprawdź, że liczba ogłoszeń jest taka sama jak przed migracją;
- usuń stare definicje kategorii dopiero po poprawnym przypisaniu ogłoszeń.

Minimalne mapowanie dla obecnych danych demonstracyjnych:

- `dresses` → `clothing/dresses`
- `tops` → `clothing/tops`
- `blazers` → `clothing/coats-jackets`
- `shoes` → wymaga przypisania dokładnego rodzaju; nie wybieraj losowo
- `bags` → wymaga przypisania dokładnego rodzaju; nie wybieraj losowo
- `accessories` → wymaga przypisania dokładnego rodzaju; nie wybieraj losowo

Ogólna kategoria `Other` może istnieć wyłącznie jako techniczny fallback dla moderacji. Nie pokazuj jej jako podstawowej podkategorii użytkowniczce. Jeśli AI i użytkowniczka nie znajdą właściwej pozycji, ogłoszenie trafia do przeglądu kategorii.

## Kryteria ukończenia

- W aplikacji widoczne są dokładnie cztery główne działy w zatwierdzonej kolejności.
- Wszystkie podkategorie pochodzą z `categories.json`.
- Feed, wyszukiwarka, wystawianie ogłoszenia i panel admina korzystają z tego samego źródła danych.
- Stare przypadkowe kategorie nie są widoczne.
- Istniejące ogłoszenia nie zostały utracone.
- Test automatyczny sprawdza unikalność `id` i `slug`, poprawność `parentId` oraz kolejność.
- Test przepływu sprawdza: wybór Clothing → Dresses, zapis ogłoszenia i filtrowanie feedu.

## Źródła referencyjne

- Ounass — Clothing: https://www.ounass.ae/women/clothing
- Ounass — Shoes: https://www.ounass.ae/women/shoes
- Ounass — Bags: https://www.ounass.ae/women/bags
- Ounass — Accessories: https://www.ounass.ae/women/accessories
- Ounass — Pre-Loved Bags: https://www.ounass.ae/women/pre-loved/bags
- Net-a-Porter — Shoes: https://www.net-a-porter.com/en-ae/shop/shoes
- Net-a-Porter — Accessories: https://www.net-a-porter.com/en-ae/shop/accessories

Nazwy zostały uporządkowane dla wearto.you. Claude Code nie ma podczas implementacji ponownie pobierać lub kopiować menu tych sklepów.
