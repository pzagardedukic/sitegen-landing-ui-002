import { Box } from "@mui/material";
import SectionTitle from "./SectionTitle";
import SectionDescription from "./SectionDescription";
import CircleTextButton from "@/components/button/CircleTextButton";

type SingleColumnSectionProps = {
  title?: string;
  children?: React.ReactNode;
  isPreview?: boolean;
  isHighContrast?: boolean;
  description?: string;
  callToAction?: {
    label: string;
    href: string;
  };
};

export default function SingleColumnSection({
  title,
  isPreview = false,
  isHighContrast = false,
  children,
  description,
  callToAction,
}: SingleColumnSectionProps) {
  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: { xs: 2, lg: 10 },
        px: { xs: 2, md: 6 },
        gap: 2,
      }}
    >
      {/* Title */}
      {title && <SectionTitle title={title} highContrast={isHighContrast} />}

      {/* Description */}
      {description && (
        <Box maxWidth="80%">
          <SectionDescription
            description={description}
            textAlign="center"
            highContrast={isHighContrast}
            maxChars={isPreview ? 100 : undefined}
          />
        </Box>
      )}

      {/* Children */}
      {children &&
        (isPreview ? (
          <Box width="100%" position="relative">
            {children}
            {/* Bottom Fade */}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "200px",
                pointerEvents: "none",
                zIndex: 2,
                background: (theme) =>
                  `linear-gradient(to top, ${theme.palette.background.default} 10%, transparent 100%)`,
              }}
            />
          </Box>
        ) : (
          children
        ))}

      {/* Call to Action */}
      {callToAction && (
        <CircleTextButton label={callToAction.label} href={callToAction.href} />
      )}
    </Box>
  );
}
