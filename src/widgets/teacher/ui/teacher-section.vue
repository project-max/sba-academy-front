<script setup lang="ts">
import { teachers, TeacherCard } from '@/entities/teacher';
import { AppButton, ArrowIcon } from '@/shared/ui';
import { teacherContent } from '../model/teacher-content';

const featured = teachers.find((t) => t.featured);
const experts = teachers.filter((t) => !t.featured);
</script>

<template>
  <section class="container teacher" aria-labelledby="teacher-title">
    <div class="section-inner">
      <h2 id="teacher-title" class="teacher__title display-l">{{ teacherContent.title }}</h2>
      <p class="teacher__subtitle body-l">{{ teacherContent.subtitle }}</p>

      <article v-if="featured" class="teacher__featured">
        <img
          v-if="featured.photo"
          class="teacher__featured-photo"
          :src="featured.photo"
          alt=""
          loading="lazy"
        >
        <div v-else class="teacher__featured-photo teacher__featured-photo--placeholder" />

        <div class="teacher__featured-info">
          <h3 class="teacher__featured-name heading-l">{{ featured.name }}</h3>
          <p class="teacher__featured-roles body-m">{{ featured.roles.join(' · ') }}</p>
          <p v-if="featured.bio" class="teacher__featured-bio body-s">{{ featured.bio }}</p>
          <p v-if="featured.education" class="teacher__featured-education body-s">
            {{ featured.education }}
          </p>
        </div>
      </article>

      <div class="teacher__grid">
        <div class="teacher__text-card teacher__text-card--experts">
          <h3 class="heading-l teacher__text-card-title">{{ teacherContent.expertsCard.title }}</h3>
          <p class="teacher__text-card-note body-s">{{ teacherContent.expertsCard.text }}</p>
          <!-- в мобильной версии карточка берёт на себя переход к составу
               (карточка «Все преподаватели» там скрыта) — макет 350×300 -->
          <AppButton
            class="u-mobile-only"
            :to="teacherContent.allCard.href"
            variant="white"
            size="s"
          >
            {{ teacherContent.allCard.ctaLabel }}
          </AppButton>
        </div>

        <!-- карточки экспертов и «Все преподаватели» в мобильной версии
             скрыты (решение заказчика 2026-09-14) -->
        <TeacherCard
          v-for="expert in experts"
          :key="expert.id"
          class="u-mobile-hidden"
          :teacher="expert"
        />

        <div class="teacher__text-card teacher__text-card--all u-mobile-hidden">
          <h3 class="heading-l teacher__text-card-title">{{ teacherContent.allCard.title }}</h3>
          <AppButton :to="teacherContent.allCard.href" variant="white" size="s">
            {{ teacherContent.allCard.ctaLabel }}
            <template #icon>
              <ArrowIcon />
            </template>
          </AppButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
// Набросок по макету секции «Кто ведёт занятия» (2026-08-13):
// размеры с пометкой «оценка» — уточнить
.teacher {
  margin-top: 7.5rem; // 120px — по ритму секций

  @include bp.mobile {
    margin-top: 4.5rem; // 72px — мобильный ритм секций (макет 390)
  }

  &__title {
    margin: 0 0 1.25rem; // оценка: 20px
  }

  &__subtitle {
    max-width: 45rem; // 720px из макета
    margin: 0 0 3rem; // оценка: 48px
    color: var(--text-muted);
  }

  // ── карточка ключевого спикера ─────────────────────────────────────
  &__featured {
    display: flex;
    gap: 3rem; // оценка: 48px
    align-items: flex-start;
    margin-bottom: 3rem; // оценка: 48px
    padding: 3rem; // оценка: 48px
    color: var(--text-inverse);
    background-color: var(--brand-violet);
    border-radius: 2.5rem; // оценка: 40px

    @include bp.mobile {
      flex-direction: column; // фото над текстом — в одну колонку
      gap: 1rem; // оценка: 16px — по ритму колонки мобильного макета
      margin-bottom: 1rem; // 16px — общий gap колонки из мобильного макета (390)
      padding: 1.5rem; // 24px из мобильного макета (390)
    }
  }

  &__featured-photo {
    flex-shrink: 0;
    width: 12.8125rem; // оценка: 205px
    height: 12.8125rem;
    object-fit: cover;
    object-position: center top; // не режем голову на портрете
    border: 2px solid var(--brand-lime);
    border-radius: 50%;

    @include bp.mobile {
      width: 8.5625rem; // 137px из мобильного макета (390)
      height: 8.5625rem;
      border-width: 0.1875rem; // лаймовое кольцо 3px из мобильного макета (390)
    }

    &--placeholder {
      background-color: var(--accent-lavender-pale);
    }
  }

  &__featured-name {
    margin: 0 0 1rem; // 16px из макета
  }

  &__featured-roles {
    margin: 0 0 1rem; // 16px из макета
    color: var(--brand-lime);
  }

  &__featured-bio {
    margin: 0 0 1rem; // 16px из макета
    color: var(--accent-lavender-pale);
  }

  &__featured-education {
    margin: 0 0 1rem; // 16px из макета
    color: var(--accent-lavender-pale);
    opacity: 75%;
  }

  // ── сетка экспертов ────────────────────────────────────────────────
  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem; // 24px (сетка 3×384 + 2×24 = 1200)

    // на планшете трём колонкам тесно — две (наше решение)
    @include bp.tablet-only {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @include bp.mobile {
      // minmax(0, …): иначе колонка не сожмётся ниже min-content карточек
      // (заголовок «преподаватели» 38px) и распирает страницу на узких экранах
      grid-template-columns: minmax(0, 1fr);
      gap: 1rem; // 16px из мобильного макета (390)
    }
  }

  &__text-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 2rem; // 32px из макета
    border-radius: 1.5rem; // оценка: 24px

    // на планшете полуколонка не вмещает heading-l («преподаватели» шире
    // ячейки) — текстовые карточки занимают весь ряд (наше решение)
    @include bp.tablet-only {
      grid-column: 1 / -1;
      gap: 1.5rem; // высота auto — space-between не разводит контент
    }

    @include bp.mobile {
      // из макета карточки «Приглашённые эксперты» 350×300 (2026-09-14):
      // паддинги 32, между заголовком, подписью и кнопкой — 20
      gap: 1.25rem;
      padding: 2rem;

      // капсула 44 из макета: (44 − 16) / 2 = 14px
      :deep(.button__label) {
        padding-block: 0.875rem;
      }
    }

    &--experts {
      background-color: var(--surface-cream);
    }

    // на мобильном карточка скрыта (u-mobile-hidden в шаблоне)
    &--all {
      background-color: var(--brand-lime-tint);
    }
  }

  &__text-card-title {
    margin: 0;

    // заголовки интро-карточек в мобильном макете не уменьшаются со шкалой —
    // держим heading-l (38/46) на всём адаптивном диапазоне
    @include bp.tablet-down {
      font-size: 2.375rem;
      line-height: 1.2105;
    }

    // уже макетных 390 «Приглашённые» кеглем 38 не помещается в карточку
    // и рвалось внутри слова — ниже макета пин снимаем, действует
    // адаптивная ступень heading-m (28/34)
    @include bp.narrow {
      font-size: 1.75rem;
      line-height: 1.2143;
    }
  }

  &__text-card-note {
    margin: 0;
    color: var(--text-muted);
  }
}
</style>
