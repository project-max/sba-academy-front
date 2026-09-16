<script setup lang="ts">
import { courses } from '@/entities/course';
import { programsPageContent } from '../model/programs-page-content';
import CourseCard from './course-card.vue';

const content = programsPageContent;

// состав и порядок карточек задаёт контент страницы
const pageCourses = content.courseIds
  .map((id) => courses.find((course) => course.id === id))
  .filter((course): course is NonNullable<typeof course> => Boolean(course));
</script>

<template>
  <div class="programs">
    <section class="container programs__hero" aria-labelledby="programs-title">
      <div class="section-inner">
        <h1 id="programs-title" class="programs__title display-l">{{ content.title }}</h1>
        <p class="programs__intro body-l">{{ content.intro }}</p>
      </div>
    </section>

    <section class="container programs__list-section" aria-label="Курсы">
      <div class="section-inner">
        <div class="programs__list">
          <CourseCard v-for="course in pageCourses" :key="course.id" :course="course" />
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
// Раскладка из SVG-макета «Programs — Desktop 1440» (2026-08-15);
// мобильный адаптив — по паттернам главной (макет 390)
.programs {
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
    max-width: 47rem; // оценка: ~750px по переносам макета
    margin: 1.25rem 0 0; // 20px из макета
    color: var(--text-muted);
  }

  &__list-section {
    margin-top: 3rem; // 48px из макета

    @include bp.mobile {
      margin-top: 1.5rem;
    }
  }

  &__list {
    display: grid;
    gap: 1.5rem; // 24px из макета: между карточками курсов

    @include bp.mobile {
      gap: 1rem; // 16px из мобильного макета (390)
    }
  }
}
</style>
