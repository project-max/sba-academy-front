export interface ProgramItem {
  title: string;
  duration: string;
}

/** урок/модуль детальной программы курса на /programs */
export interface ProgramSection {
  /** «Урок 1. …» / «Модуль 1. …» */
  title: string;
  /** длительность или состав: «29–31 мин», «5 уроков · 23:00» */
  meta: string;
  /** аннотация урока (базовый курс) */
  description?: string;
  /** части урока — рендер с точками-маркерами (базовый курс) */
  parts?: ProgramItem[];
  /** уроки модуля — плоский список (флагман); отсутствие = состав пока не предоставлен */
  lessons?: ProgramItem[];
  /** модуль раскрыт по умолчанию */
  open?: boolean;
}

export interface Course {
  /** slug курса, используется как значение формы и id секции */
  id: string;
  /** якорь на /programs (совпадает со ссылками навигации, см. docs/pages.md) */
  anchor: string | null;
  title: string;
  /** «Базовый курс», «Флагманский курс» и т.п. */
  badge: string | null;
  description: string;
  /** рубли; форматирование — formatPrice из shared/lib */
  price: number;
  /** показатели объёма: ['11 модулей', '52 урока', …] — рендер решает, сколько показать */
  scope: string[];
  /** короткий тизер для каталога программ */
  teaser?: string;
  /** «С нуля», «С нуля → профессиональный» */
  level?: string;
  /** «Видеоуроки + текстовый материал», «…; проверочные тесты» */
  format?: string;
  /** «3 урока, ~65 минут» */
  duration?: string;
  audience: string;
  /** названия уроков/модулей для аккордеона программы */
  program: string[];
  /** развёрнутый тизер карточки на /programs (без него берётся description) */
  pageTeaser?: string;
  /** ссылка на трейлер (rutube/youtube); null — видео в производстве, серая заглушка */
  trailer?: string | null;
  /** развёрнутое описание курса на /programs — абзацы */
  about?: string[];
  /** «Чему вы научитесь» — пункты с чек-маркерами (порядок чтения по рядам сетки) */
  skills?: string[];
  /** «Для кого» — развёрнутый текст для /programs */
  audienceDetail?: string;
  /** детальная программа с таймингами для /programs */
  programSections?: ProgramSection[];
}
