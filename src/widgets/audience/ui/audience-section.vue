<script setup lang="ts">
import { audiences } from '@/entities/audience';
import { AppButton, ArrowIcon } from '@/shared/ui';
import { audienceContent } from '../model/audience-content';
</script>

<template>
  <section class="container audience" aria-labelledby="audience-title">
    <div class="section-inner">
      <h2 id="audience-title" class="audience__title display-l">
        {{ audienceContent.titleLines[0] }}<br>{{ audienceContent.titleLines[1] }}
      </h2>

      <ul class="audience__grid">
        <li
          v-for="card in audiences"
          :key="card.id"
          class="audience__card"
          :class="`audience__card--${card.theme}`"
        >
          <div class="audience__badges">
            <span
              v-for="badge in card.badges"
              :key="badge"
              class="audience__badge label-m"
            >{{ badge }}</span>
          </div>

          <span class="audience__ring" aria-hidden="true" />

          <h3 class="audience__card-title heading-m">{{ card.title }}</h3>
          <p class="audience__card-text body-s">{{ card.description }}</p>

          <div class="audience__photo">
            <img
              :src="card.photo.src"
              :width="card.photo.width"
              :height="card.photo.height"
              alt=""
              loading="lazy"
            >
          </div>

          <AppButton class="audience__cta" :to="card.href" variant="white" size="s">
            {{ audienceContent.ctaLabel }}
            <template #icon>
              <ArrowIcon />
            </template>
          </AppButton>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
// Набросок по макету секции «Для кого подходит» (2026-08-12):
// сетка 3×384 + gap 24 = 1200 по центру контейнера; размеры с пометкой
// «оценка» — уточнить
.audience {
  margin-top: 7.5rem; // 120px из макета

  @include bp.mobile {
    margin-top: 4.5rem; // 72px — мобильный ритм секций (макет 390)
  }

  &__title {
    margin: 0 0 3rem; // оценка: 48px
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem; // 24px (из ширины сетки: 1200 = 3×384 + 2×24)
    padding: 0;
    margin: 0;
    list-style: none;

    // на планшете трём карточкам тесно — одна колонка (наше решение)
    @include bp.tablet-only {
      grid-template-columns: 1fr;
    }

    @include bp.mobile {
      grid-template-columns: 1fr; // карточки в одну колонку
      gap: 1rem; // 16px из мобильного макета (390)
    }
  }

  &__card {
    // тема карточки — одна custom property, фон и градиент над фото берут её
    --card-bg: var(--brand-lime-tint);

    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 1.25rem 1.25rem 0; // оценка: 20px
    background-color: var(--card-bg);
    border-radius: 1.5rem; // оценка: 24px

    &--ice {
      --card-bg: var(--accent-ice);
    }

    &--lavender {
      --card-bg: var(--accent-lavender-pale);
    }

    @include bp.mobile {
      padding: 1.5rem 1.5rem 0; // 24px из мобильного макета (390)
    }
  }

  &__badges {
    display: flex;
    flex-wrap: wrap; // на узких карточках бейджи переносятся, не наезжая на кольцо
    gap: 0.5rem; // оценка: 8px
    margin-right: 3.25rem; // резерв под декоративное кольцо справа
    margin-bottom: 1.75rem; // оценка: 28px
  }

  &__badge {
    padding: 0.5rem 0.875rem; // оценка: 8px 14px
    color: var(--text-primary);
    background-color: var(--surface-page);
    border-radius: 999px;
  }

  &__ring {
    position: absolute;
    top: 1.5rem; // оценка
    right: 1.5rem;
    width: 1.75rem; // оценка: 28px
    height: 1.75rem;
    border: 1.5px solid var(--text-primary);
    border-radius: 50%;
  }

  &__card-title {
    margin: 0 0 0.75rem;
  }

  &__card-text {
    margin: 0 0 1.25rem;
    color: var(--text-muted);
  }

  &__photo {
    position: relative;
    margin: auto -1.25rem 0; // фото на всю ширину карточки, прижато к низу

    // мягкий переход фона карточки в фотографию, как в макете
    &::before {
      content: '';
      position: absolute;
      inset: 0 0 auto;
      height: 4rem; // оценка
      background: linear-gradient(180deg, var(--card-bg) 0%, transparent 100%);
    }

    img {
      display: block;
      width: 100%;
      height: auto;
    }

    @include bp.mobile {
      margin: auto -1.5rem 0; // компенсация мобильного паддинга карточки 24px

      img {
        height: 18.75rem; // 300px из мобильного макета (390)
        object-fit: cover;
      }
    }
  }

  &__cta {
    position: absolute;
    bottom: 1.25rem; // оценка: 20px
    left: 1.25rem;

    @include bp.mobile {
      bottom: 1rem; // 16px от краёв фото из мобильного макета (390)
      left: 1rem;
    }
  }
}
</style>
