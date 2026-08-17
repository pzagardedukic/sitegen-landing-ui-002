"use client";

import { Divider } from "@mui/material";
import { useRouter } from "next/navigation";

import { getCareersItems, getCareersSection } from "@/core/runtime";
import { getPageSlugByKey } from "@/core/static";
import { useLanguage } from "@/core/runtime";
import { getCareersTranslation } from "@/core/translations";
import SingleColumnSection from "../common/SingleColumnSection";
import CareersList from "./CareersList";

export default function CareersSection() {
  const router = useRouter();
  const { lang } = useLanguage();
  const careersTranslation = getCareersTranslation(lang);
  const careersSection = getCareersSection(lang);

  if (!careersSection) {
    return null;
  }

  const careersItems = getCareersItems(lang);

  const handleApply = (title: string) => {
    const subject = `${careersTranslation.applicationSubject}: ${title}`;

    router.push(
      `/${getPageSlugByKey("contact")}?subject=${encodeURIComponent(subject)}`,
    );
  };

  return (
    <SingleColumnSection description={careersSection.text}>
      <Divider />
      <CareersList careers={careersItems} onApply={handleApply} />
    </SingleColumnSection>
  );
}
