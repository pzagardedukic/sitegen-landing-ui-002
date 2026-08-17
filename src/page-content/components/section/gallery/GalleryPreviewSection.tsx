"use client";

import "photoswipe/style.css";
import { getGalleryTranslation } from "@/core/translations";
import { useLanguage } from "@/core/runtime";
import SingleColumnSection from "../common/SingleColumnSection";
import { getGalleryItems } from "@/core/runtime";
import { CustomGallery } from "../common/CustomGallery";
import { getPageSlugByKeyWithBasePath } from "@/core/static";
import { useIsMobileDevice } from "@/hooks/useIsMobileDevice";
import { withBasePath } from "@/core/static";

export default function GallerySection() {
  const isMobile = useIsMobileDevice();
  const { lang } = useLanguage();
  const galleryTranslation = getGalleryTranslation(lang);

  const galleryItems = getGalleryItems().slice(0, isMobile ? 3 : 6);

  return (
    <SingleColumnSection
      title={galleryTranslation.title}
      isPreview
      callToAction={{
        label: galleryTranslation.callToAction,
        href: getPageSlugByKeyWithBasePath("gallery"),
      }}
    >
      <CustomGallery items={galleryItems} />
    </SingleColumnSection>
  );
}
