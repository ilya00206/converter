# Aplikacja do przeliczania walut NBP

## Wymagania funkcjonalne i niefunkcjonalne

- Aplikacja powinna pobierać dane o kursach walut z API Narodowego Banku Polskiego
- Na stronie głównej powinny być wyświetlane aktualne kursy walut z możliwością wyboru daty waluty
- Użytkownik powinien mieć możliwość przeliczenia kwoty z jednej waluty na drugą. Do tego celu powinien być dostępny formularz, w którym użytkownik może wprowadzić kwotę i wybrać waluty
- Aplikacja powinna być responsywna i dobrze wyglądać na różnych urządzeniach
- Aplikacja powinna spełniać standardy WCAG 2.1
- UI powinien być czytelny i atrakcyjny

## Technologie i narzędzia

- Angular v18 zoneless
- Node v20.11.1
- TypeScript v5.4
- Scss
- Jasmine, Karma
- Eslint
- Prettier

## Uruchomienie wersji developierskiej

- npm install
- npm start

## Założenia programistyczne

- Aplikacja jest napisana w najnowszych technologiach na 02.05.2024
- Aplikacja nie korzysta z żadnych gotowych bibliotek zewnętrznych
- Aplikacja korzysta z `SSR`
- `Zone.js` został usunięty z projektu
- Wszystkie komponenty są oparte o `ChangeDetectionStrategy.OnPush`
- API komponentów jest oparte o `signals`
- Wszystkie komponenty są `standalone`
- Jest wykorzystany nowy `control flow`
- Jest wykorzystany `inject` zamiast `constructor`
- Struktura aplikacji została zaprojektowana z myślą o ewentualnej łatwej rozbudowie w przyszłości
- Aplikacja korzysta z `experimental` i `dev preview` API
- Są napisane testy jednostkowe dla ważnych funkcjonalności
- Aplikacja wspiera motyw jasny i ciemny, w zależności od preferencji urządzenia
- Aplikacja została przetestowana ręcznie na przeglądarkach Chrome, Edge, Firefox oraz Safari na urządzeniu iOS
- Aplikacja jest hostowana na `firebase`

