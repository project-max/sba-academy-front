<script setup lang="ts">
import type { Teacher } from '@/entities/teacher';
import { teachersPageContent } from '../model/teachers-page-content';

defineProps<{
  teacher: Teacher;
  /** названия курсов лектора — страница собирает их из entities/course по courseIds */
  courseTitles: string[];
}>();
</script>

<template>
  <article class="spotlight">
    <img
      v-if="teacher.photo"
      class="spotlight__photo"
      :src="teacher.photo"
      :alt="`Фото: ${teacher.name}`"
      width="689"
      height="828"
    >

    <div class="spotlight__info">
      <span class="spotlight__badge label-s">{{ teachersPageContent.spotlightBadge }}</span>
      <h2 class="spotlight__name heading-l">{{ teacher.name }}</h2>
      <p class="spotlight__roles body-m">{{ teacher.roles.join(' · ') }}</p>
      <p v-if="teacher.bio" class="spotlight__bio body-s">{{ teacher.bio }}</p>
      <p v-if="teacher.education" class="spotlight__education body-s">{{ teacher.education }}</p>

      <template v-if="courseTitles.length">
        <p class="spotlight__courses-label label-s">{{ teachersPageContent.coursesLabel }}</p>
        <!-- role="list": list-style none снимает семантику списка в Safari/VoiceOver -->
        <ul class="spotlight__courses" role="list">
          <li v-for="title in courseTitles" :key="title" class="spotlight__course label-s">
            {{ title }}
          </li>
        </ul>
      </template>
    </div>
  </article>
</template>

<style lang="scss" scoped>
// Размеры из SVG-макета «Lecturers — Desktop 1440» (2026-08-14); отступы правой
// колонки — оценка по глифам, уточнить точечно
.spotlight {
  display: flex;
  gap: 3rem; // 48px из макета
  width: 100%;
  padding: 3rem; // 48px из макета
  color: var(--text-inverse);
  background-color: var(--brand-violet);
  border-radius: 2.5rem; // 40px из макета

  @include bp.tablet-down {
    flex-direction: column;
    gap: 1.5rem;
  }

  @include bp.mobile {
    padding: 1.5rem; // 24px из мобильного макета (390)
  }

  &__photo {
    flex-shrink: 0;
    align-self: flex-start;
    width: 20rem; // 320px из макета
    height: 25rem; // 400px из макета
    object-fit: cover;
    border-radius: 1.5rem; // 24px из макета

    @include bp.tablet-down {
      width: 100%;
      max-width: 20rem;
      height: auto;
      aspect-ratio: 320 / 400;
    }

    // в колонке портрет 320 оставлял бы сбоку пустое поле во всю высоту —
    // ставим его по центру карточки
    @include bp.tablet-only {
      margin-inline: auto;
    }

    @include bp.mobile {
      max-width: none;
      border-radius: 1rem; // 16px — компактнее на мобильном
    }
  }

  &__badge {
    display: inline-block;
    align-self: flex-start;
    padding: 0.4375rem 0.875rem; // 7px 14px из макета (высота пилюли 30)
    color: var(--text-on-lime);
    background-color: var(--brand-lime);
    border-radius: 999px;
  }

  &__info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &__name {
    margin: 1rem 0 0; // 16px из макета
  }

  &__roles {
    margin: 1rem 0 0; // 16px из макета
    color: var(--brand-lime);
  }

  &__bio {
    margin: 1rem 0 0; // 16px из макета
    color: var(--accent-lavender-pale);
  }

  &__education {
    margin: 1rem 0 0; // оценка: 16px
    color: var(--accent-lavender-pale);
    opacity: 0.75; // из макета — как у education на главной
  }

  &__courses-label {
    margin: 1rem 0 0; // 16px из макета
    color: var(--accent-lavender-pale);
  }

  &__courses {
    display: flex;
    flex-wrap: wrap;
    gap: 0.625rem; // 10px из макета
    margin: 0.75rem 0 0; // 12px из макета
    padding: 0;
    list-style: none;
  }

  &__course {
    display: inline-flex;
    align-items: center;
    padding: 0.4375rem 0.875rem; // 7px 14px из макета (высота пилюли 30)
    color: var(--text-inverse);
    background-color: var(--brand-violet-bright);
    border-radius: 999px;
  }
}
</style>
