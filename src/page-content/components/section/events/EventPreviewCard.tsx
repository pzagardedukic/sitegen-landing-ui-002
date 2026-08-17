import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box, Chip, Paper, Typography } from "@mui/material";

import HoverZoomImage from "@/components/image/HoverZoomImage";
import type { LanguageKey } from "@/core/types";
import { formatEventDate, getRelativeEventDay } from "@/core/utils";
import { FALLBACK_IMAGE } from "@/core/static";
import { stripRichText, truncateWordSafe } from "@/core/utils";

type EventPreviewCardProps = {
  image: string;
  title: string;
  text: string;
  date: string;
  location: string;
  category: string;
  isCancelled: boolean;
  cancelledLabel: string;
  todayLabel: string;
  tomorrowLabel: string;
  lang: LanguageKey | null;
};

export default function EventPreviewCard({
  image,
  title,
  text,
  date,
  location,
  category,
  isCancelled,
  cancelledLabel,
  todayLabel,
  tomorrowLabel,
  lang,
}: EventPreviewCardProps) {
  const truncatedText = stripRichText(truncateWordSafe(text, 150));
  const formattedDate = formatEventDate(date, lang);
  const relativeDay = getRelativeEventDay(date);
  const relativeDayLabel =
    relativeDay === "today"
      ? todayLabel
      : relativeDay === "tomorrow"
        ? tomorrowLabel
        : "";

  return (
    <Paper
      className="zoom-image-parent"
      elevation={2}
      sx={{
        position: "relative",
        borderRadius: 2,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        opacity: isCancelled ? 0.82 : 1,
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-2px)",
        },
      }}
    >
      {(isCancelled || relativeDayLabel) && (
        <Box
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 1,
          }}
        >
          {isCancelled && (
            <Chip
              label={cancelledLabel}
              color="error"
              size="small"
              sx={{ fontWeight: 600 }}
            />
          )}

          {relativeDayLabel && (
            <Chip
              label={relativeDayLabel}
              color={relativeDay === "today" ? "primary" : "secondary"}
              size="small"
              sx={{ fontWeight: 600 }}
            />
          )}
        </Box>
      )}

      <HoverZoomImage
        src={image || FALLBACK_IMAGE}
        alt={title}
        loading="lazy"
        zoomOnParentHover
        sx={{
          width: "100%",
          height: 210,
          objectFit: "cover",
        }}
      />

      <Box px={2.5} py={2.5} flexGrow={1}>
        {category && (
          <Typography
            variant="overline"
            color="primary.main"
            sx={{ display: "block", lineHeight: 1.4, mb: 0.5 }}
          >
            {category}
          </Typography>
        )}

        <Typography variant="h6" color="text.primary">
          {title}
        </Typography>

        {truncatedText && (
          <Typography variant="body2" color="text.secondary" mt={1}>
            {truncatedText}
          </Typography>
        )}
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        gap={1}
        px={2.5}
        py={2}
        borderTop="1px solid"
        borderColor="divider"
        mt="auto"
      >
        {formattedDate && (
          <Box display="flex" alignItems="center" gap={1}>
            <CalendarMonthIcon sx={{ fontSize: 18, color: "text.secondary" }} />
            <Typography variant="caption" color="text.secondary">
              {formattedDate}
            </Typography>
          </Box>
        )}

        {location && (
          <Box display="flex" alignItems="center" gap={1}>
            <LocationOnIcon sx={{ fontSize: 18, color: "text.secondary" }} />
            <Typography variant="caption" color="text.secondary">
              {location}
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
}
