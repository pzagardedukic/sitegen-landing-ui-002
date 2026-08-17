"use client";

import ImageCarousel from "./ImageCarousel";
import { getAboutItems, getAboutSection } from "@/core/runtime";
import { useLanguage } from "@/core/runtime";
import {
  getAboutTranslation,
  getButtonTranslation,
} from "@/core/translations";
import DualColumnSection from "../common/DualColumnSection";
import EstablishedAndClients from "../common/EstablishedAndClients";
import { getPageSlugByKeyWithBasePath } from "@/core/static";
import SingleColumnSection from "../common/SingleColumnSection";

export default function AboutPreviewSection() {
  const { lang } = useLanguage();
  const aboutTranslation = getAboutTranslation(lang);
  const buttonTranslation = getButtonTranslation(lang);

  const aboutSection = getAboutSection(lang);
  const AboutItems = getAboutItems(lang);

  return (
    <>
      {AboutItems.length > 0 ? (
        <DualColumnSection
          title={aboutSection.sectionName || aboutTranslation.title}
          description={aboutSection.text}
          callToAction={{
            label: buttonTranslation.learnMore,
            href: getPageSlugByKeyWithBasePath("about"),
          }}
        >
          {/* Image Carousel */}
          <ImageCarousel items={AboutItems} maxVisible={2} interval={6000} />
        </DualColumnSection>
      ) : (
        <SingleColumnSection
          title={aboutSection.sectionName || aboutTranslation.title}
          description={aboutSection.text}
          callToAction={{
            label: buttonTranslation.learnMore,
            href: getPageSlugByKeyWithBasePath("about"),
          }}
        />
      )}

      {/* Year + Happy Clients - full screen width */}
      <EstablishedAndClients />
    </>
  );
}
