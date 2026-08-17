import React from "react";
import { Box } from "@mui/material";
import SlidingText from "@/components/sliding-text/SlidingText";
import { getAboutSection } from "@/core/runtime";
import { useLanguage } from "@/core/runtime";
import { getAboutTranslation } from "@/core/translations";

export default function EstablishedAndClients() {
  const { lang } = useLanguage();
  const aboutTranslation = getAboutTranslation(lang);

  const aboutSection = getAboutSection(lang);

  return (
    <Box
      sx={{
        width: "100vw",
        position: "relative",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      {aboutSection.establishedYear && (
        <SlidingText
          text={`${aboutTranslation.establishedIn} ${aboutSection.establishedYear}`}
          height={50}
          speed={45}
        />
      )}

      <SlidingText
        text={`100% ${aboutTranslation.satisfiedClients}`}
        height={50}
        speed={60}
      />
    </Box>
  );
}
