"use client";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CategoryIcon from "@mui/icons-material/Category";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box, Button, Chip, Divider, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useBackToList } from "@/core/react";
import { getEventItems, getEventsSection } from "@/core/runtime";
import { getPageSlugByKey } from "@/core/static";
import { useLanguage } from "@/core/runtime";
import {
  getButtonTranslation,
  getEventsTranslation,
} from "@/core/translations";
import { formatEventDate, getRelativeEventDay } from "@/core/utils";
import { FALLBACK_IMAGE } from "@/core/static";
import SectionDescription from "../common/SectionDescription";
import ShareActions from "../common/ShareActions";

type EventDetailProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

function EventDetail({ icon, label, value }: EventDetailProps) {
  if (!value) {
    return null;
  }

  return (
    <Box display="flex" alignItems="flex-start" gap={1.5}>
      <Box
        sx={{
          color: "text.secondary",
          display: "flex",
          alignItems: "center",
          mt: "2px",
        }}
      >
        {icon}
      </Box>

      <Box minWidth={0}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", textTransform: "uppercase" }}
        >
          {label}
        </Typography>
        <Typography variant="body1" color="text.primary">
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

export default function EventItemSection({ id }: { id: number }) {
  const router = useRouter();
  const { lang } = useLanguage();
  const event = getEventItems(lang).find((item) => item.id === id);
  const eventsSection = getEventsSection(lang);
  const eventsTranslation = getEventsTranslation(lang);
  const buttonTranslation = getButtonTranslation(lang);

  if (!event) {
    return null;
  }

  const handleBackToEvents = useBackToList(`/${getPageSlugByKey("events")}`);

  const showApplyButton = Boolean(eventsSection?.showApplyButton);

  const handleApply = () => {
    const subject = `${eventsTranslation.applicationSubject}: ${event.title}`;

    router.push(
      `/${getPageSlugByKey("contact")}?subject=${encodeURIComponent(subject)}`,
    );
  };

  const formattedDate = formatEventDate(event.date, lang, {
    includeWeekday: true,
  });
  const relativeDay = getRelativeEventDay(event.date);
  const relativeDayLabel =
    relativeDay === "today"
      ? eventsTranslation.today
      : relativeDay === "tomorrow"
        ? eventsTranslation.tomorrow
        : "";

  return (
    <Box display="flex" flexDirection="column" gap={5} flex={1}>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap={{ xs: 4, md: 7 }}
        alignItems="flex-start"
      >
        <Box
          component="img"
          src={event.image || FALLBACK_IMAGE}
          alt={event.title}
          loading="lazy"
          sx={{
            width: { xs: "100%", md: "48%" },
            maxHeight: 620,
            objectFit: "cover",
            borderRadius: 2,
          }}
        />

        <Box
          flex={1}
          minWidth={0}
          display="flex"
          flexDirection="column"
          gap={3}
        >
          {(event.isCancelled || relativeDayLabel) && (
            <Box display="flex" flexWrap="wrap" gap={1} alignSelf="flex-start">
              {event.isCancelled && (
                <Chip
                  label={eventsTranslation.cancelled}
                  color="error"
                  sx={{ fontWeight: 600 }}
                />
              )}

              {relativeDayLabel && (
                <Chip
                  label={relativeDayLabel}
                  color={relativeDay === "today" ? "primary" : "secondary"}
                  sx={{ fontWeight: 600 }}
                />
              )}
            </Box>
          )}

          <Box display="flex" flexDirection="column" gap={2.5}>
            <EventDetail
              icon={<CalendarMonthIcon fontSize="small" />}
              label={eventsTranslation.date}
              value={formattedDate}
            />
            <EventDetail
              icon={<LocationOnIcon fontSize="small" />}
              label={eventsTranslation.location}
              value={event.location}
            />
            <EventDetail
              icon={<CategoryIcon fontSize="small" />}
              label={eventsTranslation.category}
              value={event.category}
            />
          </Box>

          <Divider />

          <SectionDescription description={event.text} textAlign="left" />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          mb: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            sx={{
              fontSize: "14px",
              width: { xs: "100%", sm: "auto" },
            }}
            onClick={handleBackToEvents}
          >
            {eventsTranslation.backToEvents}
          </Button>

          {showApplyButton && !event.isCancelled && (
            <Button
              variant="contained"
              color="primary"
              sx={{
                fontSize: "14px",
                width: { xs: "100%", sm: "auto" },
              }}
              onClick={handleApply}
            >
              {buttonTranslation.applyNow}
            </Button>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "flex-start", sm: "flex-end" },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <ShareActions title={event.title} />
        </Box>
      </Box>
    </Box>
  );
}
