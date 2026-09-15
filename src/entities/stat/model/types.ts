export interface StatHighlight {
  id: string;
  /** «450+», «93%» — как в макете */
  value: string;
  label: string;
}

/** тема карточки статистики — маппится на токены палитры в ui/stat-card */
export type StatTheme = 'lime' | 'ice' | 'mint' | 'lavender';
