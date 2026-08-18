"use client";

import { Box, Typography } from "@mui/material";
import { groupWorkingHours } from "./groupWorkingHours";
import { useMemo } from "react";
import { useLanguage } from "@/core/runtime";
import { getWorkingHours } from "@/core/runtime";
import { Days, getContactTranslation } from "@/core/translations";

/*
 * Day and time rows as drawn: the day on the left, the time on the right, no dividers and
 * no chips. Today's row is marked with the brand colour. The heading comes from the block
 * this sits in, so it is not repeated here.
 */
export default function WorkingHours() {
  const { lang } = useLanguage();

  const workingHoursTranslation = getContactTranslation(lang).workingHours;

  const workingHours = getWorkingHours(lang);

  const grouped = useMemo(
    () => groupWorkingHours(workingHours.items),
    [workingHours.items],
  );

  const currentDay = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
        {grouped.map((g, i) => {
          const isToday = g.days.includes(currentDay);
          const translated = g.days.map(
            (d) => workingHoursTranslation.days[d as Days],
          );
          const dayLabel =
            translated.length === 1
              ? translated[0]
              : `${translated[0]} – ${translated[translated.length - 1]}`;

          return (
            <Box
              key={i}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                color: isToday ? "primary.main" : "inherit",
              }}
            >
              <Typography variant="body2">{dayLabel}</Typography>

              <Typography variant="body2" sx={{ opacity: isToday ? 1 : 0.7 }}>
                {g.open
                  ? `${g.from} – ${g.to}`
                  : workingHoursTranslation.closedLabel}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {workingHours.note && (
        <Typography variant="caption" sx={{ opacity: 0.6, mt: 0.5 }}>
          {workingHoursTranslation.noteLabel}: {workingHours.note}
        </Typography>
      )}
    </Box>
  );
}
