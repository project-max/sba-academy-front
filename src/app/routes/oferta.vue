<script setup lang="ts">
import { useHead } from '#imports';
import { OfferPage } from '@/pages/offer';

useHead({
  title: 'Оферта — SBA Academy',
  meta: [{ name: 'robots', content: 'noindex' }],
});
</script>

<template>
  <OfferPage />
</template>
