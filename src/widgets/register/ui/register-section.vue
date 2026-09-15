<script setup lang="ts">
import { SubmitApplicationForm } from '@/features/submit-application';
import { registerContent } from '../model/register-content';
</script>

<template>
  <section class="container register" aria-labelledby="register-title">
    <div class="section-inner">
      <div class="register__card">
        <div class="register__intro">
          <h2 id="register-title" class="register__title display-l">
            {{ registerContent.title }}
          </h2>
          <p class="register__subtitle body-l">{{ registerContent.subtitle }}</p>
          <!-- role="list": list-style none снимает семантику списка в Safari/VoiceOver -->
          <ul class="register__bullets" role="list">
            <li
              v-for="bullet in registerContent.bullets"
              :key="bullet"
              class="register__bullet body-m"
            >
              {{ bullet }}
            </li>
          </ul>
        </div>

        <div class="register__form">
          <SubmitApplicationForm />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
// Размеры сняты из SVG-макета «Заявка» (2026-08-13) — экспорт из Figma, значения точные.
// Цвета сверены с палитрой после обновления токенов дизайнером (2026-08-14)
.register {
  margin-top: 7.5rem; // 120px — по ритму секций

  @include bp.mobile {
    margin-top: 4.5rem; // 72px — мобильный ритм секций (макет 390)
  }

  &__card {
    display: flex;
    gap: 4rem; // 64px из макета: между колонкой и формой
    align-items: center; // левая колонка по центру вертикали, как в макете
    width: 100%;
    padding: 4rem; // 64px из макета
    // лаймовая карточка на всех ширинах (правка пользователя 2026-09-14;
    // в десктопном макете была brand-violet) — текст и маркеры ниже под
    // светлый фон
    background-color: var(--brand-lime);
    border-radius: 2.5rem; // 40px из макета

    // < 1200 интро и форме рядом тесно — колонка (интро сверху, форма снизу)
    @include bp.tablet-down {
      flex-direction: column;
      gap: 1.5rem;
      align-items: stretch;
    }

    @include bp.mobile {
      padding: 1.5rem; // 24px из мобильного макета (390); радиус 40 — как на десктопе
    }
  }

  &__intro {
    flex: 1;
    max-width: 30.5rem; // 488px из макета
  }

  &__title {
    margin: 0 0 1.5rem; // 24px из макета
    color: var(--text-on-lime);
    text-wrap: balance; // перенос «Регистрация / на курс», как в макете
  }

  &__subtitle {
    margin: 0 0 1.5rem; // 24px из макета
    color: var(--text-on-lime); // правка пользователя 2026-09-14
    opacity: 0.72; // из макета
  }

  &__bullets {
    display: grid;
    gap: 0.75rem; // 12px из макета
    margin: 0;
    padding: 0;
    color: var(--text-on-lime);
    list-style: none;
  }

  &__bullet {
    position: relative;
    padding-left: 1.25rem; // 20px из макета: текст с отступом от точки
    // 72% из макета — только у текста: opacity на li гасила бы и точку-маркер
    color: color-mix(in srgb, var(--text-on-lime) 72%, transparent);

    // чернильная точка 8px по центру строки body-m (24px)
    &::before {
      content: '';
      position: absolute;
      top: 0.5rem;
      left: 0;
      width: 0.5rem;
      height: 0.5rem;
      background-color: var(--brand-ink); // в цвет текста (правка пользователя 2026-09-14)
      border-radius: 50%;
    }
  }

  &__form {
    flex-shrink: 0;
    width: 32.5rem; // 520px из макета

    @include bp.tablet-down {
      width: 100%; // во всю карточку (колонка)
    }
  }
}
</style>
