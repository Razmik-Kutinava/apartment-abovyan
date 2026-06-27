# TASK-003 — Деплой Vercel через GitHub

**Статус:** done  
**Дата:** 2026-06-27

---

## Цель

Автодеплой Astro-лендинга при push в `main` на Vercel.

---

## Чек-лист подготовки (код)

- [x] `vercel.json` — Astro, dist, redirects, headers
- [x] `.nvmrc` — Node 20
- [x] `package.json` engines
- [x] `astro.config.mjs` — SITE_URL из env
- [x] `.github/workflows/ci.yml` — CI build
- [x] `docs/10-deploy-vercel.md` — инструкция
- [x] Push в GitHub `main`

---

## Чек-лист Vercel (ручные шаги)

- [x] Import `Razmik-Kutinava/apartment-abovyan` на vercel.com (CLI + GitHub connect)
- [x] Build: `npm run build`, Output: `dist`
- [x] Env `SITE_URL` = `https://garni10.abovyan.app`
- [x] Первый deploy OK
- [x] Custom domain `garni10.abovyan.app` добавлен в проект
- [x] `robots.txt` — динамический, sitemap из SITE_URL

---

## Тесты

```bash
npm ci && npm run build
```

- [x] Локально OK
- [x] Vercel production OK
- [x] `/hy/` `/ru/` `/en/` live

**URLs:**

- Production: https://salehouse.vercel.app
- Custom: https://garni10.abovyan.app (DNS — проверить у регистратора)
- Vercel dashboard: https://vercel.com/darksegun1988-2149s-projects/salehouse

---

## Было → Стало

| Область | Было | Стало |
|---------|------|-------|
| Деплой | only local | **live** Vercel + GitHub auto-deploy |
| Remote | GitHub main | auto-deploy on push |
| Домен | TODO в docs | `garni10.abovyan.app` + `salehouse.vercel.app` |
