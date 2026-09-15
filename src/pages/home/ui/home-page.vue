<script setup lang="ts">
import { HeroSection } from '@/widgets/hero';
import { AudienceSection } from '@/widgets/audience';
import { FlagshipCourseSection } from '@/widgets/flagship-course';
import { EcosystemSection } from '@/widgets/ecosystem';
import { TrustSection } from '@/widgets/trust';
import { TeacherSection } from '@/widgets/teacher';
import { ProgramSection } from '@/widgets/program';
import { CertificationSection } from '@/widgets/certification';
import { RegisterSection } from '@/widgets/register';
</script>

<template>
  <div class="page">
    <HeroSection />
    <AudienceSection />
    <!-- в мобильной версии секции нет (решение заказчика 2026-09-14) -->
    <FlagshipCourseSection class="u-mobile-hidden" />
    <EcosystemSection />
    <!-- в мобильной версии секции нет (решение заказчика 2026-09-14) -->
    <TrustSection class="u-mobile-hidden" />
    <TeacherSection />
    <!-- в мобильной версии секции нет (решение заказчика 2026-09-14) -->
    <ProgramSection class="u-mobile-hidden" />
    <CertificationSection />
    <RegisterSection />
  </div>
</template>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  // вертикальные отступы между секциями задают сами секции (margin-top из макета);
  // отступ до футера и до низа страницы несёт сам футер
}
</style>
