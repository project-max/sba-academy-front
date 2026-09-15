<script setup lang="ts">
import { computed } from 'vue';
import { NuxtLink } from '#components';
import ArrowIcon from './arrow-icon.vue';

interface Props {
  /** внутренний роут → NuxtLink */
  to?: string;
  /** внешняя ссылка → <a target="_blank"> */
  href?: string;
  /** цвет круга со стрелкой */
  icon?: 'lavender' | 'violet' | 'bright';
}

const props = withDefaults(defineProps<Props>(), {
  to: undefined,
  href: undefined,
  icon: 'lavender',
});

const tag = computed(() => (props.to ? NuxtLink : 'a'));

const tagAttrs = computed(() =>
  props.to ? { to: props.to } : { href: props.href, target: '_blank', rel: 'noopener' },
);
</script>

<template>
  <component :is="tag" v-bind="tagAttrs" class="link-bar" :class="`link-bar--icon-${props.icon}`">
    <span class="label-m"><slot /></span>
    <span class="link-bar__icon" aria-hidden="true">
      <ArrowIcon />
    </span>
  </component>
</template>

<style lang="scss" scoped>
// Широкая плашка-ссылка со стрелкой (рейтинг, «весь каталог программ» и т.п.)
.link-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1rem 1rem 1rem 2rem; // 16px, слева 32px — из макета
  color: var(--text-primary);
  text-decoration: none;
  background-color: var(--surface-nav);
  border-radius: 1.75rem; // оценка: 28px

  &__icon {
    display: grid;
    flex-shrink: 0;
    place-items: center;
    width: 3rem; // оценка: 48px
    height: 3rem;
    color: var(--text-inverse);
    background-color: var(--accent-lavender);
    border-radius: 50%;
    transition: background-color 0.15s;
  }

  &--icon-violet &__icon {
    background-color: var(--brand-violet);
  }

  &--icon-bright &__icon {
    background-color: var(--brand-violet-bright);
  }

  &:hover &__icon,
  &:focus-visible &__icon {
    background-color: var(--brand-violet-bright); // оценка: ховера в макете нет
  }
}
</style>
