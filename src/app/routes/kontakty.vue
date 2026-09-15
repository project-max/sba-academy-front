<script setup lang="ts">
import { useHead } from '#imports';
import { ContactsPage } from '@/pages/contacts';

useHead({
  title: 'Контакты — SBA Academy',
  meta: [
    { name: 'description', content: 'Контакты SBA Academy.' },
  ],
});
</script>

<template>
  <ContactsPage />
</template>
