# 06 — Tech Spec (Astro)

## Стек

| Технология | Версия | Назначение |
|------------|--------|------------|
| **Astro** | ^5.x | SSG, zero JS by default |
| **TypeScript** | ^5.x | Type safety |
| **CSS** | Vanilla (CSS Modules или global) | Стили по design system |
| **@astrojs/sitemap** | latest | SEO sitemap |
| **sharp** | latest | Image optimization (build time) |

**Без:** React/Vue/Svelte (не нужны для статического ленда).  
**Опционально позже:** `@astrojs/vercel` или `@astrojs/netlify` для деплоя.

---

## Структура проекта

```
salehouse/
├── assets/                    # Исходные фото (не в git public)
├── docs/                      # Документация (этот пакет)
├── public/
│   ├── images/                # Оптимизированные изображения
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── PainCards.astro
│   │   ├── Mechanism.astro
│   │   ├── Consequences.astro
│   │   ├── PropertySpecs.astro
│   │   ├── Distances.astro
│   │   ├── LocationCards.astro
│   │   ├── Gallery.astro
│   │   ├── FloorPlan.astro
│   │   ├── Offer.astro
│   │   ├── FAQ.astro
│   │   ├── Footer.astro
│   │   ├── LangSwitcher.astro
│   │   ├── WhatsAppCTA.astro
│   │   └── StickyWhatsApp.astro
│   ├── i18n/
│   │   ├── ru.json
│   │   ├── hy.json
│   │   └── en.json
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro          → redirect to /hy/
│   │   ├── hy/index.astro
│   │   ├── ru/index.astro
│   │   └── en/index.astro
│   ├── styles/
│   │   ├── global.css
│   │   ├── tokens.css           # CSS variables from design system
│   │   └── components/
│   ├── utils/
│   │   ├── i18n.ts              # getTranslations(), t()
│   │   └── whatsapp.ts          # buildWhatsAppUrl(text)
│   └── env.d.ts
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

---

## astro.config.mjs

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://garni10.abovyan.app', // TODO: финальный домен
  i18n: {
    defaultLocale: 'hy',
    locales: ['hy', 'ru', 'en'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
});
```

---

## Routing

| URL | Язык | Default |
|-----|------|---------|
| `/` | → redirect `/hy/` | |
| `/hy/` | Հայերեն | **★ default** |
| `/ru/` | Русский | |
| `/en/` | English | |

---

## i18n implementation

```typescript
// src/utils/i18n.ts
import ru from '../i18n/ru.json';
import hy from '../i18n/hy.json';
import en from '../i18n/en.json';

const translations = { ru, hy, en } as const;
export type Locale = keyof typeof translations;

export function getTranslations(locale: Locale) {
  return translations[locale];
}

export function t(locale: Locale, key: string): string {
  return translations[locale][key] ?? key;
}
```

```typescript
// src/utils/whatsapp.ts
export function buildWhatsAppUrl(message: string): string {
  const phone = '37477271488';
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
```

---

## Page template pattern

```astro
---
// src/pages/hy/index.astro
import BaseLayout from '../../layouts/BaseLayout.astro';
import Hero from '../../components/Hero.astro';
// ... other imports
import { getTranslations } from '../../utils/i18n';

const locale = 'hy';
const t = getTranslations(locale);
---

<BaseLayout locale={locale} title={t['meta.title']} description={t['meta.description']}>
  <Hero t={t} locale={locale} />
  <!-- ... all sections -->
</BaseLayout>
```

---

## Performance targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | ≥ 95 |
| LCP | < 2.0s |
| CLS | < 0.05 |
| Total JS | < 15 KB (gallery swipe only) |
| Total page weight | < 1.5 MB (first load) |

### Image strategy
- Astro `<Image>` component with sharp
- WebP with JPG fallback via `<picture>`
- Hero: preload `hero-atist-monument.webp`
- Gallery: lazy load below fold

---

## Gallery JS (minimal)

Единственный client-side JS — swipe для галереи:

```astro
<!-- Gallery.astro -->
<script>
  // ~30 lines vanilla JS for touch swipe
  // Or use CSS scroll-snap (zero JS preferred)
</script>
```

**Предпочтение:** CSS `scroll-snap-type: x mandatory` — zero JS.

---

## Deploy options

| Platform | Команда | Плюсы |
|----------|---------|-------|
| **Netlify** | `npm run build` → `dist/` | Free, CDN, auto HTTPS |
| **Vercel** | same | Free, fast |
| **Cloudflare Pages** | same | Free, global CDN |
| **GitHub Pages** | `@astrojs/github-pages` | Free if repo public |

**Рекомендация:** Netlify или Cloudflare Pages — простой деплой, custom domain.

---

## Build commands

```bash
npm create astro@latest . -- --template minimal --typescript strict
npm install @astrojs/sitemap sharp
npm run dev      # localhost:4321
npm run build    # dist/
npm run preview  # preview production build
```

---

## Environment / Config constants

```typescript
// src/config.ts
export const SITE = {
  phone: '+37477271488',
  whatsappPhone: '37477271488',
  price: 92000,
  priceFormatted: '$92 000',
  address: {
    street: 'Garni 10',
    city: 'Abovyan',
    country: 'Armenia',
  },
  specs: {
    area: 78,
    floor: 4,
    totalFloors: 5,
    rooms: 3,
    hasLivingRoom: true,
  },
} as const;
```

---

## Git ignore

```
node_modules/
dist/
.astro/
.env
*.HEIC
```

---

## Checklist перед деплоем

- [ ] Все ассеты переименованы и оптимизированы
- [ ] HEIC конвертирован
- [ ] 3 языка заполнены
- [ ] WhatsApp links работают на всех языках
- [ ] OG image создан (1200×630)
- [ ] favicon добавлен
- [ ] sitemap.xml генерируется
- [ ] hreflang tags на всех страницах
- [ ] Mobile sticky WhatsApp работает
- [ ] Lighthouse ≥ 95
