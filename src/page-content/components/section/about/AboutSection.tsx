"use client";

import ImageCarousel from "./ImageCarousel";
import { getAboutItems, getAboutSection } from "@/core/runtime";
import { useLanguage } from "@/core/runtime";
import { getAboutTranslation } from "@/core/translations";
import DualColumnSection from "../common/DualColumnSection";
import EstablishedAndClients from "../common/EstablishedAndClients";
import { Box } from "@mui/material";
import SingleColumnSection from "../common/SingleColumnSection";

export default function AboutSection() {
  const { lang } = useLanguage();
  const aboutTranslation = getAboutTranslation(lang);

  const aboutSection = getAboutSection(lang);
  const AboutItems = getAboutItems(lang);

  return (
    <Box display="flex" flexDirection="column">
      {AboutItems.length > 0 ? (
        <DualColumnSection
          title={aboutTranslation.subtitle}
          description={aboutSection.text}
        >
          {/* Image Carousel */}
          <ImageCarousel items={AboutItems} maxVisible={2} interval={6000} />
        </DualColumnSection>
      ) : (
        <SingleColumnSection
          title={aboutTranslation.subtitle}
          description={aboutSection.text}
        />
      )}

      {/* Year + Happy Clients - full screen width */}
      <EstablishedAndClients />
    </Box>
  );
}
