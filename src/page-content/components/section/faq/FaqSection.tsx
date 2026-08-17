"use client";

import { getFaqSection } from "@/core/runtime";
import SingleColumnSection from "../common/SingleColumnSection";
import { useLanguage } from "@/core/runtime";
import { Box } from "@mui/material";
import FaqItem from "./FaqItem";

export default function FaqSection() {
  const { lang } = useLanguage();
  const faqSection = getFaqSection(lang);

  if (!faqSection) {
    return null;
  }

  return (
    <SingleColumnSection description={faqSection.text}>
      <Box sx={{ width: "100%", mt: 2 }}>
        {faqSection.items.map((item, index) => (
          <FaqItem
            key={index}
            question={item.question}
            answer={item.answer}
            defaultOpen={index === 0}
          />
        ))}
      </Box>
    </SingleColumnSection>
  );
}
