export interface NavItem {
  label: string;
  href: string;
}

// подписи — по макету хедера от 2026-08-11
export const mainNav: NavItem[] = [
  { label: 'Программы', href: '/programs' },
  { label: 'Лекторы', href: '/lectors' },
  { label: 'Экосистема', href: '/ecosystem' },
  { label: 'О школе', href: '/about' },
  { label: 'Лицензии', href: '/license' },
];

export const cabinetUrl = 'https://cabinet.academysba.pro';

// главное действие в мобильном меню (макет «Menu panel», 2026-09-14)
export const mobileMenuCta: NavItem = { label: 'Смотреть программу', href: '/programs' };
