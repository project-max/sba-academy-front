/** тема карточки — маппится на токены палитры в виджете */
export type AudienceTheme = 'lime' | 'ice' | 'lavender';

export interface Audience {
  id: string;
  theme: AudienceTheme;
  badges: string[];
  title: string;
  description: string;
  photo: { src: string; width: number; height: number };
  /** куда ведёт «Подробнее» */
  href: string;
}
