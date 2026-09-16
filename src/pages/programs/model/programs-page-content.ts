// Тексты страницы «Программы» — дословно из SVG-макета «Programs — Desktop 1440»
// (2026-08-15, экспорт с текстом)
export const programsPageContent = {
  title: 'Программы обучения',
  intro:
    'От первого знакомства с экосистемой до разбора токеномики. Курсы выстроены по уровню: с нуля, для бизнеса и для тех, кто уже работает в криптоиндустрии.',
  // состав и порядок карточек на странице; «Токеномики» в макете нет —
  // TODO: уточнить у заказчика, появится ли она на /programs
  courseIds: [
    'osnovy-ekosistemy',
    'kriptovalyuta-i-virtualnye-aktivy',
    'biznes-na-partnerskih-programmah',
  ],
  labels: {
    skills: 'Чему вы научитесь',
    audience: 'Для кого',
    program: 'Программа курса',
    buy: 'Купить курс',
    cabinet: 'Войти в личный кабинет',
    details: 'Узнать подробнее',
  },
} as const;
