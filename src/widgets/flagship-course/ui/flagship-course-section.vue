<script setup lang="ts">
import { courses } from '@/entities/course';
import { AppButton, ArrowIcon } from '@/shared/ui';
import { formatPrice } from '@/shared/lib';
import { flagshipContent } from '../model/flagship-content';

const course = courses.find((c) => c.id === flagshipContent.courseId);
</script>

<template>
  <section
    v-if="course"
    class="container flagship"
    aria-labelledby="flagship-title"
  >
    <div class="section-inner">
      <div class="flagship__card">
        <div class="flagship__info">
          <span v-if="course.badge" class="flagship__badge label-s">{{ course.badge }}</span>
          <h2 id="flagship-title" class="flagship__title heading-l">{{ course.title }}</h2>
          <p class="flagship__description body-l">{{ course.description }}</p>
          <p class="flagship__meta body-s">
            {{ course.scope.slice(0, flagshipContent.scopeCount).join(' · ') }}
          </p>
        </div>

        <div class="flagship__price-card">
          <p class="flagship__price-label label-s">{{ flagshipContent.priceLabel }}</p>
          <!-- в макете цена ~40px — такого размера нет в шкале, взят heading-l (38);
               уточнить у дизайнера, нужен ли отдельный стиль -->
          <p class="flagship__price heading-l">{{ formatPrice(course.price) }}</p>
          <AppButton
            class="flagship__cta"
            :to="`/programs#${course.anchor}`"
            variant="white"
            size="s"
          >
            {{ flagshipContent.ctaLabel }}
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
// Набросок по макету секции флагманского курса (2026-08-12):
// размеры с пометкой «оценка» — уточнить
.flagship {
  margin-top: 7.5rem; // 120px из макета

  @include bp.mobile {
    margin-top: 4.5rem; // 72px из мобильного макета (390)
  }

  &__card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 3rem;
    padding: 3rem 3rem 3rem 2.6875rem; // 48px, слева 43px — из макета
    background-color: var(--surface-cream);
    border-radius: 2.5rem; // оценка: 40px

    // < 1200 инфо и карточке цены рядом тесно — колонка (наше решение)
    @include bp.tablet-down {
      flex-direction: column;
      align-items: stretch;
      gap: 1.5rem; // отступ карточки цены сверху 24px из мобильного макета (390)
    }

    @include bp.mobile {
      padding: 1.5rem; // 24px из мобильного макета (390)
    }
  }

  &__info {
    max-width: 44.5rem; // оценка: ~712px (ширина текста в макете)
  }

  &__badge {
    display: inline-block;
    padding: 0.5rem 0.875rem; // оценка: 8px 14px
    // TODO(дизайн): белый label-s на #8E79C4 ≈ 3.7:1 — ниже WCAG AA 4.5:1
    // для 12px-текста; обсудить цветовую пару бейджа
    color: var(--text-inverse);
    background-color: var(--brand-violet-bright);
    border-radius: 999px;
  }

  &__title {
    margin: 1.25rem 0; // 20px сверху и снизу из макета
  }

  &__description {
    margin: 0 0 1.25rem; // 20px снизу из макета
    color: var(--text-muted);
  }

  &__meta {
    margin: 0;
    color: var(--text-muted);
  }

  &__price-card {
    flex-shrink: 0;
    width: 21.25rem; // оценка: 340px
    padding: 2rem; // 32px из макета
    // #F2EFEA из макета (2026-08-14). TODO(дизайн): label-s 12px кремовым на
    // #8E79C4 ≈ 3.2:1 — ниже WCAG AA 4.5:1, обсудить пару. TODO(тёмная тема):
    // surface-cream сменится темой, а фон карточки брендовый — при заведении
    // тёмной темы вынести кремовый в палитровый примитив
    color: var(--surface-cream);
    background-color: var(--brand-violet-bright);
    border-radius: 1.5rem; // оценка: 24px

    @include bp.tablet-down {
      width: 100%; // на всю ширину карточки (колонка)
    }
  }

  &__price-label {
    margin: 0 0 0.5rem;
  }

  &__price {
    margin: 0 0 1.5rem;

    // цена в мобильном макете не уменьшается вместе со шкалой — держим
    // heading-l (38/46) на всём адаптивном диапазоне, иначе на планшете
    // цена стала бы мельче, чем на мобильном
    @include bp.tablet-down {
      font-size: 2.375rem;
      line-height: 1.2105;
    }
  }

  &__cta {
    display: flex;

    // в макете флагманской карточки круг 52×52 при капсуле s — точечное
    // отклонение; повторится в других секциях — заведём размер в AppButton
    :deep(.button__icon) {
      width: 3.25rem;
      height: 3.25rem;
    }

    // заливка кнопки в карточке цены — кремовая, не белая (#F2EFEA из макета
    // 2026-08-14); глобально white-вариант не трогаем — на кремовых карточках
    // программ он должен остаться белым
    :deep(.button__label),
    :deep(.button__icon) {
      background-color: var(--surface-cream);
    }

    @include bp.mobile {
      // капсула 52px из мобильного макета (390): label-m 16px + 2×18px
      :deep(.button__label) {
        padding-block: 1.125rem;
      }
    }
  }
}
</style>
