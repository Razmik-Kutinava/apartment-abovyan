# 10 — Деплой на Vercel (GitHub)

> **Репозиторий:** [Razmik-Kutinava/apartment-abovyan](https://github.com/Razmik-Kutinava/apartment-abovyan)  
> **Production URL:** `https://apartment-abovyan.vercel.app`  
> **Стек:** Astro 5 SSG → статика в `dist/`

---

## Что уже в репозитории

| Файл | Назначение |
|------|------------|
| `vercel.json` | Framework Astro, `dist/`, редирект `/` → `/hy/`, cache для `/images/` |
| `.nvmrc` | Node 20 |
| `.github/workflows/ci.yml` | Сборка на push/PR в `main` |
| `package.json` → `engines.node` | `>=20` |
| `astro.config.mjs` | `site` из env `SITE_URL` или Vercel production URL |

---

## Подключение Vercel к GitHub (один раз)

1. Зайти на [vercel.com](https://vercel.com) → **Add New → Project**
2. **Import** репозиторий `Razmik-Kutinava/apartment-abovyan`
3. Vercel сам определит **Astro** — не менять:
   - **Framework Preset:** Astro
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm ci`
4. **Environment Variables** (Production):

   | Key | Value | Зачем |
   |-----|-------|-------|
   | `SITE_URL` | `https://apartment-abovyan.vercel.app` | canonical, sitemap, OG |

5. **Deploy** → после push в `main` деплой идёт автоматически.

---

---

## Локальная проверка перед push

```bash
npm ci
npm run build
npm run preview   # http://localhost:4321
```

Проверить: `/hy/`, `/ru/`, `/en/`, редирект `/` → `/hy/`.

---

## Чек-лист после первого деплоя

- [x] `/hy/` открывается
- [x] `/ru/`, `/en/` переключаются
- [x] WhatsApp CTA ведёт на `+37477271488`
- [x] OG-превью: `/images/og-preview.jpg` (1200×630)
- [x] `sitemap-index.xml` доступен
- [x] GSC + Яндекс.Вебмастер: подтверждены, sitemap отправлен
- [x] HTTPS включён (Vercel по умолчанию)

---

## Troubleshooting

| Проблема | Решение |
|----------|---------|
| Build fail на sharp | На Vercel Linux sharp работает; локально win-arm64 — не критично |
| EBADPLATFORM rollup-win32 | Не коммитить `@rollup/rollup-win32-arm64-msvc` — только для локального win-arm64 |
| Неверный canonical | Проверить `SITE_URL` в Vercel env |
| 404 на `/` | `vercel.json` redirect + Astro redirect |
| Старый кэш | Vercel → Deployments → Redeploy |

---

## Связанные документы

- [06-tech-spec-astro.md](./06-tech-spec-astro.md) — архитектура
- [08-seo-meta.md](./08-seo-meta.md) — SEO и OG
- [ops/tasks/TASK-003-vercel-deploy.md](../ops/tasks/TASK-003-vercel-deploy.md) — чек-лист задачи
