import { ref, watch } from 'vue';
import { useWindowScroll } from '@vueuse/core';

export interface AutoHideOptions {
  /** до этой прокрутки элемент всегда виден (px) */
  offset?: number;
  /** накопленная дельта для смены состояния — гистерезис против дребезга (px) */
  tolerance?: number;
}

/**
 * Auto-hide по направлению скролла (headroom-паттерн): вниз — спрятать,
 * вверх — показать. JS считает только булево состояние — анимация остаётся
 * в CSS потребителя (transition на translate + :focus-within + reduced-motion).
 *
 * Встроено: гистерезис (микродельты тачпада не дёргают состояние),
 * кламп scrollY в реальный диапазон (iOS-резинка инвертирует «направление»),
 * у верха страницы элемент всегда виден. SSR-безопасен: дефолт — «показан»,
 * слушатель пассивный (useWindowScroll), работает после гидратации.
 */
export function useAutoHide(options: AutoHideOptions = {}) {
  const { offset = 96, tolerance = 12 } = options;
  const hidden = ref(false);
  const { y } = useWindowScroll();

  let lastY = 0;
  let acc = 0;

  watch(y, (rawY) => {
    const maxY = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
    const currentY = Math.min(Math.max(rawY, 0), maxY);
    const delta = currentY - lastY;
    lastY = currentY;

    if (currentY <= offset) {
      hidden.value = false;
      acc = 0;
      return;
    }

    // смена направления сбрасывает накопленную дельту
    if (Math.sign(delta) !== Math.sign(acc)) acc = 0;
    acc += delta;

    if (acc > tolerance) hidden.value = true;
    else if (acc < -tolerance) hidden.value = false;
  });

  return { hidden };
}
