<script setup lang="ts">
import { AboutPage } from '@/pages/about';
import { useSeo } from '@/shared/lib';

useSeo({
  title: 'О школе — SBA Academy',
  description:
    'SBA Academy: криптообразование без обещаний доходности — принципы обучения, история экосистемы и образовательное партнёрство.',
});
</script>

<template>
  <AboutPage />
</template>
