# 11 — Маркетинг и SEO (полный чек-лист)

> **Назначение:** единый документ — что уже сделано на сайте, что осталось, и пошаговые чек-листы, чтобы закрыть маркетинг и поиск полностью.  
> **Сайт:** один лендинг, 3 языка — `/hy/` (default), `/ru/`, `/en/`  
> **Домен:** `https://apartment-abovyan.vercel.app`  
> **Связанные доки:** [08-seo-meta.md](./08-seo-meta.md) (технические шаблоны meta), [07-i18n-spec.md](./07-i18n-spec.md) (языки), [10-deploy-vercel.md](./10-deploy-vercel.md) (деплой)

---

## Зачем этот документ

Лендинг продаёт одну квартиру. Трафик идёт из:

1. **Поиска** (Google, Яндекс, Bing) — по запросам «квартира Абовян», «apartment Abovyan» и т.д.
2. **Соцсетей и мессенджеров** (WhatsApp, Telegram, Facebook) — диаспора шарит ссылку.
3. **Досок объявлений** (list.am, myhome.am и др.) — со ссылкой на сайт.

Чтобы человек из **РФ/СНГ** видел **русский** сниппет, из **Европы/США** — **английский**, из **диаспоры** — **армянский**, нужны и код на сайте, и регистрация в поисковиках, и размещение на площадках.

---

## Кому какой язык показывать

| Аудитория | Язык в выдаче | URL для шаринга |
|-----------|---------------|-----------------|
| Армения, диаспора (основная ЦА) | Հայերեն | `/hy/` |
| РФ, СНГ, русскоязычные | Русский | `/ru/` |
| Европа, США, Австралия, международные | English | `/en/` |

**Как это работает:** поисковик смотрит на **hreflang** (связь языковых версий), **язык запроса** и **URL страницы**. Автоматический редирект «из России → /ru/» по IP **не настроен** и для SEO не обязателен — главное, чтобы все 3 версии были проиндексированы.

**Ссылка по умолчанию для шаринга:** `/hy/` (диаспора).

---

## Сводка: есть / нет

| Область | Статус | Комментарий |
|---------|--------|-------------|
| 3 языковые страницы | ✅ Готово | `/hy/`, `/ru/`, `/en/` |
| Title + description на языке | ✅ Готово | `src/i18n/*.json` → `BaseLayout` |
| hreflang + canonical | ✅ Готово | Все 3 языка + `x-default` → `/hy/` |
| Open Graph (превью в WhatsApp/TG) | ✅ Готово | og-preview.jpg 1200×630 |
| Twitter Card | ✅ Готово | card + image + title + description |
| Sitemap | ✅ Готово | `@astrojs/sitemap` → `sitemap-index.xml` + lastmod |
| robots.txt | ✅ Готово | Динамический `src/pages/robots.txt.ts` из `SITE_URL` |
| Заголовки H1–H3 | ✅ Готово | H1 с ключами, FAQ в h3, характеристики h3 |
| Alt-тексты фото | ✅ Готово | 16 ключей на каждый язык в i18n |
| JSON-LD (Schema.org) | ✅ Готово | WebSite + RealEstateListing + FAQPage |
| FAQ rich snippets | ✅ Готово | FAQPage schema + h3 на вопросах |
| Деплой production | ❌ Нет | TASK-003, Vercel |
| Google Search Console | ❌ Нет | Ручная настройка после деплоя |
| Яндекс.Вебмастер | ❌ Нет | Важно для РФ/СНГ |
| Доски объявлений | ❌ Нет | list.am, myhome.am и др. |
| Аналитика | ❌ Нет | Plausible/Umumi — phase 2 |

---

## Часть A — На сайте (код и контент)

### A1. Meta-теги и соцсети

**Уже в коде** (`src/layouts/BaseLayout.astro` + `src/i18n/{hy,ru,en}.json`):

| Тег | RU | EN | HY |
|-----|----|----|-----|
| `<title>` | Квартира 78 м² в Абовяне — вид на гору Атис \| $92 000 | 78 m² Apartment in Abovyan — Mount Atis View \| $92,000 | 78 քմ բնակարան Աբովյանում — Աթիզ լեռի տեսարան \| $92 000 |
| `meta description` | 3 комнаты + зал, 4/5 этаж. Прямая продажа от собственника… | 3 bedrooms + living room, 4th floor… | 3 սենյակ + հյուրասենյակ, 4/5 հարկ… |
| `canonical` | `/ru/` | `/en/` | `/hy/` |
| `hreflang` | hy, ru, en + x-default | то же | то же |
| `og:*` | title, description, url, locale, image | то же | то же |
| `twitter:card` + image | summary_large_image | то же | то же |

**Чек-лист — доделать в коде:**

- [x] `twitter:title` и `twitter:description` (как у og)
- [x] `og:locale:alternate` для двух других языков на каждой странице
- [x] `og:site_name` (например «Garni 10, Abovyan»)
- [x] `hreflang="ru-RU"`, `en-US`, `hy-AM` в дополнение к коротким кодам

> Шаблоны тегов — в [08-seo-meta.md](./08-seo-meta.md).  
> `meta keywords` **не нужен** — Google его не использует.

---

### A2. Структурированные данные (JSON-LD)

**Сейчас:** только в документации, **в HTML не выводится**.

**Чек-лист — внедрить на каждую локаль** (текст `name`/`description` на языке страницы):

- [x] **RealEstateListing** — цена $92 000, адрес (ул. Гарни 10, Абовян), 78 м², 4 комнаты, телефон +37477271488
- [x] **FAQPage** — 5 вопросов из секции FAQ (даёт расширенный сниппет в Google)
- [x] **WebSite** — имя сайта, URL
- [ ] Опционально: **Organization** / **Person** (продавец-собственник)

Пример RealEstateListing — в [08-seo-meta.md](./08-seo-meta.md#structured-data-json-ld).

---

### A3. Заголовки страницы (H1–H6)

На каждой языковой версии **один H1**, **11 блоков H2**, **10 блоков H3**. **H4–H6 нет** — для одностраничника это нормально.

#### H1 (единственный)

| Локаль | Сейчас | Проблема |
|--------|--------|----------|
| RU | «Квартира с видом на будущее» | Нет ключей «Абовян», «78 м²», «Атис» |
| EN | «An Apartment with a View of the Future» | То же |
| HY | «Բնակարան ապագայի տեսարանով» | То же |

**Чек-лист:**

- [x] Переписать `hero.title` в i18n — ближе к `<title>`
- [x] Подзаголовок (`hero.subtitle`) оставить как есть — адрес и этаж

#### H2 — 11 секций (одинаковая структура)

| # | Секция | Ключи для SEO |
|---|--------|---------------|
| 1 | pains | слабые |
| 2 | mechanism | Абовян, Атис |
| 3 | consequences | слабые |
| 4 | solution | квартира, 78 м² |
| 5 | building | Элар, заводской дом |
| 6 | gallery | реальные фото |
| 7 | distances | Абовян, пешком |
| 8 | location | **Абовян, туризм, Атис** ★ |
| 9 | floorplan | **78 м², планировка** ★ |
| 10 | offer | цена, предложение |
| 11 | faq | частые вопросы |

#### H3 — 10 штук

- **PainCards (×3):** боли покупателя
- **BuildingHeritage (×3):** заводская застройка, квартал Элар, частная собственность
- **LocationCards (×4):** монумент на Атисе, экотуризм, церковь, логистика

**Чек-лист:**

- [x] FAQ: обернуть вопросы в `<h3>` (сейчас только `<summary>` без heading)
- [x] Заголовок «Характеристики» (h3) в секции solution для спеков

---

### A4. Изображения

**Уже есть:** 16 alt-текстов на язык (`img.hero.alt`, `img.gallery.01–09`, location ×4).

| Файл / зона | Alt | Примечание |
|-------------|-----|------------|
| Hero | ✅ aria-label | Фон через CSS — Google Images слабо индексирует |
| Gallery ×9 | ✅ | lazy load, width/height |
| Location ×4 | ✅ | lazy load |
| og-preview.jpg | — | 1200×630 для соцсетей |

**Чек-лист:**

- [ ] Убедиться, что все файлы из [04-media-manifest.md](./04-media-manifest.md) на production
- [ ] WebP-версии hero и gallery (спека) + fallback JPG
- [ ] Hero как `<img fetchpriority="high">` вместо CSS background (лучше для LCP и Image Search)
- [x] `width`/`height` у location images (меньше CLS)
- [ ] Image sitemap (опционально, phase 2)

---

### A5. Sitemap и robots.txt

**Уже есть:**

- `astro.config.mjs` → `@astrojs/sitemap` — при `npm run build` генерирует `sitemap-index.xml` с 3 URL
- `public/robots.txt`:

```
User-agent: *
Allow: /
Sitemap: https://apartment-abovyan.vercel.app/sitemap-index.xml
```

**Чек-лист:**

- [ ] После деплоя открыть `https://ДОМЕН/sitemap-index.xml` — 3 страницы
- [x] Обновить URL в `robots.txt` при смене домена (динамический `robots.txt.ts`)
- [x] Редирект `/` → `/hy/`: **301** (`vercel.json` + `astro.config.mjs`)
- [x] `lastmod` в sitemap через настройку Astro

---

### A6. Техническое SEO

| Критерий | Статус |
|----------|--------|
| SSG (статика, быстрая загрузка) | ✅ |
| `<html lang="">` | ✅ hy / ru / en |
| Семантика: main, header, footer, article, section | ✅ |
| Один H1 на странице | ✅ |
| Lazy loading изображений | ✅ |
| Preload hero | ✅ (jpg) |
| Security headers (vercel.json) | ✅ |

**Чек-лист — улучшения:**

- [ ] Preload WebP вместо JPG (когда WebP готов)
- [ ] Self-host шрифтов или preload woff2 (сейчас Google Fonts — render-blocking)
- [ ] Проверить Core Web Vitals после деплоя (PageSpeed Insights)
- [ ] `fixed` background на hero — на мобиле может бить LCP; тестировать

---

## Часть B — Ключевые слова (что люди ищут)

### RU (РФ, СНГ)

**Высокий приоритет:**

- квартира Абовян купить
- недвижимость Абовян Армения
- квартира вид Атис / гора Атис
- квартира без агентов Армения
- квартира 78 м² Абовян
- продажа квартиры Абовян от собственника
- ул. Гарни 10 Абовян

**Длинный хвост:**

- квартира Абовян инвестиции туризм
- квартира рядом монумент Христа Атис
- недвижимость Котайк купить

### EN (международные)

- apartment Abovyan Armenia
- property for sale Abovyan
- Mount Atis apartment
- Armenia real estate investment
- 78 sqm apartment Abovyan
- direct owner sale Armenia

### HY (диаспора)

- բնակարան Աբովյանում
- անշարժ գույք Հայաստան
- Աթիզ լեռ բնակարան
- ուղիղ վաճառք տանտիրոջից

**Где ключи уже в тексте:** title, description, H2 location/floorplan, H3 Атис/Элар, alt-тексты, FAQ.  
**Где слабо:** H1 (hero.title).

---

## Часть C — Вне сайта (поисковики и площадки)

Без этого сайт **не появится в выдаче**, даже с идеальным кодом.

### C1. Поисковые системы

**Чек-лист (после деплоя на production):**

- [ ] **Google Search Console** — добавить свойство, подтвердить домен
- [ ] Отправить sitemap: `https://ДОМЕН/sitemap-index.xml`
- [ ] Проверить **International Targeting** → hreflang без ошибок
- [ ] Запросить индексацию `/hy/`, `/ru/`, `/en/`
- [ ] **Яндекс.Вебмастер** — то же (критично для RU/СНГ)
- [ ] **Bing Webmaster Tools** — для EN-аудитории
- [ ] Через 1–2 недели: проверить сниппеты по запросам «квартира Абовян», «apartment Abovyan»

### C2. Доски объявлений

**Чек-лист:**

- [ ] **list.am** — объявление RU/HY + ссылка на сайт
- [ ] **myhome.am** — то же
- [ ] **estate.am** / другие армянские площадки
- [ ] Опционально: Avito/ЦИАН (если таргет РФ) → ссылка `/ru/`
- [ ] Facebook Marketplace / группы недвижимости
- [ ] Везде: реальные фото, цена $92 000, WhatsApp +37477271488, ссылка на лендинг

### C3. Соцсети и мессенджеры (органический охват)

| Канал | Язык ссылки | Формат |
|-------|-------------|--------|
| WhatsApp-группы диаспоры | HY / RU | OG-превью при шаринге |
| Telegram-каналы недвижимости | RU / HY | Ссылка + короткий текст |
| Facebook Armenian groups | HY / EN | OG-превью |
| Email знакомым | EN / HY | Прямая ссылка |

**Чек-лист:**

- [ ] Подготовить 3 коротких текста для шаринга (hy, ru, en) — 2–3 предложения + ссылка
- [ ] Разослать в 5–10 релевантных групп/каналов
- [ ] Отслеживать входящие WhatsApp (единственная метрика на MVP)

### C4. Аналитика (phase 2)

- [ ] Plausible или Umami — просмотры, referrers (без cookie banner)
- [ ] Событие «клик WhatsApp» для конверсии

---

## Часть D — Деплой (блокер для всего остального)

Маркетинг в поиске начинается **только после** публичного URL.

**Чек-лист** (детали в [10-deploy-vercel.md](./10-deploy-vercel.md)):

- [ ] Import репозитория на Vercel
- [ ] Env `SITE_URL` = финальный домен
- [x] Production URL: `apartment-abovyan.vercel.app`
- [ ] Проверить: `/hy/`, `/ru/`, `/en/` открываются
- [ ] Проверить OG-превью: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) или аналог
- [ ] Обновить `robots.txt` — Sitemap на финальный URL

---

## Мастер-чек-лист: закрыть маркетинг полностью

Используйте как порядок работ. Отмечайте `[x]` по мере выполнения.

### Этап 0 — Блокер

- [ ] **D1** Деплой на Vercel + домен + `SITE_URL`
- [ ] **D2** Все изображения на production (hero, gallery, og-preview, location)

### Этап 1 — Критично для поиска (код)

- [x] **A2** JSON-LD: RealEstateListing + FAQPage на 3 языках
- [x] **A3** H1 с ключевыми словами (согласовать с title)
- [x] **A3** FAQ-вопросы в `<h3>`
- [x] **A1** twitter:title + twitter:description
- [x] **A1** og:locale:alternate
- [x] **A5** robots.txt — актуальный домен; редирект `/` → 301

### Этап 2 — Регистрация в поисковиках

- [ ] **C1** Google Search Console + sitemap
- [ ] **C1** Яндекс.Вебмастер + sitemap
- [ ] **C1** Bing Webmaster (опционально)
- [ ] **C1** Проверка hreflang и индексации через 7–14 дней

### Этап 3 — Трафик с площадок

- [ ] **C2** list.am + myhome.am (+ другие доски)
- [ ] **C3** Шаринг в WhatsApp/Telegram/Facebook группах
- [ ] **C3** 3 текста для шаринга (hy, ru, en)

### Этап 4 — Улучшения (не блокируют запуск)

- [ ] **A4** WebP, hero как img, image sitemap
- [ ] **A6** Core Web Vitals, шрифты
- [ ] **C4** Аналитика Plausible/Umami
- [ ] **07** HY — финальная вычитка носителем
- [ ] Опционально: редирект `/` по Accept-Language

---

## Когда маркетинг считается закрытым

Все пункты **Этапа 0 + 1 + 2 + 3** отмечены, и:

1. Три URL проиндексированы в Google (site:домен).
2. По запросу «квартира Абовян» / «apartment Abovyan» сайт появляется в выдаче (может занять 2–4 недели).
3. OG-превью корректно в WhatsApp/Telegram.
4. Объявления на минимум 2 досках со ссылкой на лендинг.
5. JSON-LD проходит [Rich Results Test](https://search.google.com/test/rich-results).

Этап 4 — постоянные улучшения, не обязателен для «запуска маркетинга».

---

## Шпаргалка ссылок

```
Домен:     https://apartment-abovyan.vercel.app
HY:        /hy/   ← default, диаспора
RU:        /ru/   ← РФ, СНГ
EN:        /en/   ← международные
WhatsApp:  https://wa.me/37477271488
Sitemap:   /sitemap-index.xml
OG image:  /images/og-preview.jpg
```

---

## История изменений

| Дата | Что |
|------|-----|
| 2026-06-27 | Создан документ: аудит «есть/нет», чек-листы, мастер-план |
| 2026-06-27 | Этап 1 (код): JSON-LD, meta, H1, FAQ h3, robots.ts, 301 |
