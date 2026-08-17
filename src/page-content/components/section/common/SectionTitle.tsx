import StyledWords from "@/components/common/StyledWords";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

type SectionTitleProps = {
  title: string;
  highContrast?: boolean;
  justify?: "center" | "flex-start" | "flex-end";
};

export default function SectionTitle({
  title,
  highContrast = false,
  justify = "center",
}: SectionTitleProps) {
  return (
    <Box flexDirection="row" display="flex" justifyContent={justify} >
      {highContrast ? (
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          color="primary.contrastText"
        >
          {title}.
        </Typography>
      ) : (
        <>
          <StyledWords
            text={title}
            mode="start"
            styleA={{ color: "secondary.main" }}
            styleB={{ color: "text.primary", textTransform: "capitalize" }}
            variant="h2"
            component="h2"
            gutterBottom
          />
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            color="secondary.main"
          >
            .
          </Typography>
        </>
      )}
    </Box>
  );
}
