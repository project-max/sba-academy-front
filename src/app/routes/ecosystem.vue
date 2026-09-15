<script setup lang="ts">
import { useHead } from '#imports';
import { EcosystemPage } from '@/pages/ecosystem';

useHead({
  title: 'Экосистема — SBA Academy',
  meta: [
    { name: 'description', content: 'Экосистема SBA Academy: DecimalChain, Bit.Team, кошельки, NFT.' },
  ],
});
</script>

<template>
  <EcosystemPage />
</template>
