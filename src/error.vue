<script setup lang="ts">
// Инфраструктурный файл Nuxt (вне слоёв FSD, как app.vue).
// При generate из него собирается статический 404.html — nginx должен
// отдавать его через error_page 404 /404.html
import { useError, useHead } from '#imports';
import { NuxtLink } from '#components';

const error = useError();

useHead({
  title: 'Страница не найдена — SBA Academy',
  meta: [{ name: 'robots', content: 'noindex' }],
});
</script>

<template>
  <div class="error-page">
    <h1>{{ error?.statusCode === 404 ? 'Страница не найдена' : 'Что-то пошло не так' }}</h1>
    <p>
      <NuxtLink to="/">Вернуться на главную</NuxtLink>
    </p>
  </div>
</template>

<style lang="scss" scoped>
// каркасные стили — заменятся с приходом дизайна
.error-page {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
