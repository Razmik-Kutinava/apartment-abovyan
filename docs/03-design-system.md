# 03 — Design System

## Концепция

**«Тёплая Армения × Инвестиция в будущее»**

Лендинг для диаспоры: эмоциональная связь с Родиной + рациональные аргументы роста цены.  
Не «агентский сайт 2010-х», а современный editorial-лендинг в духе premium real estate, но с честностью.

---

## Цветовая палитра

| Token | HEX | Использование |
|-------|-----|---------------|
| `--color-bg` | `#FAF7F2` | Основной фон (тёплый беж) |
| `--color-bg-dark` | `#2C2419` | Hero overlay, footer |
| `--color-surface` | `#FFFFFF` | Карточки, секции |
| `--color-primary` | `#C4654A` | CTA, акценты (терракота) |
| `--color-primary-hover` | `#A8523A` | Hover CTA |
| `--color-secondary` | `#8B7355` | Вторичный текст, иконки |
| `--color-text` | `#2C2419` | Основной текст |
| `--color-text-muted` | `#6B5D4F` | Подписи, мета |
| `--color-accent-green` | `#4A6741` | Локация, природа, дистанции |
| `--color-gold` | `#C9A962` | Badge, цена, premium-акцент |
| `--color-whatsapp` | `#25D366` | WhatsApp CTA (фирменный) |

### Градиент Hero overlay
```css
background: linear-gradient(
  180deg,
  rgba(44, 36, 25, 0.55) 0%,
  rgba(44, 36, 25, 0.75) 60%,
  rgba(44, 36, 25, 0.90) 100%
);
```

---

## Типографика

| Роль | Шрифт | Fallback | Weight |
|------|-------|----------|--------|
| Display / H1 | **Playfair Display** | Georgia, serif | 700 |
| Headings H2–H4 | **Montserrat** | system-ui | 600–700 |
| Body | **Inter** | system-ui | 400 |
| Accent / Badge | **Montserrat** | — | 500, uppercase, letter-spacing 0.08em |

### Scale (mobile-first, clamp)
```css
--text-xs:   clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
--text-sm:   clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
--text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
--text-lg:   clamp(1.125rem, 1rem + 0.5vw, 1.375rem);
--text-xl:   clamp(1.375rem, 1.2rem + 0.75vw, 1.75rem);
--text-2xl:  clamp(1.75rem, 1.4rem + 1.5vw, 2.5rem);
--text-hero: clamp(2rem, 1.5rem + 2.5vw, 3.5rem);
```

---

## Spacing & Layout

```css
--space-xs:  0.5rem;
--space-sm:  1rem;
--space-md:  1.5rem;
--space-lg:  2.5rem;
--space-xl:  4rem;
--space-2xl: 6rem;

--container-max: 1200px;
--container-padding: clamp(1rem, 4vw, 2rem);
--section-gap: clamp(3rem, 8vw, 6rem);
```

---

## Компоненты

### 1. Hero (fullscreen)
- Фон: `hatis3-rus.jpg` (parallax subtle, `background-attachment: fixed` на desktop)
- Overlay gradient поверх
- Badge сверху: «Прямая продажа · Без агентов»
- H1 + subtitle + benefit text
- Sticky CTA bar на mobile (WhatsApp зелёная кнопка внизу экрана)

### 2. Pain Cards (×3)
- Grid 1 col mobile → 3 col desktop
- Иконка (line icon) + title + text
- Hover: subtle lift `translateY(-4px)`, shadow

### 3. Location Cards (×4)
- Карточки «Что рядом»: Атис, Adventure, Церковь, Логистика
- Каждая с фото-фоном (atis, church) + overlay
- Aspect ratio 4:3

### 4. Gallery Slider
- Swipeable на mobile (touch)
- Lightbox по клику
- Thumbnails strip внизу
- Lazy loading + WebP

### 5. Specs Grid
- 2×3 grid иконок (адрес, площадь, этаж, вид, балкон, состояние)
- Числа крупно, подпись мелко

### 6. Distance List
- Timeline-style: иконка + расстояние + время пешком
- Зелёный accent

### 7. Floor Plan
- SVG inline, интерактивные комнаты (hover highlight)
- Легенда комнат под схемой

### 8. Offer Block
- Цена крупно: `$92 000` (Playfair Display, gold)
- 4 bullet benefits
- CTA WhatsApp full-width на mobile

### 9. FAQ Accordion
- `<details>` / `<summary>` — без JS
- 4 вопроса

### 10. Footer
- Минимум: телефон + WhatsApp + адрес
- Тёмный фон `--color-bg-dark`

### 11. Language Switcher
- Fixed top-right: `HY | RU | EN`
- Active язык подчёркнут gold
- Переключение через URL prefix: `/hy/`, `/ru/`, `/en/`

### 12. Sticky WhatsApp (mobile)
```css
.sticky-whatsapp {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 100;
  /* pill button, green, pulse animation subtle */
}
```

---

## Анимации

| Элемент | Анимация | Trigger |
|---------|----------|---------|
| Hero text | fade-up 0.8s | on load |
| Section titles | fade-up 0.6s | scroll (Intersection Observer) |
| Cards | stagger fade-up 0.1s delay | scroll |
| CTA button | subtle pulse 2s infinite | always (mobile sticky) |
| Gallery | slide transition 0.3s | swipe/click |

**Правило:** анимации уважают `prefers-reduced-motion`.

---

## Референсы (настроение)

1. **Premium real estate editorial** — крупная типографика, много воздуха, фото на весь экран
2. **Armenian warmth** — терракота, беж, золото, горные пейзажи
3. **NOT:** агентские сайты list.am, neumorphism, AI-slop gradients

### Визуальные якоря из ассетов
- `hatis3-rus.jpg` — Hero, блок Атис
- `adis.png` — фон секции локации
- `церковь.png` / `церковь-2.png` — карточка церкви
- `photo_12`, `photo_13` — галерея (лodжия, зал с видом на зелень)

---

## Responsive breakpoints

```css
--bp-sm:  640px;
--bp-md:  768px;
--bp-lg:  1024px;
--bp-xl:  1280px;
```

Mobile-first. Hero text center на mobile, left-aligned на desktop.

---

## Accessibility

- Конtrast ratio ≥ 4.5:1 для body text
- Все images: alt text на языке страницы
- Focus visible на CTA и language switcher
- `lang` attribute на `<html>` per locale
