# TASK-002 — Хвосты: HY, HEIC, OG

**Статус:** done  
**Создан:** 2026-06-27

## Источник правды (дословно)

> Хвосты (backlog)
> HY = RU (нужен носитель)
> HEIC не конвертирован
> OG-картинка 1200×630
> сделай вот эти три хвоста

## Чек-лист

- [x] 1. Полный перевод src/i18n/hy.json (восточноармянский)
- [x] 2. HEIC → JPG/WebP в public/images/gallery/09-view.*
- [x] 3. OG og-preview.jpg 1200×630 + meta в BaseLayout
- [x] 4. Синхрон docs/i18n/hy.json
- [x] 5. npm run build OK
- [x] 6. ops/backlog + journal обновлены

## Было → Стало

| Область | Было | Стало |
|---------|------|-------|
| hy.json | Копия RU | 104 ключа, восточноармянский Unicode |
| HEIC | assets/IMG_8807.HEIC | public/images/gallery/09-view.jpg + .webp |
| OG | hero-atist-monument.jpg | og-preview.jpg 1200×630 + twitter/og meta |
| Галерея | 8 фото | 9 фото (+ вид из окна) |

## Прогон 1 — завершён

**Коммиты:** (см. journal)  
**Тест:** npm run build OK
