<script setup lang="ts">
import { ContactsPage } from '@/pages/contacts';
import { useSeo } from '@/shared/lib';

useSeo({
  title: 'Контакты — SBA Academy',
  description:
    'Как связаться с SBA Academy: почта, телефон и поддержка по вопросам обучения и доступа к курсам.',
});
</script>

<template>
  <ContactsPage />
</template>
