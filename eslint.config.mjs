import withNuxt from './.nuxt/eslint.config.mjs';
import boundaries from 'eslint-plugin-boundaries';

// Вход в слайс — только через публичный API (у entities дополнительно @x-нотация)
const sliceEntry = { fileInternalPath: 'index.ts' };
const entityEntry = { fileInternalPath: ['index.ts', '@x/*.ts'] };

export default withNuxt(
  // Границы FSD-слоёв (docs/fsd.md). Нарушение чинится переносом кода, не отключением правила
  {
    files: ['src/**/*.{ts,vue}'],
    plugins: { boundaries },
    settings: {
      'boundaries/include': ['src/**/*'],
      // src/app.vue и src/error.vue — инфраструктурные файлы Nuxt вне слоёв FSD
      'boundaries/ignore': ['src/app.vue', 'src/error.vue'],
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app' },
        { type: 'pages', pattern: 'src/pages/*' },
        { type: 'widgets', pattern: 'src/widgets/*' },
        { type: 'features', pattern: 'src/features/*' },
        { type: 'entities', pattern: 'src/entities/*' },
        { type: 'shared', pattern: 'src/shared/*' },
      ],
      // Корневой tsconfig в Nuxt 4 — только project references; paths-алиасы
      // лежат в сгенерированном .nuxt/tsconfig.app.json (нужен `nuxt prepare`)
      'import/resolver': {
        typescript: {
          project: ['.nuxt/tsconfig.app.json'],
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          policies: [
            {
              from: { element: { type: 'app' } },
              allow: [
                { to: { element: { type: ['pages', 'widgets', 'features'], ...sliceEntry } } },
                { to: { element: { type: 'entities', ...entityEntry } } },
                { to: { element: { type: 'shared' } } },
              ],
            },
            {
              from: { element: { type: 'pages' } },
              allow: [
                { to: { element: { type: ['widgets', 'features'], ...sliceEntry } } },
                { to: { element: { type: 'entities', ...entityEntry } } },
                { to: { element: { type: 'shared' } } },
              ],
            },
            {
              from: { element: { type: 'widgets' } },
              allow: [
                { to: { element: { type: 'features', ...sliceEntry } } },
                { to: { element: { type: 'entities', ...entityEntry } } },
                { to: { element: { type: 'shared' } } },
              ],
            },
            {
              from: { element: { type: 'features' } },
              allow: [
                { to: { element: { type: 'entities', ...entityEntry } } },
                { to: { element: { type: 'shared' } } },
              ],
            },
            {
              // entities→entities — только через @x-нотацию кросс-импортов
              from: { element: { type: 'entities' } },
              allow: [
                { to: { element: { type: 'entities', fileInternalPath: '@x/*.ts' } } },
                { to: { element: { type: 'shared' } } },
              ],
            },
            {
              from: { element: { type: 'shared' } },
              allow: [{ to: { element: { type: 'shared' } } }],
            },
          ],
        },
      ],
    },
  },
  // Роуты, layouts и error.vue именуются по URL/конвенции Nuxt — однословные имена легальны
  {
    files: ['src/app/routes/**/*.vue', 'src/app/layouts/**/*.vue', 'src/error.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
);
