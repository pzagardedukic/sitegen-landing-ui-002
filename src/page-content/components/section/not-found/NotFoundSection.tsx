"use client";

import { Box } from "@mui/material";
import SingleColumnSection from "../common/SingleColumnSection";
import { useLanguage } from "@/core/runtime";
import { getNotFoundTranslation } from "@/core/translations";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { withBasePath } from "@/core/static";

export default function NotFoundSection() {
  const { lang } = useLanguage();
  const translation = getNotFoundTranslation(lang);

  return (
    <SingleColumnSection
      description={translation.text}
      callToAction={{ label: translation.backToHome, href: withBasePath("/") }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        <SearchOffIcon style={{ fontSize: 80, color: "#999" }} />
      </Box>
    </SingleColumnSection>
  );
}
