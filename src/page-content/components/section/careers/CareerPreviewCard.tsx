import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

import { stripRichText, truncateWordSafe } from "@/core/utils";

type CareerPreviewCardProps = {
  href: string;
  title: string;
  text: string;
  requirements: string[];
  requirementsLabel: string;
  applyLabel: string;
  onApply: () => void;
};

export default function CareerPreviewCard({
  href,
  title,
  text,
  requirements,
  requirementsLabel,
  applyLabel,
  onApply,
}: CareerPreviewCardProps) {
  const truncatedText = stripRichText(truncateWordSafe(text, 180));
  const previewRequirements = requirements.slice(0, 3);

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-2px)",
        },
      }}
    >
      <Box
        component="a"
        href={href}
        aria-label={title}
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          color: "inherit",
          textDecoration: "none",
          px: 3,
          py: 3,
          "&:focus-visible": {
            outline: "2px solid",
            outlineColor: "primary.main",
            outlineOffset: -2,
          },
        }}
      >
        <Typography variant="h5" fontWeight={700} color="text.primary">
          {title}
        </Typography>

        {truncatedText && (
          <Typography variant="body2" color="text.secondary" mt={1.5}>
            {truncatedText}
          </Typography>
        )}

        {previewRequirements.length > 0 && (
          <Box mt={3}>
            <Typography variant="subtitle2" fontWeight={600}>
              {requirementsLabel}
            </Typography>

            <List dense disablePadding sx={{ mt: 0.5 }}>
              {previewRequirements.map((requirement, index) => (
                <ListItem key={index} disableGutters sx={{ py: 0.25 }}>
                  <ListItemText
                    primary={`• ${requirement}`}
                    primaryTypographyProps={{
                      variant: "body2",
                      color: "text.secondary",
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        px={3}
        py={2.5}
        borderTop="1px solid"
        borderColor="divider"
        mt="auto"
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={onApply}
          sx={{ fontSize: "14px" }}
        >
          {applyLabel}
        </Button>
      </Box>
    </Paper>
  );
}
