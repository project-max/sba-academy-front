---
name: fsd-page
description: Создать новую страницу сайта — тонкий роут Nuxt в src/app/routes плюс page-слайс в src/pages по правилам FSD. Использовать при добавлении любого нового URL/страницы.
---

# Создание страницы (роут + page-слайс)

Правила проекта: `docs/fsd.md`. Список страниц и их секций: `docs/pages.md`.

## Шаги

1. **Сверься с `docs/pages.md`** (таблица «Реализация в коде»). Конвенция именования (решение заказчика 2026-08-15): **роут и page-слайс — английским kebab-case, одно имя** (`/contacts` → `contacts.vue` → `pages/contacts`); легаси на транслите остались только `/privacy` и `/oferta` (слайс `offer`). Если страницы нет в инвентаризации — сначала добавь её в таблицу.

2. **Создай page-слайс:**
   ```
   src/pages/<page-name>/
     index.ts                  # export { default as ProgramsPage } from './ui/programs-page.vue';
     ui/<page-name>-page.vue   # композиция из widgets
   ```
   Page только компонует виджеты и передаёт им данные из entities. Собственной разметки-логики — минимум; если появляется крупный блок, это повод для нового widget (skill `fsd-slice`).

3. **Создай тонкий роут** (каталог роутинга Nuxt перенесён в `src/app/routes` через `dir.pages`):
   ```vue
   <!-- src/app/routes/programs.vue -->
   <script setup lang="ts">
   import { ProgramsPage } from '@/pages/programs';
   import { useSeo } from '@/shared/lib';

   useSeo({
     title: 'Программы обучения — SBA Academy',
     description: '…',
   });
   </script>

   <template>
     <ProgramsPage />
   </template>
   ```
   Максимум ~10 строк. Никакой логики, разметки и данных в роуте.

4. **Метаданные обязательны:** `useSeo()` из `shared/lib` с title вида `«<Название> — SBA Academy»` и description на русском — он же ставит canonical, Open Graph и Twitter-карточку (домен/картинка — `siteConfig`); юридические страницы (privacy, oferta) — `noindex: true` плюс `Disallow` в `public/robots.txt`. Sitemap собирается сам после `generate`. Это маркетинговый сайт — SEO важно.

5. **Навигация:** если страница должна быть в меню/футере — добавь её в `shared/config/navigation` (header/footer берут пункты оттуда, не хардкодят).

6. **Проверь SSG:** страница должна пререндериться `nuxi generate` (crawlLinks обходит внутренние ссылки; страницы без входящих ссылок добавить в `nitro.prerender.routes`).

7. **Проверь:** `npm run check` (lint + steiger + typecheck + generate).
