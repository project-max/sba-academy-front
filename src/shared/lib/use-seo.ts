import { useHead, useRoute, useSeoMeta } from '#imports';
import { siteConfig } from '@/shared/config';

export interface SeoOptions {
  /** заголовок вкладки и карточки — уже с суффиксом бренда, как в docs/pages.md */
  title: string;
  /** обязателен для индексируемых страниц; для noindex не нужен */
  description?: string;
  /** страница закрыта от индексации (юридические тексты, ошибки) */
  noindex?: boolean;
}

/**
 * Метатеги страницы в одном вызове: title/description, канонический URL,
 * Open Graph и Twitter-карточка. Путь берётся из текущего роута, картинка
 * и домен — из siteConfig. Вызывать в файле роута (src/app/routes).
 */
export function useSeo({ title, description, noindex = false }: SeoOptions) {
  const route = useRoute();
  // canonical без завершающего слэша (кроме корня): SSG кладёт страницы в
  // папки, и /programs с /programs/ иначе индексируются как дубли
  const pathname = route.path.replace(/\/+$/, '') || '/';
  const url = `${siteConfig.url}${pathname === '/' ? '/' : pathname}`;

  useHead({
    title,
    link: [{ rel: 'canonical', href: url }],
  });

  useSeoMeta({
    description,
    robots: noindex ? 'noindex' : undefined,
    ogType: 'website',
    ogSiteName: siteConfig.name,
    ogLocale: siteConfig.locale,
    ogTitle: title,
    ogDescription: description,
    ogUrl: url,
    ogImage: `${siteConfig.url}${siteConfig.ogImage}`,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: `${siteConfig.url}${siteConfig.ogImage}`,
  });
}
