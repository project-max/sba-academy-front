<script setup lang="ts">
import { useHead } from '#imports';
import { ProgramsPage } from '@/pages/programs';

useHead({
  title: 'Программы обучения — SBA Academy',
  meta: [
    {
      name: 'description',
      content:
        'Курсы SBA Academy: основы экосистемы, криптовалюта и виртуальные активы, токеномика, бизнес на партнёрских программах.',
    },
  ],
});
</script>

<template>
  <ProgramsPage />
</template>
