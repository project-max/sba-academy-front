<script setup lang="ts">
import { cabinetUrl } from '@/shared/config';
import { formatPrice } from '@/shared/lib';
import { AppButton, ArrowIcon } from '@/shared/ui';
import type { Course } from '@/entities/course';
import { programsPageContent } from '../model/programs-page-content';

const props = defineProps<{ course: Course }>();

const labels = programsPageContent.labels;

// компактная карточка (бизнес-курс): без видео, описания и программы
const isCompact = !props.course.about?.length;

// ссылка на страницу видео → embed-URL для iframe (rutube; youtube — на будущее)
function toEmbedUrl(url: string): string {
  const rutube = url.match(/rutube\.ru\/video\/([0-9a-f]+)/);
  if (rutube) return `https://rutube.ru/play/embed/${rutube[1]}/`;
  const youtube = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([\w-]+)/);
  if (youtube) return `https://www.youtube.com/embed/${youtube[1]}`;
  return url;
}

const trailerEmbed = props.course.trailer ? toEmbedUrl(props.course.trailer) : null;
</script>

<template>
  <article :id="course.anchor ?? undefined" class="course" :class="{ 'course--compact': isCompact }">
    <span v-if="course.badge" class="course__badge label-s">{{ course.badge }}</span>
    <h2 class="course__title heading-l">{{ course.title }}</h2>
    <p class="course__teaser body-l">{{ course.pageTeaser ?? course.description }}</p>

    <p class="course__meta">
      <span class="course__scope body-s">{{ course.scope.join('  ·  ') }}</span>
      <span class="course__price heading-s">{{ formatPrice(course.price) }}</span>
    </p>

    <!-- трейлер: плеер по ссылке из данных; без ссылки (null) — серая заглушка -->
    <div v-if="trailerEmbed" class="course__video course__video--player">
      <iframe
        class="course__video-frame"
        :src="trailerEmbed"
        :title="`Трейлер курса «${course.title}»`"
        loading="lazy"
        allow="clipboard-write; autoplay; fullscreen"
        allowfullscreen
      />
    </div>
    <div v-else-if="course.trailer !== undefined" class="course__video" aria-hidden="true">
      <span class="course__video-play">
        <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
          <path d="M0 0.5 16 9 0 17.5V0.5Z" fill="currentColor" />
        </svg>
      </span>
    </div>

    <template v-if="course.about?.length">
      <p v-for="paragraph in course.about" :key="paragraph" class="course__about body-m">
        {{ paragraph }}
      </p>
    </template>

    <template v-if="course.skills?.length">
      <h3 class="course__subtitle heading-s">{{ labels.skills }}</h3>
      <!-- role="list": list-style none снимает семантику списка в Safari/VoiceOver -->
      <ul class="course__skills" role="list">
        <li v-for="skill in course.skills" :key="skill" class="course__skill body-s">
          <span class="course__skill-check" aria-hidden="true">
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path
                d="M1 3.75 3.6 6.25 9 1"
                stroke="currentColor"
                stroke-width="1.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          {{ skill }}
        </li>
      </ul>
    </template>

    <template v-if="course.audienceDetail">
      <h3 class="course__subtitle heading-s">{{ labels.audience }}</h3>
      <p class="course__audience body-m">{{ course.audienceDetail }}</p>
    </template>

    <template v-if="course.programSections?.length">
      <h3 class="course__subtitle heading-s">{{ labels.program }}</h3>
      <div class="course__program">
        <template v-for="section in course.programSections" :key="section.title">
          <!-- модуль с уроками — нативный аккордеон -->
          <details v-if="section.lessons?.length" class="course__module" :open="section.open">
            <summary class="course__module-head">
              <span class="course__module-title label-m">{{ section.title }}</span>
              <span class="course__module-meta label-s">{{ section.meta }}</span>
            </summary>
            <ul class="course__lessons" role="list">
              <li v-for="lesson in section.lessons" :key="lesson.title" class="course__lesson">
                <span class="course__lesson-title body-m">{{ lesson.title }}</span>
                <span class="course__lesson-duration label-s">{{ lesson.duration }}</span>
              </li>
            </ul>
          </details>

          <!-- модуль без предоставленного состава — некликабельная строка -->
          <div v-else-if="!section.parts" class="course__module-head course__module-head--static">
            <span class="course__module-title label-m">{{ section.title }}</span>
            <span class="course__module-meta label-s">{{ section.meta }}</span>
          </div>

          <!-- урок базового курса: аннотация и части с таймингами, без сворачивания -->
          <section v-else class="course__unit">
            <p class="course__unit-head">
              <span class="course__unit-title heading-s">{{ section.title }}</span>
              <span class="course__unit-meta label-s">{{ section.meta }}</span>
            </p>
            <p v-if="section.description" class="course__unit-description body-s">
              {{ section.description }}
            </p>
            <ul class="course__parts" role="list">
              <li v-for="part in section.parts" :key="part.title" class="course__part body-s">
                <span class="course__part-title">{{ part.title }}</span>
                <span class="course__part-duration label-s">{{ part.duration }}</span>
              </li>
            </ul>
          </section>
        </template>
      </div>
    </template>

    <div class="course__actions">
      <template v-if="!isCompact">
        <!-- TODO: покупка — эндпоинт не выбран, пока ведём в личный кабинет -->
        <AppButton variant="lime" size="l" :href="cabinetUrl">
          {{ labels.buy }} — {{ formatPrice(course.price) }}
        </AppButton>
        <AppButton class="course__cabinet" variant="white" size="l" :href="cabinetUrl">
          {{ labels.cabinet }}
          <span class="course__action-arrow" aria-hidden="true"><ArrowIcon /></span>
        </AppButton>
      </template>
      <!-- TODO: страница бизнес-курса не заведена — пока личный кабинет -->
      <AppButton
        v-else
        class="course__details"
        variant="lime"
        size="l"
        :href="cabinetUrl"
      >
        {{ labels.details }}
        <span class="course__action-arrow" aria-hidden="true"><ArrowIcon /></span>
      </AppButton>
    </div>
  </article>
</template>

<style lang="scss" scoped>
// Размеры из SVG-макета «Programs — Desktop 1440» (2026-08-15);
// сверено по координатам текстов и форм
.course {
  width: 100%;
  padding: 3rem; // 48px из макета
  background-color: var(--surface-nav);
  border-radius: 2.5rem; // 40px из макета

  @include bp.mobile {
    padding: 1.5rem; // 24px из мобильного макета (390)
  }

  &--compact {
    padding: 2.5rem; // 40px из макета (бизнес-курс)

    @include bp.mobile {
      padding: 1.5rem;
    }
  }

  &__badge {
    display: inline-block;
    padding: 0.4375rem 0.875rem; // 7px 14px из макета (высота пилюли 30)
    color: var(--text-on-lime);
    background-color: var(--brand-lime);
    border-radius: 999px;
  }

  &__title {
    margin: 1.25rem 0 0; // 20px из макета
  }

  &__teaser {
    max-width: 47rem; // оценка: ~750px по переносам макета
    margin: 1.125rem 0 0; // 18px из макета
    color: var(--text-muted);
  }

  &__meta {
    display: flex;
    flex-wrap: wrap;
    gap: 2.5rem; // оценка: ~40px между объёмом и ценой
    align-items: baseline;
    margin: 1.5rem 0 0; // 24px из макета

    @include bp.mobile {
      gap: 1rem;
    }
  }

  &__scope {
    color: var(--text-muted);
    white-space: pre-wrap; // двойные пробелы вокруг «·» из макета
  }

  &__price {
    color: var(--text-primary);
  }

  // ── заглушка трейлера ──────────────────────────────────────────────
  &__video {
    display: grid;
    place-items: center;
    // пропорция кадра, а не фиксированная высота: внутри — плеер rutube/youtube,
    // при жёсткой высоте на узких экранах он добавлял бы чёрные поля.
    // 420px из макета остаются предельной высотой на десктопе
    aspect-ratio: 16 / 9;
    max-height: 26.25rem;
    margin-top: 2.75rem; // 44px из макета
    background-color: var(--accent-grey);
    border-radius: 1.5rem; // 24px из макета

    @include bp.mobile {
      margin-top: 1.5rem;
    }
  }

  &__video--player {
    overflow: hidden; // скругление поверх iframe
  }

  &__video-frame {
    width: 100%;
    height: 100%;
    border: 0;
  }

  &__video-play {
    display: grid;
    place-items: center;
    width: 4.75rem; // 76px из макета
    height: 4.75rem;
    color: var(--text-inverse);
    background-color: color-mix(in srgb, var(--surface-page) 16%, transparent);
    border: 1px solid color-mix(in srgb, var(--surface-page) 40%, transparent);
    border-radius: 50%;

    svg {
      margin-left: 0.25rem; // оптическая центровка треугольника
    }
  }

  // ── описание ───────────────────────────────────────────────────────
  &__about {
    max-width: 69rem; // 1104px — вся контентная ширина карточки
    margin: 1rem 0 0; // 16px из макета: между абзацами
    color: var(--text-muted);

    &:first-of-type {
      margin-top: 2.5rem; // 40px из макета: от видео
    }
  }

  &__subtitle {
    margin: 2.75rem 0 0; // 44px из макета
  }

  // ── «Чему вы научитесь» ────────────────────────────────────────────
  &__skills {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem 2.5rem; // оценка: 16px между рядами, 40px между колонками
    margin: 0.875rem 0 0; // 14px из макета
    padding: 0;
    list-style: none;

    @include bp.mobile {
      grid-template-columns: 1fr; // одна колонка на мобиле
      gap: 0.75rem;
    }
  }

  &__skill {
    position: relative;
    padding-left: 2.125rem; // 34px из макета: текст правее чек-маркера
  }

  &__skill-check {
    position: absolute;
    top: 0;
    left: 0;
    display: grid;
    place-items: center;
    width: 1.375rem; // 22px из макета
    height: 1.375rem;
    color: var(--text-on-lime);
    background-color: var(--brand-lime);
    border-radius: 50%;
  }

  &__audience {
    max-width: 69rem;
    margin: 0.875rem 0 0; // 14px из макета
    color: var(--text-muted);
  }

  // ── программа курса ────────────────────────────────────────────────
  &__program {
    margin-top: 0.875rem; // 14px из макета
    overflow: hidden; // кремовые шапки модулей не вылезают за скругление
    background-color: var(--surface-page);
    border-radius: 1.5rem; // 24px из макета
  }

  // уроки базового курса (без сворачивания) — общий паддинг контейнера;
  // снизу отступа нет: последний ряд частей прижат к краю карточки
  &__unit {
    padding: 1.25rem 1.75rem 0; // верх первого урока 20px из макета

    + .course__unit {
      padding-top: 1rem; // 16px из макета: между уроками
    }
  }

  &__unit-head {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem 1.5rem;
    align-items: baseline;
    justify-content: space-between;
    margin: 0;
  }

  &__unit-meta,
  &__module-meta,
  &__lesson-duration,
  &__part-duration {
    flex-shrink: 0;
    color: var(--text-muted);
  }

  &__unit-description {
    margin: 0.5rem 0 0; // 8px из макета
    color: var(--text-muted);
  }

  // ряды частей с разделителями border-subtle — в SVG-экспорте 1px-линии
  // потерялись, значение от пользователя (2026-08-15)
  &__parts {
    margin: 1.25rem 0 0; // оценка: 20px до первой линии
    padding: 0;
    list-style: none;
  }

  // ряд выведен в край карточки отрицательными маргинами — линии-разделители
  // идут до самого края (внутренние отступы компенсируют паддинг карточки)
  &__part {
    position: relative;
    display: flex;
    gap: 1.5rem;
    align-items: center;
    justify-content: space-between;
    min-height: 2.625rem; // шаг рядов 42px из макета
    margin-inline: -1.75rem;
    padding-right: 1.75rem; // 28px — паддинг карточки
    padding-left: 4.5625rem; // 28px паддинг карточки + 45px из макета
    border-top: 1px solid var(--border-subtle);

    // нижняя линия — разделитель перед следующим уроком; у самой последней
    // части карточки (у нижнего скругления) линии нет
    &:last-child {
      border-bottom: 1px solid var(--border-subtle);
    }
  }

  &__unit:last-child &__part:last-child {
    border-bottom: 0;
  }

  // точка-маркер по центру строки части
  &__part::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 3.5625rem; // 28px + 29px из макета (центр точки − радиус)
    width: 0.3125rem;
    height: 0.3125rem;
    background-color: var(--text-muted);
    border-radius: 50%;
    transform: translateY(-50%);
  }

  &__part-title {
    color: var(--text-muted);
  }

  // модуль флагмана (аккордеон)
  &__module-head {
    display: flex;
    gap: 1.5rem;
    align-items: baseline;
    justify-content: space-between;
    padding: 1.125rem 1.75rem; // высота шапки 52px из макета (18 + 16 + 18)
    margin: 0;
    background-color: var(--surface-cream);
    box-shadow: inset 0.25rem 0 0 var(--brand-lime);

    @include bp.mobile {
      flex-wrap: wrap;
      gap: 0.25rem 1rem;
      padding: 1rem 1.25rem;
    }
  }

  details.course__module > summary.course__module-head {
    cursor: pointer;
    list-style: none; // без нативного маркера-стрелки

    &::-webkit-details-marker {
      display: none;
    }
  }

  // плавное открытие/закрытие аккордеона: анимация высоты к auto
  // (interpolate-size, Chromium 131+); без поддержки — мгновенно, как раньше
  &__module {
    interpolate-size: allow-keywords;

    &::details-content {
      block-size: 0;
      overflow-y: clip;
      transition:
        block-size 0.25s ease,
        content-visibility 0.25s allow-discrete;
    }

    &[open]::details-content {
      block-size: auto;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &__module::details-content {
      transition: none;
    }
  }

  &__lessons {
    margin: 0;
    padding: 0 1.75rem;
    list-style: none;

    @include bp.mobile {
      padding-inline: 1.25rem; // вровень с шапкой модуля
    }
  }

  &__lesson {
    display: flex;
    gap: 1.5rem;
    align-items: center;
    justify-content: space-between;
    // 56px из макета — именно минимум: на узких экранах название урока
    // переносится в несколько строк, при жёсткой высоте оно наезжало
    // на соседний ряд
    min-height: 3.5rem;
    padding-block: 0.5rem;

    @include bp.mobile {
      gap: 1rem; // 24px зазора съедали строку названия
    }
  }

  // ── кнопки ─────────────────────────────────────────────────────────
  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem; // 16px из макета
    align-items: center;
    margin-top: 2.5rem; // 40px из макета

    @include bp.mobile {
      margin-top: 1.5rem;
    }
  }

  // стрелка внутри капсулы кнопки (макет: «Войти в личный кабинет ↗»);
  // контент слота компилируется в скоупе этой карточки — :deep не нужен.
  // Высота прижата к строке (16px), иначе svg 20×20 растягивает капсулу
  &__action-arrow {
    display: inline-flex;
    align-items: center;
    height: 1rem;
    margin-left: 0.5rem;
  }

  // специфичность (0,2,0) перебивает мобильное правило __actions — мобильное
  // значение повторяем здесь, иначе бизнес-курс остаётся с десктопными 28px
  &--compact &__actions {
    margin-top: 1.75rem; // 28px из макета

    @include bp.mobile {
      margin-top: 1.5rem;
    }
  }

  // кнопка бизнес-курса ниже стандартной l (52px из макета); тройной класс —
  // чтобы перевесить собственные стили размера AppButton
  &--compact &__actions &__details :deep(.button__label) {
    padding-block: 1.125rem;
  }
}
</style>
