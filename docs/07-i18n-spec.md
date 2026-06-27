# 07 — i18n Specification

## Языки

| Code | Язык | Аудитория | Default |
|------|------|-----------|---------|
| `hy` | Հայերեն (восточноармянский) | **Диаспора** — основная ЦА | **★** |
| `ru` | Русский | Покупатели из РФ/СНГ, локальные | |
| `en` | English | Международные покупатели, США/Европа | |

---

## URL Strategy

```
/           → 302 redirect → /hy/
/hy/        → Armenian (default)
/ru/        → Russian
/en/        → English
```

### hreflang tags (в `<head>` каждой страницы)

```html
<link rel="alternate" hreflang="hy" href="https://DOMAIN/hy/" />
<link rel="alternate" hreflang="ru" href="https://DOMAIN/ru/" />
<link rel="alternate" hreflang="en" href="https://DOMAIN/en/" />
<link rel="alternate" hreflang="x-default" href="https://DOMAIN/hy/" />
```

---

## Language Switcher UI

```
┌─────────────────────────────┐
│  [HY]  [RU]  [EN]     📲   │  ← fixed top bar
└─────────────────────────────┘
```

- Active язык: underline gold + bold
- Click → navigate to same page in other locale
- Сохранять scroll position не нужно (одна страница)

---

## Файлы переводов

```
src/i18n/
├── ru.json    ← финальный, из docs/02-content-ru-hy-en.md
├── hy.json    ← из docs/02b-content-hy.md (проверить носителем)
└── en.json    ← из docs/02-content-ru-hy-en.md
```

### Формат JSON

```json
{
  "meta.title": "...",
  "hero.title": "...",
  "hero.cta_prefill": "..."
}
```

Flat keys с dot notation — простота, без nested objects.

---

## Локализация чисел и валюты

| Element | HY | RU | EN |
|---------|----|----|-----|
| Price | $92 000 | $92 000 | $92,000 |
| Area | 78 քմ | 78 м² | 78 m² |
| Phone | +374 77 271 488 | +374 77 271 488 | +374 77 271 488 |

---

## WhatsApp prefill messages (локализованные)

| Locale | Prefill |
|--------|---------|
| hy | `Barev Dzez! Ind hnaravor e Garni 10 bnakaran@ Abovyanum` |
| ru | `Здравствуйте! Интересует квартира на ул. Гарни, 10 в Абовяне` |
| en | `Hello! I'm interested in the apartment at Garni St. 10, Abovyan` |

---

## `<html lang="">` per page

```html
<!-- /hy/ -->
<html lang="hy">

<!-- /ru/ -->
<html lang="ru">

<!-- /en/ -->
<html lang="en">
```

---

## Alt texts для изображений

Каждое изображение — alt на языке страницы.  
Хранить в JSON:

```json
{
  "img.hero.alt": "...",
  "img.gallery.01.alt": "...",
  "img.church.alt": "...",
  "img.atist.alt": "..."
}
```

---

## RTL / Font considerations

- Армянский: **не RTL**, но нужен шрифт с Armenian glyphs
- Inter и Montserrat поддерживают Armenian subset
- Playfair Display — проверить Armenian glyphs; fallback: **Noto Serif Armenian**

```css
@font-face {
  font-family: 'Noto Serif Armenian';
  src: url('/fonts/NotoSerifArmenian.woff2') format('woff2');
  unicode-range: U+0530-058F;
}
```

---

## Default locale detection (optional, phase 2)

```javascript
// Не на MVP. Если добавить:
// 1. Check Accept-Language header (server/CDN)
// 2. Redirect / → best match
// MVP: всегда /hy/
```

---

## Content status

| Locale | Status | Action |
|--------|--------|--------|
| RU | ✅ Final | Ready for code |
| EN | ✅ Final | Ready for code |
| HY | ⚠️ Draft | Native speaker review before prod |
