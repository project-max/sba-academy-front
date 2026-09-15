<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { NuxtLink } from '#components';

interface Props {
  /**
   * внутренний роут или спец-схема (mailto:/tel:) → NuxtLink;
   * для внешних URL NuxtLink сам рендерит <a> без target="_blank"
   */
  to?: string;
  /** внешняя ссылка → <a target="_blank"> */
  href?: string;
  variant?: 'violet' | 'lime' | 'white' | 'ink' | 'cream';
  size?: 's' | 'm' | 'l';
  /** для <button> без ссылок */
  type?: 'button' | 'submit';
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  to: undefined,
  href: undefined,
  variant: 'violet',
  size: 'm',
  type: 'button',
  disabled: false,
});

const slots = useSlots();

const tag = computed(() => {
  if (props.to) return NuxtLink;
  if (props.href) return 'a';
  return 'button';
});

const tagAttrs = computed(() => {
  if (props.to) return { to: props.to };
  if (props.href) return { href: props.href, target: '_blank', rel: 'noopener' };
  return { type: props.type, disabled: props.disabled };
});
</script>

<template>
  <component
    :is="tag"
    v-bind="tagAttrs"
    class="button"
    :class="[`button--${props.variant}`, `button--${props.size}`]"
  >
    <span class="button__label label-m"><slot /></span>
    <span v-if="slots.icon" class="button__icon" aria-hidden="true">
      <slot name="icon" />
    </span>
  </component>
</template>

<style lang="scss" scoped>
// Капсульная кнопка дизайн-системы; составной вариант (капсула + круг с иконкой) —
// через слот #icon: это ОДНА ссылка/кнопка, круг — декоративная часть
.button {
  display: inline-flex;
  padding: 0;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  background: none;
  border: 0;

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }

  &__label {
    display: flex;
    align-items: center;
    border-radius: 999px;
    white-space: nowrap; // кнопка не переносится на строки
    transition: background-color 0.15s;

    // ниже макетных 390 неразрывная подпись вылезала бы за край экрана —
    // разрешаем перенос. width: max-content и flex-shrink: 0 обязательны:
    // флекс отдаёт подписи на несколько пикселей меньше строки и ломает её
    // там, где места на самом деле хватает (360–389 — массовые Android)
    @include bp.narrow {
      flex-shrink: 0;
      width: max-content;
      max-width: 100%;
      white-space: normal;
    }

    // на самых узких экранах подпись обязана сжиматься: там строка
    // действительно не помещается, и нерастяжимая кнопка вылезала бы за край
    @include bp.tiny {
      flex-shrink: 1;
      width: auto;
    }
  }

  &__icon {
    display: grid;
    place-items: center;
    border-radius: 50%;
    transition: background-color 0.15s;
  }

  // размеры
  &--s &__label {
    padding: 0.75rem 1.5rem; // оценка: 12px 24px (карточки секций)
  }

  &--s &__icon {
    width: 2.75rem; // оценка: 44px — вровень с капсулой s
    height: 2.75rem;
  }

  &--m &__label {
    padding: 1rem 1.75rem; // 16px 28px (хедер, макет)
  }

  &--m &__icon {
    width: 3rem; // 48px — вровень с капсулой m
    height: 3rem;
  }

  &--l &__label {
    padding: 1.25rem 2rem; // оценка: 20px 32px (hero)
  }

  &--l &__icon {
    width: 3.5rem; // 56px из макета — вровень с капсулой l
    height: 3.5rem;
  }

  // варианты
  &--violet {
    color: var(--text-inverse);

    .button__label,
    .button__icon {
      background-color: var(--brand-violet);
    }

    &:hover:not(:disabled) .button__label,
    &:hover:not(:disabled) .button__icon {
      background-color: var(--brand-violet-bright); // оценка: ховеров в макете нет
    }
  }

  &--lime {
    color: var(--text-on-lime);

    .button__label,
    .button__icon {
      background-color: var(--brand-lime);
    }
    // TODO: ховер лаймового варианта — когда появится в макете
  }

  &--white {
    color: var(--text-primary);

    .button__label,
    .button__icon {
      background-color: var(--surface-page);
    }
    // TODO: ховер белого варианта — когда появится в макете
  }

  // кремовая кнопка (surface-cream) — второстепенное действие в мобильном меню (макет 2026-09-14)
  &--cream {
    color: var(--text-primary);

    .button__label,
    .button__icon {
      background-color: var(--surface-cream);
    }
    // TODO: ховер кремового варианта — когда появится в макете
  }

  // тёмная кнопка (brand-ink) — кнопка отправки формы, правка пользователя 2026-09-14
  &--ink {
    color: var(--text-inverse);

    .button__label,
    .button__icon {
      background-color: var(--brand-ink);
    }
    // TODO: ховер тёмного варианта — когда появится в макете
  }
}
</style>
