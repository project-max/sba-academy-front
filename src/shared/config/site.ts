// Публичные данные сайта для метатегов, канонических ссылок и карточек
// в соцсетях. Домен продакшена — academysba.pro (текущий сайт заказчика);
// при переезде на другой домен менять только здесь
export const siteConfig = {
  url: 'https://academysba.pro',
  name: 'SBA Academy',
  /** карточка для соцсетей/мессенджеров, 1200×630 (scripts/make-og-image.js) */
  ogImage: '/og-image.png',
  locale: 'ru_RU',
} as const;
