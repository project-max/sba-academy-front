<script setup lang="ts">
// Инфраструктурный файл Nuxt: обязан лежать в корне srcDir, вне слоёв FSD.
// Держим его тонким — вся композиция в layouts и слое pages
import { NuxtLayout, NuxtPage } from '#components';
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
