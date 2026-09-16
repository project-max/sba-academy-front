<script setup lang="ts">
import { TeachersPage } from '@/pages/teachers';
import { useSeo } from '@/shared/lib';

useSeo({
  title: 'Кто ведёт — SBA Academy',
  description:
    'Преподаватели SBA Academy: первые лица экосистемы DecimalChain, топ-менеджеры компании и приглашённые эксперты по финансам, безопасности и нейросетям.',
});
</script>

<template>
  <TeachersPage />
</template>
