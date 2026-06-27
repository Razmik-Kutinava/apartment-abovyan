# TASK-001 — Astro-лендинг Garni 10

**Статус:** done (MVP локально)  
**Создан:** 2026-06-27

---

## Источник правды (дословно)

> и вот еще кое что
> я хочу чтобы ты создал праврило для курсора в котором описал что требуется ниже
> [... workflow задач ...]
> ебашь и код и все доки и правила и все чо надо
> [...]
> ебашь короче

> (полный текст заказчика из диалога — workflow + «сделай лендинг локально чтобы все работало» + git с операционкой + много коммитов)

---

## Понимание задачи

1. Создать Cursor rule с операционным workflow (задача → доки → чек-лист → прогоны → было/стало → коммиты).
2. Реализовать Astro-лендинг по `docs/` — 3 языка, все секции, WhatsApp CTA.
3. Запустить локально (`npm run dev` / `build`).
4. Git: много логических коммитов + журнал в `ops/journal/`.

---

## Документы проекта

- `docs/01-brief.md` … `docs/09-building-heritage.md`
- `docs/i18n/*.json`
- `docs/03-design-system.md`, `docs/06-tech-spec-astro.md`

---

## Чек-лист этапов

- [x] 1. Cursor rule + ops/ структура
- [x] 2. Astro scaffold (package, config, layout, styles)
- [x] 3. i18n + utils + config
- [x] 4. Компоненты секций ленда
- [x] 5. Страницы hy / ru / en + redirect /
- [x] 6. Assets → public/images
- [x] 7. npm run build успешен
- [x] 8. npm run dev — ленд открывается
- [x] 9. Journal + backlog обновлены

---

## Было → Стало

| Область | Было | Стало |
|---------|------|-------|
| Код | Только docs/ | Astro SSG, 16 компонентов, 3 локали |
| Cursor rule | Нет | `.cursor/rules/task-workflow.mdc` |
| ops/ | Нет | backlog, tasks, journal |
| Лендинг локально | Нет | http://localhost:4321/hy/ |

---

## Прогоны

### Прогон 1 — завершён

**Сделано:** rule, ops, полный лендинг, build, dev  
**Не сделано:** HY native, HEIC, OG image, deploy, скрины  
**Коммиты:** d9d692d → cf6c17d
