import { Box, Container } from "@mui/material";
import { useBannerImage } from "@/app/theme/utils/UseBannerImage";

type SectionProps = {
  id?: string;
  className?: string;
  color?: string;
  headerColor?: string;
  useHeaderImage?: boolean;
  headerHeight?: number | string;
  children: React.ReactNode;
};

export default function Section({
  id,
  className,
  color,
  headerColor,
  useHeaderImage = false,
  headerHeight = "100%",
  children,
}: SectionProps) {
  const resolvedHeaderImage = useHeaderImage ? useBannerImage() : undefined;

  const shouldRenderHeaderBackground =
    (headerColor || resolvedHeaderImage) && headerHeight;

  return (
    <Box
      id={id}
      component="section"
      className={className}
      sx={{
        scrollMarginTop: "100px",
        py: { xs: 2, lg: 10 },
        minHeight: "300px",
        backgroundColor: resolvedHeaderImage
          ? "transparent"
          : (color ?? "transparent"),
        position: "relative",
      }}
    >
      {shouldRenderHeaderBackground && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            height: headerHeight ?? 0,
            overflow: "hidden",
            zIndex: -1,
            backgroundColor: resolvedHeaderImage ? undefined : headerColor,

            ...(resolvedHeaderImage && {
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
            }),
          }}
        />
      )}
      <Container
        maxWidth="lg"
        sx={{ color: shouldRenderHeaderBackground ? "white" : undefined }}
      >
        {children}
      </Container>
    </Box>
  );
}
