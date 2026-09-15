<script setup lang="ts">
import { useHead } from '#imports';
import { TeachersPage } from '@/pages/teachers';

useHead({
  title: 'Кто ведёт — SBA Academy',
  meta: [
    { name: 'description', content: 'Преподаватели и эксперты SBA Academy.' },
  ],
});
</script>

<template>
  <TeachersPage />
</template>
