import { useBannerImage } from "@/app/theme/utils/UseBannerImage";
import { useTheme, useMediaQuery } from "@mui/material";
import { Box, Typography, Container } from "@mui/material";
import { getHome } from "@/core/runtime";
import { useLanguage } from "@/core/runtime";
import CircleTextButton from "@/components/button/CircleTextButton";
import ScrollLink from "@/components/button/ScrollLink";
import { getButtonTranslation } from "@/core/translations";
import { getPageSlugByKey } from "@/core/static";

export default function HomeSection() {
  const theme = useTheme();
  const isShortScreen = useMediaQuery("(max-height:600px)");
  const resolvedHeaderImage = useBannerImage();

  const { lang } = useLanguage();
  const buttonTranslation = getButtonTranslation(lang);
  const home = getHome(lang);

  return (
    <Box
      id="home"
      sx={{
        position: "relative",
        height: "100vh",
        display: "flex",
        py: 12,

        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage: `url("${resolvedHeaderImage}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.55,
          filter: "contrast(1.1) brightness(0.9) saturate(0.9)",
          zIndex: 0,
        },

        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(
              180deg,
              rgba(0,0,0,0.65) 0%,
              rgba(0,0,0,0.55) 45%,
              rgba(0,0,0,0.85) 100%
            )
          `,
          zIndex: 1,
        },
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          zIndex: 1,
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          mb={6}
          textTransform="uppercase"
          color="common.white"
        >
          {home.name}
        </Typography>

        <Typography
          variant="slogan"
          textAlign="center"
          color={theme.palette.grey[300]}
          mb={isShortScreen ? 10 : 16}
          sx={{
            fontSize: { xs: "24px", sm: "32px", md: "38px" },
          }}
        >
          {home.slogan}
        </Typography>

        <Box
          sx={{
            transform: isShortScreen ? "translateY(-40px)" : "none",
          }}
        >
          <CircleTextButton
            label={buttonTranslation.discoverNow}
            href={`#${getPageSlugByKey("about")}`}
            textColor="grey.200"
          />
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: "-175px",
            left: "50%",
            transform: "translateX(-50%)",
            height: "150px",
            zIndex: 1,
          }}
        >
          <ScrollLink
            href={`#${getPageSlugByKey("about")}`}
            textPosition="top"
            color="grey.500"
            label={buttonTranslation.scrollDown}
          />
        </Box>
      </Container>
    </Box>
  );
}
