<script setup lang="ts">
import { stats } from '@/entities/stat';
import { AppButton } from '@/shared/ui';
import { ecosystemContent } from '../model/ecosystem-content';

const yearsStat = stats.find((s) => s.id === ecosystemContent.statId);
</script>

<template>
  <section class="container ecosystem" aria-labelledby="ecosystem-title">
    <div class="section-inner">
      <h2 id="ecosystem-title" class="ecosystem__title display-l">
        {{ ecosystemContent.titleLines[0] }}<br>{{ ecosystemContent.titleLines[1] }}
      </h2>

      <div class="ecosystem__card">
        <div class="ecosystem__visual">
          <span class="ecosystem__blob" aria-hidden="true" />

          <!-- логотип и леттеринг — SVG-ассеты от дизайнера; градиент подложки —
               бренд Decimal, в нашей палитре его нет намеренно -->
          <div class="ecosystem__decimal" aria-hidden="true">
            <img
              class="ecosystem__decimal-logo"
              src="/images/ecosystem/decimal-logo.svg"
              width="100"
              height="100"
              alt=""
              loading="lazy"
            >
          </div>
          <!-- леттеринг — по центру всей левой карточки, поверх градиентной -->
          <img
            class="ecosystem__decimal-name"
            src="/images/ecosystem/decimal-wordmark.svg"
            width="322"
            height="66"
            alt=""
            loading="lazy"
            aria-hidden="true"
          >

          <div v-if="yearsStat" class="ecosystem__stat">
            <p class="ecosystem__stat-value heading-m">{{ yearsStat.value }}</p>
            <p class="ecosystem__stat-label label-s">{{ yearsStat.label }}</p>
          </div>
        </div>

        <div class="ecosystem__info">
          <h3 class="ecosystem__info-title heading-l">{{ ecosystemContent.cardTitle }}</h3>
          <p
            v-for="paragraph in ecosystemContent.paragraphs"
            :key="paragraph"
            class="ecosystem__paragraph body-l"
          >
            {{ paragraph }}
          </p>

          <AppButton
            class="ecosystem__cta"
            :to="ecosystemContent.cta.href"
            variant="lime"
            size="l"
          >
            {{ ecosystemContent.cta.label }}
          </AppButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
// Набросок по макету секции экосистемы (2026-08-12):
// размеры с пометкой «оценка» — уточнить
.ecosystem {
  margin-top: 7.5rem; // 120px — по ритму секций, уточнить по макету

  @include bp.mobile {
    margin-top: 4.5rem; // 72px — мобильный ритм секций (макет 390)
  }

  &__title {
    margin: 0 0 3rem; // оценка: 48px
  }

  &__card {
    display: flex;
    gap: 4rem; // оценка: 64px
    align-items: center;
    padding: 2.5rem 4rem 2.5rem 2.5rem; // 40px, справа 64px из макета
    background-color: var(--surface-cream);
    border-radius: 2.5rem; // оценка: 40px

    // < 1200 двум колонкам тесно (фикс. визуал 440 + текст) — вертикальный
    // поток по мобильной композиции
    @include bp.tablet-down {
      flex-direction: column;
      gap: 1.5rem; // оценка: 24px
      align-items: stretch;
      background-color: var(--surface-nav); // фон вертикальной композиции (макет 390)
    }

    @include bp.tablet-only {
      padding: 2.5rem; // промежуточный паддинг планшета
    }

    @include bp.mobile {
      padding: 1.25rem; // 20px из мобильного макета (390)
    }
  }

  &__visual {
    position: relative;
    flex-shrink: 0;
    width: 27.5rem; // оценка: 440px
    height: 31.25rem; // оценка: 500px
    overflow: hidden;
    background-color: var(--accent-lavender-pale);
    border-radius: 2rem; // оценка: 32px

    // < 1200 композиция та же, что на десктопе (круг + смещённая карточка +
    // чип), но масштабируется: геометрия детей — в процентах от блока.
    // Точные значения — из экспорта «Ecosystem visual» (310×352, макет 390)
    @include bp.tablet-down {
      width: 100%;
      max-width: 27.5rem; // не шире десктопного блока, по центру карточки
      height: auto;
      aspect-ratio: 22 / 25; // 310×352 из макета (= 440×500 десктопа)
      margin-inline: auto;
      border-radius: 1.75rem; // 28px из макета визуала
    }
  }

  &__blob {
    position: absolute;
    top: -3.75rem; // оценка: круг частично за краем
    left: -3.75rem;
    width: 17.5rem; // оценка: 280px
    height: 17.5rem;
    background-color: var(--brand-lime);
    border-radius: 50%;

    @include bp.tablet-down {
      top: -14.4%; // -50.7/352 из макета визуала
      left: -12.7%; // -39.5/310
      width: 72.7%; // диаметр 225.5/310 — в долях ширины блока
      height: auto;
      aspect-ratio: 1;
      opacity: 0.8; // из макета: круг чуть просвечивает лавандовой подложкой
    }
  }

  // ── заглушка карточки Decimal (см. TODO в шаблоне) ─────────────────
  &__decimal {
    position: absolute;
    top: 3.25rem; // 52px из макета
    right: 1.75rem; // 28px из макета
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 17.3125rem; // оценка: 277px
    height: 27.125rem; // оценка: 434px
    padding: 4.75rem 1.5rem 0;
    // градиент подложки по референсу дизайнера; средний и конечный стопы —
    // из фирменного SVG-логотипа Decimal (вне нашей палитры намеренно)
    background: linear-gradient(135deg, #22c9f5 0%, #4579f5 55%, #9c42f5 100%);
    border-radius: 1.5rem;

    @include bp.tablet-down {
      // из макета визуала (310×352): rect 88.8;36.6 размером 201.5×303
      inset: 10.4% 6.36% 3.6% 28.6%;
      width: auto;
      height: auto;
      // 36.6/310 от ширины блока — лого в верхней части карточки;
      // inline-паддинг не нужен: лого и wordmark позиционируются сами
      padding: 11.8% 0 0;
      border-radius: 1rem; // 16.9px из макета визуала
    }
  }

  &__decimal-logo {
    width: 6rem; // оценка: 96px
    height: 6rem;

    @include bp.tablet-down {
      width: 35%; // 70.5/201.5 — в долях ширины градиентной карточки
      height: auto;
    }
  }

  &__decimal-name {
    position: absolute;
    top: 55%; // из макета
    left: 50%;
    // натуральный размер SVG (322×66) — как в макете
    transform: translate(-50%, -50%);

    @include bp.tablet-down {
      // из макета визуала: глифы 31…257.7 по x, центр 144.4;186.5
      top: 53%;
      left: 46.6%;
      width: 73.1%; // 226.7/310 — в долях ширины блока
      height: auto;
    }
  }

  &__stat {
    position: absolute;
    bottom: 3.25rem; // 52px из макета
    left: 1.375rem; // 22px из макета
    width: 12.875rem; // 206px из макета
    height: 6.625rem; // 106px из макета
    padding: 1rem; // оценка: 16px
    // стеклянный чип: полупрозрачная подложка + blur
    background-color: color-mix(in srgb, var(--surface-page) 65%, transparent);
    backdrop-filter: blur(8px);
    border-radius: 1rem; // оценка: 16px

    @include bp.tablet-down {
      bottom: 10.3%; // 36.1/352 из макета визуала
      left: 5%; // 15.5/310
      width: 47.3%; // 146.5/310
      height: auto;
      // в макете визуала подложка чипа — cream 80% (на десктопе — белая 65%)
      background-color: color-mix(in srgb, var(--surface-cream) 80%, transparent);
    }

    @include bp.mobile {
      padding: 0.75rem 1rem; // 12px 16px из мобильного макета (390)
      // value (heading-m) сам становится 20/26 на мобиле — override не нужен
    }
  }

  &__stat-value {
    margin: 0 0 0.25rem;
  }

  &__stat-label {
    margin: 0;
    color: var(--text-muted);
  }

  &__info {
    max-width: 35.5rem; // оценка: 568px
  }

  &__info-title {
    margin: 0 0 1.5rem; // 24px из макета
  }

  &__paragraph {
    margin: 0 0 1.5rem; // 24px из макета
    color: var(--text-muted);
  }

}
</style>
