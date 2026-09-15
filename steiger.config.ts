import { defineConfig } from 'steiger';
import fsd from '@feature-sliced/steiger-plugin';

export default defineConfig([
  ...fsd.configs.recommended,
  {
    // на этапе каркаса страницы ссылаются на слайсы по одному разу —
    // предупреждения о «незначительных» слайсах пока не информативны
    files: ['./src/**'],
    rules: {
      'fsd/insignificant-slice': 'off',
    },
  },
]);
