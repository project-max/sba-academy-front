<script setup lang="ts">
import { BadgeCard, PartnerLogos } from '@/shared/ui';
import { licensePageContent } from '../model/license-page-content';

const content = licensePageContent;
</script>

<template>
  <div class="license">
    <section class="container license__hero" aria-labelledby="license-title">
      <div class="section-inner">
        <h1 id="license-title" class="license__title display-l">{{ content.title }}</h1>
        <p class="license__intro body-l">{{ content.intro }}</p>

        <!-- карточка лицензии -->
        <article class="license__card">
          <span class="license__card-badge label-s">{{ content.license.badge }}</span>
          <h2 class="license__card-title heading-l">{{ content.license.title }}</h2>

          <dl class="license__meta">
            <div v-for="item in content.license.meta" :key="item.label" class="license__meta-item">
              <dt class="license__meta-label label-s">{{ item.label }}</dt>
              <dd class="license__meta-value body-m">{{ item.value }}</dd>
            </div>
          </dl>

          <p class="license__note body-s">{{ content.license.note }}</p>

          <!-- партнёрство SBA × АИРП, как в секции сертификации на главной -->
          <PartnerLogos class="license__partner" />
        </article>
      </div>
    </section>

    <section class="container license__graduate" aria-labelledby="graduate-title">
      <div class="section-inner">
        <h2 id="graduate-title" class="license__section-title heading-l">
          {{ content.graduate.title }}
        </h2>
        <!-- role="list": list-style none снимает семантику списка в Safari/VoiceOver -->
        <ul class="license__graduate-grid" role="list">
          <li v-for="card in content.graduate.cards" :key="card.badge">
            <BadgeCard
              :badge="card.badge"
              :badge-theme="card.badgeTheme"
              :title="card.title"
              :description="card.description"
            />
          </li>
        </ul>
      </div>
    </section>

    <section class="container license__documents" aria-labelledby="documents-title">
      <div class="section-inner">
        <h2 id="documents-title" class="license__section-title heading-l">
          {{ content.documents.title }}
        </h2>
        <ul class="license__documents-card" role="list">
          <li v-for="doc in content.documents.items" :key="doc.title">
            <a class="license__document" :href="doc.href" target="_blank" rel="noopener">
              <span class="license__document-info">
                <span class="license__document-title heading-s">{{ doc.title }}</span>
                <span class="license__document-note label-s">{{ doc.note }}</span>
              </span>
              <span class="license__document-icon" aria-hidden="true">
                <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                  <path
                    d="M7 1v9M3 6.5 7 10.5 11 6.5M2 14h10"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>

    <section class="container license__requisites" aria-labelledby="requisites-title">
      <div class="section-inner">
        <h2 id="requisites-title" class="license__section-title heading-l">
          {{ content.requisites.title }}
        </h2>

        <dl class="license__requisites-card">
          <div
            v-for="row in content.requisites.rows"
            :key="row.label"
            class="license__requisite"
          >
            <dt class="license__requisite-label body-s">{{ row.label }}</dt>
            <dd class="license__requisite-value body-m">{{ row.value }}</dd>
          </div>
        </dl>

        <div class="license__disclaimers">
          <p class="license__disclaimers-label label-s">
            {{ content.requisites.disclaimers.label }}
          </p>
          <p
            v-for="item in content.requisites.disclaimers.items"
            :key="item"
            class="license__disclaimer body-s"
          >
            {{ item }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
// Раскладка из SVG-макета «Licences — Desktop 1440» (2026-08-14);
// сверено по координатам текстов и форм (карточка лицензии сходится в 474px).
// Мобильный адаптив — по паттернам главной (макет 390): паддинги карточек 24,
// 2/3-колоночные сетки в одну колонку, крестик между логотипами скрыт.
// Промежуточный планшет — как на главной: двум карточкам тесно → 1 колонка.
.license {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  &__hero {
    margin-top: 5rem; // 80px из макета

    @include bp.mobile {
      margin-top: 0;
    }
  }

  &__title {
    margin: 0;
  }

  &__intro {
    max-width: 47rem; // оценка: ~750px по переносам макета
    margin: 1.25rem 0 0; // 20px из макета
    color: var(--text-muted);
  }

  // ── карточка лицензии ──────────────────────────────────────────────
  &__card {
    width: 100%;
    margin-top: 3rem; // 48px из макета
    padding: 3rem; // 48px из макета
    color: var(--text-inverse);
    background-color: var(--brand-violet);
    border-radius: 2.5rem; // 40px из макета

    @include bp.mobile {
      margin-top: 1.5rem; // 24px — заголовок→карточка как на главной
      padding: 1.5rem; // 24px из мобильного макета главной (390)
    }
  }

  &__card-badge {
    display: inline-block;
    padding: 0.4375rem 0.875rem; // 7px 14px из макета (высота пилюли 30)
    color: var(--text-on-lime);
    background-color: var(--brand-lime);
    border-radius: 999px;
  }

  &__card-title {
    margin: 2rem 0 0; // 32px из макета
    overflow-wrap: anywhere; // длинный номер лицензии не распирает карточку
  }

  &__meta {
    display: grid;
    // minmax(0, …): длинные значения не должны распирать колонки на планшете
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 3.5rem; // 56px из макета
    margin: 2.25rem 0 0; // 36px из макета

    @include bp.mobile {
      grid-template-columns: 1fr; // мета-пары стеком, как у программ на главной
      gap: 1rem; // 16px из мобильного макета (390)
      margin-top: 1.5rem;
    }
  }

  &__meta-item {
    display: flex;
    flex-direction: column;
  }

  &__meta-label {
    color: var(--accent-lavender-pale);
  }

  &__meta-value {
    margin: 0.5rem 0 0; // 8px из макета
  }

  &__note {
    max-width: 43rem; // оценка: ~690px по переносам макета (3 строки)
    margin: 1.875rem 0 0; // 30px из макета
    color: var(--accent-lavender-pale);
  }

  &__partner {
    margin-top: 2rem; // 32px из макета
  }

  // ── общие заголовки секций ─────────────────────────────────────────
  &__graduate,
  &__documents,
  &__requisites {
    margin-top: 5rem; // 80px из макета

    @include bp.mobile {
      margin-top: 4.5rem; // 72px — мобильный ритм секций
    }
  }

  &__section-title {
    margin: 0;
  }

  // ── уровни документов выпускника ───────────────────────────────────
  &__graduate-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem; // 24px из макета
    margin: 2rem 0 0; // 32px из макета
    padding: 0;
    list-style: none;

    // карточки ряда равной высоты (li — прослойка сетки)
    > li {
      display: grid;
    }

    // на планшете двум карточкам тесно — одна колонка (как сертификация/программы)
    @include bp.tablet-only {
      grid-template-columns: 1fr;
    }

    @include bp.mobile {
      grid-template-columns: 1fr;
      gap: 1rem; // 16px из мобильного макета (390)
      margin-top: 1.5rem; // 24px — заголовок→сетка как на главной
    }
  }

  // ── правовые документы (PDF) ───────────────────────────────────────
  &__documents-card {
    display: grid;
    gap: 3rem; // 48px из макета: между строками
    margin: 2rem 0 0; // 32px из макета
    padding: 1.5rem 2.25rem; // 24px 36px из макета
    background-color: var(--surface-cream);
    border-radius: 2.5rem; // 40px из макета
    list-style: none;

    @include bp.mobile {
      gap: 1.5rem; // 24px — как вертикальный ритм карточек на главной
      margin-top: 1.5rem;
      padding: 1.5rem; // 24px из мобильного макета (390)
    }
  }

  &__document {
    display: flex;
    gap: 1.5rem;
    align-items: center;
    justify-content: space-between;
    color: inherit;
    text-decoration: none;

    @include bp.mobile {
      gap: 1rem;
    }
  }

  &__document-info {
    display: flex;
    min-width: 0;
    flex-direction: column;
    gap: 0.375rem; // 6px — по бейслайнам макета
  }

  &__document-title {
    color: var(--text-primary);
  }

  &__document-note {
    color: var(--text-muted);
  }

  // круг с иконкой скачивания; лёгкий ховер — оценка, в макете не показан
  &__document-icon {
    display: grid;
    flex-shrink: 0;
    place-items: center;
    width: 3rem; // 48px из макета
    height: 3rem;
    color: var(--text-primary);
    background-color: var(--surface-page);
    border-radius: 50%;
    transition: background-color 0.15s;
  }

  &__document:hover &__document-icon {
    background-color: var(--brand-lime);
  }

  // ── реквизиты ──────────────────────────────────────────────────────
  &__requisites-card {
    display: grid;
    gap: 2.5rem; // оценка: ~40px по шагу рядов 64 в макете
    margin: 2rem 0 0; // 32px из макета
    padding: 2rem 2.25rem; // 32px 36px из макета
    background-color: var(--surface-cream);
    border-radius: 2.5rem; // 40px из макета

    @include bp.mobile {
      gap: 1.5rem; // 24px
      margin-top: 1.5rem;
      padding: 1.5rem; // 24px из мобильного макета (390)
    }
  }

  // label слева фиксированной колонкой 316px (из макета), значение справа
  &__requisite {
    display: grid;
    // minmax(0, …): реквизиты придут от заказчика длинными строками (ОГРН,
    // юрадрес) — колонка значения должна сжиматься, а не распирать карточку
    grid-template-columns: 19.75rem minmax(0, 1fr);
    gap: 1rem;

    @include bp.mobile {
      grid-template-columns: 1fr; // колонка 316px не влезает в 390
      gap: 0.25rem;
    }
  }

  &__requisite-label {
    color: var(--text-muted);
  }

  &__requisite-value {
    margin: 0;
    overflow-wrap: anywhere; // длинные номера без пробелов переносим
  }

  // ── оговорки ───────────────────────────────────────────────────────
  &__disclaimers {
    margin-top: 3rem; // 48px из макета
    padding: 2rem 2.25rem; // 32px 36px из макета
    background-color: var(--surface-nav);
    border: 1px solid var(--border-subtle);
    border-radius: 1.5rem; // 24px из макета

    @include bp.mobile {
      margin-top: 1.5rem;
      padding: 1.5rem; // 24px из мобильного макета (390)
    }
  }

  &__disclaimers-label {
    margin: 0;
    color: var(--text-muted);
  }

  &__disclaimer {
    margin: 0.75rem 0 0; // 12px из макета
    color: var(--text-muted);
  }
}
</style>
