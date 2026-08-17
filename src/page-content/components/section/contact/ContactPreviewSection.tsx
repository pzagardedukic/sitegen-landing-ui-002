"use client";

import { Box } from "@mui/material";
import { getContactTranslation } from "@/core/translations";
import { useLanguage } from "@/core/runtime";
import SingleColumnSection from "../common/SingleColumnSection";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

export default function ContactPreviewSection() {
  const { lang } = useLanguage();
  const contactTranslation = getContactTranslation(lang);

  return (
    <SingleColumnSection title={contactTranslation.title}>
      <Box
        display="flex"
        flexDirection="column"
        gap={4}
        mt={4}
      >
        <ContactInfo />

        <ContactForm />
      </Box>
    </SingleColumnSection>
  );
}
