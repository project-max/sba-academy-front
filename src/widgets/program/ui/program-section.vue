<script setup lang="ts">
import { courses } from '@/entities/course';
import { AppButton, ArrowIcon, LinkBar } from '@/shared/ui';
import { programContent } from '../model/program-content';

const previewCourses = programContent.courseIds
  .map((id) => courses.find((c) => c.id === id))
  .filter((c) => c !== undefined);
</script>

<template>
  <section class="container program" aria-labelledby="program-title">
    <div class="section-inner">
      <h2 id="program-title" class="program__title display-l">{{ programContent.title }}</h2>

      <div class="program__grid">
        <article v-for="course in previewCourses" :key="course!.id" class="program__card">
          <div class="program__card-head">
            <h3 class="program__card-title heading-l">{{ course!.title }}</h3>
            <p class="program__card-teaser body-m">{{ course!.teaser }}</p>
          </div>

          <hr class="program__divider">

          <dl class="program__meta">
            <div class="program__meta-item">
              <dt class="program__meta-label label-s">{{ programContent.metaLabels.level }}</dt>
              <dd class="program__meta-value body-s">{{ course!.level }}</dd>
            </div>
            <div class="program__meta-item">
              <dt class="program__meta-label label-s">{{ programContent.metaLabels.format }}</dt>
              <dd class="program__meta-value body-s">{{ course!.format }}</dd>
            </div>
            <div class="program__meta-item">
              <dt class="program__meta-label label-s">{{ programContent.metaLabels.duration }}</dt>
              <dd class="program__meta-value body-s">{{ course!.duration }}</dd>
            </div>
          </dl>

          <AppButton
            class="program__cta"
            :to="course!.anchor ? `/programs#${course!.anchor}` : '/programs'"
            variant="lime"
            size="m"
          >
            {{ programContent.ctaLabel }}
            <template #icon>
              <ArrowIcon />
            </template>
          </AppButton>
        </article>
      </div>

      <LinkBar class="program__catalog" :to="programContent.catalog.href">{{
        programContent.catalog.label
      }}</LinkBar>
    </div>
  </section>
</template>

<style lang="scss" scoped>
// Набросок по макету секции «Программы обучения» (2026-08-13):
// размеры с пометкой «оценка» — уточнить
.program {
  margin-top: 7.5rem; // 120px — по ритму секций

  @include bp.mobile {
    margin-top: 4.5rem; // 72px — мобильный ритм секций (макет 390)
  }

  &__title {
    margin: 0 0 3rem; // оценка: 48px
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem; // 24px
    margin-bottom: 3rem; // оценка: 48px до плашки каталога

    // на нижней половине планшета двум карточкам с CTA тесно — одна колонка
    @include bp.tablet-only {
      grid-template-columns: minmax(0, 1fr);
    }

    @include bp.mobile {
      // minmax(0, …): колонка не должна упираться в min-content карточки
      // (кнопка с неразрывной подписью) и распирать страницу
      grid-template-columns: minmax(0, 1fr);
      gap: 1rem; // 16px из мобильного макета (390)
    }
  }

  &__card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 2.5rem; // оценка: 40px
    background-color: var(--surface-nav);
    border-radius: 1.5rem; // оценка: 24px

    @include bp.mobile {
      padding: 1.5rem; // 24px из мобильного макета (390)
      border-radius: 2.5rem; // 40px из мобильного макета (390)
    }
  }

  // верхняя зона фиксированной min-высоты: тизер прижат к заголовку,
  // а разделители карточек совпадают по высоте.
  // 164px = 96 (2 строки heading-l) + 20 + 48 (2 строки body-m)
  &__card-head {
    width: 100%;
    min-height: 10.25rem;
    margin-bottom: 1.25rem; // 20px

    // ниже 1200 карточки идут в одну колонку — выравнивать разделители
    // между соседями не нужно, высота шапки по контенту
    @include bp.tablet-down {
      min-height: auto;
    }
  }

  &__card-title {
    margin: 0 0 1.25rem; // 20px
  }

  &__card-teaser {
    margin: 0;
    color: var(--text-muted);
  }

  &__divider {
    width: 100%;
    height: 1px;
    margin: 0 0 1.25rem; // 20px
    background-color: var(--border-subtle);
    border: 0;
  }

  &__meta {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem; // оценка: 24px
    width: 100%;
    margin: 0 0 1.25rem; // 20px (кнопка дополнительно прижата к низу)

    @include bp.mobile {
      grid-template-columns: 1fr; // мета-пары стеком вертикально
      gap: 1rem; // 16px из мобильного макета (390)
    }
  }

  &__meta-label {
    margin: 0 0 0.375rem; // 6px из макета
    color: var(--text-muted);
  }

  &__meta-value {
    margin: 0;
  }

  &__cta {
    margin-top: 1.75rem; // 28px из макета

    @include bp.mobile {
      // капсула и круг 52px из мобильного макета (390)
      :deep(.button__label) {
        padding-block: 1.125rem; // 52 = 18 + 16 (label-m) + 18
      }

      :deep(.button__icon) {
        width: 3.25rem; // 52px
        height: 3.25rem;
      }
    }
  }

  // плашка «Весь каталог программ»: иконка 48 остаётся от LinkBar
  &__catalog {
    @include bp.mobile {
      padding: 0.5rem 0.5rem 0.5rem 2rem; // 8px 8px 8px 32px из мобильного макета (390) — высота 64 (8+48+8)
    }
  }
}
</style>
