"use client";

import { Box } from "@mui/material";
import MarqueeBand from "@/components/marquee/MarqueeBand";
import { getAboutSection } from "@/core/runtime";
import { useLanguage } from "@/core/runtime";
import { getAboutTranslation } from "@/core/translations";

/*
 * The two scrolling bands under the about section. Full-bleed by design — in the wireframes
 * the tablet band stopped 175px short of the right edge and read as broken, so the width
 * comes from the viewport rather than the content container.
 */
export default function EstablishedAndClients() {
  const { lang } = useLanguage();
  const aboutTranslation = getAboutTranslation(lang);

  const aboutSection = getAboutSection(lang);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1.5, md: 2 } }}>
      {aboutSection.establishedYear && (
        <MarqueeBand
          items={[`${aboutTranslation.establishedIn} ${aboutSection.establishedYear}`]}
          speed={45}
          tone="brand"
        />
      )}

      <MarqueeBand
        items={[`100% ${aboutTranslation.satisfiedClients}`]}
        speed={60}
        tone="quiet"
      />
    </Box>
  );
}
