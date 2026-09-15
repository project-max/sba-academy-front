<script setup lang="ts">
export type BadgeCardTheme = 'ice' | 'mint' | 'lavender' | 'grey' | 'lime' | 'white';

withDefaults(
  defineProps<{
    badge: string;
    badgeTheme?: BadgeCardTheme;
    title: string;
    description: string;
    /** чипы-теги под описанием */
    tags?: string[];
    /** лаймовая акцентная карточка (SBA Academy в экосистеме) */
    highlight?: boolean;
  }>(),
  { badgeTheme: 'white', tags: undefined },
);
</script>

<template>
  <article class="badge-card" :class="{ 'badge-card--highlight': highlight }">
    <span class="badge-card__badge label-s" :class="`badge-card__badge--${badgeTheme}`">
      {{ badge }}
    </span>
    <h3 class="badge-card__title heading-m">{{ title }}</h3>
    <p class="badge-card__description body-s">{{ description }}</p>

    <!-- role="list": list-style none снимает семантику списка в Safari/VoiceOver -->
    <ul v-if="tags?.length" class="badge-card__tags" role="list">
      <li v-for="tag in tags" :key="tag" class="badge-card__tag label-s">{{ tag }}</li>
    </ul>
  </article>
</template>

<style lang="scss" scoped>
// Карточка «бейдж + заголовок + описание [+ чипы]» — паттерн дизайн-системы
// (продукты экосистемы, уровни документов на «Лицензиях»);
// размеры из SVG-макетов 2026-08-14
.badge-card {
  padding: 2.25rem; // 36px из макета
  background-color: var(--surface-cream);
  border-radius: 2.5rem; // 40px из макета

  @include bp.mobile {
    padding: 1.5rem; // 24px из мобильного макета главной (390)
  }

  &--highlight {
    color: var(--text-on-lime);
    background-color: var(--brand-lime);
  }

  &__badge {
    display: inline-block;
    padding: 0.4375rem 0.875rem; // 7px 14px из макета (высота пилюли 30)
    color: var(--text-primary);
    border-radius: 999px;

    &--ice {
      background-color: var(--accent-ice);
    }

    &--mint {
      background-color: var(--accent-mint);
    }

    &--lavender {
      background-color: var(--accent-lavender-pale);
    }

    &--grey {
      background-color: var(--accent-grey);
    }

    &--lime {
      color: var(--text-on-lime);
      background-color: var(--brand-lime);
    }

    &--white {
      background-color: var(--surface-page);
    }
  }

  &__title {
    margin: 1rem 0 0; // 16px из макета
  }

  &__description {
    margin: 0.875rem 0 0; // 14px из макета
    color: var(--text-muted);

    .badge-card--highlight & {
      color: var(--text-on-lime);
    }
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem; // 8px из макета
    margin: 1.25rem 0 0; // 20px из макета
    padding: 0;
    list-style: none;
  }

  &__tag {
    display: inline-flex;
    align-items: center;
    padding: 0.4375rem 0.875rem; // 7px 14px из макета
    color: var(--text-muted);
    background-color: var(--surface-page);
    border-radius: 999px;
  }
}
</style>
