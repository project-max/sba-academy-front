<script setup lang="ts">
import { LinkBar, PartnerLogos } from '@/shared/ui';
import { aboutPageContent } from '../model/about-page-content';

const content = aboutPageContent;
</script>

<template>
  <div class="about">
    <section class="container about__hero" aria-labelledby="about-title">
      <div class="section-inner">
        <h1 id="about-title" class="about__title display-l">{{ content.title }}</h1>
        <p class="about__intro body-l">{{ content.intro }}</p>

        <!-- манифест -->
        <article class="about__manifesto">
          <h2 class="about__manifesto-title heading-l">{{ content.manifesto.title }}</h2>
          <p class="about__manifesto-text body-l">{{ content.manifesto.text }}</p>
        </article>
      </div>
    </section>

    <section class="container about__principles" aria-labelledby="principles-title">
      <div class="section-inner">
        <h2 id="principles-title" class="about__section-title heading-l">
          {{ content.principles.title }}
        </h2>
        <!-- role="list": list-style none снимает семантику списка в Safari/VoiceOver -->
        <ul class="about__principles-grid" role="list">
          <li
            v-for="item in content.principles.items"
            :key="item.title"
            class="about__principle"
          >
            <span
              class="about__principle-accent"
              :class="`about__principle-accent--${item.accent}`"
              aria-hidden="true"
            />
            <h3 class="about__principle-title heading-s">{{ item.title }}</h3>
            <p class="about__principle-text body-s">{{ item.text }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="container about__history" aria-labelledby="history-title">
      <div class="section-inner">
        <h2 id="history-title" class="about__section-title heading-l">
          {{ content.history.title }}
        </h2>
        <!-- ol: вехи упорядочены по времени -->
        <ol class="about__timeline" role="list">
          <li
            v-for="milestone in content.history.milestones"
            :key="milestone.year"
            class="about__milestone"
          >
            <span class="about__milestone-year heading-m">{{ milestone.year }}</span>
            <div class="about__milestone-info">
              <h3 class="about__milestone-title heading-s">{{ milestone.title }}</h3>
              <p class="about__milestone-text body-s">{{ milestone.text }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section class="container about__partner" aria-labelledby="partner-title">
      <div class="section-inner">
        <h2 id="partner-title" class="about__section-title heading-l">
          {{ content.partner.title }}
        </h2>

        <!-- партнёрская карточка, как в секции сертификации на главной -->
        <article class="about__partner-card">
          <PartnerLogos />
          <h3 class="about__partner-title heading-m">{{ content.partner.cardTitle }}</h3>
          <p class="about__partner-note body-s">{{ content.partner.note }}</p>
        </article>

        <LinkBar class="about__programs-link" :to="content.programsLink.href" icon="violet">
          {{ content.programsLink.label }}
        </LinkBar>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
// Раскладка из SVG-макета «About — Desktop 1440» (2026-08-14);
// мобильный адаптив — по паттернам главной (макет 390)
.about {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  &__hero {
    margin-top: 5rem; // 80px из макета

    @include bp.mobile {
      margin-top: 0;
    }
  }

  &__title {
    margin: 0;
  }

  &__intro {
    max-width: 47rem; // оценка: ~750px по переносам макета
    margin: 1.25rem 0 0; // 20px из макета
    color: var(--text-muted);
  }

  // ── манифест ───────────────────────────────────────────────────────
  &__manifesto {
    width: 100%;
    margin-top: 3rem; // 48px из макета
    padding: 3rem; // 48px из макета
    color: var(--text-inverse);
    background-color: var(--brand-violet);
    border-radius: 2.5rem; // 40px из макета

    @include bp.mobile {
      margin-top: 1.5rem;
      padding: 1.5rem; // 24px из мобильного макета (390)
    }
  }

  &__manifesto-title {
    max-width: 32rem; // перенос в две строки, как в макете
    margin: 0;
  }

  &__manifesto-text {
    max-width: 46.5rem; // оценка: ~745px по переносам макета (4 строки)
    margin: 1.5rem 0 0; // 24px из макета
    color: var(--accent-lavender-pale);
  }

  // ── общие заголовки секций ─────────────────────────────────────────
  &__principles,
  &__history,
  &__partner {
    margin-top: 5rem; // 80px из макета

    @include bp.mobile {
      margin-top: 4.5rem; // 72px — мобильный ритм секций
    }
  }

  &__section-title {
    margin: 0;
  }

  // ── принципы обучения ──────────────────────────────────────────────
  &__principles-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem; // 24px из макета
    margin: 2rem 0 0; // 32px из макета
    padding: 0;
    list-style: none;

    @include bp.tablet-only {
      grid-template-columns: 1fr;
    }

    @include bp.mobile {
      grid-template-columns: 1fr;
      gap: 1rem; // 16px из мобильного макета (390)
      margin-top: 1.5rem;
    }
  }

  &__principle {
    padding: 2rem; // 32px из макета
    background-color: var(--surface-cream);
    border-radius: 2.5rem; // 40px из макета

    @include bp.mobile {
      padding: 1.5rem; // 24px из мобильного макета (390)
    }
  }

  // цветная полоска-акцент 48×4
  &__principle-accent {
    display: block;
    width: 3rem;
    height: 0.25rem;
    border-radius: 2px;

    &--ice {
      background-color: var(--accent-ice);
    }

    &--mint {
      background-color: var(--accent-mint);
    }

    &--lime {
      background-color: var(--brand-lime);
    }

    &--lavender {
      background-color: var(--accent-lavender-pale);
    }
  }

  &__principle-title {
    margin: 0.875rem 0 0; // 14px из макета
  }

  &__principle-text {
    margin: 0.875rem 0 0; // 14px из макета
    color: var(--text-muted);
  }

  // ── таймлайн ───────────────────────────────────────────────────────
  &__timeline {
    display: grid;
    gap: 3.5rem; // 56px из макета: между вехами
    margin: 2rem 0 0; // 32px из макета
    padding: 1.75rem 2.25rem; // 28px 36px из макета
    background-color: var(--surface-cream);
    border-radius: 2.5rem; // 40px из макета
    list-style: none;

    @include bp.mobile {
      gap: 2rem; // 32px — компактнее на мобильном
      margin-top: 1.5rem;
      padding: 1.5rem; // 24px из мобильного макета (390)
    }
  }

  // год слева фиксированной колонкой 196px (из макета)
  &__milestone {
    display: grid;
    grid-template-columns: 12.25rem 1fr;

    @include bp.mobile {
      grid-template-columns: 1fr; // год сверху, описание под ним
      gap: 0.25rem;
    }
  }

  &__milestone-year {
    margin: 0;
    // год (heading-m) и заголовок вехи (heading-s) ниже 1200 совпали бы по
    // стилю из-за адаптивного ремапа шкалы — держим кегль макета,
    // иначе иерархия «год → веха» пропадает
    @include bp.tablet-down {
      font-size: 1.75rem;
      line-height: 1.2143;
      letter-spacing: -0.01em;
      font-weight: 700;
    }
  }

  &__milestone-title {
    margin: 0;
  }

  &__milestone-text {
    margin: 0.5rem 0 0; // 8px из макета
    color: var(--text-muted);
  }

  // ── партнёрство ────────────────────────────────────────────────────
  &__partner-card {
    width: 100%;
    margin-top: 2rem; // 32px из макета
    padding: 3rem; // 48px из макета
    color: var(--text-inverse);
    background-color: var(--brand-violet);
    border-radius: 2.5rem; // 40px из макета

    @include bp.mobile {
      padding: 1.5rem; // 24px из мобильного макета (390)
    }
  }

  &__partner-title {
    max-width: 61rem; // перенос в две строки, как в макете
    margin: 1.5rem 0 0; // 24px из макета
  }

  &__partner-note {
    max-width: 47rem; // оценка: ~750px по переносам макета
    margin: 1.5rem 0 0; // 24px из макета
    color: var(--accent-lavender-pale);
  }

  &__programs-link {
    margin-top: 3rem; // 48px из макета
    border-radius: 2.5rem;

    @include bp.mobile {
      margin-top: 1.5rem;
    }
  }
}
</style>
