---
name: fsd-page
description: Создать новую страницу сайта — тонкий роут Nuxt в src/app/routes плюс page-слайс в src/pages по правилам FSD. Использовать при добавлении любого нового URL/страницы.
---

# Создание страницы (роут + page-слайс)

Правила проекта: `docs/fsd.md`. Список страниц и их секций: `docs/pages.md`.

## Шаги

1. **Сверься с `docs/pages.md`** (таблица «Реализация в коде»). Конвенция именования: **роут — транслитом как в URL** (`oferta.vue`, `kontakty.vue`), **page-слайс — английским kebab-case** (`offer`, `contacts`). Если страницы нет в инвентаризации — сначала добавь её в таблицу.

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
   import { useHead } from '#imports';
   import { ProgramsPage } from '@/pages/programs';

   useHead({
     title: 'Программы обучения — SBA Academy',
     meta: [{ name: 'description', content: '…' }],
   });
   </script>

   <template>
     <ProgramsPage />
   </template>
   ```
   Максимум ~10 строк. Никакой логики, разметки и данных в роуте.

4. **Метаданные обязательны:** `useHead` с title вида `«<Название> — SBA Academy»` и description на русском; юридические страницы (privacy, oferta) — `robots: noindex`. Это маркетинговый сайт — SEO важно.

5. **Навигация:** если страница должна быть в меню/футере — добавь её в `shared/config/navigation` (header/footer берут пункты оттуда, не хардкодят).

6. **Проверь SSG:** страница должна пререндериться `nuxi generate` (crawlLinks обходит внутренние ссылки; страницы без входящих ссылок добавить в `nitro.prerender.routes`).

7. **Проверь:** `npm run check` (lint + steiger + typecheck + generate).
