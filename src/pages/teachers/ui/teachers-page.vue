<script setup lang="ts">
import { courses } from '@/entities/course';
import { teachers } from '@/entities/teacher';
import { LinkBar } from '@/shared/ui';
import { teachersPageContent } from '../model/teachers-page-content';
import LecturerSpotlight from './lecturer-spotlight.vue';
import LecturerRow from './lecturer-row.vue';

const featured = teachers.find((t) => t.featured);
const experts = teachers.filter((t) => !t.featured);

// названия курсов ведущего преподавателя — по связке courseIds → entities/course
const featuredCourseTitles = (featured?.courseIds ?? [])
  .map((id) => courses.find((c) => c.id === id)?.title)
  .filter((title): title is string => Boolean(title));
</script>

<template>
  <div class="lecturers">
    <section class="container lecturers__hero" aria-labelledby="lecturers-title">
      <div class="section-inner">
        <h1 id="lecturers-title" class="lecturers__title display-l">
          {{ teachersPageContent.title }}
        </h1>
        <p class="lecturers__intro body-l">{{ teachersPageContent.intro }}</p>
        <LecturerSpotlight
          v-if="featured"
          class="lecturers__spotlight"
          :teacher="featured"
          :course-titles="featuredCourseTitles"
        />
      </div>
    </section>

    <section class="container lecturers__experts" aria-labelledby="experts-title">
      <div class="section-inner">
        <h2 id="experts-title" class="lecturers__experts-title heading-l">
          {{ teachersPageContent.experts.title }}
        </h2>
        <p class="lecturers__experts-subtitle body-m">
          {{ teachersPageContent.experts.subtitle }}
        </p>

        <!-- role="list": list-style none снимает семантику списка в Safari/VoiceOver -->
        <ul class="lecturers__list" role="list">
          <li v-for="teacher in experts" :key="teacher.id">
            <LecturerRow :teacher="teacher" />
          </li>
        </ul>

        <LinkBar
          class="lecturers__programs"
          :to="teachersPageContent.programsLink.href"
          icon="violet"
        >
          {{ teachersPageContent.programsLink.label }}
        </LinkBar>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
// Раскладка из SVG-макета «Lecturers — Desktop 1440» (2026-08-14);
// мобильный адаптив — по паттернам главной (макет 390)
.lecturers {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  &__hero {
    margin-top: 5rem; // 80px из макета

    @include bp.mobile {
      margin-top: 0;
    }
  }

  &__title {
    margin: 0;
  }

  &__intro {
    max-width: 47rem; // оценка: ~752px (ширина текста в макете)
    margin: 1.25rem 0 0; // 20px из макета
    color: var(--text-muted);
  }

  &__spotlight {
    margin-top: 3rem; // 48px из макета

    @include bp.mobile {
      margin-top: 1.5rem;
    }
  }

  &__experts {
    margin-top: 5rem; // 80px из макета

    @include bp.mobile {
      margin-top: 4.5rem; // 72px — мобильный ритм секций
    }
  }

  &__experts-title {
    margin: 0;
  }

  &__experts-subtitle {
    margin: 0.875rem 0 0; // оценка: 14px
    color: var(--text-muted);
  }

  &__list {
    display: grid;
    gap: 1.25rem; // 20px из макета
    margin: 2rem 0 0; // 32px из макета
    padding: 0;
    list-style: none;

    @include bp.mobile {
      gap: 1rem; // 16px из мобильного макета (390)
      margin-top: 1.5rem;
    }
  }

  &__programs {
    margin-top: 3rem; // 48px из макета
    border-radius: 2.5rem;

    @include bp.mobile {
      margin-top: 1.5rem;
    }
  }
}
</style>
