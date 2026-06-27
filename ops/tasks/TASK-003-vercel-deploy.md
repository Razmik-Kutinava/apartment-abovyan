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

## Чек-лист Vercel

- [x] Import `Razmik-Kutinava/apartment-abovyan` на vercel.com
- [x] Build: `npm run build`, Output: `dist`
- [x] Env `SITE_URL` = `https://apartment-abovyan.vercel.app`
- [x] Первый deploy OK
- [x] `robots.txt` — динамический, sitemap из SITE_URL

---

## Тесты

```bash
npm ci && npm run build
```

- [x] Локально OK
- [x] Vercel production OK
- [x] `/hy/` `/ru/` `/en/` live

**URL:** https://apartment-abovyan.vercel.app

---

## Было → Стало

| Область | Было | Стало |
|---------|------|-------|
| Деплой | only local | **live** apartment-abovyan.vercel.app |
| Remote | GitHub main | auto-deploy on push |
| Домен | разные URL в docs | единый `apartment-abovyan.vercel.app` |
