<script setup lang="ts">
import { useHead } from '#imports';
import { PrivacyPage } from '@/pages/privacy';

useHead({
  title: 'Политика конфиденциальности — SBA Academy',
  meta: [{ name: 'robots', content: 'noindex' }],
});
</script>

<template>
  <PrivacyPage />
</template>
