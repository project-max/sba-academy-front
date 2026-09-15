<script setup lang="ts">
import { useHead } from '#imports';
import { LicensePage } from '@/pages/license';

useHead({
  title: 'Лицензии и документы — SBA Academy',
  meta: [
    {
      name: 'description',
      content:
        'Образовательная лицензия SBA Academy, документы выпускника, правовые документы и реквизиты.',
    },
  ],
});
</script>

<template>
  <LicensePage />
</template>
