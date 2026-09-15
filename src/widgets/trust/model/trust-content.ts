import type { StatTheme } from '@/entities/stat';

// Тексты и порядок карточек секции «Почему нам доверяют» — из макета (2026-08-12)
export const trustContent = {
  title: 'Почему нам доверяют',
  /** порядок и темы карточек статистики (данные — entities/stat) */
  cards: [
    { statId: 'ecosystem-users-total', theme: 'lime' },
    { statId: 'graduates-goal', theme: 'ice' },
    { statId: 'tokens-growth', theme: 'mint' },
    { statId: 'years-in-education', theme: 'lavender' },
  ] satisfies { statId: string; theme: StatTheme }[],
  rating: {
    label: 'Рейтинг Академии по отзывам учеников',
    // TODO: судьба рейтинга не решена (docs/pages.md) — пока ведёт на старый
    href: 'https://academysba.pro/rating.php',
  },
} as const;
