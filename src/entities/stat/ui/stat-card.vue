<script setup lang="ts">
import type { StatHighlight, StatTheme } from '../model/types';

interface Props {
  stat: StatHighlight;
  theme?: StatTheme;
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'lime',
});
</script>

<template>
  <div class="stat-card" :class="`stat-card--${props.theme}`">
    <!-- в макете значение ~40px — такого размера нет в шкале, взят heading-l -->
    <p class="stat-card__value heading-l">{{ props.stat.value }}</p>
    <p class="stat-card__label body-s">{{ props.stat.label }}</p>
  </div>
</template>

<style lang="scss" scoped>
.stat-card {
  height: 100%;
  padding: 2rem 1.75rem; // 32px сверху/снизу из макета, бока — оценка 28px
  border-radius: 1.5rem; // оценка: 24px

  @include bp.mobile {
    // 20px сверху/снизу, бока 18px — из мобильного макета секции «Доверие»
    // (по бокам ýже: иначе «после прохождения» переносится лишний раз)
    padding: 1.25rem 1.125rem;
  }

  &--lime {
    background-color: var(--brand-lime);
  }

  &--ice {
    background-color: var(--accent-ice);
  }

  &--mint {
    background-color: var(--accent-mint);
  }

  &--lavender {
    background-color: var(--accent-lavender-pale);
  }

  &__value {
    margin: 0 0 0.75rem; // оценка: 12px
  }

  &__label {
    margin: 0;
  }
}
</style>
