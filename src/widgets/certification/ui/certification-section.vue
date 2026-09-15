<script setup lang="ts">
import { LinkBar, PartnerLogos } from '@/shared/ui';
import { certificationContent } from '../model/certification-content';
</script>

<template>
  <section class="container certification" aria-labelledby="certification-title">
    <div class="section-inner">
      <!-- в мобильной версии из секции остаётся только карточка партнёрства:
           заголовок, бланки уровней и плашки-ссылки скрыты (решение
           заказчика 2026-09-14). aria-labelledby на скрытый h2 работает -->
      <h2 id="certification-title" class="certification__title display-l u-mobile-hidden">
        {{ certificationContent.title }}
      </h2>

      <div class="certification__grid u-mobile-hidden">
        <article
          v-for="card in certificationContent.cards"
          :key="card.id"
          class="certification__card"
        >
          <!-- бланк с лентой — SVG-ассеты от дизайнера, свой для каждого уровня -->
          <img
            class="certification__doc"
            :src="card.badge.src"
            :width="card.badge.width"
            :height="card.badge.height"
            alt=""
            loading="lazy"
          >

          <div class="certification__card-info">
            <h3 class="certification__card-title heading-m">{{ card.title }}</h3>
            <p class="certification__card-text body-s">{{ card.description }}</p>
          </div>
        </article>
      </div>

      <div class="certification__partner">
        <PartnerLogos class="certification__logos" />
        <h3 class="certification__partner-title heading-m">
          {{ certificationContent.partner.title }}
        </h3>
        <p class="certification__partner-note body-s">{{ certificationContent.partner.note }}</p>
      </div>

      <div class="certification__links u-mobile-hidden">
        <LinkBar
          v-for="link in certificationContent.links"
          :key="link.href"
          :to="link.href"
          icon="violet"
        >
          <strong>{{ link.strong }}</strong>&nbsp;— {{ link.note }}
        </LinkBar>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
// Набросок по макету секции «Что вы получаете по итогам» (2026-08-13):
// размеры с пометкой «оценка» — уточнить
.certification {
  margin-top: 7.5rem; // 120px — по ритму секций

  @include bp.mobile {
    margin-top: 4.5rem; // 72px — мобильный ритм секций (макет 390)
  }

  &__title {
    margin: 0 0 3rem; // оценка: 48px
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem; // 24px
    margin-bottom: 11.6875rem; // 187px из макета: под выступающие бланки

    // на планшете двум карточкам с бланками тесно — одна колонка (наше решение);
    // row-gap под выступы бланков (низ верхнего + лента нижнего, правка
    // пользователя: 4rem — лента заходит за висящий бланк, наезда текста нет)
    @include bp.tablet-only {
      grid-template-columns: 1fr;
      row-gap: 4rem;
    }

    @include bp.mobile {
      grid-template-columns: 1fr; // одна колонка
      gap: 1rem; // 16px из мобильного макета (390)
      margin-bottom: 1rem; // 16px: бланки скрыты, запас под выступ не нужен
    }
  }

  &__card {
    position: relative;
    display: flex;
    gap: 2.25rem; // оценка: 36px
    align-items: center; // текст по центру вертикали
    height: 18.75rem; // 300px из макета
    padding: 2.5rem; // 40px из макета
    background-color: var(--surface-cream);
    border-radius: 2.5rem; // оценка: 40px

    @include bp.mobile {
      align-items: flex-start; // без бланка текст идёт обычным потоком
      height: auto; // фиксированные 300px снимаем
      padding: 1.5rem; // 24px из мобильного макета (390)
    }
  }

  // бланк с лентой (SVG 199×416): верхний отрицательный margin приводит ленту
  // к краю карточки, нижний — выпускает бланк за её нижнюю границу, как в макете
  &__doc {
    flex-shrink: 0;
    align-self: flex-start; // бланк держится за верх, текст центрируется
    width: 11rem; // 176px из макета
    height: 25.15rem; // 402.4px из макета
    margin-top: -5.5rem; // -88px из макета: лента выходит выше края карточки
    margin-bottom: -7.5rem; // оценка: выпускает бланк за нижнюю границу

    @include bp.mobile {
      display: none; // в мобильном макете (390) бланков нет
    }
  }

  &__card-title {
    margin: 0 0 0.75rem; // 12px из макета
  }

  &__card-text {
    margin: 0;
    color: var(--text-muted);
  }

  // ── карточка партнёрства ───────────────────────────────────────────
  &__partner {
    margin-bottom: 3rem; // 48px из макета
    padding: 3rem; // оценка: 48px
    color: var(--text-inverse);
    background-color: var(--brand-violet);
    border-radius: 2.5rem; // оценка: 40px

    @include bp.mobile {
      // отступ 48 был до плашек-ссылок — на мобильном они скрыты, и без
      // сброса он суммировался бы с ритмом секций (секция — флекс-элемент
      // страницы, margin не схлопывается)
      margin-bottom: 0;
      padding: 1.5rem; // 24px из мобильного макета (390)
    }
  }

  &__logos {
    margin-bottom: 1.5rem; // 24px из макета
  }

  &__partner-title {
    max-width: 64rem; // оценка
    margin: 0 0 1.5rem; // 24px из макета
  }

  &__partner-note {
    max-width: 56rem; // оценка
    margin: 0;
    color: var(--accent-lavender-pale);
  }

  &__links {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem; // 24px

    @include bp.mobile {
      grid-template-columns: 1fr; // одна колонка
      gap: 0.75rem; // 12px из мобильного макета (390)

      :deep(.link-bar) {
        border-radius: 999px; // капсула из мобильного макета (390)
      }
    }

    // «Экспертиза»/«Практика» — основной цвет, пояснение — приглушённый
    :deep(.label-m) {
      color: var(--text-muted);

      strong {
        color: var(--text-primary);
      }
    }
  }
}
</style>
