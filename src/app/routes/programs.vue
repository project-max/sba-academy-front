<script setup lang="ts">
import { ProgramsPage } from '@/pages/programs';
import { useSeo } from '@/shared/lib';

useSeo({
  title: 'Программы обучения — SBA Academy',
  description:
    'Курсы SBA Academy: основы экосистемы, криптовалюта и виртуальные активы, токеномика, бизнес на партнёрских программах.',
});
</script>

<template>
  <ProgramsPage />
</template>
