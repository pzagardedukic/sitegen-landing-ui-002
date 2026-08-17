"use client";

import { getPortfolioSection } from "@/core/runtime";
import { useLanguage } from "@/core/runtime";
import { getPortfolioTranslation } from "@/core/translations";
import SingleColumnSection from "../common/SingleColumnSection";
import Portfolio from "./Portfolio";
import { useIsMobileDevice } from "@/hooks/useIsMobileDevice";
import { getPageSlugByKeyWithBasePath } from "@/core/static";

export default function PortfolioPreviewSection() {
  const isMobile = useIsMobileDevice();
  const { lang } = useLanguage();
  const portfolioTranslation = getPortfolioTranslation(lang);

  const portfolioSection = getPortfolioSection(lang);
  if (!portfolioSection) {
    return null;
  }

  return (
    <SingleColumnSection
      title={portfolioSection.name || portfolioTranslation.title}
      description={portfolioSection.text}
      isPreview
      callToAction={{
        label: portfolioTranslation.callToAction,
        href: getPageSlugByKeyWithBasePath("portfolio"),
      }}
    >
      <Portfolio maxCnt={isMobile ? 3 : 6} />
    </SingleColumnSection>
  );
}
