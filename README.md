# Soil Map Visualization (Chobienice)

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

## Proces QA i Modernizacja (w trakcie)
Projekt przeszedł proces gruntownej modernizacji, w ramach której:
1. **Naprawa błędów komunikacji:** Zastąpiono lokalne połączenia GeoServer (localhost) statycznymi plikami GeoJSON, co umożliwiło publiczne hostowanie projektu.
2. **Bezpieczeństwo:** Rozwiązano błędy typu *Mixed Content* poprzez aktualizację wszystkich zewnętrznych bibliotek i API do protokołu HTTPS.
3. **Optymalizacja:** Zreorganizowano strukturę plików (podział na moduły HTML/CSS/JS) w celu ułatwienia testowania i konserwacji kodu.
