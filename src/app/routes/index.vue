<script setup lang="ts">
import { useHead } from '#imports';
import { HomePage } from '@/pages/home';

useHead({
  title: 'SBA Academy — обучение криптовалютам и блокчейн-технологиям',
  meta: [
    {
      name: 'description',
      content:
        'Образовательная платформа SBA Academy: курсы по криптовалютам, блокчейну и построению бизнеса на партнёрских программах.',
    },
  ],
});
</script>

<template>
  <HomePage />
</template>
