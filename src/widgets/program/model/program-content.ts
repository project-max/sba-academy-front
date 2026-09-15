// Тексты секции «Программы обучения» — из макета (2026-08-13)
export const programContent = {
  title: 'Программы обучения',
  /** какие курсы показаны в превью каталога (данные — entities/course) */
  courseIds: ['osnovy-ekosistemy', 'kriptovalyuta-i-virtualnye-aktivy'],
  metaLabels: {
    level: 'Уровень',
    format: 'Формат',
    duration: 'Длительность',
  },
  ctaLabel: 'Смотреть программу',
  catalog: {
    label: 'Весь каталог программ',
    href: '/programs',
  },
} as const;
