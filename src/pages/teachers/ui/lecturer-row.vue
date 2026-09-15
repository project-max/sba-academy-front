<script setup lang="ts">
import type { Teacher } from '@/entities/teacher';

defineProps<{ teacher: Teacher }>();
</script>

<template>
  <article class="lecturer">
    <img
      v-if="teacher.photo"
      class="lecturer__photo"
      :src="teacher.photo"
      :alt="`Фото: ${teacher.name}`"
      loading="lazy"
    >

    <div class="lecturer__info">
      <h3 class="lecturer__name heading-s">{{ teacher.name }}</h3>
      <p class="lecturer__roles body-s">{{ teacher.roles.join(' · ') }}</p>
      <p v-if="teacher.bio" class="lecturer__bio body-s">{{ teacher.bio }}</p>

      <!-- role="list": list-style none снимает семантику списка в Safari/VoiceOver -->
      <ul v-if="teacher.tags?.length" class="lecturer__tags" role="list">
        <li v-for="tag in teacher.tags" :key="tag" class="lecturer__tag label-s">{{ tag }}</li>
      </ul>
    </div>
  </article>
</template>

<style lang="scss" scoped>
// Размеры из SVG-макета «Lecturers — Desktop 1440» (2026-08-14); отступы текстовой
// колонки — оценка по глифам, уточнить точечно
.lecturer {
  display: flex;
  gap: 2.25rem; // 36px из макета
  width: 100%;
  padding: 2rem; // 32px из макета
  background-color: var(--surface-cream);
  border-radius: 2.5rem; // 40px из макета

  @include bp.mobile {
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem; // 24px из мобильного макета (390)
  }

  &__photo {
    flex-shrink: 0;
    align-self: flex-start;
    width: 15rem; // 240px из макета
    height: 17.5rem; // 280px из макета
    object-fit: cover;
    object-position: center top; // лица не режем — как у карточек на главной
    border-radius: 1.5rem; // 24px из макета

    @include bp.mobile {
      width: 100%;
      height: auto;
      aspect-ratio: 240 / 280;
    }
  }

  &__name {
    margin: 0;
  }

  &__roles {
    margin: 0.75rem 0 0; // 12px из макета
    color: var(--text-muted);
  }

  &__bio {
    margin: 0.75rem 0 0; // 12px из макета
    color: var(--text-muted);
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.625rem; // 10px из макета
    margin: 1.125rem 0 0; // 18px из макета
    padding: 0;
    list-style: none;
  }

  &__tag {
    display: inline-flex;
    align-items: center;
    padding: 0.4375rem 0.875rem; // 7px 14px из макета (высота пилюли 30)
    color: var(--text-primary);
    background-color: var(--surface-page);
    border-radius: 999px;
  }
}
</style>
