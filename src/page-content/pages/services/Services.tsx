"use client";

import PageLayout from "@/components/layout/PageLayout";
import Section from "@/components/section/Section";
import { useLanguage } from "@/core/runtime";
import Footer from "@/page-content/components/footer/Footer";
import Header from "@/page-content/components/header/Header";
import HeaderSection from "@/page-content/components/section/header/HeaderSection";
import ServicesSection from "@/page-content/components/section/services/ServicesSection";
import { getServicesTranslation } from "@/core/translations";

export default function ServicesPage() {
  const { lang } = useLanguage();
  const servicesTranslation = getServicesTranslation(lang);

  return (
    <PageLayout header={<Header />} footer={<Footer />}>
      <Section id="services" useHeaderImage>
        <HeaderSection
          title={servicesTranslation.title}
        />
      </Section>

      <Section id="services">
        <ServicesSection />
      </Section>
    </PageLayout>
  );
}
