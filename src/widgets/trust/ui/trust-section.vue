<script setup lang="ts">
import { stats, StatCard } from '@/entities/stat';
import { LinkBar } from '@/shared/ui';
import { trustContent } from '../model/trust-content';

const cards = trustContent.cards
  .map((card) => ({ ...card, stat: stats.find((s) => s.id === card.statId) }))
  .filter((card) => card.stat !== undefined);
</script>

<template>
  <section class="container trust" aria-labelledby="trust-title">
    <div class="section-inner">
      <h2 id="trust-title" class="trust__title display-l">{{ trustContent.title }}</h2>

      <ul class="trust__grid">
        <li v-for="card in cards" :key="card.statId">
          <StatCard :stat="card.stat!" :theme="card.theme" />
        </li>
      </ul>

      <!-- стрелка violet-bright #8E79C4 — из мобильного макета секции;
           в десктопном макете была лаванда старой гаммы (сверить у дизайнера) -->
      <LinkBar class="trust__rating" :href="trustContent.rating.href" icon="bright">{{
        trustContent.rating.label
      }}</LinkBar>
    </div>
  </section>
</template>

<style lang="scss" scoped>
// Набросок по макету секции «Почему нам доверяют» (2026-08-12):
// размеры с пометкой «оценка» — уточнить
.trust {
  margin-top: 7.5rem; // 120px из макета

  @include bp.mobile {
    margin-top: 4.5rem; // 72px — мобильный ритм секций (макет 390)
  }

  &__title {
    margin: 0 0 3rem; // оценка: 48px

    @include bp.mobile {
      margin-bottom: 1.5rem; // 24px из мобильного макета секции (390)
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem; // оценка: 24px
    padding: 0;
    margin: 0 0 3rem; // оценка: 48px до плашки рейтинга
    list-style: none;

    // на планшете четырём колонкам тесно — 2×2 (наше решение);
    // minmax(0, 1fr): неразрывное «400 000+» иначе распирает колонку
    @include bp.tablet-only {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @include bp.mobile {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.75rem; // 12px из мобильного макета (390)
      margin-bottom: 1.5rem; // 24px до плашки рейтинга из мобильного макета
    }
  }

  // плашка рейтинга (LinkBar): на мобиле текст переносится в 2 строки —
  // паддинги дефолтные (высота 80 из макета секции), меняется только радиус
  &__rating {
    @include bp.mobile {
      border-radius: 100rem; // капсула (rx 40 при высоте 80) из макета секции
    }
  }
}
</style>
