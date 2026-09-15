<script setup lang="ts">
import { SiteHeader } from '@/widgets/header';
import { SiteFooter } from '@/widgets/footer';
</script>

<template>
  <div class="layout">
    <SiteHeader />
    <main class="layout__main">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<style lang="scss" scoped>
// Базовый layout (решение 2026-08-11): фон — surface-page, ширину НЕ ограничиваем
// (max-width нет), контент центрируется по горизонтали. Секция, которой нужен
// полный размах (фон от края до края), задаёт себе width: 100% и сама центрирует
// внутренний контент
.layout {
  display: flex;
  min-height: 100vh; // fallback для старых браузеров
  min-height: 100dvh;
  flex-direction: column;
  background-color: var(--surface-page);

  &__main {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
  }
}
</style>
