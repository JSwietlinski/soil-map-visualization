# Soil Map Visualization (Chobienice)
**Link do aplikacji:** [https://jswietlinski.github.io/soil-map-visualization/](https://jswietlinski.github.io/soil-map-visualization/)

## Opis projektu
Interaktywna aplikacja mapowa prezentująca dane gleboznawcze dla miejscowości Chobienice. Projekt stanowi reedycję pracy inżynierskiej, zaktualizowaną o standardy Web GIS i najlepsze praktyki Quality Assurance.

## Kluczowe Funkcjonalności
- Przeglądanie typologii gleb i uziarnienia w formie interaktywnych warstw.
- Przełączanie podkładów (OpenStreetMap vs Ortofotomapa GUGiK).
- Narzędzia pomocnicze: geolokalizacja, wyszukiwarka adresów, współrzędne kursora.
- Legenda sterowana dynamicznie za pomocą checkboxów.

## Technologie i Narzędzia
- **Frontend:** HTML5, CSS3, JavaScript, jQuery.
- **Biblioteki GIS:** Leaflet.js.
- **Dane:** GeoJSON (migracja z formatu WMS/SHP).
- **Oprogramowanie:** QGIS (przygotowanie i walidacja danych przestrzennych).

## Proces QA i Modernizacja
Projekt przeszedł proces modernizacji, w ramach której:
1. **Naprawa błędów komunikacji:** Zastąpiono lokalne połączenia GeoServer (localhost) statycznymi plikami GeoJSON, co umożliwiło publiczne hostowanie projektu.
2. **Bezpieczeństwo:** Rozwiązano błędy typu *Mixed Content* poprzez aktualizację wszystkich zewnętrznych bibliotek i API do protokołu HTTPS.
3. **Optymalizacja:** Zreorganizowano strukturę plików (podział na moduły HTML/CSS/JS) w celu ułatwienia testowania i konserwacji kodu.
4. **Zarządzanie hierarchią (Layer Stacking):** dodano funkcję `bringToFront` do zagwarantowania, że punkty odkrywek glebowych będą się wyświetlać nad resztą warstw.

## Znane problemy i ograniczenia
- **WMS Timeout:** Niekiedy podczas zoomowania na warstwie Ortofotomapy mogą pojawiać się błędy `net::ERR_CONNECTION_RESET`. Wdrożono `updateWhenIdle: true` w celu minimalizacji problemu.
- **Niespójność legendy:** Legenda w sekcji "Uziarnienie" i "Cechy szczególne" wskazuje na symbolizację warstwy, nie ma to odzwierciedlenia na mapie. Przyczyna leży w przejsciu z GeoServera, który generował tekstury rastrowe.
- **Niespójność przycisków:** Po wdrożeniu nowej biblioteki geolokalizacji i biblioteki wyszukiwarki adresów, przyciski podkładu OpenStreetMap i Ortofotomapy różnią się wielkością od wcześniej wymienionych.

## Struktura Projektu
- `/data` - zbiory danych przestrzennych w formacie GeoJSON.
- `/images` - zasoby graficzne, ikony warstw oraz elementy legendy.
- `index.html` - struktura aplikacji.
- `script.js` - logika mapy i obsługa warstw.
- `style.css` - definicje interfejsu i legendy.
