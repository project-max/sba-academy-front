<script setup lang="ts">
import { HomePage } from '@/pages/home';
import { useSeo } from '@/shared/lib';

useSeo({
  title: 'SBA Academy — обучение криптовалютам и блокчейн-технологиям',
  description:
    'Образовательная платформа SBA Academy: курсы по криптовалютам, блокчейну и построению бизнеса на партнёрских программах.',
});
</script>

<template>
  <HomePage />
</template>
