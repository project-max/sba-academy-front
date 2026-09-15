// Тексты hero — из макета главной (2026-08-11)
export const heroContent = {
  eyebrow: 'Часть образовательной экосистемы DecimalChain',
  // заголовок разбит на части: вокруг accent в макете лаймовый эллипс
  title: {
    pre: 'Smart Business',
    accent: 'Administration',
    post: 'Academy',
  },
  description:
    'Лидеры в области образования в сфере криптовалют и блокчейн-технологий на территории России',
  cta: {
    label: 'Смотреть программу',
    href: '/programs',
  },
  // исходник 443x613 — для retina запросить у дизайнера ~2x крупнее
  photo: { src: '/images/hero/student.webp', width: 443, height: 613 },
  avatars: [
    '/images/hero/avatar-1.webp',
    '/images/hero/avatar-2.webp',
    '/images/hero/avatar-3.webp',
  ],
} as const;
