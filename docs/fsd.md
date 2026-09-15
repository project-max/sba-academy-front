# Feature-Sliced Design в проекте (Vue 3 + Nuxt 4)

Каноническая методология: https://feature-sliced.design/. Здесь — её адаптация под наш проект и Nuxt 4. Скаффолдинг завершён — документ описывает фактическое состояние.

## Слои (сверху вниз)

Импорты разрешены **только вниз**. Слой не знает о слоях выше себя и о соседних слайсах своего слоя.

| Слой | Что здесь в нашем проекте | Примеры слайсов |
|---|---|---|
| `app` | Роуты Nuxt (тонкие), layouts, глобальные стили, провайдеры, аналитика | `routes/`, `layouts/`, `styles/` |
| `pages` | Композиция страницы из виджетов (каноничный слой FSD — роутинг Nuxt вынесен, конфликта нет) | `home`, `programs`, `teachers`, `about` |
| `widgets` | Крупные самодостаточные блоки страниц | `header`, `footer`, будущие `hero`, `course-catalog`, `teachers-slider` |
| `features` | Действия пользователя, несущие бизнес-ценность | `submit-application` |
| `entities` | Бизнес-сущности: типы + контент-данные + базовые карточки | `course`, `teacher`, `review` |
| `shared` | Переиспользуемое без привязки к бизнесу | `ui`, `api`, `lib`, `config` |

Слой `processes` не используем (deprecated в FSD 2.x). Сегменты внутри слайса: `ui/`, `model/`, `lib/`, `api/` — создаются только по необходимости, не «про запас».

## Интеграция с Nuxt 4

Конфликты каталогов Nuxt (`app/`, `pages/`) со слоями FSD решены в `nuxt.config.ts`:

- `srcDir: 'src/'` — весь код в `src/`; без этого Nuxt 4 считал бы корневой `app/` своим srcDir;
- `dir.pages: 'app/routes'` (путь относителен srcDir) — файлы роутинга живут **внутри FSD-слоя app**, слой `pages` целиком принадлежит FSD;
- `dir.layouts: 'app/layouts'`;
- `imports.autoImport: false` и `components: { dirs: [] }` — **auto-imports отключены**: FSD требует явных импортов через публичные API, иначе eslint-plugin-boundaries не видит зависимости. Composables Nuxt (`useHead`, `useRoute`…) — явно из `#imports`, компоненты Nuxt (`NuxtLink`, `NuxtPage`…) — из `#components`.

Инфраструктурные файлы Nuxt `src/app.vue` и `src/error.vue` обязаны лежать в корне srcDir — они вне слоёв FSD, держим их тонкими (исключены из boundaries через `boundaries/ignore`).

```
nuxt.config.ts
src/
  app.vue                  # NuxtLayout + NuxtPage, ничего больше
  error.vue                # 404/ошибки (статический 404.html при generate)
  app/                     # FSD-слой app
    routes/                # роутинг Nuxt — ТОЛЬКО тонкие файлы (~10 строк)
    layouts/default.vue    # SiteHeader + slot + SiteFooter
    styles/global.scss     # без переменных, пока дизайн не утверждён
  pages/<slice>/           # index.ts + ui/<slice>-page.vue
  widgets/ features/ entities/ shared/
```

Пример тонкого роута — `src/app/routes/programs.vue`:

```vue
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

## Правила импортов

1. Только вниз по слоям: `pages → widgets → features → entities → shared` (роуты из `app` импортируют `pages`).
2. Слайс импортирует другой слайс **только через его `index.ts`** (публичный API), не лезет во внутренности.
3. Кросс-импорты внутри одного слоя запрещены. Исключение для `entities` — через нотацию `@x` (https://feature-sliced.design/docs/reference/public-api#public-api-for-cross-imports), только при реальной необходимости.
4. `shared` не импортирует ничего, кроме `shared`. В `shared` вход по сегментам (`@/shared/ui`, `@/shared/api`, `@/shared/config`, `@/shared/lib`).
5. Алиас `@/*` → `src/*` (стандартный алиас Nuxt при `srcDir: 'src/'`). Относительные импорты — только внутри своего слайса.

## Контроль: ESLint (boundaries) + Steiger

**Источник истины — реальные конфиги в корне репозитория**, не этот документ:

- [`eslint.config.mjs`](../eslint.config.mjs) — база от `@nuxt/eslint` (`withNuxt`), поверх — `eslint-plugin-boundaries` v7: правило `boundaries/dependencies` с `policies` кодирует и направление слоёв, и вход только через публичный API (`fileInternalPath: 'index.ts'`, у entities + `@x/*.ts`). Резолв алиаса `@` — `eslint-import-resolver-typescript` по **`.nuxt/tsconfig.app.json`** (корневой tsconfig в Nuxt 4 — лишь project references), поэтому линт работает только после `nuxt prepare` — он в `postinstall`. Однословные имена разрешены точечно для `src/app/routes/**`, `src/app/layouts/**`, `src/error.vue`.
- [`steiger.config.ts`](../steiger.config.ts) — `fsd.configs.recommended`; отключён `fsd/insignificant-slice` (на этапе каркаса страницы ссылаются на слайсы по одному разу — правило шумит; пересмотреть, когда появятся виджеты секций). Пакеты `steiger` и `@feature-sliced/steiger-plugin` — прямые devDependencies (plugin импортируется в конфиге), обновлять парой.

Проверено на скаффолдинге: правило ловит нарушения (тест shared → widgets падал с внятной ошибкой). Запуск: `npm run lint` / `npm run lint:fsd`, оба входят в `npm run check`.

## Маппинг блоков референса на слайсы

| Блок на сайте | Слой/слайс |
|---|---|
| Шапка с навигацией, бургер-меню | `widgets/header` ✅ каркас |
| Подвал | `widgets/footer` ✅ каркас |
| Hero главной | `widgets/hero` ✅ |
| Целевые аудитории (3 карточки) | `widgets/audience` + `entities/audience` ✅ |
| Флагманский курс (карточка с ценой) | `widgets/flagship-course` + `entities/course` ✅ |
| Каталог курсов на главной («Программы обучения»: 2 карточки + плашка каталога) | `widgets/program` + `entities/course` ✅ |
| Полный каталог с аккордеонами программ (страница /programs) | `widgets/course-catalog` + `entities/course` |
| Преподаватели («Кто ведёт занятия»: featured-карточка + грид экспертов; в новом дизайне грид, не слайдер) | `widgets/teacher` + `entities/teacher` (переиспользуемая `TeacherCard`) ✅ (фото — заглушки) |
| Блок отзывов | `widgets/reviews` + `entities/review` |
| Блок экосистемы (главная) | `widgets/ecosystem` + `entities/stat` ✅ (заглушка карточки Decimal — ждёт ассет); `entities/ecosystem-service` — для страницы /ecosystem, ещё не создана |
| Статистика доверия («Почему нам доверяют») | `widgets/trust` + `entities/stat` (переиспользуемая `StatCard`) ✅ |
| Сертификация («Что вы получаете по итогам») | `widgets/certification` ✅ (бланки и лого АИРП — заглушки, ждут ассеты) |
| Форма заявки | `features/submit-application` ✅ каркас |
| Кнопки, аккордеон, карусель, видеоплеер | `shared/ui` |
| Пункты навигации (меню + футер) | `shared/config/navigation` ✅ |

## Данные контента

Контент живёт в `model`-сегменте своей entity:

```
src/entities/course/
  index.ts                # export type { Course }; export { courses }
  model/types.ts
  model/courses.data.ts   # 4 курса с реальными данными референса (тексты черновые)
  ui/course-card.vue      # появится вместе с дизайном
```

Правка контента = правка data-файла, компоненты не трогаются (см. skill `/add-content`).

## SFC-соглашения

- `<script setup lang="ts">`, затем `<template>`, затем `<style lang="scss" scoped>`.
- Файлы компонентов — kebab-case и **минимум два слова** (`site-header.vue`, `course-card.vue`) — правило `vue/multi-word-component-names`; экспорт из `index.ts` слайса — PascalCase.
- SCSS: `@use`/`@forward` (никаких `@import` — deprecated в sass). Цвета — **только** `var(--токен)` из `src/app/styles/_colors.scss` (custom properties доступны в scoped-стилях без импортов); сырые hex запрещены. Темозависимые свойства — через семантические токены (surface-*/text-*/border-*), не через палитру напрямую: это условие бесплатной тёмной темы. Типографика — **только классами шкалы** из `_typography.scss` (`display-xl` … `label-s`): тег по семантике, класс по макету (`<h1 class="display-l">`); произвольные font-size/font-weight/letter-spacing в компонентах запрещены. Токены брейкпоинтов ещё не заведены — значения из макета до их появления писать литералами с пометкой `// TODO: токен`.
- Props/emits — типизированные (`defineProps<{…}>()`).
- Осторожно с типографскими символами в коде: неразрывный пробел и т.п. — только через `\u`-эскейпы (` `), иначе `no-irregular-whitespace`.
