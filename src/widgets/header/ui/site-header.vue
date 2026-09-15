<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { NuxtLink } from '#components';
import { useRoute } from '#imports';
import { mainNav, cabinetUrl, mobileMenuCta } from '@/shared/config';
import { useAutoHide } from '@/shared/lib';
import { AppButton } from '@/shared/ui';
import NavLink from './nav-link.vue';

// вниз — спрятать, вверх — показать; до 96px (высота хедера) всегда виден
const { hidden } = useAutoHide({ offset: 96 });

// мобильное меню (бургер); закрывается при навигации, по Escape и при выходе
// из диапазона бургера (поворот планшета: кнопка исчезает — меню не должно
// остаться открытым с заблокированным скроллом)
const menuOpen = ref(false);
const burgerRef = ref<HTMLButtonElement | null>(null);
const route = useRoute();

function closeMenu(returnFocus = false) {
  menuOpen.value = false;
  if (returnFocus) burgerRef.value?.focus();
}

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false;
  },
);

// пока меню открыто, страница под ним не прокручивается
watch(menuOpen, (open) => {
  document.documentElement.classList.toggle('u-scroll-lock', open);
});

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && menuOpen.value) closeMenu(true);
}

// = $bp-nav-max из app/styles/_breakpoints.scss
const collapsedNav = '(max-width: 63.9375rem)';
let mediaQuery: MediaQueryList | undefined;

function onMediaChange(event: MediaQueryListEvent) {
  if (!event.matches && menuOpen.value) closeMenu();
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown);
  mediaQuery = window.matchMedia(collapsedNav);
  mediaQuery.addEventListener('change', onMediaChange);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown);
  mediaQuery?.removeEventListener('change', onMediaChange);
  document.documentElement.classList.remove('u-scroll-lock');
});
</script>

<template>
  <header class="header container" :class="{ 'header--hidden': hidden && !menuOpen }">
    <NuxtLink class="header__brand" to="/" aria-label="SBA Academy — на главную">
      <span class="header__logo label-s" aria-hidden="true">SBA</span>
      <span class="header__brand-name label-m">Smart Business<br>Administration Academy</span>
    </NuxtLink>

    <nav class="header__nav" aria-label="Основная навигация">
      <NavLink v-for="item in mainNav" :key="item.href" :href="item.href">
        {{ item.label }}
      </NavLink>
    </nav>

    <NavLink class="header__cabinet" :href="cabinetUrl" external variant="accent">
      Личный кабинет
    </NavLink>

    <!-- мобильный бургер (макет 390): белый круг 44 с двумя линиями;
         в открытом состоянии — фиолетовый круг с белым крестом (макет «Header») -->
    <button
      ref="burgerRef"
      class="header__burger"
      :class="{ 'header__burger--open': menuOpen }"
      type="button"
      :aria-expanded="menuOpen"
      aria-controls="mobile-menu"
      :aria-label="menuOpen ? 'Закрыть меню' : 'Открыть меню'"
      @click="menuOpen = !menuOpen"
    >
      <span class="header__burger-line" aria-hidden="true" />
      <span class="header__burger-line" aria-hidden="true" />
    </button>

    <!-- мобильное меню (макет «Menu panel», 2026-09-14): кремовая карточка
         со строками-ссылками и две кнопки во всю ширину под ней -->
    <Transition name="menu">
      <div v-if="menuOpen" id="mobile-menu" class="header__menu">
        <div class="header__menu-inner container">
          <nav aria-label="Мобильная навигация">
            <!-- role="list": list-style none снимает семантику списка в Safari/VoiceOver -->
            <ul class="header__menu-list" role="list">
              <li v-for="item in mainNav" :key="item.href" class="header__menu-item">
                <NuxtLink class="header__menu-link heading-s" :to="item.href">
                  {{ item.label }}
                  <svg
                    class="header__menu-chevron"
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 1l6 6-6 6"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </NuxtLink>
              </li>
            </ul>
          </nav>

          <div class="header__menu-actions">
            <AppButton class="header__menu-action" variant="lime" size="m" :to="mobileMenuCta.href">
              {{ mobileMenuCta.label }}
            </AppButton>
            <AppButton class="header__menu-action" variant="cream" size="m" :href="cabinetUrl">
              Личный кабинет
            </AppButton>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style lang="scss" scoped>
// ширину и inline-отступы даёт глобальный .container (см. app/styles/_layout.scss).
// Auto-hide: состояние считает useAutoHide (shared/lib), анимация — только CSS
.header {
  position: sticky;
  top: 0;
  z-index: 10; // над контентом страницы; шкала z-index — по мере необходимости
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  min-height: 6rem; // 96px из макета (min-height — не режем контент, если он выше)
  padding-block: 1.5rem; // 24px из макета
  background-color: var(--surface-page); // непрозрачный: контент не просвечивает
  transition: translate 0.25s ease;

  &--hidden {
    translate: 0 -100%;
  }

  // клавиатурная навигация раскрывает спрятанный хедер — иначе Tab уводит
  // фокус в невидимые ссылки (правило ПОСЛЕ --hidden: переопределяет его).
  // Именно `none`, не `0 0`: заданный translate делает хедер containing block
  // для fixed-меню бургера, и панель сжимается до высоты шапки
  &:focus-within {
    translate: none;
  }

  @include bp.mobile {
    min-height: 4.75rem; // 76px из макета 390
    padding-block: 1rem; // 16px (бургер 44 + 16×2 = 76)
  }

  &__brand {
    position: relative;
    z-index: 1; // над панелью мобильного меню
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--text-primary);
    text-decoration: none;

    @include bp.mobile {
      gap: 0.625rem; // 10px из макета 390
    }
  }

  &__logo {
    display: grid;
    place-items: center;
    width: 2.75rem; // 44px из макета
    height: 2.75rem;
    border-radius: 0.75rem; // оценка: 12px
    color: var(--text-inverse);
    background-color: var(--brand-violet);

    @include bp.mobile {
      width: 2.25rem; // 36px из макета 390
      height: 2.25rem;
    }
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: 2rem; // оценка: 32px
    padding: 0.875rem 1.5rem; // 14px 24px из макета
    background-color: var(--surface-nav);
    border-radius: 999px;

    @include bp.nav-collapse {
      display: none; // ниже 1024 навигация — в меню бургера
    }
  }

  &__cabinet {
    @include bp.nav-collapse {
      display: none;
    }
  }

  // ── бургер (только мобильный) ──────────────────────────────────────
  &__burger {
    display: none;

    @include bp.nav-collapse {
      position: relative;
      z-index: 1; // над панелью мобильного меню
      display: grid;
      flex-shrink: 0;
      place-items: center;
      width: 2.75rem; // 44px из макета 390
      height: 2.75rem;
      padding: 0;
      cursor: pointer;
      background-color: var(--surface-nav);
      border: 0;
      border-radius: 50%;
      transition: background-color 0.2s ease;
    }

    // открытое меню: фиолетовый круг (макет «Header»)
    &--open {
      background-color: var(--brand-violet);
    }
  }

  &__burger-line {
    position: absolute;
    width: 1rem; // 16px из макета 390
    height: 2px;
    background-color: var(--text-primary);
    border-radius: 1px;
    transition:
      translate 0.2s ease,
      rotate 0.2s ease,
      width 0.2s ease,
      background-color 0.2s ease;

    &:first-child {
      translate: 0 -0.1875rem; // зазор линий 6px из макета
    }

    &:last-child {
      translate: 0 0.1875rem;
    }
  }

  // открытое меню: линии складываются в белый крест 16×16 (макет «Header»);
  // диагональ квадрата 16 — это 16·√2 ≈ 22.6px длины линии
  &__burger--open &__burger-line {
    width: 1.4142rem;
    background-color: var(--text-inverse);

    &:first-child {
      translate: 0 0;
      rotate: 45deg;
    }

    &:last-child {
      translate: 0 0;
      rotate: -45deg;
    }
  }

  // ── мобильное меню (макет «Menu panel», 2026-09-14) ─────────────────
  // панель рисуется по DOM-порядку поверх остального содержимого шапки;
  // лого и бургер держатся выше своим z-index: 1
  &__menu {
    position: fixed;
    inset: 0;
    padding-top: 6.25rem; // 76px шапки + 24px до карточки из макета
    overflow-y: auto; // на низких экранах меню прокручивается внутри панели
    background-color: var(--surface-page);
  }

  // .container даёт те же поля, что у шапки (20px на мобильном, 64 на планшете)
  &__menu-inner {
    padding-bottom: 2rem; // 32px под кнопками из макета
  }

  &__menu-list {
    margin: 0;
    padding: 0;
    overflow: hidden; // скругление поверх строк
    list-style: none;
    background-color: var(--surface-cream);
    border-radius: 2rem; // 32px из макета
  }

  // разделители из макета — тенью, а не бордером: строки остаются ровно 66px,
  // карточка — 330 (5 × 66), как в макете
  &__menu-item + &__menu-item {
    box-shadow: inset 0 1px 0 var(--border-subtle);
  }

  &__menu-link {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    min-height: 4.125rem; // строка 66px из макета
    padding: 0 1.25rem 0 1.5rem; // текст в 24px от края, шеврон — в 20px
    color: var(--text-primary);
    text-decoration: none;

    &:hover {
      color: var(--brand-violet);
    }
  }

  &__menu-chevron {
    flex-shrink: 0;
    color: var(--text-muted); // #5F6157 из макета
  }

  &__menu-actions {
    display: grid;
    gap: 0.75rem; // 12px между кнопками из макета
    margin-top: 1.25rem; // 20px от карточки из макета
  }

  // кнопки во всю ширину, высота 52px из макета: 18 + 16 (label-m) + 18
  &__menu-action {
    display: flex;

    :deep(.button__label) {
      flex: 1;
      justify-content: center;
      padding-block: 1.125rem;
    }
  }
}


.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.2s ease, translate 0.2s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  translate: 0 -0.5rem;
}

@media (prefers-reduced-motion: reduce) {
  .header {
    transition: none; // состояние меняется мгновенно, механика остаётся
  }

  .menu-enter-active,
  .menu-leave-active {
    transition: none;
  }
}
</style>
