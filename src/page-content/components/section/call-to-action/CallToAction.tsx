import { useBannerImage } from "@/app/theme/utils/UseBannerImage";
import CircleTextButton from "@/components/button/CircleTextButton";
import { useLanguage } from "@/core/runtime";
import { getCallToActionTranslation } from "@/core/translations";
import { Box, Typography } from "@mui/material";

type CallToActionProps = {
  href: string;
};

export default function CallToAction({ href }: CallToActionProps) {
  const { lang } = useLanguage();
  const callToActionTranslation = getCallToActionTranslation(lang);

  const resolvedHeaderImage = useBannerImage();

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: 160,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        px: 4,
        py: 6,

        /* IMAGE */
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage: `url('${resolvedHeaderImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          opacity: 0.55,
          filter: "contrast(1.1) brightness(0.9) saturate(0.9)",
          zIndex: 0,
        },

        /* OVERLAY */
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
      {/* CONTENT WRAPPER */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          width: "100%",
        }}
      >
        <Typography
          sx={{
            color: "secondary.contrastText",
            fontWeight: 300,
            fontSize: {
              xs: "28px",
              sm: "34px",
              md: "40px",
            },
            lineHeight: {
              xs: "36px",
              sm: "42px",
              md: "48px",
            },
            maxWidth: 400,
            textAlign: {
              xs: "center",
              md: "left",
            },
            flex: "1 1 300px",
          }}
        >
          {callToActionTranslation.title}
        </Typography>

        <Box>
          <CircleTextButton
            label={callToActionTranslation.contactButton}
            href={href}
            textColor="secondary.contrastText"
          />
        </Box>
      </Box>
    </Box>
  );
}
