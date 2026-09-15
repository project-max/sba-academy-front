<script setup lang="ts">
import type { Teacher } from '../model/types';

interface Props {
  teacher: Teacher;
}

const props = defineProps<Props>();
</script>

<template>
  <article class="teacher-card">
    <img
      v-if="props.teacher.photo"
      class="teacher-card__photo"
      :src="props.teacher.photo"
      alt=""
      loading="lazy"
    >
    <!-- фото ещё не предоставлено — заглушка -->
    <div v-else class="teacher-card__photo teacher-card__photo--placeholder" />

    <div class="teacher-card__overlay">
      <h3 class="teacher-card__name heading-s">{{ props.teacher.name }}</h3>
      <p class="teacher-card__roles body-s">{{ props.teacher.roles.join(' · ') }}</p>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.teacher-card {
  position: relative;
  overflow: hidden;
  aspect-ratio: 384 / 398; // оценка: пропорция карточки из макета
  border-radius: 1.5rem; // оценка: 24px

  @include bp.mobile {
    aspect-ratio: 350 / 276; // 350×276 из мобильного макета (390)
  }

  &__photo {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top; // лица в верхней части портретов — не режем голову

    &--placeholder {
      background-color: var(--accent-grey);
    }
  }

  &__overlay {
    position: absolute;
    inset: auto 0 0;
    padding: 1.25rem; // 20px из макета
    color: var(--text-inverse);
    // затемнение под текстом, как в макете
    background: linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--brand-ink) 65%, transparent) 100%);
  }

  &__name {
    margin: 0 0 0.25rem;
  }

  &__roles {
    margin: 0;
    opacity: 82%;
  }
}
</style>
