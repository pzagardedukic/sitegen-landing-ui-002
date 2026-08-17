import { Box } from "@mui/material";
import SectionTitle from "./SectionTitle";
import SectionDescription from "./SectionDescription";
import CircleTextButton from "@/components/button/CircleTextButton";

type DualColumnSectionProps = {
  title: string;
  children: React.ReactNode;
  description: string;
  switchSides?: boolean;
  callToAction?: {
    label: string;
    href: string;
  };
};

export default function DualColumnSection({
  title,
  children,
  description,
  switchSides = false,
  callToAction,
}: DualColumnSectionProps) {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 2, lg: 10 },
        px: { xs: 2, lg: 6 },
        display: "flex",
        flexDirection: {
          xs: switchSides ? "column-reverse" : "column",
          md: switchSides ? "row-reverse" : "row",
        },
        alignItems: "center",
        gap: { xs: 2, lg: 8 },
      }}
    >
      {/* Left column */}
      <Box
        sx={{
          flex: 1,
          maxWidth: 500,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {/* Title */}
        <SectionTitle
          title={title}
          justify={switchSides ? "flex-end" : "flex-start"}
        />

        {/* Description */}
        <SectionDescription
          description={description}
          textAlign={switchSides ? "right" : "left"}
        />

        {/* Call to Action */}
        {callToAction && (
          <Box mt={4} alignSelf={switchSides ? "flex-end" : "flex-start"}>
            <CircleTextButton
              label={callToAction.label}
              href={callToAction.href}
            />
          </Box>
        )}
      </Box>

      {/* Right column */}
      <Box sx={{ flex: 1, width: "100%" }}>{children}</Box>
    </Box>
  );
}
