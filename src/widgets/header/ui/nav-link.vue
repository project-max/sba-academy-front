<script setup lang="ts">
import { NuxtLink } from '#components';

interface Props {
  href: string;
  /** внешняя ссылка (личный кабинет) → <a target="_blank"> */
  external?: boolean;
  /** item — пункт в капсуле навигации; accent — фиолетовая капсула */
  variant?: 'item' | 'accent';
}

const props = withDefaults(defineProps<Props>(), {
  external: false,
  variant: 'item',
});
</script>

<template>
  <a
    v-if="props.external"
    :href="props.href"
    class="nav-link label-m"
    :class="`nav-link--${props.variant}`"
    target="_blank"
    rel="noopener"
  >
    <slot />
  </a>
  <NuxtLink
    v-else
    :to="props.href"
    class="nav-link label-m"
    :class="`nav-link--${props.variant}`"
  >
    <slot />
  </NuxtLink>
</template>

<style lang="scss" scoped>
.nav-link {
  text-decoration: none;
  white-space: nowrap; // пункты навигации не переносятся на строки
  border-radius: 999px;
  transition: background-color 0.15s, color 0.15s;

  // пункт навигации: капсула ховера появляется вокруг текста, не сдвигая
  // раскладку (отрицательный margin компенсирует padding)
  &--item {
    padding: 0.5rem 0.875rem;
    margin: -0.5rem -0.875rem;
    color: var(--text-primary);

    // ховеров в макете не видно — «лаймовая капсула» согласована отдельно
    &:hover,
    &:focus-visible {
      color: var(--text-on-lime);
      background-color: var(--brand-lime);
    }

    // TODO: стиль активного пункта (.router-link-active) — когда появится в макете
  }

  // «Личный кабинет»: фиолетовая капсула
  &--accent {
    padding: 1rem 1.75rem; // 16px 28px из макета
    color: var(--text-inverse);
    background-color: var(--brand-violet);

    &:hover,
    &:focus-visible {
      background-color: var(--brand-violet-bright); // оценка: ховеров в макете нет
    }
  }
}
</style>
