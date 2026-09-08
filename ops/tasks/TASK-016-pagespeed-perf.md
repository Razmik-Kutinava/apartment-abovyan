# TASK-016 — PageSpeed: скорость mobile + desktop

**Статус:** done  
**Дата:** 2026-09-08

## Источник правды (дословно)
> итак тест гугл показал некоторые косяки с сайтом и его производительсностью
>
> [PageSpeed mobile: Performance 59, FCP 4.0s, LCP 6.4s, TBT 310ms, CLS 0, SI 5.4s; render-blocking 1500ms; images 332 KiB; unused JS 113 KiB; network 2974 KiB; contrast; console errors]
>
> сделай и деплой ебани
> и так же для компа
>
> [PageSpeed desktop: Performance 87, FCP 0.8s, LCP 1.5s, TBT 220ms; cache 72 KiB; render-blocking 490ms; images 276 KiB; unused JS 113 KiB; network 2974 KiB]
>
> сделай все исправь чтоб был шустрый сайт

## Понимание задачи
Поднять lab-производительность на mobile (59→цель 90+) и desktop (87→цель 95+): убрать блокирующие шрифты, не качать hero-видео на старте / сжать его, отложить GA/Метрику, сжать картинки (WebP), подправить контраст. Задеплоить на Vercel.

## Документы проекта
- `docs/10-deploy-vercel.md`
- `ops/backlog.md`
- `src/layouts/BaseLayout.astro`, `src/components/Hero.astro`
- `vercel.json`

## Чек-лист этапов
- [x] Этап 1: Сжать hero-видео + poster WebP
- [x] Этап 2: Hero — poster как LCP, video deferred
- [x] Этап 3: Self-host fonts (убрать Google Fonts CSS)
- [x] Этап 4: Отложить GA4 + Metrika (без раннего webvisor)
- [x] Этап 5: WebP/srcset для gallery, location, floorplan
- [x] Этап 6: Контраст (gold / muted / footer)
- [x] Этап 7: Build + commit + deploy Vercel

## Было → Стало
| Область | Было | Стало |
|---------|------|-------|
| Hero video | 2.2 МБ, `preload=auto` на старте | ~548 КБ, `preload=none`, load после idle |
| LCP | конкурирует с видео | poster WebP + `fetchpriority=high` |
| Fonts | Google Fonts CSS (blocking) | self-host `@fontsource` latin/cyrillic |
| Analytics | GA+Metrika в head, webvisor on | после `load`+idle, webvisor off |
| Images | тяжёлые JPG | WebP + picture/srcset |
| Contrast | gold `#c9a962`, muted светлый, footer opacity | darker gold/muted, solid footer text |
| Cache | images/video | + `/_astro/*` immutable |

## Не сделано в этом прогоне
- CSP / COOP / Trusted Types (best-practices nice-to-have)
- Повторный webvisor (можно включить позже после idle с задержкой)
- Ручной прогон PSI после деплоя (заказчик)
