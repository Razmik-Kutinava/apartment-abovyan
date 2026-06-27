# TASK-003 — Деплой Vercel через GitHub

**Статус:** ready (инфра в репо, подключение Vercel — вручную)  
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

- [ ] Import `Razmik-Kutinava/apartment-abovyan` на vercel.com
- [ ] Build: `npm run build`, Output: `dist`
- [ ] Env `SITE_URL` = production URL
- [ ] Первый deploy OK
- [ ] (опционально) Custom domain `garni10.abovyan.app`
- [ ] Обновить `robots.txt` sitemap URL после домена

---

## Тесты

```bash
npm ci && npm run build
```

- [x] Локально OK
- [ ] Vercel production OK
- [ ] `/hy/` `/ru/` `/en/` live

---

## Было → Стало

| Область | Было | Стало |
|---------|------|-------|
| Деплой | only local | Vercel-ready + CI |
| Remote | GitHub main | auto-deploy on push |
| Домен | TODO в docs | инструкция + SITE_URL env |
