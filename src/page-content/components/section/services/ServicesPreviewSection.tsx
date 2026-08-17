"use client";

import { getServicesSection } from "@/core/runtime";
import { useLanguage } from "@/core/runtime";
import { getServicesTranslation } from "@/core/translations";
import SingleColumnSection from "../common/SingleColumnSection";
import Services from "./Services";
import { getPageSlugByKeyWithBasePath } from "@/core/static";

export default function ServicesSection() {
  const { lang } = useLanguage();
  const servicesTranslation = getServicesTranslation(lang);

  const servicesSection = getServicesSection(lang);
  if (!servicesSection) {
    return null;
  }

  return (
    <SingleColumnSection
      title={servicesTranslation.title}
      description={servicesSection.text}
      isHighContrast
      callToAction={{
        label: servicesTranslation.callToAction,
        href: getPageSlugByKeyWithBasePath("services"),
      }}
    >
      <Services maxCnt={6} />
    </SingleColumnSection>
  );
}
