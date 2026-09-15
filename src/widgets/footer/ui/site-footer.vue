<script setup lang="ts">
import { NuxtLink } from '#components';
import { AppButton } from '@/shared/ui';
import { footerContent } from '../model/footer-content';
</script>

<template>
  <footer class="container footer">
    <div class="footer__card">
      <div class="footer__grid">
        <div class="footer__about">
          <NuxtLink class="footer__brand" to="/" aria-label="SBA Academy — на главную">
            <span class="footer__logo label-s" aria-hidden="true">SBA</span>
            <span class="footer__brand-name label-m">{{ footerContent.name }}</span>
          </NuxtLink>

          <p class="footer__description body-s">{{ footerContent.description }}</p>

          <!-- role="list": list-style none снимает семантику списка в Safari/VoiceOver -->
          <ul class="footer__contacts" role="list">
            <li v-for="contact in footerContent.contacts" :key="contact.href">
              <a class="footer__contact label-m" :href="contact.href">{{ contact.label }}</a>
            </li>
          </ul>

          <AppButton
            class="footer__support"
            variant="lime"
            size="s"
            :to="footerContent.support.href"
          >
            {{ footerContent.support.label }}
          </AppButton>
        </div>

        <nav
          v-for="column in footerContent.columns"
          :key="column.title"
          class="footer__column"
          :aria-label="column.title"
        >
          <h2 class="footer__column-title label-s">{{ column.title }}</h2>
          <ul class="footer__links" role="list">
            <li v-for="link in column.links" :key="link.label">
              <a
                v-if="link.external"
                class="footer__link body-s"
                :href="link.href"
                target="_blank"
                rel="noopener"
              >{{ link.label }}</a>
              <NuxtLink v-else class="footer__link body-s" :to="link.href">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>

      <hr class="footer__divider">

      <div class="footer__legal">
        <p v-for="line in footerContent.legal" :key="line" class="footer__legal-line label-s">
          {{ line }}
        </p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
// Размеры сняты из SVG-макета «Подвал» (2026-08-13) — экспорт из Figma, значения точные.
// Цвета brand-violet/brand-lime обновлены в палитре до макетных (2026-08-14);
// тёмный текст на лайме #262B1F = --text-on-lime (подтверждено 2026-09-14)
.footer {
  margin-top: 7.5rem; // 120px — по ритму секций
  margin-bottom: 4rem; // 64px из макета: отступ до низа страницы

  @include bp.mobile {
    margin-top: 4.5rem; // 72px — мобильный ритм секций; margin-bottom 64px остаётся
  }

  &__card {
    width: 100%;
    padding: 3.5rem 3.5rem 2.5rem; // 56px, снизу 40px из макета
    color: var(--text-inverse);
    background-color: var(--brand-violet);
    border-radius: 2.5rem; // 40px из макета; на мобиле те же 40px

    @include bp.mobile {
      padding: 1.5rem; // 24px из мобильного макета (390), снизу тоже 24
    }
  }

  // 360px левая колонка + три по 232px; на эталонных 1440px зазоры растягиваются
  // до макетных 48px. Треки сжимаемые (minmax), иначе жёсткая сетка переполняла бы
  // карточку уже на ноутбучных 1280px — медиазапросов не требуется
  &__grid {
    display: grid;
    grid-template-columns: minmax(0, 22.5rem) repeat(3, minmax(0, 14.5rem));
    justify-content: space-between;
    column-gap: 1.5rem;

    @include bp.mobile {
      grid-template-columns: none; // одна колонка: about, затем колонки ссылок стеком
      justify-content: stretch; // space-between не нужен в одной колонке
      row-gap: 1.75rem; // 28px из мобильного макета (390) — между колонками ссылок
    }
  }

  &__brand {
    display: flex;
    gap: 0.875rem; // 14px из макета
    align-items: center;
    color: var(--text-inverse);
    text-decoration: none;
  }

  &__brand-name {
    max-width: 11rem; // перенос в две строки, как в макете
  }

  &__logo {
    display: grid;
    flex-shrink: 0;
    place-items: center;
    width: 3rem; // 48px из макета
    height: 3rem;
    color: var(--text-on-lime); // #262B1F из макета
    background-color: var(--brand-lime);
    border-radius: 1rem; // 16px из макета
  }

  &__description {
    margin: 1.25rem 0 0; // 20px из макета
    opacity: 0.7; // из макета
  }

  &__contacts {
    display: grid;
    gap: 0.5rem; // 8px из макета
    margin: 1.25rem 0 0; // оценка: 20px
    padding: 0;
    list-style: none;
  }

  &__contact {
    color: var(--brand-lime);
    text-decoration: none;
    opacity: 0.9; // из макета

    &:hover {
      text-decoration: underline; // оценка: ховеров в макете нет
    }
  }

  &__support {
    margin-top: 1.25rem; // 20px из макета

    :deep(.button__label) {
      padding: 0.875rem 1.5rem; // высота кнопки 44px из макета (14+16+14)
    }
  }

  &__column-title {
    display: block;
    margin: 0;
    color: var(--brand-lime);
  }

  &__links {
    display: grid;
    gap: 1rem; // 16px из макета
    margin: 1rem 0 0; // 16px из макета
    padding: 0;
    list-style: none;
  }

  &__link {
    color: var(--text-inverse);
    text-decoration: none;
    opacity: 0.8; // из макета
    transition: opacity 0.15s;

    &:hover {
      opacity: 1; // оценка: ховеров в макете нет
    }
  }

  &__divider {
    height: 1px;
    margin: 2.5rem 0; // 40px сверху и снизу из макета
    background-color: var(--text-inverse);
    border: 0;
  }

  &__legal {
    display: grid;
    gap: 0.625rem; // 10px из макета
  }

  &__legal-line {
    margin: 0;
    // TODO(дизайн): белый при 45% на brand-violet ≈ 3.2:1 — ниже WCAG AA 4.5:1
    // для 12px-текста (юридически значимые строки); AA даёт opacity от 0.65
    opacity: 0.45; // из макета
  }
}
</style>
