import type { NavItem } from '@/shared/config';
import { cabinetUrl } from '@/shared/config';

interface FooterLink extends NavItem {
  /** внешняя ссылка → <a target="_blank"> */
  external?: boolean;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface FooterContent {
  name: string;
  description: string;
  contacts: FooterLink[];
  support: FooterLink;
  columns: FooterColumn[];
  legal: string[];
}

// Тексты подвала — дословно из SVG-макета «Подвал» (2026-08-13).
// Футер одинаковый на всех страницах (рендерится в app/layouts/default.vue)
export const footerContent: FooterContent = {
  name: 'Smart Business Administration Academy',
  description:
    'Образовательное направление экосистемы DecimalChain. Обучение криптовалютам и блокчейн-технологиям с 2021 года.',
  // TODO: контакты-заглушки прямо из макета — заменить, когда заказчик даст реальные
  contacts: [
    { label: 'hello@sbaacademy.ru — заглушка', href: 'mailto:hello@sbaacademy.ru' },
    { label: '+7 000 000-00-00 — заглушка', href: 'tel:+70000000000' },
  ],
  // TODO: канал поддержки не выбран (почта/телеграм?) — пока почта-заглушка
  support: { label: 'Написать в поддержку', href: 'mailto:hello@sbaacademy.ru' },
  columns: [
    {
      title: 'Обучение',
      links: [
        { label: 'Программы обучения', href: '/programs' },
        { label: 'Флагманский курс', href: '/programs#kriptovalyuta-i-virtualnye-aktivy' },
        // TODO: куда ведёт «Демо-доступ» — уточнить (пока базовый курс)
        { label: 'Демо-доступ', href: '/programs#osnovy-ekosistemy' },
        { label: 'Личный кабинет', href: cabinetUrl, external: true },
      ],
    },
    {
      title: 'О школе',
      links: [
        { label: 'Кто ведёт занятия', href: '/lectors' },
        { label: 'Экосистема DecimalChain', href: '/ecosystem' },
        // TODO: рейтинг на старом сайте вёл на rating.php — куда ведём теперь?
        { label: 'Рейтинг по отзывам', href: '/about' },
        { label: 'Контакты', href: '/kontakty' },
      ],
    },
    {
      title: 'Документы',
      links: [
        { label: 'Лицензия на образовательную деятельность', href: '/license' },
        { label: 'Договор оферты', href: '/oferta' },
        { label: 'Политика конфиденциальности', href: '/privacy' },
        // TODO: отдельной страницы согласия нет — пока ведём на политику
        { label: 'Согласие на обработку данных', href: '/privacy' },
      ],
    },
  ],
  legal: [
    // TODO: реквизиты-заглушки из макета — дождаться данных юрлица
    // (формулировка обновлена по макету «Экосистема» 2026-08-14)
    'ООО «Наименование» · ИНН 0000000000 · ОГРН 0000000000000 · Юридический адрес: — · Реквизиты требуют подтверждения',
    'Удостоверение о повышении квалификации выдаётся Корпоративным университетом Ассоциации институтов развития предпринимательства. Лицензия № Л035-01298-77/00179696 от 17.01.2022 г.',
    'Информация на сайте не является публичной офертой и не является индивидуальной инвестиционной рекомендацией.',
    '© 2026 Smart Business Administration Academy. Часть образовательной экосистемы DecimalChain.',
  ],
};
