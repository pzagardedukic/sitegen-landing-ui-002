"use client";

import FooterSocials from "@/components/button/FooterSocials";
import ScrollLink from "@/components/button/ScrollLink";
import { BUILD_YEAR } from "@/core/runtime";
import { useLanguage } from "@/core/runtime";
import {
  getButtonTranslation,
  getFooterTranslation,
} from "@/core/translations";
import { Box, Link, Typography } from "@mui/material";

export default function Footer() {
  const { lang } = useLanguage();
  const footerTranslation = getFooterTranslation(lang);
  const buttonTranslation = getButtonTranslation(lang);

  return (
    <Box
      position="relative"
      height="300px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {/* Place ScrollLink at top center, overlapping over bottom */}
      <Box
        sx={{
          position: "absolute",
          top: "-85px",
          left: "50%",
          transform: "translateX(-50%)",
          height: "150px",
        }}
      >
        <ScrollLink
          href="#main"
          textPosition="bottom"
          color="grey.500"
          label={buttonTranslation.backToTop}
        />
      </Box>

      <FooterSocials
        color="footer.text.secondary"
        size={32}
        gap={1}
        direction="row"
      />

      <Typography
        component={Link}
        href="https://onas.si"
        target="_blank"
        rel="noopener noreferrer"
        variant="body1"
        color="footer.text.primary"
        mt={6}
        underline="hover"
      >
        &copy; {footerTranslation.production} {BUILD_YEAR}.
      </Typography>
      <Typography variant="body2" color="footer.text.secondary" mt={1}>
        {footerTranslation.slogan}
      </Typography>
    </Box>
  );
}
