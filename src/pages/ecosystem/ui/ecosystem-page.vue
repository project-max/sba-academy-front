<script setup lang="ts">
import { BadgeCard, LinkBar } from '@/shared/ui';
import { ecosystemPageContent } from '../model/ecosystem-page-content';

const content = ecosystemPageContent;
</script>

<template>
  <div class="ecosystem">
    <section class="container ecosystem__hero" aria-labelledby="ecosystem-title">
      <div class="section-inner">
        <h1 id="ecosystem-title" class="ecosystem__title display-l">{{ content.title }}</h1>
        <p class="ecosystem__intro body-l">{{ content.intro }}</p>

        <div class="ecosystem__card">
          <h2 class="ecosystem__card-title heading-l">{{ content.hero.title }}</h2>
          <p class="ecosystem__card-text body-l">{{ content.hero.text }}</p>
          <dl class="ecosystem__stats">
            <div v-for="stat in content.hero.stats" :key="stat.value" class="ecosystem__stat">
              <dt class="ecosystem__stat-label body-s">{{ stat.label }}</dt>
              <dd class="ecosystem__stat-value heading-l">{{ stat.value }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <section class="container ecosystem__products" aria-labelledby="products-title">
      <div class="section-inner">
        <h2 id="products-title" class="ecosystem__section-title heading-l">
          {{ content.products.title }}
        </h2>
        <p class="ecosystem__section-subtitle body-m">{{ content.products.subtitle }}</p>

        <!-- role="list": list-style none снимает семантику списка в Safari/VoiceOver -->
        <ul class="ecosystem__products-grid" role="list">
          <li
            v-for="product in content.products.items"
            :key="product.id"
            :class="{ 'ecosystem__products-wide': product.highlight }"
          >
            <BadgeCard
              :badge="product.badge"
              :badge-theme="product.badgeTheme"
              :title="product.title"
              :description="product.description"
              :tags="product.tags"
              :highlight="product.highlight"
            />
          </li>
        </ul>
      </div>
    </section>

    <section class="container ecosystem__journey" aria-labelledby="journey-title">
      <div class="section-inner">
        <h2 id="journey-title" class="ecosystem__section-title heading-l">
          {{ content.journey.title }}
        </h2>
        <p class="ecosystem__section-subtitle body-m">{{ content.journey.subtitle }}</p>

        <!-- ol: шаги маршрута упорядочены; стрелки между карточками — декор (::after) -->
        <ol class="ecosystem__steps" role="list">
          <li
            v-for="(step, index) in content.journey.steps"
            :key="step.title"
            class="ecosystem__step"
          >
            <span class="ecosystem__step-number label-s">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            <h3 class="ecosystem__step-title heading-s">{{ step.title }}</h3>
            <p class="ecosystem__step-text body-s">{{ step.text }}</p>
          </li>
        </ol>

        <LinkBar class="ecosystem__course-link" :to="content.courseLink.href" icon="violet">
          {{ content.courseLink.label }}
        </LinkBar>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
// Раскладка из SVG-макета «Ecosystem — Desktop 1440» (2026-08-14);
// мобильный адаптив — по паттернам главной (макет 390)
.ecosystem {
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

  // ── фиолетовая карточка с статистикой ──────────────────────────────
  &__card {
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

  &__card-title {
    max-width: 36rem; // перенос в две строки, как в макете
    margin: 0;
  }

  &__card-text {
    max-width: 44rem; // оценка: ~700px по переносам макета
    margin: 2.25rem 0 0; // 36px из макета
    color: var(--accent-lavender-pale);
  }

  &__stats {
    display: grid;
    // minmax(0, …): «400 000+» и подписи не должны распирать колонки
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 4rem; // 64px из макета
    margin: 2.75rem 0 0; // 44px из макета

    @include bp.mobile {
      grid-template-columns: 1fr; // стеком на мобильном
      gap: 1rem;
      margin-top: 1.5rem;
    }
  }

  // dt идёт перед dd семантически, визуально значение сверху
  &__stat {
    display: flex;
    flex-direction: column;
  }

  &__stat-value {
    margin: 0;
    order: -1;
    color: var(--brand-lime);
  }

  &__stat-label {
    margin: 0.375rem 0 0; // 6px из макета
    color: var(--accent-lavender-pale);
  }

  // ── общие заголовки секций ─────────────────────────────────────────
  &__products,
  &__journey {
    margin-top: 5rem; // 80px из макета

    @include bp.mobile {
      margin-top: 4.5rem; // 72px — мобильный ритм секций
    }
  }

  &__section-title {
    margin: 0;
  }

  &__section-subtitle {
    margin: 0.875rem 0 0; // 14px из макета
    color: var(--text-muted);
  }

  // ── сетка продуктов ────────────────────────────────────────────────
  &__products-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem; // 24px из макета
    margin: 2rem 0 0; // 32px из макета
    padding: 0;
    list-style: none;

    // li — прослойка сетки: карточка растягивается на высоту ряда
    > li {
      display: grid;
    }

    @include bp.tablet-only {
      grid-template-columns: 1fr;
    }

    @include bp.mobile {
      grid-template-columns: 1fr;
      gap: 1rem; // 16px из мобильного макета (390)
      margin-top: 1.5rem;
    }
  }

  // широкая карточка занимает оба столбца; ниже 1200 сетка одноколоночная —
  // переопределение не нужно
  &__products-wide {
    grid-column: 1 / -1;
  }

  // ── маршрут пользователя ───────────────────────────────────────────
  &__steps {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 3rem; // 48px из макета
    margin: 2rem 0 0; // 32px из макета
    padding: 0;
    list-style: none;

    @include bp.tablet-only {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }

    @include bp.mobile {
      grid-template-columns: 1fr;
      gap: 1rem; // 16px из мобильного макета (390)
      margin-top: 1.5rem;
    }
  }

  &__step {
    position: relative;
    padding: 1.75rem; // 28px из макета
    background-color: var(--surface-cream);
    border-radius: 1.5rem; // 24px из макета

    // шеврон в центре зазора между карточками (у последней не рисуем)
    &:not(:last-child)::after {
      content: '';
      position: absolute;
      top: 50%;
      right: -1.75rem; // центр зазора 48px
      width: 0.5rem;
      height: 0.5rem;
      border-top: 2px solid var(--text-muted);
      border-right: 2px solid var(--text-muted);
      transform: translateY(-50%) rotate(45deg);
    }

    // сетка 2×2: зазор уже десктопного, а у карточек в конце ряда шеврон
    // указывал бы за край сетки
    @include bp.tablet-only {
      &:not(:last-child)::after {
        right: -0.75rem; // центр зазора 24px
      }

      &:nth-child(even)::after {
        display: none;
      }
    }

    @include bp.mobile {
      padding: 1.5rem; // 24px из мобильного макета (390)

      &:not(:last-child)::after {
        display: none; // шевроны не нужны в стеке
      }
    }
  }

  &__step-number {
    display: block;
    color: var(--text-muted);
  }

  &__step-title {
    margin: 0.75rem 0 0; // 12px из макета
  }

  &__step-text {
    margin: 0.75rem 0 0; // 12px из макета
    color: var(--text-muted);
  }

  &__course-link {
    margin-top: 3rem; // 48px из макета
    border-radius: 2.5rem;

    @include bp.mobile {
      margin-top: 1.5rem;
    }
  }
}
</style>
