<script setup lang="ts">
import { useHead } from '#imports';
import { AboutPage } from '@/pages/about';

useHead({
  title: 'О школе — SBA Academy',
  meta: [
    {
      name: 'description',
      content:
        'SBA Academy: криптообразование без обещаний доходности — принципы обучения, история экосистемы и образовательное партнёрство.',
    },
  ],
});
</script>

<template>
  <AboutPage />
</template>
