<script setup lang="ts">
import { ref, useId } from 'vue';
import { NuxtLink } from '#components';
import { courses } from '@/entities/course';
import { submitApplication } from '@/shared/api';
import { AppButton } from '@/shared/ui';

// уникальный префикс id полей: форма переиспользуемая, статические id
// сломали бы label-связки при втором экземпляре на странице
const uid = useId();

const name = ref('');
const phone = ref('');
const email = ref('');
const courseId = ref(''); // пусто → в селекте виден плейсхолдер, как в макете
const consent = ref(false);
const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle');

async function onSubmit() {
  if (status.value === 'sending') return;
  status.value = 'sending';
  // catch обязателен: реальная реализация shared/api может бросить (fetch кидает
  // TypeError при сетевой ошибке) — без него форма зависнет в 'sending' навсегда
  try {
    const result = await submitApplication({
      name: name.value,
      phone: phone.value,
      email: email.value,
      courseId: courseId.value,
    });
    status.value = result.ok ? 'success' : 'error';
  } catch {
    status.value = 'error';
  }
}
</script>

<template>
  <form class="form" @submit.prevent="onSubmit">
    <div class="form__fields">
      <div class="form__field">
        <label class="form__label label-s" :for="`${uid}-course`">Программа</label>
        <span class="form__select">
          <select
            :id="`${uid}-course`"
            v-model="courseId"
            class="form__control body-m"
            :class="{ 'form__control--empty': !courseId }"
            name="course"
            required
          >
            <!-- авторская кнопка customizable select: значение показывает
                 <selectedcontent>, а его — в отличие от самого селекта, где
                 overflow форсирован в visible — можно обрезать многоточием.
                 В браузерах без base-select кнопка внутри select не рендерится -->
            <button class="form__select-button" type="button">
              <selectedcontent class="form__selected" />
            </button>
            <option class="form__option body-m" value="" disabled>Выберите программу</option>
            <option
              v-for="course in courses"
              :key="course.id"
              class="form__option body-m"
              :value="course.id"
            >
              {{ course.title }}
            </option>
          </select>
          <svg
            class="form__select-icon"
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 1L6 6L11 1"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </div>

      <div class="form__row">
        <div class="form__field">
          <label class="form__label label-s" :for="`${uid}-name`">Имя</label>
          <input
            :id="`${uid}-name`"
            v-model.trim="name"
            class="form__control body-m"
            name="name"
            placeholder="Как к вам обращаться"
            required
            autocomplete="name"
          >
        </div>

        <div class="form__field">
          <label class="form__label label-s" :for="`${uid}-phone`">Телефон</label>
          <input
            :id="`${uid}-phone`"
            v-model.trim="phone"
            class="form__control body-m"
            name="phone"
            type="tel"
            placeholder="+7 900 000-00-00"
            required
            autocomplete="tel"
          >
        </div>
      </div>

      <div class="form__field">
        <label class="form__label label-s" :for="`${uid}-email`">Email</label>
        <input
          :id="`${uid}-email`"
          v-model.trim="email"
          class="form__control body-m"
          name="email"
          type="email"
          placeholder="name@example.com"
          required
          autocomplete="email"
        >
      </div>
    </div>

    <label class="form__consent">
      <input v-model="consent" class="form__consent-input" type="checkbox" required >
      <span class="form__checkbox" aria-hidden="true" />
      <span class="form__consent-text body-s">
        Согласен на обработку персональных данных в соответствии с
        <NuxtLink to="/privacy" class="form__consent-link">политикой конфиденциальности</NuxtLink>
      </span>
    </label>

    <AppButton
      class="form__submit"
      variant="ink"
      size="l"
      type="submit"
      :disabled="status === 'sending'"
    >
      Отправить заявку
    </AppButton>

    <!-- live-регионы существуют в DOM с маунта (меняется только текст) —
         вставку узла с готовым текстом через v-if скринридеры не озвучивают -->
    <p
      class="form__status body-s"
      :class="{ 'form__status--visible': status === 'success' }"
      role="status"
    >{{ status === 'success' ? 'Заявка отправлена.' : '' }}</p>
    <p
      class="form__status body-s"
      :class="{ 'form__status--visible': status === 'error' }"
      role="alert"
    >{{ status === 'error' ? 'Не удалось отправить, попробуйте ещё раз.' : '' }}</p>
  </form>
</template>

<style lang="scss" scoped>
// Размеры сняты из SVG-макета «Заявка» (2026-08-13) — экспорт из Figma, значения точные;
// состояния (ховер, фокус, checked, ошибка) в макете не показаны — оценка
.form {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2.5rem; // 40px из макета
  background-color: var(--surface-nav);
  border-radius: 2rem; // 32px из макета

  @include bp.mobile {
    padding: 1.25rem; // 20px из мобильного макета (390)
    border-radius: 1.5rem; // 24px из мобильного макета (390)
  }
}

.form__fields {
  display: grid;
  gap: 1.25rem; // 20px из макета: между группами полей
}

.form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem; // 16px из макета: Имя | Телефон

  @include bp.mobile {
    grid-template-columns: 1fr; // Имя и Телефон в одну колонку из мобильного макета (390)
  }
}

.form__field {
  display: flex;
  flex-direction: column;
}

.form__label {
  margin-bottom: 0.5rem; // 8px из макета
  color: var(--text-muted);
}

.form__control {
  width: 100%;
  height: 3.875rem; // 62px из макета
  padding: 0 1.25rem; // 20px из макета
  color: var(--text-primary);
  background-color: var(--surface-cream);
  border: 1.5px solid var(--border-subtle);
  border-radius: 1rem; // 16px из макета

  @include bp.mobile {
    height: 3.75rem; // 60px из мобильного макета (390)
  }

  &::placeholder {
    color: var(--text-muted);
    opacity: 1; // Firefox приглушает плейсхолдеры сам
  }

  // оценка: фокус в макете не показан; явный outline вместо смены бордера —
  // 1.5px лаванды на креме не добирает контраст 3:1 (WCAG 1.4.11)
  &:focus-visible {
    border-color: var(--accent-lavender);
    outline: 2px solid var(--brand-violet);
    outline-offset: 2px;
  }
}

// Firefox/Safari (нативный выпадающий список): опции не должны наследовать
// приглушённый цвет плейсхолдера с селекта
.form__control option {
  color: var(--text-primary);
}

.form__select {
  position: relative;
  display: block;

  .form__control {
    padding-right: 3rem; // место под стрелку
    appearance: none;
  }
}

// селект без выбора показывает плейсхолдер приглушённым, как поля ввода
.form__control--empty {
  color: var(--text-muted);
}

.form__select-icon {
  position: absolute;
  top: 50%;
  right: 1.25rem; // 20px из макета
  color: var(--text-muted);
  pointer-events: none;
  transform: translateY(-50%);
}

// Кастомное меню селекта — нативный picker, стилизованный через appearance: base-select
// (Chromium). Прогрессивное улучшение: Firefox/Safari показывают системный список.
// Значения — оценка в стиле дизайн-системы, меню в макете не показано
@supports (appearance: base-select) {
  .form__select .form__control {
    appearance: base-select;
    white-space: nowrap; // значение в закрытом селекте — одной строкой
    // base-select превращает кнопку в обычный блок и текст прижимается к верху
    // (нативный селект центрирует сам) — центрируем по вертикали явно
    display: flex;
    align-items: center;

    // встроенную стрелку прячем — своя (svg) остаётся и в фолбэке
    &::picker-icon {
      display: none;
    }

    // авторская кнопка — прозрачная обёртка, флекс-ребёнком селекта остаётся
    // <selectedcontent>: у него и обрезаем длинное название многоточием
    // (у самого select overflow форсирован движком в visible)
    .form__select-button {
      display: contents;
    }

    .form__selected {
      display: block;
      min-width: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      // внутри — клон выбранного пункта с классом .form__option, у которого
      // перенос разрешён для меню; в кнопке он должен остаться одной строкой
      .form__option {
        white-space: nowrap;
      }
    }

    &::picker(select) {
      appearance: base-select;
      // Позиционирование только якорными инсетами: position-area и flip-block
      // в текущем Chromium для ::picker оценивают переполнение неверно
      // (меню всегда «переворачивается» вверх или уезжает за экран)
      inset: auto;
      top: anchor(bottom);
      left: anchor(left);
      // ширина меню = ширина селекта: без этого picker растягивается под самый
      // длинный пункт и на мобильном выходит за край экрана
      width: anchor-size(width);
      box-sizing: border-box;
      margin-block: 0.5rem; // зазор между кнопкой и меню
      padding: 0.5rem;
      background-color: var(--surface-page);
      border: 1.5px solid var(--border-subtle);
      border-radius: 1rem;
      box-shadow: 0 0.75rem 2rem -0.75rem color-mix(in srgb, var(--brand-ink) 25%, transparent);
      opacity: 0;
      transform: translateY(-0.5rem) scale(0.98);
      transform-origin: top;
      // transition в закрытом состоянии = анимация закрытия: быстрее, с ускорением
      transition:
        opacity 0.15s ease-in,
        transform 0.15s ease-in,
        display 0.15s allow-discrete,
        overlay 0.15s allow-discrete;
    }

    // состояние «открыто» вешаем на сам селект (:open::picker), а не на
    // ::picker(select):popover-open — минификатор (lightningcss) не принимает
    // псевдокласс состояния после псевдоэлемента
    &:open::picker(select) {
      opacity: 1;
      transform: none;
      // transition в открытом состоянии = анимация открытия: длиннее, с торможением
      transition:
        opacity 0.25s cubic-bezier(0.2, 0.8, 0.2, 1),
        transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1),
        display 0.25s allow-discrete,
        overlay 0.25s allow-discrete;

      @starting-style {
        opacity: 0;
        transform: translateY(-0.5rem) scale(0.98);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      &::picker(select),
      &:open::picker(select) {
        transition: none;
      }
    }
  }

  .form__option {
    padding: 0.75rem 1rem;
    color: var(--text-primary);
    white-space: normal; // меню шириной с селект — длинные названия переносятся
    border-radius: 0.625rem;
    transition: background-color 0.15s;

    // воздух между пунктами, чтобы подсветки соседей не слипались
    + .form__option {
      margin-top: 0.25rem;
    }

    // галочку у выбранного пункта не рисуем — он выделен фоном
    &::checkmark {
      display: none;
    }

    &:hover {
      background-color: var(--surface-cream);
    }

    // :focus, а не :focus-visible — при открытии мышью фокус тоже на пункте,
    // иначе проступает системная подсветка. Кремовый фон на белом (1.15:1) сам
    // по себе не индикатор — для клавиатуры нужна явная рамка (outline внутрь,
    // чтобы не резалась скруглением меню)
    &:focus {
      background-color: var(--surface-cream);
      outline: 2px solid var(--brand-violet);
      outline-offset: -2px;
    }

    &:checked {
      color: var(--text-on-lime);
      background-color: var(--brand-lime);
    }

    // плейсхолдер «Выберите программу» в самом меню не нужен
    &:disabled {
      display: none;
    }
  }
}

.form__consent {
  position: relative;
  display: flex;
  gap: 0.75rem; // 12px из макета
  align-items: flex-start;
  margin-top: 1.5rem; // 24px из макета
  cursor: pointer;
}

// нативный чекбокс поверх рисованного: невидим, но кликается и фокусируется
.form__consent-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 1.375rem;
  height: 1.375rem;
  margin: 0;
  cursor: pointer;
  opacity: 0;
}

.form__checkbox {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 1.375rem; // 22px из макета
  height: 1.375rem;
  background-color: var(--surface-nav);
  border: 1.5px solid var(--text-muted);
  border-radius: 0.5rem; // 8px из макета

  // галочка: два ребра с поворотом, видна только в checked
  &::after {
    content: '';
    width: 0.625rem;
    height: 0.375rem;
    margin-top: -0.125rem; // оптическая центровка галочки
    border-bottom: 2px solid var(--text-inverse);
    border-left: 2px solid var(--text-inverse);
    opacity: 0;
    transform: rotate(-45deg);
  }
}

.form__consent-input:checked + .form__checkbox {
  background-color: var(--brand-violet); // оценка: checked в макете не показан
  border-color: var(--brand-violet);

  &::after {
    opacity: 1;
  }
}

.form__consent-input:focus-visible + .form__checkbox {
  outline: 2px solid var(--brand-violet);
  outline-offset: 2px;
}

.form__consent-text {
  color: var(--text-muted);
}

.form__consent-link {
  color: var(--text-primary); // #262B1F из макета = brand-ink
  text-decoration: underline;
}

.form__submit {
  width: 100%;
  margin-top: 1rem; // 16px из макета

  :deep(.button__label) {
    flex: 1;
    justify-content: center;
    padding-block: 1.375rem; // высота кнопки 60px из макета (22+16+22)
  }
}

.form__status {
  margin: 0;
  color: var(--text-primary); // TODO: в палитре нет цвета ошибки — уточнить у дизайнера
  text-align: center;

  // отступ — только у непустого сообщения: пустые live-регионы не занимают место
  &--visible {
    margin-top: 0.75rem;
  }
}
</style>
