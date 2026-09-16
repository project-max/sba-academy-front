<script setup lang="ts">
import { stats } from '@/entities/stat';
import { AppButton } from '@/shared/ui';
import { heroContent } from '../model/hero-content';

const usersStat = stats.find((s) => s.id === 'ecosystem-users');
</script>

<template>
  <div class="container">
    <section class="hero" aria-labelledby="hero-title">
    <div class="hero__content">
      <p class="hero__eyebrow label-s">{{ heroContent.eyebrow }}</p>

      <h1 id="hero-title" class="hero__title display-l">
        {{ heroContent.title.pre }}
        <span class="hero__title-accent">{{ heroContent.title.accent }}</span>
        {{ heroContent.title.post }}
      </h1>

      <p class="hero__description body-l">{{ heroContent.description }}</p>

      <AppButton :to="heroContent.cta.href" variant="lime" size="l">
        {{ heroContent.cta.label }}
      </AppButton>
    </div>

    <div class="hero__visual">
      <div class="hero__figure" aria-hidden="true">
        <div class="hero__circle" />
        <img
          class="hero__photo"
          :src="heroContent.photo.src"
          :width="heroContent.photo.width"
          :height="heroContent.photo.height"
          alt=""
          fetchpriority="high"
        >
      </div>

      <aside v-if="usersStat" class="hero__stat">
        <div class="hero__stat-top">
          <p class="hero__stat-value heading-l">{{ usersStat.value }}</p>
          <div class="hero__stat-avatars" aria-hidden="true">
            <img
              v-for="avatar in heroContent.avatars"
              :key="avatar"
              class="hero__stat-avatar"
              :src="avatar"
              width="44"
              height="44"
              alt=""
              loading="lazy"
            >
          </div>
        </div>
        <p class="hero__stat-label body-s">{{ usersStat.label }}</p>
      </aside>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
// Набросок по макету hero (2026-08-11): раскладка и цвета — по макету,
// размеры с пометкой «оценка» — уточнить
.hero {
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  // карточка занимает контентную область глобального .container:
  // 1312px при 1440 (см. app/styles/_layout.scss)
  width: 100%;
  overflow: hidden;
  color: var(--text-inverse);
  background-color: var(--brand-violet); // оценка: сверить тон с макетом
  border-radius: 2.5rem; // оценка: 40px

  // < 1200 фиксированной десктопной композиции тесно — вертикальный поток:
  // контент → фото → стат-карточка (наше промежуточное решение для планшета)
  @include bp.tablet-down {
    flex-direction: column;
    gap: 0; // фигура без отступа от контента (правка пользователя)
  }

  @include bp.tablet-only {
    padding: 3rem; // промежуточный паддинг планшета
  }

  @include bp.mobile {
    padding: 1.5rem; // 24px из мобильного макета (390)
    border-radius: 2rem; // 32px из мобильного макета (390)
  }

  &__content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.75rem; // 28px из макета
    max-width: 29.125rem; // 466px из макета (ширина текстовой колонки)
    margin-left: 5rem; // 80px от левого края карточки
    padding: 6.75rem 0; // 108px сверху/снизу из макета

    @include bp.tablet-down {
      max-width: none; // во всю контентную область карточки
      margin-left: 0; // поля даёт паддинг самой карточки
      padding: 0;
    }

    @include bp.mobile {
      // кнопка hero (size l) на мобиле ужимается до высоты 48 (макет 390)
      :deep(.button__label) {
        padding-block: 1rem; // 16px: капсула высотой 48
      }
    }
  }

  &__eyebrow {
    margin: 0;
    color: var(--brand-lime);
    text-transform: uppercase;
  }

  &__title {
    margin: 0;
  }

  &__title-accent {
    position: relative;

    // лаймовый эллипс вокруг слова; размеры в em — масштабируются со шрифтом
    &::after {
      content: '';
      position: absolute;
      inset: -0.08em -0.4em; // выступ ~26px по бокам
      border: 4px solid var(--brand-lime);
      border-radius: 50%;
      pointer-events: none;

      // ниже 1200 заголовок идёт кеглем heading-l и перестаёт держать
      // «Administration» отдельной строкой — эллипс налезал бы на соседние
      // слова, поэтому скрыт (в мобильном макете 390 его тоже нет)
      @include bp.tablet-down {
        display: none;
      }
    }
  }

  &__description {
    max-width: 34rem;
    margin: 0;
    // ниже 1200 body-l сам становится body-m (16/24) — см. _typography.scss
  }

  // позиционный контекст для visual-элементов — сама карточка .hero:
  // координаты из макета заданы от её краёв
  &__visual {
    flex: 1;
    min-height: 34rem; // оценка — задаёт высоту секции, пока нет фото

    @include bp.tablet-down {
      // обычный поток: фото, ниже — стат-карточка вплотную (перекрытие ниже)
      display: flex;
      flex-direction: column;
      gap: 0;
      width: 100%;
      min-height: 0;
    }
  }

  // единый контейнер круга и фото: выравнивание всей композиции — одной парой координат
  &__figure {
    position: absolute;
    top: 5.34375rem; // 85.5px из макета
    bottom: 0;
    left: 37.875rem; // 606px из макета
    width: 31.25rem; // 500px из макета (диаметр круга)

    @include bp.tablet-down {
      position: relative; // якорь для круга за фото
      inset: auto; // сброс десктопных смещений (top/left), у relative они сдвигают
      z-index: 1; // фото ложится поверх стат-карточки (перекрытие из макета 390)
      display: flex;
      justify-content: center; // фото по центру карточки (макет 390)
      width: 100%;
    }
  }

  &__circle {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    aspect-ratio: 1;
    background-color: var(--brand-lime);
    border-radius: 50%;

    // на узких экранах круг прижат к низу фигуры по центру, фото поверх —
    // голова выше дуги, как в десктопной композиции
    @include bp.tablet-down {
      top: auto;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }

    @include bp.tablet-only {
      width: 22.5rem; // 360px — под фото планшета 280×400
    }

    @include bp.mobile {
      width: 16.25rem; // 260px — под фото 200×290
    }
  }

  &__photo {
    position: absolute;
    top: -2.5rem; // -40px: голова выше верхней дуги круга
    left: 0;

    @include bp.tablet-down {
      position: relative; // поверх круга
      top: auto;
      object-fit: cover;
      border-radius: 1rem; // 16px из мобильного макета (390)
    }

    @include bp.tablet-only {
      width: 17.5rem; // промежуточный размер фото на планшете
      height: 25rem;
    }

    @include bp.mobile {
      width: 12.5rem; // 200px из мобильного макета (390)
      height: 18.125rem; // 290px из мобильного макета (390)
    }
  }

  &__stat {
    position: absolute;
    top: 2.5625rem; // 41px от края карточки (макет)
    right: 2.8125rem; // 45px
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 19.0625rem; // 305px из макета
    height: 10rem; // 160px из макета
    padding: 1.75rem; // оценка: 28px
    color: var(--text-primary);
    // lime-tint #E9EFD6 + opacity 0.92 — слой из макета (правка пользователя
    // 2026-09-14; до этого на десктопе была mint с прозрачностью только у фона)
    background-color: var(--brand-lime-tint);
    border-radius: 1.5rem; // оценка: 24px
    opacity: 0.92;

    @include bp.tablet-down {
      position: static;
      width: 100%; // во всю контентную область карточки
      height: auto;
      margin-top: 0; // вплотную к фигуре (правка пользователя)
      border-radius: 2rem; // 32px из мобильного макета (390)
    }

    @include bp.mobile {
      padding: 1.5rem; // 24px из мобильного макета (390)
    }
  }

  &__stat-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  &__stat-value,
  &__stat-label {
    margin: 0;
  }

  &__stat-avatars {
    display: flex;
  }

  &__stat-avatar {
    width: 2.75rem; // 44px — размер исходника
    height: 2.75rem;
    border: 2px solid var(--brand-lime-tint); // в тон фону плашки
    border-radius: 50%;

    &:not(:first-child) {
      margin-left: -0.5rem;
    }
  }
}
</style>
