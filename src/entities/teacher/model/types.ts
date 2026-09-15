export interface Teacher {
  id: string;
  name: string;
  /** роли/регалии — рендер соединяет « · » */
  roles: string[];
  /** развёрнутая биография (у ключевого спикера) */
  bio?: string;
  education?: string;
  /** темы-специализации — чипы в списке экспертов на странице «Лекторы» */
  tags?: string[];
  /** id курсов (entities/course), которые ведёт — чипы «Ведёт курсы» */
  courseIds?: string[];
  /** путь в public/images/teacher/; null — фото ещё не предоставлено (заглушка) */
  photo: string | null;
  /** ключевой спикер (большая фиолетовая карточка) */
  featured?: boolean;
}
