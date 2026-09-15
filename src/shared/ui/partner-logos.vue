<script setup lang="ts">
// Партнёрский ряд «SBA × АИРП»: секция сертификации главной, страницы
// «О школе» и «Лицензии». Ряд декоративный — рядом всегда идёт текст
// о партнёрстве, поэтому aria-hidden; внешние отступы задаёт потребитель
</script>

<template>
  <div class="partner-logos" aria-hidden="true">
    <!-- плитки SBA и крестика на мобильном нет (решение заказчика 2026-09-14) —
         в ряду остаётся только логотип АИРП -->
    <span class="partner-logos__sba label-m u-mobile-hidden">SBA</span>
    <span class="partner-logos__cross heading-m">×</span>
    <span class="partner-logos__partner">
      <img
        src="/images/certification/airp-logo.webp"
        width="578"
        height="98"
        alt=""
        loading="lazy"
      >
    </span>
  </div>
</template>

<style lang="scss" scoped>
// Размеры из макета секции сертификации (2026-08-13);
// мобильное поведение — правки пользователя 2026-09-14
.partner-logos {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem; // 20px из макета
  align-items: center;

  &__sba {
    display: grid;
    place-items: center;
    width: 4rem; // 64px из макета
    height: 4rem;
    color: var(--brand-violet);
    background-color: var(--surface-page);
    border-radius: 1rem; // 16px из макета
  }

  &__cross {
    color: var(--accent-lavender-pale);

    @include bp.mobile {
      display: none;
    }
  }

  &__partner {
    display: flex;
    min-width: 0;
    align-items: center;
    padding: 0.75rem 1rem; // 12px 16px из макета
    background-color: var(--surface-page);
    border-radius: 1rem;

    // на мобильном плашка одна в ряду — во всю ширину карточки, логотип
    // по центру. Шире 302px (ширина плашки на макетных 390) не растёт:
    // на 450–767 логотип иначе раздувался вместе с ней до 600+px
    @include bp.mobile {
      flex: 1;
      max-width: 18.875rem;
      justify-content: center;
    }

    img {
      width: 11.375rem; // 182px из макета
      max-width: 100%;
      height: 2.5rem; // 40px из макета
      object-fit: contain; // растр: вписываем без искажения пропорций

      // на мобильном логотип заполняет плашку, отступы — её паддинг 12px 16px
      @include bp.mobile {
        width: 100%;
        height: auto;
      }
    }
  }
}
</style>
