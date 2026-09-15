export default defineNuxtConfig({
  compatibilityDate: '2026-08-05',

  modules: ['@nuxt/eslint', '@nuxt/fonts'],

  // Onest self-host'ится на этапе сборки (в рантайме внешних запросов нет),
  // только используемые веса и сабсеты, woff2, метрический fallback против CLS
  fonts: {
    families: [
      {
        name: 'Onest',
        provider: 'google',
        weights: [400, 500, 600, 700, 800],
        styles: ['normal'],
        subsets: ['cyrillic', 'latin'],
      },
    ],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
    },
  },

  // FSD-слои живут в src/ (docs/fsd.md). Без этого Nuxt 4 считал бы
  // корневой каталог app/ своим srcDir и сканировал бы слой app как исходники
  srcDir: 'src/',

  // Роутинг Nuxt — тонкие файлы внутри FSD-слоя app (пути относительны srcDir),
  // чтобы каноничный слой pages остался за FSD
  dir: {
    pages: 'app/routes',
    layouts: 'app/layouts',
  },

  // Auto-imports отключены: FSD требует явных импортов через публичные API,
  // иначе eslint-plugin-boundaries не видит зависимости между слоями
  imports: { autoImport: false },
  components: { dirs: [] },

  // <selectedcontent> — нативный элемент customizable select (Chromium 135+),
  // Vue иначе ищет одноимённый компонент. Используется в форме заявки
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === 'selectedcontent',
    },
  },

  css: ['~/app/styles/global.scss'],

  // брейкпоинт-миксины доступны в каждом SCSS-блоке без ручного импорта:
  // @include bp.mobile { … } / bp.tablet-only { … } (см. _breakpoints.scss)
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/app/styles/breakpoints" as bp;',
        },
      },
    },
  },

  // Хостинг не выбран — держим полный SSG (nuxi generate), см. docs/architecture.md.
  // routeRules — страховка: пререндерим все роуты, даже без входящих ссылок
  routeRules: {
    '/**': { prerender: true },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
      // битая внутренняя ссылка или упавшая страница = красная сборка
      failOnError: true,
    },
  },
});
